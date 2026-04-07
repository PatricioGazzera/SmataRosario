import './App.css'
import Footer from './Components/Footer/Footer.jsx'
import Navbar from './Components/Navbar/Navbar.jsx'
import AppRoutes from './Routes/AppRoutes.jsx'
import { BrowserRouter as Router } from 'react-router-dom'


function App() {

  return (
    <>
      <Navbar />
        <Router>
          <AppRoutes />
        </Router>
      <Footer />
    </>
  )
}

export default App
