function Transactions({ transactions }) {
  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="muted-label">History</p>
          <h2>Transactions</h2>
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Stock</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.stock}</td>
                <td className={transaction.type === 'BUY' ? 'buy-text' : 'sell-text'}>{transaction.type}</td>
                <td>{transaction.quantity}</td>
                <td>₹{transaction.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                <td>₹{transaction.total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Transactions
