import { useState, createContext, useEffect, useContext } from 'react'
import { fetchMe } from '../api'

import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const me = await fetchMe()
        console.log('me', me)

        setLoggedIn(true)
        setUser(me)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    })()
  }, [])

  const login = (data) => {
    setLoggedIn(true)
    setUser(data.user)

    localStorage.setItem('access-token', data.accessToken)
    localStorage.setItem('refresh-token', data.refreshToken)
  }

  const values = {
    loggedIn,
    user,
    login,
  }

  if (loading) {
    return (
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: 150 }}
      >
        <CircularProgress color="secondary" />
      </Grid>
    )
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
