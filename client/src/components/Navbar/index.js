import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className="logo">
          <Link to="/">eCommerce</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to="/">Products</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        <Link to="/signin">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Register</button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
