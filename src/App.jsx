import { useMemo, useState } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useAuth } from './context/AuthContext'
import { initialHoldings, initialTransactions, sampleStocks } from './services/api'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Portfolio from './pages/Portfolio'
import Register from './pages/Register'
import Stocks from './pages/Stocks'
import Transactions from './pages/Transactions'
import './App.css'

function ProtectedLayout() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

function App() {
  const [balance, setBalance] = useState(25000)
  const [holdings, setHoldings] = useState(initialHoldings)
  const [transactions, setTransactions] = useState(initialTransactions)
  const [stocks] = useState(sampleStocks)
  const { isAuthenticated } = useAuth()

  const portfolioValue = useMemo(
    () =>
      holdings.reduce((total, holding) => {
        const stock = stocks.find((item) => item.symbol === holding.symbol)
        const currentPrice = stock ? stock.price : 0
        return total + holding.quantity * currentPrice
      }, 0),
    [holdings, stocks],
  )

  const profitLoss = useMemo(
    () =>
      holdings.reduce((total, holding) => {
        const stock = stocks.find((item) => item.symbol === holding.symbol)
        const currentPrice = stock ? stock.price : 0
        const currentValue = holding.quantity * currentPrice
        const investedValue = holding.quantity * holding.averagePrice
        return total + (currentValue - investedValue)
      }, 0),
    [holdings, stocks],
  )

  const handleTrade = (type, stock, quantity) => {
    if (!stock || quantity <= 0) {
      return { success: false, message: 'Please choose a valid stock and quantity.' }
    }

    const totalValue = stock.price * quantity

    if (type === 'BUY') {
      if (balance < totalValue) {
        return {
          success: false,
          message: 'Not enough virtual balance to complete this BUY order.',
        }
      }

      setBalance((currentBalance) => Number((currentBalance - totalValue).toFixed(2)))

      setHoldings((currentHoldings) => {
        const existingHolding = currentHoldings.find((item) => item.symbol === stock.symbol)

        if (existingHolding) {
          const updatedQuantity = existingHolding.quantity + quantity
          const totalCost = existingHolding.quantity * existingHolding.averagePrice + totalValue
          const newAveragePrice = totalCost / updatedQuantity

          return currentHoldings.map((item) =>
            item.symbol === stock.symbol
              ? {
                  ...item,
                  quantity: updatedQuantity,
                  averagePrice: Number(newAveragePrice.toFixed(2)),
                }
              : item,
          )
        }

        return [
          ...currentHoldings,
          {
            symbol: stock.symbol,
            company: stock.company,
            quantity,
            averagePrice: stock.price,
          },
        ]
      })

      setTransactions((currentTransactions) => [
        {
          id: Date.now(),
          date: new Date().toLocaleDateString('en-CA'),
          stock: stock.symbol,
          type: 'BUY',
          quantity,
          price: stock.price,
          total: totalValue,
        },
        ...currentTransactions,
      ])

      return {
        success: true,
        message: `BUY order placed for ${quantity} shares of ${stock.symbol}.`,
      }
    }

    if (type === 'SELL') {
      const existingHolding = holdings.find((item) => item.symbol === stock.symbol)

      if (!existingHolding || existingHolding.quantity < quantity) {
        return {
          success: false,
          message: `You do not own enough ${stock.symbol} shares to sell.`,
        }
      }

      setBalance((currentBalance) => Number((currentBalance + totalValue).toFixed(2)))

      setHoldings((currentHoldings) =>
        currentHoldings.flatMap((item) => {
          if (item.symbol !== stock.symbol) {
            return [item]
          }

          const remainingQuantity = item.quantity - quantity

          if (remainingQuantity <= 0) {
            return []
          }

          return [{ ...item, quantity: remainingQuantity }]
        }),
      )

      setTransactions((currentTransactions) => [
        {
          id: Date.now(),
          date: new Date().toLocaleDateString('en-CA'),
          stock: stock.symbol,
          type: 'SELL',
          quantity,
          price: stock.price,
          total: totalValue,
        },
        ...currentTransactions,
      ])

      return {
        success: true,
        message: `SELL order placed for ${quantity} shares of ${stock.symbol}.`,
      }
    }

    return { success: false, message: 'Trade type not recognized.' }
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedLayout />}>
        <Route
          path="/dashboard"
          element={
            <Dashboard
              balance={balance}
              holdings={holdings}
              stocks={stocks}
              portfolioValue={portfolioValue}
              profitLoss={profitLoss}
            />
          }
        />
        <Route
          path="/stocks"
          element={<Stocks stocks={stocks} onTrade={handleTrade} />}
        />
        <Route
          path="/portfolio"
          element={<Portfolio holdings={holdings} stocks={stocks} />}
        />
        <Route
          path="/transactions"
          element={<Transactions transactions={transactions} />}
        />
      </Route>

      <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
      <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
    </Routes>
  )
}

export default App
