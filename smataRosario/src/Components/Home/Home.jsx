import './Home.css';
import {
    FaHospital,
    FaPills,
    FaSkiing,
    FaBalanceScale,
    FaWhatsapp,
    FaCampground,
    FaChevronDown,
    FaX
} from '../../utils/icons/icons';
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
        desc: 'Conocé nuestra Farmacía...',
        link: 'Ver Farmacía',
        path: 'farmacia'
    },
    {
        icon: FaSkiing,
        title: 'Turismo',
        desc: 'Explorá nuestros destinos turísticos...',
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

// ── PREGUNTAS FRECUENTES — cambiá el texto cuando quieras ──
const FAQS = [
    {
        pregunta: '¿La afiliación es automática?',
        respuesta: 'No, para afiliarse deben firmarse las planillas de afiliación y presentar la documentación requerida, sin las planillas firmadas o la documentación incompleta la afiliación no se considera concluida.',
    },
    {
        pregunta: '¿Cuándo debe entregarse la documentación de estudiantes?',
        respuesta: 'La documentación de estudiantes se presenta semestralmente en los meses de Abril  y Octubre del 1 al 20 para poder tener la continuidad en padrón. Se presenta Certificado de Alumno Regular y Certificación Negativa. Siempre se debe consultar un mes antes de que se cumple la mayoría de edad para ver la situacion puntual de cada afiliado.',
    },
    {
        pregunta: '¿Cuánto cuesta la cuota sindical?',
        respuesta: 'La cuota sindical se descuenta automáticamente de su salario según el convenio colectivo vigente. Para conocer el monto exacto podés comunicarte con nuestra sede o por WhatsApp.',
    },
];

const formatFecha = (fechaStr) => {
    if (!fechaStr) return '';
    return new Date(fechaStr).toLocaleDateString('es-AR', {
        day: 'numeric', month: 'long', year: 'numeric',
    });
};

// ── MODAL FAQ ──
function FaqModal({ onClose }) {
    const [abierta, setAbierta] = useState(null);

    const toggle = (i) => setAbierta(prev => prev === i ? null : i);

    // Cerrar con Escape
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    return (
        <div className="faq-backdrop" onClick={onClose}>
            <div className="faq-modal" onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="faq-header">
                    <div>
                        <h2 className="faq-title">Preguntas Frecuentes</h2>
                        <p className="faq-subtitle">Todo lo que necesitás saber sobre SMATA Rosario</p>
                    </div>
                    <button className="faq-close" onClick={onClose}><FaX /></button>
                </div>

                {/* Acordeón */}
                <div className="faq-list">
                    {FAQS.map((faq, i) => (
                        <div
                            key={i}
                            className={`faq-item ${abierta === i ? 'open' : ''}`}
                        >
                            <button
                                className="faq-question"
                                onClick={() => toggle(i)}
                            >
                                <span>{faq.pregunta}</span>
                                <span className="faq-chevron">
                                    <FaChevronDown />
                                </span>
                            </button>
                            <div className="faq-answer-wrap">
                                <p className="faq-answer">{faq.respuesta}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="faq-footer">
                    <p>¿No encontrás lo que buscás?</p>
                    <a
                        href="https://wa.me/5493412555424?text=Hola%20tengo%20una%20consulta."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="faq-wa-btn"
                    >
                        <FaWhatsapp /> Consultanos por WhatsApp
                    </a>
                </div>

            </div>
        </div>
    );
}

export default function SmataRosario() {
    const navigate = useNavigate();
    const [noticias, setNoticias] = useState([]);
    const [showFaq, setShowFaq] = useState(false);

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

    // Bloquear scroll cuando el modal está abierto
    useEffect(() => {
        document.body.style.overflow = showFaq ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [showFaq]);

    return (
        <>
            {/* ── MODAL FAQ ── */}
            {showFaq && <FaqModal onClose={() => setShowFaq(false)} />}

            {/* ── HERO ── */}
            <section className="hero" id="inicio">
                <div className="home-bg" />
                <div className="hero-content">
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
                            {/* ── BOTÓN QUE ABRE EL MODAL ── */}
                            <button
                                className="btn-white-outline"
                                onClick={() => setShowFaq(true)}
                            >
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