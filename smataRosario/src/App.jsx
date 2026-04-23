import './App.css'
import Footer from './Components/Footer/Footer.jsx'
import Navbar from './Components/Navbar/Navbar.jsx'
import AppRoutes from './Routes/AppRoutes.jsx'
import ScrollToTop from './Components/ScrollToTop.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Navbar />
        <AppRoutes />
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
