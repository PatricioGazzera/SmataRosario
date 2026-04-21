import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CampingDetail.css';
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
    FaShapes,
    FaImages,
    FaLocationDot,
    FaCheck,
    FaWhatsapp,
    FaEnvelope,
    FaPhone,

} from 'react-icons/fa6'

// Camping Ibarlucea
import campingPool from "../../utils/images/Camping/camping.png";
import campingImg1 from "../../utils/images/Camping/camping.webp";
import campingImg2 from "../../utils/images/Camping/camping1.webp";
import campingImg3 from "../../utils/images/Camping/camping2.webp";
import campingImg4 from "../../utils/images/Camping/camping3.webp";
import campingBg from "../../utils/images/Camping/camping4.jpeg";

// Camping Arroyo Seco

import arroyoBg from "../../utils/images/Arroyo/arroyo5.webp";
import arroyo1 from "../../utils/images/Arroyo/arroyo2.webp";
import arroyoPool1 from "../../utils/images/Arroyo/arroyo3.webp";
import arroyoPool2 from "../../utils/images/Arroyo/arroyo4.webp";
import arroyo2 from "../../utils/images/Arroyo/arroyo5.webp";
import arroyo3 from "../../utils/images/Arroyo/arroyo6.webp";

// ── Data ──
const campingsData = {
  1: {
    id: 1,
    name: 'Camping Ibarlucea SMATA',
    location: 'Ibarlucea, Santa Fe',
    heroImage: campingBg,
    gallery: [
      campingImg1,
      campingImg2,
      campingImg3,
      campingImg4,
      campingPool
    ],
    services: [
        { icon: FaPersonSwimming, label: 'Pileta' },
        { icon: FaFutbol, label: 'Campo de Deporte' },
        { icon: FaFire, label: 'Parrilleros' },
        { icon: FaCampground, label: 'Área para Acampar' },
        { icon: FaToilet, label: 'Vestuarios' },
        { icon: FaSquareParking, label: 'Estacionamiento' },
        { icon: FaUtensils, label: 'Buffet' },
        { icon: FaShapes, label: 'Juegos al Aire Libre' }
    ],
    mapAddress: 'Av. de los Incas, Ibarlucea, Santa Fe',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3351.180621827289!2d-60.76006712439976!3d-32.86694016786713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b651f9c10da5d1%3A0xfa9515e4db69c1ef!2sCamping%20Smata!5e0!3m2!1ses!2sar!4v1776782101796!5m2!1ses!2sar" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
    schedules: [
      'Martes a Domingo: 10:00 - 22:00 hs',
      'Lunes: Cerrado por mantenimiento',
    ],
    rules: [
      'Presentar carnet de afiliado vigente',
      'Revisión médica obligatoria para pileta',
      'Prohibido el ingreso con mascotas',
    ],
    contact: {
      phone:    '+54 341 313-0317',
      whatsapp: '+54 9 341 313-0317',
      email:    'mutualmetalmecanica@smatarosario.com.ar',
    },
    notice: 'Recordá que para el uso de la pileta es necesario realizar la revisión médica en el predio o presentar certificado.',
  },
  2: {
    id: 2,
    name: "Camping SMATA 'Hugo Marcelo Barros'",
    location: 'Arroyo Seco, Santa Fe',
    heroImage: arroyoBg,
    gallery: [
      arroyo1,
      arroyoPool1,
      arroyo2,
      arroyoPool2,
      arroyo3,
    ],
    services: [
        { icon: FaPersonSwimming, label: 'Pileta' },
        { icon: FaFutbol, label: 'Campo de Deporte' },
        { icon: FaFire, label: 'Parrilleros' },
        { icon: FaShapes, label: 'Juegos al Aire Libre' },
        { icon: FaToilet, label: 'Vestuarios' },
        { icon: FaSquareParking, label: 'Estacionamiento' },
        { icon: FaUtensils, label: 'Buffet' },
    ],
    mapAddress: 'Jorge Newbery 362, S2128 Arroyo Seco, Santa Fe',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3178.929209242693!2d-60.5013730243854!3d-33.16602128300223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b70b851ce674c7%3A0x862c43925526482f!2sCamping%20SMATA!5e1!3m2!1ses-419!2sar!4v1776784338412!5m2!1ses-419!2sar" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
    schedules: [
      'Martes a Domingo: 10:00 - 22:00 hs',
      'Lunes: Cerrado por mantenimiento',
    ],
    rules: [
      'Presentar carnet de afiliado vigente',
      'Reserva previa para parrillas',
      'Prohibido el ingreso de vidrios',
    ],
    contact: {
      phone:    '+54 341 313-0317',
      whatsapp: '+54 9 341 313-0317',
      email:    'mutualmetalmecanica@smatarosario.com.ar',
    },
    notice: 'Recordá que para el uso de la pileta es necesario realizar la revisión médica en el predio o presentar certificado.',
  },
};

