import './Navbar.css'
import { Link } from 'react-router-dom'
import logo from '../../utils/images/logo.png';

export default function Navbar() {
    return(
        <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">
            <img src={logo} alt='SMATA Rosario'/>
          </div>
          <div className="brand-text">
            SMATA ROSARIO
            <span>SINDICATO DE MECÁNICOS</span>
          </div>
        </Link>
 
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/mutual">Mutual</Link></li>
          <li><Link to="/beneficios">Beneficios</Link></li>
          <li><Link to="/prestadores">Prestadores</Link></li>
          <li><a href="#turismo">Turismo</a></li>
          <li><Link to="/camping">Complejos</Link></li>
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