import { useState, useEffect, useCallback } from 'react';
import './Mutual.css'
import { FaArrowRight, FaHospital, FaHotel, FaBook, FaCheck } from '../../utils/icons/icons';

const benefits = [
    {
        icon: FaArrowRight,
        title: 'Cobertura Médica Integral',
        desc: 'Accedé a una amplia red de profesionales y centros de salud con cobertura total para vos y tu familia.',
        link: 'Conocé Más',
    },
    {
        icon: FaHotel,
        title: 'Turismo y Ocio',
        desc: 'Disfrutá de descuentos en turismo. Accedé a paquetes exclusivos para afiliados en destinos nacionales.',
        link: 'Ver Beneficios',
    },
    {
        icon: FaHospital,
        title: 'Farmacias y Salud',
        desc: 'Contá con asesoramiento jurídico profesional para resolver cualquier consulta o trámite legal.',
        link: 'Consultar',
    },
    {
        icon: FaBook,
        title: 'Programas de Capacitación',
        desc: 'Accedé a cursos y talleres gratuitos para potenciar tus habilidades y oportunidades laborales.',
        link: 'Ver Cursos',
    },
]

const requisitos = [
  'Último recibo de sueldo (original y copia).',
  'DNI del titular y de todo el grupo familiar.',
  'Certificado de matrimonio o unión convivencial.',
  'Partidas de nacimiento de los hijos menores de 21 años.',
  'Constancia de CUIL de todo el grupo familiar.',
];
 
const contactItems = [
  {
    label: 'Sede Rosario',
    value: 'Gorriti 1101, S2000 Rosario, Santa Fe',
    icon: (
      <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
    ),
    iconStroke: false,
  },
  {
    label: 'Whatsapp',
    value: '(0341) 313-0317',
    icon: (
      <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.28-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'mutualmetalmecanica@smatarosario.com.ar',
    icon: (
      <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M2 7l10 7 10-7"/>
      </svg>
    ),
  },
  {
    label: 'Horario de Atención',
    value: 'Lunes a Jueves de 08:00 a 17:00 hs. Viernes de 08:00 a 16:00 hs.',
    icon: (
      <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
];

const slides = [
  {
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
    title: 'Sede Central Rosario',
    desc: 'Nuestra casa central, equipada con tecnología de punta para la mejor atención administrativa.',
  },
  {
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80',
    title: 'Centro de Salud OSMATA',
    desc: 'Instalaciones modernas con especialistas en todas las áreas médicas para vos y tu familia.',
  },
  {
    img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
    title: 'Turismo Sindical',
    desc: 'Hoteles exclusivos y destinos de primer nivel con tarifas preferenciales para afiliados.',
  },
];

export default function Mutual() {

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
 
  // Teclado
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') anterior();
      if (e.key === 'ArrowRight') siguiente();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [anterior, siguiente]);

    return(
        <div>
            <>
                
                    {/* ── INICIO ── */}
                    <section className="hero" id="inicio">
                        <div className="hero-bg" />
                        <div className="hero-content">
                        <div className="hero-badge">Mutual de Smata Rosario</div>
                        <h1 className="hero-title">
                            Comprometidos con el <span className="accent">bienestar</span>{' '}
                            de la familia mecánica
                        </h1>
                        <p className="hero-sub">
                            Descubrí todos los beneficios y servicios exclusivos diseñados para brindar seguridad
                            y apoyo a nuestros afiliados en cada etapa de su vida.
                        </p>
                        <div className="hero-btns">
                            <button className="btn-primary">Asociarse ahora</button>
                            <button className="btn-outline">Ver Beneficios de Socio</button>
                        </div>
                        </div>
                    </section>

                    {/* ── BENEFICIOS ── */}

                    <section className="benefits" id="beneficios">
                        <div className="section-header">
                            <div>
                                <h2 className="section-title">Nuestros Servicios y Beneficios</h2>
                            </div>
                        </div>
                        <div className="benefits-grid">
                        {benefits.map(({ icon: Icon, title, desc, link }) => (
                            <div className="benefit-card" key={title}>
                                <div className="benefit-icon">
                                    <Icon size={30} />
                                </div>
                                <h3>{title}</h3>
                                <p>{desc}</p>
                                <a href="#" className="benefit-link">{link} →</a>
                            </div>
                    ))}
                </div>
            </section>

            {/* ── CARRUSEL ── */}
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
            <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
 
          <button className="carrusel-btn next" onClick={siguiente} aria-label="Siguiente">
            <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
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

        {/* ── AFILIACIÓN ── */}
        <section className="afiliacion-section">
      <div className="afiliacion-inner">
 
        {/* ── IZQUIERDA ── */}
        <div className="afiliacion-left">
          <h2>Requisitos de Afiliación</h2>
          <p>
            Formar parte de la Mutual de SMATA Rosario es muy sencillo.
            Para iniciar tu trámite de adhesión, debés presentar la siguiente
            documentación en nuestra sede central o delegaciones.
          </p>
 
          <div className="requisitos-card">
            {requisitos.map((item, i) => (
              <div className="requisito-item" key={i}>
                <FaCheck size={20} color="#4CAF50" style={{ marginRight: '0.5rem' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
 
          <button className="btn-download">
            <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M9 9h6M9 12h6M9 15h4"/>
            </svg>
            Descargar Formulario de Adhesión
          </button>
        </div>
 
        {/* ── DERECHA ── */}
        <div className="atencion-card">
          <h3>Atención Administrativa</h3>
 
          <div className="atencion-items">
            {contactItems.map((item, i) => (
              <div className="atencion-item" key={i}>
                <div className="atencion-icon">
                  {item.icon}
                </div>
                <div className="atencion-text">
                  <strong>{item.label}</strong>
                  <span>{item.value}</span>
                </div>
              </div>
            ))}
          </div>
 
          <div className="map-placeholder">
            <iframe
              title="Sede SMATA Rosario"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.0445108561307!2d-60.68279802460992!3d-32.92342222071546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b6535753100e95%3A0x80700f4d976e8183!2sAsociacion%20Mutual%20Rosario%20Metalmecanica%20Y%20Afines!5e0!3m2!1ses-419!2sar!4v1775616877668!5m2!1ses-419!2sar"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
 
      </div>
    </section>
                    </>
        </div>
    )
}