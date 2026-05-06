import { useState, useEffect } from 'react';
import './Farmacia.css';
import {
    FaPills,
    FaPhone,
    FaEnvelope,
    FaCheck,
    FaArrowRight,
    FaShield,
    FaLocationDot,
    FaChevronLeft,
    FaChevronRight,
    FaWhatsapp
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

export default function Farmacia() {
    const [actual, setActual] = useState(0);

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
        const onKey = (e) => {
            if (e.key === 'ArrowLeft') anterior();
            if (e.key === 'ArrowRight') siguiente();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [anterior, siguiente]);
    return (
        <div className="fm-root">

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

                    {/* ── CARD FARMACIAS PROPIAS ── 
          <div className="fm-card fm-card--main">
            <div className="fm-card-header">
              <div className="fm-card-icon-wrap">
                <FaPills />
              </div>
              <h2>Farmacias Propias y Externas</h2>
            </div>
            <p className="fm-card-desc">
              Contamos con una amplia red de atención para garantizar que siempre tengas
              tus medicamentos al alcance. Nuestro sistema de beneficios se divide en
              niveles estratégicos de cobertura.
            </p>
            <div className="fm-coberturas">
              <div className="fm-cobertura">
                <span className="fm-cobertura-pct">40%</span>
                <span className="fm-cobertura-label">Medicamentos<br/>General</span>
              </div>
              <div className="fm-cobertura">
                <span className="fm-cobertura-pct">70%</span>
                <span className="fm-cobertura-label">Patologías<br/>Crónicas</span>
              </div>
              <div className="fm-cobertura fm-cobertura--accent">
                <span className="fm-cobertura-pct">100%</span>
                <span className="fm-cobertura-label">Planes<br/>Especiales</span>
              </div>
            </div>
            {/*<a href="#farmacias" className="fm-btn-primary">
              <FaPills /> Ver Farmacias Adheridas
            </a>
          </div>
*/}
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
                                <FaWhatsapp /> 341 375-0103
                            </a>
                        </div>
                        <a
                            href='https://maps.app.goo.gl/hYoDCuSGh9d3n3vi7'

                            className="fm-ubication">
                            <FaLocationDot /> Gorriti 1101
                        </a>
                    </div>

                </div>
            </section>

            {/* ── COSEGUROS ── 
      <section className="fm-coseguros">
        <div className="fm-coseguros-grid">

          /* Coseguro Óptico 
          <div className="fm-coseguro-card">
            <div className="fm-coseguro-img">
              <img
                src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&q=80"
                alt="Coseguro Óptico"
              />
            </div>
            <div className="fm-coseguro-body">
              <h3>Coseguro Óptico</h3>
              <p>
                Cobertura en cristales graduados, marcos seleccionados y lentes de contacto.
                Renovación anual garantizada para el grupo familiar.
              </p>
              <a href="#optico" className="fm-coseguro-link">
                Ver cartilla de ópticas <FaArrowRight />
              </a>
            </div>
          </div>

            /* Coseguro Odontológico 
          <div className="fm-coseguro-card">
            <div className="fm-coseguro-img">
              <img
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&q=80"
                alt="Coseguro Odontológico"
              />
            </div>
            <div className="fm-coseguro-body">
              <h3>Coseguro Odontológico</h3>
              <p>
                Planes de prevención, arreglos generales y prótesis con copagos mínimos.
                Acceso directo a centros odontológicos propios SMATA.
              </p>
              <a href="#odontologico" className="fm-coseguro-link">
                Centros de atención <FaArrowRight />
              </a>
            </div>
          </div>

        </div>
      </section>
            */}

            {/* ── CÓMO VALIDAR RECETA ── */}
            <section className="fm-pasos">
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