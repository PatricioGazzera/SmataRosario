import './Footer.css'
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaLocationDot, FaPhone, FaEnvelope } from '../../utils/icons/icons';
import { Link } from "react-router-dom";
import logo from '../../utils/images/logo.png';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabase';

export default function Footer() {
    const { session } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <footer className="footer">
            <div className="footer-grid">
                <div className="footer-brand">
                    <a href="#inicio" className="navbar-brand" style={{ marginBottom: '0.5rem', display: 'inline-flex' }}>
                        <div className="brand-icon">
                            <img src={logo} alt='SMATA Rosario' />
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
                        <a href="tel:+543416186835"><FaPhone /> +54 341 618 6835</a>
                        <a
                            href={
                                /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
                                    ? `mailto:entrada2@smatarosario.com.ar`
                                    : `https://mail.google.com/mail/?view=cm&fs=1&to=entrada2@smatarosario.com.ar`
                            }
                            target='_blank'
                            rel='noreferrer'
                        >
                            <FaEnvelope /> entrada2@smatarosario.com.ar
                        </a>
                    </div>
                </div>

                {/* Nav */}
                <div className="footer-col">
                    <h4>Navegación</h4>
                    <ul>
                        <li><Link to="/sobre-smata">Sobre SMATA</Link></li>
                        <li><Link to="/autoridades">Autoridades</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
                        <li><Link to="/noticias">Noticias</Link></li>
                    </ul>
                </div>

                {/* Services */}
                <div className="footer-col">
                    <h4>Servicios</h4>
                    <ul>
                        <li><Link to="/obra-social">OSMATA Salud</Link></li>
                        <li><Link to="/beneficios">Beneficios Sociales</Link></li>
                        <li><Link to="/turismo">Turismo</Link></li>
                        <li><Link to="/camping">Complejos</Link></li>
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
                    <a href='https://wa.me/5493416186835?text=Hola%20quiero%20hacer%20una%20consulta'
                        target='_blank'
                        rel='noopener norefferer'>
                        <FaWhatsapp />
                    </a>
                    <a href='https://www.instagram.com/smataros/'
                        target='_blank'
                        rel='noopener norefferer'>
                        <FaInstagram />
                    </a>
                    {session ? (
                        <button className="footer-admin-btn footer-admin-btn--logout" onClick={handleLogout}>
                            Cerrar sesión admin
                        </button>
                    ) : (
                        <button className="footer-admin-btn" onClick={() => navigate('/admin/login')}>
                            Acceso administrador
                        </button>
                    )}
                </div>
            </div>
        </footer>
    )
}