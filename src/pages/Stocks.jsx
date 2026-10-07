import { useMemo, useState } from 'react'
import TradeForm from '../components/TradeForm'

function Stocks({ stocks, onTrade }) {
  const [selectedSymbol, setSelectedSymbol] = useState(stocks[0]?.symbol || '')

  const selectedStock = useMemo(
    () => stocks.find((stock) => stock.symbol === selectedSymbol) || stocks[0],
    [selectedSymbol, stocks],
  )

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="muted-label">Market</p>
          <h2>Available Stocks</h2>
        </div>
      </div>

      <div className="stock-grid">
        {stocks.map((stock) => (
          <div key={stock.symbol} className={selectedStock?.symbol === stock.symbol ? 'stock-card selected' : 'stock-card'}>
            <div className="stock-row">
              <div>
                <p className="stock-symbol">{stock.symbol}</p>
                <small>{stock.company}</small>
              </div>
              <span className="chip">₹{stock.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>

            <button type="button" className="secondary-button" onClick={() => setSelectedSymbol(stock.symbol)}>
              Select stock
            </button>
          </div>
        ))}
      </div>

      <div className="trade-panel">
        <TradeForm selectedStock={selectedStock} onTrade={onTrade} />
      </div>
    </div>
  )
}

export default Stocks
