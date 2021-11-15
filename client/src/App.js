import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Signin from './pages/Auth/Signin'
import Signup from './pages/Auth/Signup'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import ProtectedRoute from './pages/ProtectedRoute'
import Cart from './pages/Cart'
import Error404 from './pages/Error404'

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div id="content">
          <Routes>
            <Route path="/" exact element={<Products />} />
            <Route path="/product/:product_id" element={<ProductDetail />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute admin={true}>
                  <Admin />
                </ProtectedRoute>
              }
            />
            {/* error 404 */}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
