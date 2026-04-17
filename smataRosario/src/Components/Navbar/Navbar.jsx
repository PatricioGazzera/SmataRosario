import './Navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return(
        <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">S</div>
          <div className="brand-text">
            SMATA ROSARIO
            <span>SINDICATO DE MECÁNICOS</span>
          </div>
        </Link>
 
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/mutual">Mutual</Link></li>
          <li><Link to="/beneficios">Beneficios</Link></li>
          <li><a href="#salud">Prestadores</a></li>
          <li><a href="#turismo">Turismo</a></li>
          <li><a href="#noticias">Noticias</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
 
        {/* <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="nav-search">
            <span>🔍</span> Buscar servicios…
          </div>
          <button className="btn-member">
            → Acceso Socios
          </button>
        </div> */}
      </nav>
    )
};