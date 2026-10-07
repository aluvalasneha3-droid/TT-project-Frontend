import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({ emailOrUsername: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const emailOrUsername = formData.emailOrUsername.trim()
    const password = formData.password.trim()

    if (!emailOrUsername || !password) {
      setError('Email/username and password are required.')
      return
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters long for the demo.')
      return
    }

    const username = emailOrUsername.includes('@')
      ? emailOrUsername.split('@')[0]
      : emailOrUsername

    login({
      username,
      email: emailOrUsername.includes('@') ? emailOrUsername : `${username}@candlecraft.local`,
    })

    navigate('/dashboard')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand-mark large">C</div>
          <h1>Candle Craft</h1>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="emailOrUsername">Email or Username</label>
          <input
            id="emailOrUsername"
            name="emailOrUsername"
            type="text"
            value={formData.emailOrUsername}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter email or username"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter password"
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="primary-button full-width">
            Login
          </button>
        </form>

        <p className="auth-link">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
