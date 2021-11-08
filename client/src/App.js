import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Signin from './pages/Auth/Signin'
import Signup from './pages/Auth/Signup'

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div id="content">
          <Routes>
            {/* <Route path="/" exact component={} /> */}
            <Route path="/about" component={Signin} />
            <Route path="/about" component={Signup} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
