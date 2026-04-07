import './Navbar.css'

export default function Navbar() {
    return(
        <nav className="navbar">
        <a href="#inicio" className="navbar-brand">
          <div className="brand-icon">S</div>
          <div className="brand-text">
            SMATA ROSARIO
            <span>SINDICATO DE MECÁNICOS</span>
          </div>
        </a>
 
        <ul className="nav-links">
          <li><a href="#beneficios">Beneficios</a></li>
          <li><a href="#salud">Salud / OSMATA</a></li>
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