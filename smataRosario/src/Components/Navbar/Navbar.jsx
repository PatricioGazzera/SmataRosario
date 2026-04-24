import { useState } from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom'
import logo from '../../utils/images/logo.png';
import { FaBars } from "../../utils/icons/icons"

export default function Navbar() {

  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  return (
    <>
      <nav className="navbar">

        {/* LOGO */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <div className="brand-icon">
            <img src={logo} alt='SMATA Rosario'/>
          </div>
          <div className="brand-text">
            SMATA ROSARIO
            <span>SINDICATO DE MECÁNICOS</span>
          </div>
        </Link>

        {/* NAV DESKTOP */}
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/mutual">Mutual</Link></li>
          <li><Link to="/beneficios">Beneficios</Link></li>
          <li><Link to="/obra-social">Obra Social</Link></li>
          <li><a href="#turismo">Turismo</a></li>
          <li><Link to="/camping">Complejos</Link></li>
          <li><Link to="/noticias">Noticias</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>

        {/* BOTÓN HAMBURGUESA */}
        <button className="menu-btn" onClick={toggleMenu}>
          <FaBars />
        </button>
      </nav>

      {/* OVERLAY */}
      {open && <div className="overlay" onClick={closeMenu}></div>}

      {/* SIDEBAR */}
      <div className={`sidebar ${open ? 'open' : ''}`}>
        
        <button className="close-btn" onClick={closeMenu}>
          ✕
        </button>

        <ul>
          <li><Link to="/" onClick={closeMenu}>Inicio</Link></li>
          <li><Link to="/mutual" onClick={closeMenu}>Mutual</Link></li>
          <li><Link to="/beneficios" onClick={closeMenu}>Beneficios</Link></li>
          <li><Link to="/obra-social" onClick={closeMenu}>Obra Social</Link></li>
          <li><a href="#turismo" onClick={closeMenu}>Turismo</a></li>
          <li><Link to="/camping" onClick={closeMenu}>Complejos</Link></li>
          <li><Link to="/noticias" onClick={closeMenu}>Noticias</Link></li>
          <li><Link to="/contacto" onClick={closeMenu}>Contacto</Link></li>
        </ul>

      </div>
    </>
  );
}