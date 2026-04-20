import './Footer.css'
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp } from '../../utils/icons/icons';
import { Link } from "react-router-dom";

export default function Footer() {
    return(
        <footer className="footer">
            <div className="footer-grid">
            <div className="footer-brand">
                <a href="#inicio" className="navbar-brand" style={{ marginBottom: '0.5rem', display: 'inline-flex' }}>
                <div className="brand-icon">S</div>
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
                <a href="#">📍 Gorriti 1046, Rosario, SF</a>
                <a href="#">📞 +54 341-456-7890</a>
                </div>
            </div>
    
            {/* Nav */}
            <div className="footer-col">
                <h4>Navegación</h4>
                <ul>
                <li><a href="#">Sobre SMATA</a></li>
                <li><Link to="/autoridades">Autoridades</Link></li>
                <li><a href="#">Transparencia</a></li>
                <li><a href="#">Trabajá con Nosotros</a></li>
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
    
            {/* Newsletter
            <div className="footer-col">
                <h4>Newsletter</h4>
                <div className="newsletter-form">
                <p>Suscribite para recibir actualizaciones y nuevos beneficios.</p>
                <input
                    type="email"
                    className="newsletter-input"
                    placeholder="Tu correo electrónico"
                />
                <button className="btn-subscribe">Suscribirse</button>
                </div>
            </div> */}
            </div>
    
            <div className="footer-bottom">
            <p>© 2026 SMATA Seccional Rosario. Todos los derechos reservados.</p>
            <div className="social-links">
                <a href="#"><FaFacebookF /></a>
                <a href='https://wa.me/5493416186835?text=Hola%20quiero%20hacer%20una%20consulta'
                target='_blank'
                rel='noopener norefferer'>
                    <FaWhatsapp />
                </a>
                <a href="#"><FaInstagram /></a>
            </div>
            </div>
        </footer>
    )
}