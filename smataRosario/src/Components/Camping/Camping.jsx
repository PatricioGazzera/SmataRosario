import './Camping.css'
import {
  FaPersonSwimming,
  FaFutbol,
  FaFire,
  FaCampground,
  FaToilet,
  FaWifi,
  FaSun,
  FaUtensils,
  FaGamepad,
  FaSquareParking,
  FaCalendar,
  FaClock,
  FaShapes
} from 'react-icons/fa6'

// ── Icons propios ──
const PinIcon = () => (
  <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
    <path d="M5.5 0C3.015 0 1 2.015 1 4.5c0 3.375 4.5 8.5 4.5 8.5s4.5-5.125 4.5-8.5C10 2.015 7.985 0 5.5 0Zm0 6.125A1.625 1.625 0 1 1 5.5 2.875a1.625 1.625 0 0 1 0 3.25Z" fill="#22c55e"/>
  </svg>
)

const MapIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M0.5 2L5 0.5l4 1.5 4.5-1.5V12L9 13.5 5 12 0.5 13.5V2Z" stroke="currentColor" strokeWidth="1.1" fill="none"/>
    <path d="M5 0.5V12M9 2V13.5" stroke="currentColor" strokeWidth="1.1"/>
  </svg>
)

// ── Datos ──
const campgrounds = [
  {
    id: 1,
    name: 'Camping Recreativo SMATA Rosario',
    location: 'Punta Lara, Rosario, Santa Fe',
    image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?w=640&q=80',
    amenities: [
        { icon: FaPersonSwimming, label: 'Pileta' },
        { icon: FaFutbol, label: 'Campo de Deporte' },
        { icon: FaFire, label: 'Parrilleros' },
        { icon: FaCampground, label: 'Área para Acampar' },
        { icon: FaToilet, label: 'Vestuarios' },
        { icon: FaSquareParking, label: 'Estacionamiento' },
        { icon: FaUtensils, label: 'Buffet' },
        { icon: FaShapes, label: 'Juegos al Aire Libre' }
    ],
    activities: 'Football tournaments every weekend. Family Days on Sundays, and summer camp for children.',
    hours: 'Tue-Sun: 08:00 - 20:00.',
  },
  {
    id: 2,
    name: "Centro Recreativo 'La Victoria'",
    location: 'Ruta 11, Victoria, Entre Ríos',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&q=80',
    amenities: [
        { icon: FaSun, label: 'Solarium' },
        { icon: FaUtensils, label: 'Canteen' },
        { icon: FaShapes, label: 'Juegos al Aire Libre' },
        { icon: FaSquareParking, label: 'Parking' },
    ],
    activities: "Monthly events and family activities.",
    hours: 'Weekends: 09:00 - 21:00.',
  },
]

// ── Card ──
function CampCard({ camp }) {
  return (
    <article className="camp-card">

      <div className="camp-image-wrap">
        <img src={camp.image} alt={camp.name} />
      </div>

      <div className="camp-body">

        <div className="camp-header">
          <div>
            <h2 className="camp-name">{camp.name}</h2>
            <p className="camp-location">
              <PinIcon />
              {camp.location}
            </p>
          </div>
        </div>

        <div className="camp-main-grid">

          {/* Amenities */}
          <div>
            <p className="amenities-label">Comodidades</p>

            <div className="amenities-grid">
              {camp.amenities.map((a, i) => {
                const Icon = a.icon

                return (
                  <div key={i} className="amenity-item">
                    <span className="amenity-icon">
                      <Icon />
                    </span>
                    {a.label}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Info */}
          <div className="info-boxes">
            <div className="info-box">
              <div className="info-box-header">
                <span className="info-icon">
                  <FaCalendar />
                </span>
                Actividades
              </div>
              <p>{camp.activities}</p>
            </div>

            <div className="info-box">
              <div className="info-box-header">
                <span className="info-icon">
                  <FaClock />
                </span>
                Horarios
              </div>
              <p>{camp.hours}</p>
            </div>
          </div>

        </div>

        <div className="camp-actions">
          <button className="info-btn">Más Detalles</button>

          <button className="ubication-button">
            <MapIcon />
            Cómo llegar
          </button>
        </div>

      </div>
    </article>
  )
}

// ── Componente principal ──
export default function Camping() {
  return (
    <>
      {/* Hero */}
      <section className="camping" id="inicio">
        <div className="camping-bg" />
        <div className="camping-content">
          <h1 className="camping-title">
            <span className="accent">Campings</span>{' '}
            y centros de Recreación
          </h1>
          <p className="camping-sub">
            Espacios exclusivos de recreación para los afiliados de SMATA y sus familias.
            Descubre nuestros complejos.
          </p>
        </div>
      </section>

      {/* Cards + CTA */}
      <main className="main-content">
        {campgrounds.map(camp => (
          <CampCard key={camp.id} camp={camp} />
        ))}
      </main>
    </>
  );
}