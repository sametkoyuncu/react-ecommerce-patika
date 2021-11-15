import './style.css'
import { Box, Button } from '@mui/material'
import { Link, Route, Routes } from 'react-router-dom'

//components
import Home from './Home'
import Products from './Products'
import Orders from './Orders'
import Users from './Users'

function Admin() {
  return (
    <div>
      <nav>
        <ul className="admin-menu">
          <li>
            <Link to="/admin">
              <Button color="primary">Home</Button>
            </Link>
          </li>
          <li>
            <Link to="/admin/products">
              <Button color="primary">Products</Button>
            </Link>
          </li>
          <li>
            <Link to="/admin/orders">
              <Button color="primary">Orders</Button>
            </Link>
          </li>
          <li>
            <Link to="/admin/users">
              <Button color="primary">Users</Button>
            </Link>
          </li>
        </ul>
        <hr style={{ width: '100%', color: '#eefeef' }} />
      </nav>

      <Box m={3}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
        </Routes>
      </Box>
    </div>
  )
}

export default Admin
