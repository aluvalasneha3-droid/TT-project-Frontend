export const sampleStocks = [
  { symbol: 'RELIANCE', company: 'Reliance Industries', price: 2987.5 },
  { symbol: 'TCS', company: 'Tata Consultancy Services', price: 3895.2 },
  { symbol: 'INFY', company: 'Infosys', price: 1624.8 },
  { symbol: 'HDFCBANK', company: 'HDFC Bank', price: 1712.4 },
  { symbol: 'ITC', company: 'ITC Limited', price: 469.6 },
  { symbol: 'SBIN', company: 'State Bank of India', price: 842.7 },
]

export const initialHoldings = [
  { symbol: 'RELIANCE', company: 'Reliance Industries', quantity: 8, averagePrice: 2850 },
  { symbol: 'TCS', company: 'Tata Consultancy Services', quantity: 5, averagePrice: 3740 },
  { symbol: 'INFY', company: 'Infosys', quantity: 10, averagePrice: 1555 },
]

export const initialTransactions = [
  {
    id: 1,
    date: '2026-10-01',
    stock: 'RELIANCE',
    type: 'BUY',
    quantity: 8,
    price: 2850,
    total: 22800,
  },
  {
    id: 2,
    date: '2026-09-25',
    stock: 'TCS',
    type: 'BUY',
    quantity: 5,
    price: 3740,
    total: 18700,
  },
  {
    id: 3,
    date: '2026-09-18',
    stock: 'INFY',
    type: 'BUY',
    quantity: 10,
    price: 1555,
    total: 15550,
  },
]

export const defaultUser = {
  username: 'demoTrader',
  email: 'demo@candlecraft.com',
}

export const loginApi = async ({ emailOrUsername, password }) => {
  if (!emailOrUsername || !password) {
    throw new Error('Email/username and password are required.')
  }

  const username = emailOrUsername.includes('@')
    ? emailOrUsername.split('@')[0]
    : emailOrUsername

  return {
    user: {
      username,
      email: emailOrUsername.includes('@') ? emailOrUsername : `${username}@candlecraft.local`,
    },
  }
}

export const registerApi = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    throw new Error('All registration fields are required.')
  }

  return {
    user: {
      username,
      email,
    },
  }
}

export const getStocksApi = async () => sampleStocks
