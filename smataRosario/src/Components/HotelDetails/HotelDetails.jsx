import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TODOS_LOS_HOTELES, SERVICIOS_MAP } from '../Hotels/Hotels';
import './HotelDetails.css';

const IconPin   = () => <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>;
const IconPhone = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.28-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>;
const IconWA    = () => <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
const IconMail  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>;
const IconFB    = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>;
const IconIG    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
const IconBack  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="15 18 9 12 15 6"/></svg>;
const IconStar  = () => <svg viewBox="0 0 24 24" fill="#22c55e" width="14" height="14"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;

// Formatea el precio: si es número lo formatea, si es string lo muestra tal cual
const formatPrecio = (val) => {
  if (typeof val === 'number') return `$${val.toLocaleString('es-AR')}`;
  return val; // 'Sin cargo', 'COMPLETAR', etc.
};

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fotoActiva, setFotoActiva] = useState(0);

  const hotel = TODOS_LOS_HOTELES.find(h => String(h.id) === String(id));

  if (!hotel) return (
    <div className="hd-notfound">
      <h2>Hotel no encontrado</h2>
      <button className="hd-btn-back" onClick={() => navigate('/turismo')}>Volver a Hoteles</button>
    </div>
  );

  const todasLasFotos = [hotel.imagen_portada, ...(hotel.imagenes || [])];
  const tieneVariostipos = hotel.habitaciones?.length > 1;

  return (
    <div className="hd-root">

      {/* BACK */}
      <div className="hd-topbar">
        <button className="hd-btn-back" onClick={() => navigate('/turismo')}>
          <IconBack /> Volver a Hoteles
        </button>
      </div>

      {/* HERO */}
      <div className="hd-hero">
        <img src={hotel.imagen_portada} alt={hotel.nombre} className="hd-hero-img" />
        <div className="hd-hero-overlay" />
        <div className="hd-hero-content">
          <span className="hd-hero-sede">SEDE {hotel.destino.toUpperCase()}</span>
          <h1 className="hd-hero-title">{hotel.nombre}</h1>
          <div className="hd-hero-dir"><IconPin /> {hotel.direccion}</div>
        </div>
        <div className="hd-hero-rating"><IconStar /> {hotel.rating}</div>
      </div>

      {/* GALERÍA */}
      {todasLasFotos.length > 1 && (
        <div className="hd-galeria">
          {todasLasFotos.slice(0, 5).map((img, i) => (
            <div
              key={i}
              className={`hd-gal-item ${i === fotoActiva ? 'active' : ''}`}
              onClick={() => setFotoActiva(i)}
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

          {/* Descripción */}
          <section className="hd-section">
            <h2 className="hd-section-title">Sobre el Hotel</h2>
            <p className="hd-descripcion">{hotel.descripcion}</p>
          </section>

          {/* Servicios */}
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

          {/* Tarifas */}
          {hotel.habitaciones?.length > 0 && (
            <section className="hd-section">
              <h2 className="hd-section-title">Tarifas por Habitación</h2>
              <p className="hd-tarifas-sub">Precios por persona / por día</p>

              {tieneVariostipos ? (
                /* ── VARIOS TIPOS: una card por tipo con tabla de tarifas adentro ── */
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
                /* ── UN SOLO TIPO: tabla limpia sin card de tipo ── */
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

          {/* Mapa */}
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

          {/* Contacto */}
          <div className="hd-contact-card">
            <div className="hd-contact-header">
              <h3>Contacto del Hotel</h3>
              <span>Atención Directa</span>
            </div>
            <div className="hd-contact-items">
              {hotel.telefono && hotel.telefono !== 'COMPLETAR' && (
                <div className="hd-contact-item">
                  <span className="hd-contact-icon"><IconPhone /></span>
                  <div>
                    <div className="hd-contact-label">TELÉFONO PRINCIPAL</div>
                    <div className="hd-contact-val">{hotel.telefono}</div>
                  </div>
                </div>
              )}
              {hotel.whatsapp && hotel.whatsapp !== 'COMPLETAR' && (
                <div className="hd-contact-item">
                  <span className="hd-contact-icon green"><IconWA /></span>
                  <div>
                    <div className="hd-contact-label">WHATSAPP CONSULTAS</div>
                    <div className="hd-contact-val">{hotel.whatsapp}</div>
                  </div>
                </div>
              )}
              {hotel.email && hotel.email !== 'COMPLETAR' && (
                <div className="hd-contact-item">
                  <span className="hd-contact-icon"><IconMail /></span>
                  <div>
                    <div className="hd-contact-label">CORREO ELECTRÓNICO</div>
                    <div className="hd-contact-val">{hotel.email}</div>
                  </div>
                </div>
              )}
            </div>

            {(hotel.facebook || hotel.instagram) &&
              hotel.facebook !== 'COMPLETAR' && hotel.instagram !== 'COMPLETAR' && (
              <div className="hd-contact-socials">
                <div className="hd-contact-label">SEGUINOS EN REDES</div>
                <div className="hd-social-row">
                  {hotel.facebook  && hotel.facebook !== 'COMPLETAR'  && <a href={`https://facebook.com/${hotel.facebook}`}  target="_blank" rel="noreferrer" className="hd-social-btn"><IconFB /></a>}
                  {hotel.instagram && hotel.instagram !== 'COMPLETAR' && <a href={`https://instagram.com/${hotel.instagram}`} target="_blank" rel="noreferrer" className="hd-social-btn"><IconIG /></a>}
                </div>
              </div>
            )}

            {hotel.telefono && hotel.telefono !== 'COMPLETAR' && (
              <a href={`tel:${hotel.telefono}`} className="hd-btn-llamar">
                <IconPhone /> Llamar Ahora
              </a>
            )}
          </div>

          {/* Requisito */}
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