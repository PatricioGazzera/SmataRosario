import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TODOS_LOS_HOTELES, SERVICIOS_MAP } from '../Hotels/Hotels';
import { 
  FaWhatsapp, 
  FaPhone, 
  FaFacebookF, 
  FaInstagram, 
  FaStar, 
  FaEnvelope, 
  FaLocationDot, 
  FaChevronLeft, 
  FaChevronRight, 
  FaX 
} from '../../utils/icons/icons'
import './HotelDetails.css';

const IconBack  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="15 18 9 12 15 6"/></svg>;

const formatPrecio = (val) => {
  if (typeof val === 'number') return `$${val.toLocaleString('es-AR')}`;
  return val;
};

// ── LIGHTBOX ──
function Lightbox({ fotos, indice, onClose, onPrev, onNext }) {
  return (
    <div className="lb-backdrop" onClick={onClose}>
      {/* Botón cerrar */}
      <button className="lb-close" onClick={onClose}><FaX /></button>

      {/* Contador */}
      <div className="lb-counter">{indice + 1} / {fotos.length}</div>

      {/* Flecha anterior */}
      <button
        className="lb-arrow lb-arrow--prev"
        onClick={e => { e.stopPropagation(); onPrev(); }}
      >
        <FaChevronLeft />
      </button>

      {/* Imagen */}
      <div className="lb-img-wrap" onClick={e => e.stopPropagation()}>
        <img src={fotos[indice]} alt={`foto ${indice + 1}`} className="lb-img" />
      </div>

      {/* Flecha siguiente */}
      <button
        className="lb-arrow lb-arrow--next"
        onClick={e => { e.stopPropagation(); onNext(); }}
      >
        <FaChevronRight />
      </button>

      {/* Thumbnails */}
      <div className="lb-thumbs" onClick={e => e.stopPropagation()}>
        {fotos.map((f, i) => (
          <div
            key={i}
            className={`lb-thumb ${i === indice ? 'active' : ''}`}
            onClick={() => onNext(i)}
          >
            <img src={f} alt={`thumb ${i + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fotoActiva, setFotoActiva] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const hotel = TODOS_LOS_HOTELES.find(h => String(h.id) === String(id));

  const todasLasFotos = hotel ? [hotel.imagen_portada, ...(hotel.imagenes || [])] : [];
  const tieneVariostipos = hotel?.habitaciones?.length > 1;

  // Abrir lightbox
  const abrirLightbox = (idx) => {
    setLightboxIdx(idx);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Cerrar lightbox
  const cerrarLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  // Navegar en lightbox
  const lbPrev = useCallback(() => {
    setLightboxIdx(i => (i === 0 ? todasLasFotos.length - 1 : i - 1));
  }, [todasLasFotos.length]);

  const lbNext = useCallback((idx) => {
    if (typeof idx === 'number') {
      setLightboxIdx(idx);
    } else {
      setLightboxIdx(i => (i === todasLasFotos.length - 1 ? 0 : i + 1));
    }
  }, [todasLasFotos.length]);

  // Teclado
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape')     cerrarLightbox();
      if (e.key === 'ArrowLeft')  lbPrev();
      if (e.key === 'ArrowRight') lbNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, cerrarLightbox, lbPrev, lbNext]);

  if (!hotel) return (
    <div className="hd-notfound">
      <h2>Hotel no encontrado</h2>
      <button className="hd-btn-back" onClick={() => navigate('/turismo')}>Volver a Hoteles</button>
    </div>
  );

  return (
    <div className="hd-root">

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <Lightbox
          fotos={todasLasFotos}
          indice={lightboxIdx}
          onClose={cerrarLightbox}
          onPrev={lbPrev}
          onNext={lbNext}
        />
      )}

      {/* BACK */}
      <div className="hd-topbar">
        <button className="hd-btn-back" onClick={() => navigate('/turismo')}>
          <IconBack /> Volver a Hoteles
        </button>
      </div>

      {/* HERO */}
      <div className="hd-hero">
        <img
          src={hotel.imagen_portada}
          alt={hotel.nombre}
          className="hd-hero-img hd-hero-img--clickable"
          onClick={() => abrirLightbox(0)}
        />
        <div className="hd-hero-overlay" />
        <div className="hd-hero-content">
          <span className="hd-hero-sede">SEDE {hotel.destino.toUpperCase()}</span>
          <h1 className="hd-hero-title">{hotel.nombre}</h1>
          <div className="hd-hero-dir"><FaLocationDot /> {hotel.direccion}</div>
        </div>
        <div className="hd-hero-rating"><FaStar /> {hotel.rating}</div>
        {/* Indicador de galería sobre el hero */}
        <button className="hd-hero-gallery-btn" onClick={() => abrirLightbox(0)}>
          🖼 Ver todas las fotos ({todasLasFotos.length})
        </button>
      </div>

      {/* GALERÍA */}
      {todasLasFotos.length > 1 && (
        <div className="hd-galeria">
          {todasLasFotos.slice(0, 5).map((img, i) => (
            <div
              key={i}
              className={`hd-gal-item ${i === fotoActiva ? 'active' : ''}`}
              onClick={() => { setFotoActiva(i); abrirLightbox(i); }}
            >
              <img src={img} alt={`foto ${i + 1}`} />
              {i === 4 && todasLasFotos.length > 5 && (
                <div className="hd-gal-overlay">+{todasLasFotos.length - 5} fotos</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* BODY */}
      <div className="hd-body">

        {/* IZQUIERDA */}
        <div className="hd-left">

          <section className="hd-section">
            <h2 className="hd-section-title">Sobre el Hotel</h2>
            <p className="hd-descripcion">{hotel.descripcion}</p>
          </section>

          {hotel.servicios?.length > 0 && (
            <section className="hd-section">
              <h2 className="hd-section-title">Servicios y Comodidades</h2>
              <div className="hd-servicios-grid">
                {hotel.servicios.map(s => (
                  <div key={s} className="hd-servicio-item">
                    <span className="hd-servicio-icon">{SERVICIOS_MAP[s]?.icon}</span>
                    <span>{SERVICIOS_MAP[s]?.label}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {hotel.habitaciones?.length > 0 && (
            <section className="hd-section">
              <h2 className="hd-section-title">Tarifas por Habitación</h2>
              <p className="hd-tarifas-sub">Precios por persona / por día</p>

              {tieneVariostipos ? (
                <div className="hd-habitaciones-grid">
                  {hotel.habitaciones.map((hab, i) => (
                    <div key={i} className={`hd-hab-card ${hab.destacada ? 'destacada' : ''}`}>
                      {hab.destacada && <span className="hd-hab-badge">MÁS ELEGIDO</span>}
                      <h3 className="hd-hab-tipo">{hab.tipo}</h3>
                      {hab.desc && <p className="hd-hab-desc">{hab.desc}</p>}
                      <table className="hd-tarifas-table">
                        <thead>
                          <tr>
                            <th>Categoría</th>
                            <th>Afiliado</th>
                            <th>Invitado</th>
                            <th>Particular</th>
                          </tr>
                        </thead>
                        <tbody>
                          {hab.tarifas.map((t, j) => (
                            <tr key={j} className={typeof t.precio_afiliado === 'string' && t.precio_afiliado === 'Sin cargo' ? 'hd-tr-sincargo' : ''}>
                              <td>{t.categoria}</td>
                              <td className="hd-td-afiliado">{formatPrecio(t.precio_afiliado)}</td>
                              <td className="hd-td-invitado">{formatPrecio(t.precio_invitado)}</td>
                              <td className='hd-td-invitado'>{formatPrecio(t.precio_particular)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {hab.amenities?.length > 0 && (
                        <ul className="hd-hab-amenities">
                          {hab.amenities.map((a, j) => <li key={j}>✓ {a}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="hd-tarifas-single">
                  <table className="hd-tarifas-table hd-tarifas-table--full">
                    <thead>
                      <tr>
                        <th>Categoría de pasajero</th>
                        <th>Precio Afiliado</th>
                        <th>Precio Invitado</th>
                        <th>Precio Particular</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hotel.habitaciones[0].tarifas.map((t, j) => (
                        <tr key={j} className={t.precio_afiliado === 'Sin cargo' ? 'hd-tr-sincargo' : ''}>
                          <td>{t.categoria}</td>
                          <td className="hd-td-afiliado">{formatPrecio(t.precio_afiliado)}</td>
                          <td className="hd-td-invitado">{formatPrecio(t.precio_invitado)}</td>
                          <td className='hd-td-invitado'>{formatPrecio(t.precio_particular)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {hotel.habitaciones[0].amenities?.length > 0 && (
                    <ul className="hd-hab-amenities hd-hab-amenities--flat">
                      {hotel.habitaciones[0].amenities.map((a, j) => <li key={j}>✓ {a}</li>)}
                    </ul>
                  )}
                </div>
              )}
            </section>
          )}

          <section className="hd-section">
            <h2 className="hd-section-title">Ubicación</h2>
            <div className="hd-mapa">
              <iframe
                src={hotel.mapa_embed && hotel.mapa_embed !== 'COMPLETAR'
                  ? hotel.mapa_embed
                  : `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400!2d-64.4977!3d-31.4219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${encodeURIComponent(hotel.direccion)}!5e0!3m2!1ses!2sar!4v1700000000000`
                }
                title="Ubicación"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>

        </div>

        {/* DERECHA */}
        <div className="hd-right">
          <div className="hd-contact-card">
            <div className="hd-contact-header">
              <h3>Contacto del Hotel</h3>
              <span>Atención Directa</span>
            </div>

            <div className="hd-contact-items">
              {hotel.telefono && hotel.telefono !== 'COMPLETAR' && (
                <div className="hd-contact-item">
                  <span className="hd-contact-icon"><FaPhone /></span>
                  <div>
                    <div className="hd-contact-label">TELÉFONO PRINCIPAL</div>
                    <a href={`tel:${hotel.telefono.replace(/\D/g, '')}`} className="hd-contact-val hd-contact-link">
                      {hotel.telefono}
                    </a>
                  </div>
                </div>
              )}
              {hotel.whatsapp && hotel.whatsapp !== 'COMPLETAR' && (
                <div className="hd-contact-item">
                  <span className="hd-contact-icon green"><FaWhatsapp /></span>
                  <div>
                    <div className="hd-contact-label">WHATSAPP CONSULTAS</div>
                    <a
                      href={`https://wa.me/${hotel.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="hd-contact-val hd-contact-link hd-contact-link--wa"
                    >
                      {hotel.whatsapp}
                    </a>
                  </div>
                </div>
              )}
              {hotel.email && hotel.email !== 'COMPLETAR' && (
                <div className="hd-contact-item">
                  <span className="hd-contact-icon"><FaEnvelope /></span>
                  <div>
                    <div className="hd-contact-label">CORREO ELECTRÓNICO</div>
                    <a href={`mailto:${hotel.email}`} className="hd-contact-val hd-contact-link">
                      {hotel.email}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {(hotel.facebook || hotel.instagram) &&
              hotel.facebook !== 'COMPLETAR' && hotel.instagram !== 'COMPLETAR' && (
              <div className="hd-contact-socials">
                <div className="hd-contact-label">SEGUINOS EN REDES</div>
                <div className="hd-social-row">
                  {hotel.facebook && hotel.facebook !== 'COMPLETAR' && (
                    <a href={`https://facebook.com/${hotel.facebook}`} target="_blank" rel="noreferrer" className="hd-social-btn"><FaFacebookF /></a>
                  )}
                  {hotel.instagram && hotel.instagram !== 'COMPLETAR' && (
                    <a href={`https://instagram.com/${hotel.instagram}`} target="_blank" rel="noreferrer" className="hd-social-btn"><FaInstagram /></a>
                  )}
                </div>
              </div>
            )}

            {hotel.telefono && hotel.telefono !== 'COMPLETAR' && (
              <a href={`tel:${hotel.telefono.replace(/\D/g, '')}`} className="hd-btn-llamar">
                <FaPhone /> Llamar Ahora
              </a>
            )}
          </div>

          <div className="hd-req-card">
            <div className="hd-req-icon">i</div>
            <div>
              <div className="hd-req-title">Requisito para Afiliados</div>
              <div className="hd-req-sub">Carnet y DNI al ingresar</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}