import './Home.css';
import { FaHospital, FaPills, FaSkiing, FaBalanceScale, FaWhatsapp, FaCampground } from '../../utils/icons/icons';
import asociateImg from '../../utils/images/asociate.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';

const services = [
    {
        icon: FaHospital,
        title: 'Centro de Salud',
        desc: 'Accedé a los servicios médicos de OSMATA...',
        link: 'Conocé Más',
        path: '/obra-social'
    },
    {
        icon: FaPills,
        title: 'Farmacia',
        desc: 'Encontrá tu farmacia sindical más cercana...',
        link: 'Ver Descuentos',
        path: 'farmacia'
    },
    {
        icon: FaSkiing,
        title: 'Recreación',
        desc: 'Explorá paquetes turísticos...',
        link: 'Ver Destinos',
        path: 'turismo'
    },
    {
        icon: FaCampground,
        title: 'Complejos',
        desc: 'Descubrí nuestros complejos...',
        link: 'Ver Complejos',
        path: '/camping'
    },
];

const formatFecha = (fechaStr) => {
    if (!fechaStr) return '';
    return new Date(fechaStr).toLocaleDateString('es-AR', {
        day: 'numeric', month: 'long', year: 'numeric',
    });
};

export default function SmataRosario() {
    const navigate = useNavigate();
    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        const fetchNoticias = async () => {
            const { data, error } = await supabase
                .from('noticias')
                .select('id, titulo, excerpt, categoria, imagen_url, fecha')
                .order('fecha', { ascending: false })
                .limit(3);

            if (!error && data) setNoticias(data);
        };
        fetchNoticias();
    }, []);

    return (
        <>
            {/* ── HERO ── */}
            <section className="hero" id="inicio">
                <div className="home-bg" />
                <div className="hero-content">
                    <div className="hero-badge">Nuevos beneficios disponibles</div>
                    <h1 className="hero-title">
                        Fuerza y <span className="accent">Unidad</span>{' '}
                        para el Trabajador
                    </h1>
                    <p className="hero-sub">
                        Redefiniendo el apoyo sindical para el profesional automotriz moderno
                        en Rosario. Accedé a servicios de salud premium, turismo exclusivo y
                        protección legal colectiva.
                    </p>
                    <div className="hero-btns">
                        <a className="btn-primary" href='#afiliarse'>Afiliarse a SMATA</a>
                        <a className="btn-outline" href='#beneficios'>Ver Beneficios de Socio</a>
                    </div>
                </div>
            </section>

            {/* ── SERVICES ── */}
            <section className="services" id="beneficios">
                <div className="section-header">
                    <div>
                        <div className="section-tag">Nuestra Red</div>
                        <h2 className="section-title">Servicios de Acceso Rápido</h2>
                    </div>
                    <p className="section-desc">
                        Todo lo que necesitás como socio, accesible con un clic.
                        Desde turnos médicos hasta planificación de vacaciones.
                    </p>
                </div>

                <div className="services-grid">
                    {services.map(({ icon: Icon, title, desc, link, path }) => (
                        <div className="service-card" key={title}>
                            <div className="service-icon">
                                <Icon size={30} />
                            </div>
                            <h3>{title}</h3>
                            <p>{desc}</p>
                            <a
                                href="#"
                                className="service-link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(path);
                                }}>{link} →</a>
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
                    {noticias.length > 0 ? (
                        noticias.map((n) => (
                            <div
                                className="news-card"
                                key={n.id}
                                onClick={() => navigate(`/noticias/${n.id}`)}
                            >
                                <div className="news-img">
                                    <img
                                        src={n.imagen_url || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80'}
                                        alt={n.titulo}
                                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80'; }}
                                    />
                                    <span className="news-category">{n.categoria}</span>
                                </div>
                                <div className="news-body">
                                    <div className="news-date">{formatFecha(n.fecha)}</div>
                                    <h3>{n.titulo}</h3>
                                    <p>{n.excerpt}</p>
                                    <span className="news-read">Leer Artículo ↗</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        // Skeleton mientras carga
                        Array.from({ length: 3 }).map((_, i) => (
                            <div className="news-card news-card--skeleton" key={i}>
                                <div className="news-skeleton-img" />
                                <div className="news-body">
                                    <div className="news-skeleton-line news-skeleton-line--short" />
                                    <div className="news-skeleton-line" />
                                    <div className="news-skeleton-line" />
                                </div>
                            </div>
                        ))
                    )}
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
                                rel='noopener noreferrer'
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
                        <img src={asociateImg} alt="Asociate" className='asociate-img' />
                    </div>
                </div>
            </section>
        </>
    );
}