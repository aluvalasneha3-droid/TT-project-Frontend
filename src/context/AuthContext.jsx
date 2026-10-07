import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const STORAGE_KEY = 'candleCraftUser'

function readStoredUser() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const storedUser = localStorage.getItem(STORAGE_KEY)
    return storedUser ? JSON.parse(storedUser) : null
  } catch (error) {
    console.error('Failed to read user from localStorage', error)
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(readStoredUser()))

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      setIsAuthenticated(true)
    } else {
      localStorage.removeItem(STORAGE_KEY)
      setIsAuthenticated(false)
    }
  }, [user])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      login: (userData) => setUser(userData),
      register: (userData) => setUser(userData),
      logout: () => setUser(null),
    }),
    [isAuthenticated, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider')
  }

  return context
}
