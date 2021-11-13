import { useAuth } from '../../contexts/AuthContext'
import Button from '@mui/material/Button'

function Profile({ history }) {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    logout(() => {
      history.push('/')
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
