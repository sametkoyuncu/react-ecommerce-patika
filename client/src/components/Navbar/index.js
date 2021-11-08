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
        <ul className={styles.mwnu}>
          <li>
            <Link to="/">Products</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        <Link to="/signin">
          <Button colorScheme="pink" variant="solid">
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button colorScheme="pink" variant="outline">
            Register
          </Button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
