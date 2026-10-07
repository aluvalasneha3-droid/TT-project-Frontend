import { useEffect, useState } from 'react'

function TradeForm({ selectedStock, onTrade }) {
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    setQuantity(1)
    setMessage('')
    setIsSuccess(false)
  }, [selectedStock?.symbol])

  if (!selectedStock) {
    return <div className="trade-card empty-state">Select a stock from the list to begin trading.</div>
  }

  const handleTrade = (type) => {
    const tradeQuantity = Number(quantity)

    if (!selectedStock) {
      setIsSuccess(false)
      setMessage('Please select a stock before placing a trade.')
      return
    }

    if (!Number.isFinite(tradeQuantity) || tradeQuantity <= 0) {
      setIsSuccess(false)
      setMessage('Quantity must be greater than zero.')
      return
    }

    const result = onTrade(type, selectedStock, tradeQuantity)

    if (result && result.success) {
      setIsSuccess(true)
      setMessage(result.message)
      setQuantity(1)
      return
    }

    setIsSuccess(false)
    setMessage(result?.message || 'Trade failed. Please try again.')
  }

  const estimatedValue = Number(quantity || 0) * Number(selectedStock.price)

  return (
    <div className="trade-card">
      <div className="trade-card-header">
        <div>
          <p className="muted-label">Selected stock</p>
          <h3>{selectedStock.symbol}</h3>
        </div>
        <span className="chip">{selectedStock.company}</span>
      </div>

      <div className="price-row">
        <span>Current price</span>
        <strong>₹{selectedStock.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</strong>
      </div>

      <label className="field-label" htmlFor="quantity">
        Quantity
      </label>
      <input
        id="quantity"
        type="number"
        min="1"
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
        className="form-input"
      />

      <div className="trade-summary">
        <span>Estimated value</span>
        <strong>₹{estimatedValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</strong>
      </div>

      <div className="trade-actions">
        <button type="button" className="buy-button" onClick={() => handleTrade('BUY')}>
          BUY
        </button>
        <button type="button" className="sell-button" onClick={() => handleTrade('SELL')}>
          SELL
        </button>
      </div>

      {message && (
        <p className={isSuccess ? 'trade-message success' : 'trade-message error'}>{message}</p>
      )}
    </div>
  )
}

export default TradeForm
