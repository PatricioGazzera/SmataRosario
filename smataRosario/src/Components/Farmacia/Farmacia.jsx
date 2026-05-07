import { useState, useEffect, useCallback } from 'react';
import './Farmacia.css';
import {
    FaPills,
    FaPhone,
    FaCheck,
    FaShield,
    FaLocationDot,
    FaChevronLeft,
    FaChevronRight,
    FaWhatsapp,
    FaArrowUpRightFromSquare,
} from '../../utils/icons/icons';
import farmaciaImg from '../../utils/images/farmacia.jpg';
import farmacia1 from '../../utils/images/Farmacia/farmacia1.jpeg';
import farmacia2 from '../../utils/images/Farmacia/farmacia2.jpg';

// ── PASOS PARA VALIDAR RECETA ──
const PASOS = [
    {
        num: '1',
        icon: <FaPills />,
        titulo: 'Prescripción Médica',
        desc: 'Asegurate de que la receta tenga fecha, firma, sello del profesional y código QR. Podés pedir tu recetario en Mesa de Entrada en el Sindicato!',
    },
    {
        num: '2',
        icon: <FaShield />,
        titulo: 'Validación Presencial',
        desc: 'La farmacia validará la receta y te informará el monto a pagar por la misma.',
    },
    {
        num: '3',
        icon: <FaCheck />,
        titulo: 'Retiro Inmediato',
        desc: 'Abonás solo la diferencia según tu cobertura y retirás tus medicamentos en el momento.',
    },
];

const slides = [
    {
        img: farmacia1,
        title: 'Farmacia SMATA Rosario',
        desc: 'Nuestra Farmacía, con todo lo que necesitas.',
    },
    {
        img: farmacia2,
        title: 'Medicamentos y más',
        desc: 'Equipada con todos los medicamentos que necesites y mucho más.',
    },
];

// ── LISTADO DE FARMACIAS — reemplazá URLs y textos ──
const farmacias = [
    {
        label: 'Listado Rosario',
        desc: 'Consulta el listado de las farmacias en Rosario',
        link: 'https://docs.google.com/spreadsheets/d/1jjdMMnUIKQZ8Cr44uaL5ymt0nmKR6j6ANG2-FOUhEuA/edit?usp=sharing',
    },
    {
        label: 'Listado Interior',
        desc: 'Consulta el listado de las farmacias en el interior y alrededores de Rosario',
        link: 'https://docs.google.com/spreadsheets/d/18byq-_fSkirEFLmX9xgYX-gqHlZrNMuYpM_Ib7bG6x4/edit?usp=sharing',
    },
];

