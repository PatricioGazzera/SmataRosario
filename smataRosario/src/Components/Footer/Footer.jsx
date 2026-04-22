import './Footer.css'
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaLocationDot, FaPhone } from '../../utils/icons/icons';
import { Link } from "react-router-dom";
import logo from '../../utils/images/logo.png';

export default function Footer() {
    return(
        <footer className="footer">
            <div className="footer-grid">
            <div className="footer-brand">
                <a href="#inicio" className="navbar-brand" style={{ marginBottom: '0.5rem', display: 'inline-flex' }}>
                <div className="brand-icon">
                    <img src={logo} alt='SMATA Rosario'/>
                </div>
                <div className="brand-text">
                    SMATA ROSARIO
                    <span>SINDICATO DE MECÁNICOS</span>
                </div>
                </a>
                <p>
                Dedicados a la defensa de los derechos de los trabajadores automotrices y
                la mejora continua de los beneficios sociales y de salud desde 1945.
                </p>
                <div className="footer-contact">
                <a
                    href="https://maps.app.goo.gl/hYoDCuSGh9d3n3vi7"
                    target='_blank'
                    rel='noreferrer'
                >
                    <FaLocationDot /> Gorriti 1046, Rosario, SF
                </a>
                <a href="#"><FaPhone /> +54 341-456-7890</a>
                </div>
            </div>
    
            {/* Nav */}
            <div className="footer-col">
                <h4>Navegación</h4>
                <ul>
                <li><a href="#">Sobre SMATA</a></li>
                <li><Link to="/autoridades">Autoridades</Link></li>
                <li><Link to="/contacto">Contacto</Link></li>
                <li><Link to="/noticias">Noticias</Link></li>
                </ul>
            </div>
    
            {/* Services */}
            <div className="footer-col">
                <h4>Servicios</h4>
                <ul>
                <li><Link to="/prestadores">OSMATA Salud</Link></li>
                <li><Link to="/beneficios">Beneficios Sociales</Link></li>
                <li><a href="#">Turismo Sindical</a></li>
                <li><a href="#">Asesoría Legal</a></li>
                </ul>
            </div>
    
            {/* Empresas */}
            <div className="footer-col">
                <h4>Empresas</h4>
                <ul>
                    <li>
                        <a
                            href="https://www.smata.com.ar/secretarias/Finanzas/Site_Finanzas/login.asp"
                            target='_blank'
                            rel="noreferrer"
                        >
                            Emisión de Boletas
                        </a>
                    </li>
                    <li>
                        <a 
                            href='https://www.smata.com.ar/convenios-y-escalas/'
                            target='_blank'
                            rel="noreferrer"
                        >
                            Escalas Salariales
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://wa.me/5493416655032?text=Hola%20quiero%20hacer%20una%20consulta"
                            target='_blank'
                            rel="noreferrer"
                        >
                            Contacto Aportes
                        </a>
                    </li>
                </ul>
            </div>
            </div>
    
            <div className="footer-bottom">
            <p>© 2026 SMATA Seccional Rosario. Todos los derechos reservados.</p>
            <div className="social-links">
                <a href='https://www.facebook.com/SMATASeccRosario/'
                target='_blank'
                rel='noopener norefferer'>
                    <FaFacebookF />
                </a>
                <a href='https://wa.me/5493416655027?text=Hola%20quiero%20hacer%20una%20consulta'
                target='_blank'
                rel='noopener norefferer'>
                    <FaWhatsapp />
                </a>
                <a href='https://www.facebook.com/SMATASeccRosario/'
                target='_blank'
                rel='noopener norefferer'>
                    <FaInstagram />
                </a>
            </div>
            </div>
        </footer>
    )
}