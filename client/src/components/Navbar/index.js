import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import Button from '@mui/material/Button'
import StorefrontIcon from '@mui/icons-material/Storefront'
import Badge from '@mui/material/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import IconButton from '@mui/material/IconButton'

import { useAuth } from '../../contexts/AuthContext'
import { useCart } from '../../contexts/CartContext'

function Navbar() {
  const { loggedIn, user } = useAuth()
  const { items } = useCart()

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to="/">
            <StorefrontIcon color="secondary" />
            <span style={{ fontWeight: 300 }}> E</span>
            <span style={{ fontWeight: 500 }}>COMMERCE</span>
          </Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to="/">Products</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        {loggedIn && (
          <>
            <Link to="/cart" style={{ marginRight: 10 }}>
              <IconButton>
                <Badge badgeContent={items.length} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
            <IconButton style={{ marginRight: 20 }}>
              <Badge badgeContent={2} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <Link to="/profile" style={{ marginRight: 10 }}>
              <Button variant="outlined" color="secondary" disableElevation>
                Profile
              </Button>
            </Link>
            {user?.role === 'admin' && (
              <Link to="/admin" style={{ marginRight: 10 }}>
                <Button variant="outlined" color="warning" disableElevation>
                  Admin
                </Button>
              </Link>
            )}
          </>
        )}

        {!loggedIn && (
          <>
            <Link to="/signin" style={{ marginRight: 10 }}>
              <Button variant="contained" color="secondary" disableElevation>
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outlined" color="secondary">
                Register
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
