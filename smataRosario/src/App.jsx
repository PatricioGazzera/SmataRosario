import './App.css'
import Footer from './Components/Footer/Footer.jsx'
import Navbar from './Components/Navbar/Navbar.jsx'
import AppRoutes from './Routes/AppRoutes.jsx'
import ScrollToTop from './Components/ScrollToTop.jsx'
import { BrowserRouter } from 'react-router-dom'


function App() {

  return (
    <>
      <BrowserRouter>
        <ScrollToTop/>
          <Navbar />
              <AppRoutes />
          <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
