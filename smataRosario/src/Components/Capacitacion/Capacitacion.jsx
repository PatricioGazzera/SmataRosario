import './Capacitacion.css';
import { FaHospital, FaPills, FaSkiing, FaBalanceScale, FaWhatsapp, FaArrowRight } from '../../utils/icons/icons';
import inyeccionImg from "../../utils/images/Cursos/inyeccion.jpg";
import motorImg from "../../utils/images/Cursos/motor.png";
import electricidadImg from "../../utils/images/Cursos/electricidad.png";
import { Link, useNavigate } from 'react-router-dom';

const cursos = [
    {
        image: inyeccionImg,
        title: 'Inyección Electrónica',
        desc: 'Manejo de scanners, osciloscopios y reparación de unidades de control electrónico (ECU).',
        link: 'Conocé Más',
        path: '/prestadores'
    },
    {
        image: motorImg,
        title: 'Mecánica de motores diesel',
        desc: 'Especialización en sistemas de inyección common rail y diagnóstico computarizado avanzado.',
        link: 'Ver Descuentos',
        path: 'farmacia'
    },
    {
        image: electricidadImg,
        title: 'Electricidad del automotor',
        desc: 'Fundamentos de circuitos eléctricos, multiplexado y sistemas de iluminación moderna.',
        link: 'Ver Destinos',
        path: 'turismo'
    },
];

const news = [
    {
        category: 'PARITARIAS',
        date: '24 de octubre, 2023',
        title: 'Nuevo Acuerdo Salarial Alcanzado para el Ciclo 2024',
        desc: 'Avances significativos en paritarias garantizan ajustes salariales alineados con índices de inflación para todos los trabajadores automotrices.',
        img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80',
    },
    {
        category: 'TURISMO',
        date: '20 de octubre, 2023',
        title: 'Temporada de Verano en Mar del Plata: Reservas Abiertas',
        desc: 'Tarifas exclusivas para afiliados en nuestros hoteles sindicales. Reservá el lugar de tu familia para las próximas vacaciones.',
        img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
    },
    {
        category: 'SALUD',
        date: '15 de octubre, 2023',
        title: 'Nuevo Ala de Cardiología Inaugurada en Rosario',
        desc: 'OSMATA continúa expandiendo su infraestructura de salud local con equipamiento cardiovascular de última generación.',
        img: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&q=80',
    },
];

export default function Capacitacion() {
    const navigate = useNavigate();
    return (
        <>

            {/* ── HERO ── */}
            <section className="cap-hero" id="inicio">
                <div className="cap-bg" />
                <div className="cap-hero-content">
                    <div className="cap-hero-badge">Nuevos cursos disponibles</div>
                    <h1 className="cap-hero-title">
                        Tu Futuro empieza {' '}
                        <span className="accent">Acá</span>{' '}
                    </h1>
                    <p className="cap-hero-sub">
                        Cursos y capacitación para los trabajadores de la Industria Mecánica
                        y automotriz. Programas dictados por los mejores profesionales.
                    </p>
                    <div className="cap-hero-btns">
                        <a className="btn-primary" href='#afiliarse'>Ver Cursos</a>
                        <a className="btn-outline" href='#beneficios'>Ver Beneficios de Socio</a>
                    </div>
                </div>
            </section>

            {/* ── SERVICES ── */}
            <section className="cursos" id="cursos">
                <div className="cursos-header">
                    <div>
                        <h2 className="cursos-title">Cursos de Formación Profesional</h2>
                    </div>
                </div>
            <div className='cursos-grid'>
                {cursos.map(({ image, title, desc, link, path }) => (
                    <div className="curso-card" key={title}>
                        <div className="curso-image-wrap">
                            <img src={image} alt={title} />
                        </div>
                        <h3>{title}</h3>
                        <p>{desc}</p>
                        <a
                            href="#"
                            className="curso-link"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(path);
                            }}
                        >
                            {link} →
                        </a>
                    </div>
                ))}
            </div>
            </section>

            {/* ── NEWS ── */}
            <section className="news" id="noticias">
                <div className="news-header">
                    <div className="news-tag">Mantenete Informado</div>
                    <h2 className="news-title">Últimas Noticias y Novedades</h2>
                    <div className="news-underline" />
                </div>

                <div className="news-grid">
                    {news.map((n) => (
                        <div className="news-card" key={n.title}>
                            <div className="news-img">
                                <img src={n.img} alt={n.title} />
                                <span className="news-category">{n.category}</span>
                            </div>
                            <div className="news-body">
                                <div className="news-date">{n.date}</div>
                                <h3>{n.title}</h3>
                                <p>{n.desc}</p>
                                <a href="#" className="news-read">Leer Artículo ↗</a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="news-all">
                    <Link to="/noticias" className="btn-ghost">Ver Archivo de Noticias</Link>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="cta" id='afiliarse'>
                <div className="cta-box">
                    <div className="cta-content">
                        <h2>
                            Formá Parte de<br />
                            Nuestra Comunidad
                        </h2>
                        <p>
                            Sumáte a más de 10.000 trabajadores de Rosario que confían en
                            SMATA para su seguridad laboral y bienestar familiar.
                        </p>
                        <div className="cta-btns">
                            <a
                                href='https://wa.me/5493412555424?text=Hola%20quiero%20información%20para%20afiliarme.'
                                target='_blank'
                                rel='noopener norefferer'
                                className="btn-white"
                            >
                                <FaWhatsapp className='whatsapp-btn' /> Solicitar Afiliación
                            </a>
                            <button className="btn-white-outline">
                                Preguntas Frecuentes
                            </button>
                        </div>
                    </div>
                    <div className="cta-illustration">
                        {/* <img src={asociateImg} alt="Asociate" className='asociate-img' /> */}
                    </div>
                </div>
            </section>
        </>
    );
}