function Portfolio({ holdings, stocks }) {
  const stockMap = new Map(stocks.map((stock) => [stock.symbol, stock]))

  const rows = holdings.map((holding) => {
    const currentPrice = stockMap.get(holding.symbol)?.price || 0
    const currentValue = holding.quantity * currentPrice
    const investedValue = holding.quantity * holding.averagePrice
    const profitLoss = currentValue - investedValue

    return {
      ...holding,
      currentPrice,
      currentValue,
      profitLoss,
    }
  })

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="muted-label">Your holdings</p>
          <h2>Portfolio</h2>
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Stock</th>
              <th>Quantity</th>
              <th>Average Price</th>
              <th>Current Price</th>
              <th>Current Value</th>
              <th>Profit/Loss</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.symbol}>
                <td>{row.symbol}</td>
                <td>{row.quantity}</td>
                <td>₹{row.averagePrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                <td>₹{row.currentPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                <td>₹{row.currentValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                <td className={row.profitLoss >= 0 ? 'positive' : 'negative'}>
                  ₹{row.profitLoss.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Portfolio