// ── Main component ──
export default function CampingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const camping = campingsData[id] || campingsData[1];

    // --- MENSAJE CAMPING ---
    const message = encodeURIComponent(
        `Hola! Quiero información sobre el ${camping.name}.`
    );

    // --- MENSAJE ARANCELES ---
    const aranceles = encodeURIComponent(
        `Hola! Quiero consultar los aranceles del ${camping.name}.`
    )

    const subject = encodeURIComponent("Consulta sobre Camping.");
    const body = encodeURIComponent(
        `Hola! Quiero información sobre el ${camping.name}.`
    );

  const [lightboxSrc, setLightboxSrc] = useState(null);

  useEffect(() => {
    if (!lightboxSrc) return;

    const handleKey = (e) => {
      const currentIndex = camping.gallery.indexOf(lightboxSrc);
      if (e.key === 'ArrowRight') {
        const next = (currentIndex + 1) % camping.gallery.length;
        setLightboxSrc(camping.gallery[next]);
      } else if (e.key === 'ArrowLeft') {
        const prev = (currentIndex - 1 + camping.gallery.length) % camping.gallery.length;
        setLightboxSrc(camping.gallery[prev]);
      } else if (e.key === 'Escape') {
        setLightboxSrc(null);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxSrc, camping.gallery]);

  return (
    <div className="cd-page">

      {/* ── Lightbox ── */}
      {lightboxSrc && (
        <div
          className="cd-lightbox-overlay"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            className="cd-lightbox-close"
            onClick={() => setLightboxSrc(null)}
          >
            ✕
          </button>
          <img
            src={lightboxSrc}
            alt="Vista ampliada"
            className="cd-lightbox-img"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}

      <div className="cd-hero">
        <img src={camping.heroImage} alt={camping.name} className="cd-hero-img" />
        <div className="cd-hero-overlay" />
        <div className="cd-hero-content">
          <h1 className="cd-hero-title">{camping.name}</h1>
          <p className="cd-hero-location">
            <FaLocationDot />
            {camping.location}
          </p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="cd-body">

        {/* ── Left column ── */}
        <div className="cd-left">

          {/* Galería */}
          <section className="cd-section">
            <h2 className="cd-section-title">
              <span className="cd-service-icon"><FaImages/></span>
              Galería de Fotos
            </h2>
            <div className="cd-gallery">
              {camping.gallery.map((src, i) => (
                <div
                  key={i}
                  className="cd-gallery-item"
                  onClick={() => setLightboxSrc(src)}
                >
                  <img src={src} alt={`Foto ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </section>

          {/* Servicios */}
          <section className="cd-section">
            <h2 className="cd-section-title-plain">Servicios e Instalaciones</h2>
            <div className="cd-services-grid">
              {camping.services.map((s, i) => {
                const Icon = s.icon
                return (
                  <div key={i} className="cd-service-item">
                    <span className="cd-service-icon">
                      <Icon />
                    </span>
                    {s.label}
                  </div>
                )
              })}
            </div>
          </section>

          {/* Mapa */}
          <section className="cd-section">
            <div className="cd-map-header">
              <h2 className="cd-section-title-plain">Ubicación y Cómo Llegar</h2>
              <p>{camping.mapAddress}</p>
            </div>
            <div className="map-placeholder">
              <iframe
                title={camping.name}
                src={camping.mapEmbedUrl}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>

          {/* Reglamento */}
          <section className="cd-section cd-rules-section">
            <h2 className="cd-rules-title">
              <span className="cd-rules-icon"><FaClock/></span>
              Reglamento y Horarios
            </h2>
            <div className="cd-rules-grid">
              <div>
                <p className="cd-rules-subtitle">Horarios</p>
                <ul className="cd-rules-list">
                  {camping.schedules.map((s, i) => (
                    <li key={i}>
                      <span className="cd-list-dot cd-list-dot--green" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="cd-rules-subtitle">Reglas Generales</p>
                <ul className="cd-rules-list">
                  {camping.rules.map((r, i) => (
                    <li key={i}>
                      <span className="cd-list-check"><FaCheck /></span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

        </div>

        {/* ── Right column (sidebar) ── */}
        <aside className="cd-sidebar">
          <div className="cd-sidebar-card">
            <p className="cd-sidebar-heading">Administración</p>

            <a href={`tel:${camping.contact.phone}`} className="cd-contact-row">
              <span className="cd-contact-icon cd-contact-icon--phone"><FaPhone /></span>
              <div>
                <p className="cd-contact-label">Teléfono</p>
                <p className="cd-contact-value">{camping.contact.phone}</p>
              </div>
            </a>

            <a href={`https://wa.me/${camping.contact.whatsapp.replace(/\D/g,'')}?text=${message}`}
            className="cd-contact-row"
            target="_blank"
            rel="noreferrer">
              <span className="cd-contact-icon cd-contact-icon--whatsapp"><FaWhatsapp /></span>
              <div>
                <p className="cd-contact-label">WhatsApp</p>
                <p className="cd-contact-value">{camping.contact.whatsapp}</p>
              </div>
            </a>

            <a
                href={`https://mail.google.com/mail/?view=cm&to=${camping.contact.email}&su=${subject}&body=${body}`}
                target="_blank"
                rel="noreferrer"
                className="cd-contact-row"
            >
              <span className="cd-contact-icon cd-contact-icon--mail"><FaEnvelope /></span>
              <div>
                <p className="cd-contact-label">Email</p>
                <p className="cd-contact-value">Mutual Metalmecánica</p>
              </div>
            </a>

            <a
            href={`https://wa.me/${camping.contact.whatsapp.replace(/\D/g,'')}?text=${aranceles}`}
                className="cd-btn-aranceles"
                target="_blank"
                rel="noreferrer"
            >
                Consultar Aranceles
            </a>
            <p className="cd-aranceles-note">Precios diferenciados para afiliados y particulares.</p>
          </div>

          {/* Notice */}
          <div className="cd-notice">
            <span className="cd-notice-icon"></span>
            <p>{camping.notice}</p>
          </div>
        </aside>

      </div>
    </div>
  );
}