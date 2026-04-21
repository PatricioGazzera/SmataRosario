import './Camping.css'
import campingImg from '../../utils/images/Camping/camping.png'
import arroyoImg from '../../utils/images/Arroyo/arroyo5.webp'
import { useNavigate } from 'react-router-dom'
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
    name: 'Camping Ibarlucea SMATA',
    location: 'Av. de los Incas, Ibarlucea, Santa Fe',
    image: campingImg,
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
    hours: 'Martes-Domingo 10hs. a 22hs.',
    ubication: 'https://maps.app.goo.gl/dMNAtUmSpkDEL29u6',
  },
  {
    id: 2,
    name: "Camping Arroyo Seco 'Hugo Marcelo Barros'",
    location: 'Jorge Newbery 362, S2128 Arroyo Seco, Santa Fe',
    image: arroyoImg,
    amenities: [
        { icon: FaPersonSwimming, label: 'Pileta' },
        { icon: FaFutbol, label: 'Campo de Deporte' },
        { icon: FaFire, label: 'Parrilleros' },
        { icon: FaShapes, label: 'Juegos al Aire Libre' },
        { icon: FaToilet, label: 'Vestuarios' },
        { icon: FaSquareParking, label: 'Estacionamiento' },
        { icon: FaUtensils, label: 'Buffet' },
    ],
    activities: "Monthly events and family activities.",
    hours: 'Martes-Domingo 10hs. a 22hs.',
    ubication: 'https://maps.app.goo.gl/UUHanhKEK66jX3iU7',
  },
]

// ── Card ──
function CampCard({ camp }) {
    const navigate = useNavigate();
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
            <button className="info-btn" onClick={()=> navigate(`/camping/${camp.id}`)}>
            Más Detalles
            </button>

          <a 
            href={camp.ubication}
            className="ubication-button"
            target='_blank'
            rel='noreferrer'
          >
            <MapIcon />
            Cómo llegar
          </a>
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