import { useAuth } from '../context/AuthContext'

function Dashboard({ balance, holdings, stocks, portfolioValue, profitLoss }) {
  const { user } = useAuth()
  const holdingCount = holdings.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="muted-label">Overview</p>
          <h2>Welcome back, {user?.username || 'Trader'}!</h2>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card accent">
          <span>Virtual Balance</span>
          <strong>₹{balance.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</strong>
        </div>
        <div className="stat-card">
          <span>Holdings</span>
          <strong>{holdingCount}</strong>
        </div>
        <div className="stat-card">
          <span>Portfolio Value</span>
          <strong>₹{portfolioValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</strong>
        </div>
        <div className="stat-card">
          <span>P/L</span>
          <strong className={profitLoss >= 0 ? 'positive' : 'negative'}>
            ₹{profitLoss.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </strong>
        </div>
      </div>

      <section className="section-card">
        <div className="section-heading">
          <h3>Available Stocks</h3>
        </div>

        <div className="stock-grid compact">
          {stocks.slice(0, 5).map((stock) => (
            <div key={stock.symbol} className="stock-card dashboard-card">
              <div className="stock-row">
                <div>
                  <p className="stock-symbol">{stock.symbol}</p>
                  <small>{stock.company}</small>
                </div>
                <span className="chip">₹{stock.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
