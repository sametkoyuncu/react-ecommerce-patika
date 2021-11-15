import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function ProtectedRoute({ admin, children }) {
  const { loggedIn, user } = useAuth()

  if (admin && user.role !== 'admin') {
    return <Navigate to="/" />
  }
  return loggedIn ? children : <Navigate to="/signin" />
}

export default ProtectedRoute