export default function Farmacia() {
    const [actual, setActual] = useState(0);
    const [showFarmacias, setShowFarmacias] = useState(false);

    const anterior = useCallback(() => {
        setActual((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }, []);

    const siguiente = useCallback(() => {
        setActual((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, []);

    // Autoplay
    useEffect(() => {
        const timer = setInterval(siguiente, 4000);
        return () => clearInterval(timer);
    }, [siguiente]);

    // Teclado carrusel — solo cuando el modal está cerrado
    useEffect(() => {
        if (showFarmacias) return;
        const onKey = (e) => {
            if (e.key === 'ArrowLeft') anterior();
            if (e.key === 'ArrowRight') siguiente();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [anterior, siguiente, showFarmacias]);

    // Cerrar modal con Escape
    useEffect(() => {
        if (!showFarmacias) return;
        const onKey = (e) => {
            if (e.key === 'Escape') setShowFarmacias(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [showFarmacias]);

    return (
        <div className="fm-root">

            {/* ── MODAL LISTADO DE FARMACIAS ── */}
            {showFarmacias && (
                <div className="fm-overlay" onClick={() => setShowFarmacias(false)}>
                    <div className="fm-modal" onClick={e => e.stopPropagation()}>
                        <div className="fm-modal-header">
                            <h3>Listado de Farmacias</h3>
                            <button className="fm-close" onClick={() => setShowFarmacias(false)}>✕</button>
                        </div>
                        <p className="fm-modal-sub">Elegí el listado de farmacias que querés consultar.</p>
                        <ul className="fm-list">
                            {farmacias.map((item, i) => (
                                <li key={i} className="fm-item">
                                    <div className="fm-item-info">
                                        <p className="fm-item-name">{item.label}</p>
                                        <p className="fm-item-desc">{item.desc}</p>
                                    </div>
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="fm-item-btn"
                                    >
                                        <FaArrowUpRightFromSquare />
                                        Ver listado
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* ── HERO ── */}
            <section className="fm-hero">
                <div className="fm-hero-bg" style={{ backgroundImage: `url(${farmaciaImg})` }} />
                <div className="fm-hero-overlay" />
                <div className="fm-hero-content">
                    <span className="fm-hero-tag">Salud y Bienestar</span>
                    <h1 className="fm-hero-title">
                        Farmacias y{' '}
                        <span className="fm-accent">Coseguro</span>
                    </h1>
                    <p className="fm-hero-sub">
                        Protección integral para el trabajador mecánico. Accedé a una cobertura
                        ampliada en medicamentos y servicios especializados de salud con
                        beneficios exclusivos en toda la red Rosario.
                    </p>
                    <div className="fm-hero-btns">
                        <a href="#receta" className="fm-hero-btn-primary">Pasos para Validar Receta</a>
                        <button
                            className="fm-hero-btn-outline"
                            onClick={() => setShowFarmacias(true)}
                        >
                            Ver Listado de Farmacias
                        </button>
                    </div>
                </div>
            </section>

            {/* ── MAIN ── */}
            <section className="fm-main">
                <div className="fm-main-inner">

                    <div className="carrusel-wrapper">
                        <div className="carrusel" role="region" aria-label="Carrusel de imágenes">

                            <div
                                className="carrusel-track"
                                style={{ transform: `translateX(-${actual * 100}%)` }}
                            >
                                {slides.map((slide, i) => (
                                    <div className="carrusel-slide" key={i} aria-hidden={i !== actual}>
                                        <img src={slide.img} alt={slide.title} draggable={false} />
                                        <div className="carrusel-overlay" />
                                        <div className="carrusel-caption">
                                            <h3>{slide.title}</h3>
                                            <p>{slide.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="carrusel-btn prev" onClick={anterior} aria-label="Anterior">
                                <FaChevronLeft className='icon' />
                            </button>

                            <button className="carrusel-btn next" onClick={siguiente} aria-label="Siguiente">
                                <FaChevronRight className='icon' />
                            </button>

                            <div className="carrusel-dots">
                                {slides.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`carrusel-dot ${i === actual ? 'active' : ''}`}
                                        onClick={() => setActual(i)}
                                        aria-label={`Ir a slide ${i + 1}`}
                                    />
                                ))}
                            </div>

                        </div>
                    </div>

                    {/* ── CARD EMERGENCIA ── */}
                    <div className="fm-card fm-card--dark">
                        <div className="fm-emergency-icon">
                            <FaShield />
                        </div>
                        <h3 className="fm-emergency-title">Contacto Farmacía</h3>
                        <p className="fm-emergency-desc">
                            Línea de Contacto para consultas con nuestra Farmacía.
                        </p>
                        <div className="fm-emergency-contacts">
                            <a href="tel:+543413750103"
                                target='_blank'
                                rel='noreferrer'
                                className="fm-emergency-contact">
                                <FaPhone /> 341 375-0103
                            </a>
                            <a href='https://wa.me/5493413750103?text=Hola%20quiero%20hacer%20una%20consulta'
                                target='_blank'
                                rel='noreferrer'
                                className='fm-emergency-contact'
                            >
                                <FaWhatsapp /> Whatsapp
                            </a>
                        </div>
                        <a
                            href='https://maps.app.goo.gl/hYoDCuSGh9d3n3vi7'
                            target='_blank'
                            rel='noreferrer'
                            className="fm-ubication">
                            <FaLocationDot /> Gorriti 1101
                        </a>
                    </div>

                </div>
            </section>

            {/* ── CÓMO VALIDAR RECETA ── */}
            <section className="fm-pasos" id='receta'>
                <div className="fm-pasos-header">
                    <h2 className="fm-pasos-title">Cómo Validar tu Receta</h2>
                    <p className="fm-pasos-sub">
                        Seguí estos simples pasos para obtener tu beneficio de forma inmediata en
                        cualquier farmacia de la red.
                    </p>
                </div>

                <div className="fm-pasos-grid">
                    {PASOS.map((paso, i) => (
                        <div className="fm-paso" key={i}>
                            <div className="fm-paso-num">{paso.num}</div>
                            <div className="fm-paso-icon-wrap">
                                {paso.icon}
                            </div>
                            <h3 className="fm-paso-titulo">{paso.titulo}</h3>
                            <p className="fm-paso-desc">{paso.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}