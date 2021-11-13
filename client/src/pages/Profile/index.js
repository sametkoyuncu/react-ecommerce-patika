import { useAuth } from '../../contexts/AuthContext'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const { user, logout } = useAuth()

  const navigate = useNavigate()

  const handleLogout = async () => {
    logout(() => {
      navigate('/')
    })
  }
  return (
    <div>
      <h2>Profile Page</h2>
      <code>{JSON.stringify(user)}</code>
      <br />
      <Button
        variant="outlined"
        color="error"
        disableElevation
        onClick={handleLogout}
        style={{ marginTop: 100 }}
      >
        Logout
      </Button>
    </div>
  )
}

export default Profile
