import { useAuth } from '../../contexts/AuthContext'
function Profile() {
  const { user } = useAuth()
  return (
    <div>
      <h2>Profile Page</h2>
      <code>{JSON.stringify(user)}</code>
    </div>
  )
}

export default Profile
