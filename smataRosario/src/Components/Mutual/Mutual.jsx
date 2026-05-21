import { useState, useEffect, useCallback } from 'react';
import './Mutual.css'
import {
  FaArrowRight,
  FaHospital,
  FaHotel,
  FaBook,
  FaCheck,
  FaWhatsapp,
  FaLocationDot,
  FaClock,
  FaEnvelope,
  FaFileArrowDown,
  FaChevronLeft,
  FaChevronRight
} from '../../utils/icons/icons';
import mutualJpg from "../../utils/images/mutual3.webp";
import centroImg from "../../utils/images/centro.webp"

const subject = encodeURIComponent("Consulta sobre Afiliación.");
const body = encodeURIComponent(
  `Hola! Quiero información para afiliarme a la mutual.`
);

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
    value: 'Gorriti 1095, S2000 Rosario, Santa Fe',
    icon: <FaLocationDot />,
  },
  {
    label: 'Whatsapp',
    value: '(0341) 313-0317',
    icon: <FaWhatsapp />,
    link: 'https://wa.me/5493413130317?text=Hola%20quiero%20información%20para%20afiliarme%20a%20la%20mutual.'
  },
  {
    label: 'Email',
    value: 'mutualmetalmecanica@smatarosario.com.ar',
    icon: <FaEnvelope />,
    link: /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    ? `mailto:mutualmetalmecanica@smatarosario.com.ar?subject=${subject}`
    : `https://mail.google.com/mail/?view=cm&to=mutualmetalmecanica@smatarosario.com.ar&su=${subject}&body=${body}`
  },
  {
    label: 'Horario de Atención',
    value: 'Lunes a Jueves de 08:00 a 17:00 hs. Viernes de 08:00 a 16:00 hs.',
    icon: <FaClock />,
  },
];

const slides = [
  {
    img: mutualJpg,
    title: 'Sede Central Rosario',
    desc: 'Nuestra casa central, equipada con los mejores productos para nuestros afiliados.',
  },
  {
    img: centroImg,
    title: 'Centro de Salud OSMATA',
    desc: 'Nuestro Centro Médico, donde vas a encontrar a los mejores profesionales.',
  },
  /*{
    img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
    title: 'Turismo Sindical',
    desc: 'Hoteles exclusivos y destinos de primer nivel con tarifas preferenciales para afiliados.',
  },*/
];

const downloadFiles = [
  {
    name: 'Formulario de Afiliación Mutual',
    description: 'Formulario para afiliarse a la Mutual de SMATA',
    file: '/downloads/mutual.pdf',
  }
];

export default function Mutual() {

  const [actual, setActual] = useState(0);
  const [showDownloads, setShowDownloads] = useState(false);

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
    if (showDownloads) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') anterior();
      if (e.key === 'ArrowRight') siguiente();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [anterior, siguiente, showDownloads]);

  // Cerrar modal con Escape
  useEffect(() => {
    if (!showDownloads) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setShowDownloads(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showDownloads]);

  // Descarga forzada via fetch + blob
  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename + '.pdf';
      link.click();
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error al descargar:', error);
    }
  };

  return (
    <div>

      {/* ── Modal de Descargas ── */}
      {showDownloads && (
        <div className="dl-overlay" onClick={() => setShowDownloads(false)}>
          <div className="dl-modal" onClick={e => e.stopPropagation()}>
            <div className="dl-modal-header">
              <h3>Archivos para Descargar</h3>
              <button className="dl-close" onClick={() => setShowDownloads(false)}>✕</button>
            </div>
            <ul className="dl-list">
              {downloadFiles.map((f, i) => (
                <li key={i} className="dl-item">
                  <div className="dl-item-info">
                    <p className="dl-item-name">{f.name}</p>
                    <p className="dl-item-desc">{f.description}</p>
                  </div>
                  <button
                    className="dl-item-btn"
                    onClick={() => handleDownload(f.file, f.name)}
                  >
                    <FaFileArrowDown />
                    Descargar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <>

        {/* ── INICIO ── */}
        <section className="hero" id="inicio">
          <div className="hero-bg" />
          <div className="hero-content">
            <h1 className="hero-title">
              Comprometidos con el <span className="accent">bienestar</span>{' '}
              de la familia mecánica
            </h1>
            <p className="hero-sub">
              Descubrí todos los beneficios y servicios exclusivos diseñados para brindar seguridad
              y apoyo a nuestros afiliados en cada etapa de su vida.
            </p>
            <div className="hero-btns">
              <a className="btn-primary" href='#afiliarse'>Asociarse ahora</a>
              <a className="btn-outline" href='#beneficios'>Ver Beneficios de Afiliado</a>
            </div>
          </div>
        </section>

        {/* ── BENEFICIOS ── */}
        {/* ── BENEFICIOS ── */}
<section className="benefits" id="beneficios">
  <div className="benefits-ctas">
    <div className="benefits-cta">
      <div className="benefits-cta-text">
        <h2 className="benefits-cta-title">Nuestros Servicios y Beneficios</h2>
        <p className="benefits-cta-desc">
          Como afiliado a la Mutual de SMATA Rosario accedés a una amplia red de
          beneficios exclusivos: cobertura médica, turismo sindical, farmacias,
          capacitación y mucho más. Todo diseñado para vos y tu familia.
        </p>
      </div>
      <a href="/beneficios" className="benefits-cta-btn">
        Ver todos los beneficios →
      </a>
    </div>

{/*   <div className="benefits-cta">
      <div className="benefits-cta-text">
        <h2 className="benefits-cta-title">Catálogo Mutual</h2>
        <p className="benefits-cta-desc">
          Accedé a nuestro catálogo de productos exclusivos para afiliados con
          financiación y precios preferenciales. Televisores, electrodomésticos,
          colchones y mucho más.
        </p>
      </div>
      <a href="/catalogo-mutual" className="benefits-cta-btn">
        Ver catálogo →
      </a>
    </div>
    */} 
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

        {/* ── AFILIACIÓN ── */}
        <section className="afiliacion-section" id='afiliarse'>
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

              <button className="btn-download" onClick={() => setShowDownloads(true)}>
                <FaFileArrowDown />
                Descargar Formulario de Adhesión
              </button>
            </div>

            {/* ── DERECHA ── */}
            <div className="atencion-card">
              <h3>Atención Administrativa</h3>

              <div className="atencion-items">
                {contactItems.map((item, i) => {
                  const content = (
                    <>
                      <div className="atencion-icon">
                        {item.icon}
                      </div>
                      <div className="atencion-text">
                        <strong>{item.label}</strong>
                        <span>{item.value}</span>
                      </div>
                    </>
                  );

                  return item.link ? (
                    <a
                      key={i}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="atencion-item"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="atencion-item" key={i}>
                      {content}
                    </div>
                  );
                })}
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
