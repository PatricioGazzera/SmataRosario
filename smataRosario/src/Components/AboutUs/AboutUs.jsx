import './AboutUs.css';
import { FaFlag, FaEye, FaUsers, FaLocationDot, FaShield, FaArrowRight } from '../../utils/icons/icons';
import { useState, useEffect, useCallback } from 'react';

// ── Imágenes del carrusel — reemplazá con las tuyas ──
import apretonImg from "../../utils/images/apreton.png";
import heroImg from '../../utils/images/AboutUs.png'; 
import sindicatoImg from "../../utils/images/sindicato.png";



const PILARES = [
  {
    icon: FaFlag,
    titulo: 'Misión',
    desc: 'Garantizar la dignidad del trabajador mecánico a través de la defensa colectiva, la capacitación continua y la protección integral de sus derechos y salud.',
    dark: false,
  },
  {
    icon: FaEye,
    titulo: 'Visión',
    desc: 'Ser el referente de innovación gremial en la región, liderando la transformación industrial con un enfoque centrado en la sostenibilidad humana.',
    dark: false,
  },
  {
    icon: FaUsers,
    titulo: 'Valores',
    lista: ['Lealtad Gremial', 'Transparencia', 'Justicia Social', 'Solidaridad Orgánica'],
    dark: true,
  },
];

const PRESENCIA = [
  {
    icon: FaLocationDot,
    titulo: 'Territorialidad Efectiva',
    desc: 'Estamos presentes en cada taller y planta de nuestra jurisdicción, asegurando que ningún afiliado esté solo.',
  },
  {
    icon: FaShield,
    titulo: 'Protección Diaria',
    desc: 'Nuestro compromiso va más allá de lo laboral: gestionamos salud, recreación y apoyo familiar las 24 horas.',
  },
];

export default function AboutUs() {
  return (
    <div className="au-root">

      {/* ── HERO ── */}
      <section className="au-hero">
        <div className="au-hero-bg" style={{ backgroundImage: `url(${heroImg})` }} />
        <div className="au-hero-overlay" />
        <div className="au-hero-content">
          <h1 className="au-hero-title">
            Nuestra<br />
            Historia,<br />
            <span className="au-accent">Tu Futuro</span>
          </h1>
          <p className="au-hero-sub">
            Representamos la fuerza motriz del país. Con décadas de lucha y compromiso,
            construimos el bienestar de la familia mecánica en Rosario y la región.
          </p>
        </div>
      </section>

      {/* ── HISTORIA ── */}
      <section className="au-historia">
        <div className="au-historia-inner">

          {/* Texto */}
          <div className="au-historia-text">
            <h2 className="au-historia-titulo">
              La Raíz de un{' '}
              <em className="au-historia-em">Compromiso Inquebrantable</em>
            </h2>
            <p>
              El Sindicato de Mecánicos y Afines del Transporte Automotor (SMATA) nació de
              la necesidad imperiosa de organizar a los trabajadores de una industria que
              definía el progreso de la nación. Desde nuestros orígenes, hemos sido el
              pilar fundamental de la defensa de los derechos laborales en el sector
              automotriz.
            </p>
            <p>
              En la seccional Rosario, nuestra historia está tejida con el esfuerzo de
              miles de compañeros que, en las líneas de montaje y los talleres, forjaron
              una identidad basada en la solidaridad y la excelencia técnica. No solo
              negociamos convenios, protegemos el futuro de cada familia mecánica.
            </p>
            <p className="au-historia-destacado">
              Hoy, somos vanguardia en la adaptación a las nuevas tecnologías, asegurando
              que la transición hacia la movilidad del futuro sea con justicia social.
            </p>
          </div>

          {/* Carrusel */}
          <div className="au-carrusel">
            <div className="au-carrusel-track">
                <div className="au-carrusel-slide">
                  <img src={apretonImg} />
                </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── PILARES ── */}
      <section className="au-pilares">
        <div className="au-pilares-header">
          <h2 className="au-pilares-title">
            Pilares de Nuestra <span className="au-accent">Identidad</span>
          </h2>
          <p className="au-pilares-sub">Valores que guían cada acción gremial y social.</p>
        </div>
        <div className="au-pilares-grid">
          {PILARES.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className={`au-pilar-card ${p.dark ? 'au-pilar-card--dark' : ''}`}>
                <div className={`au-pilar-icon ${p.dark ? 'au-pilar-icon--green' : ''}`}>
                  <Icon />
                </div>
                <h3 className="au-pilar-titulo">{p.titulo}</h3>
                {p.desc && <p className="au-pilar-desc">{p.desc}</p>}
                {p.lista && (
                  <ul className="au-pilar-lista">
                    {p.lista.map((item, j) => (
                      <li key={j}><span className="au-bullet" />  {item}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── PRESENCIA ── */}
      <section className="au-presencia">
        <div className="au-presencia-inner">

          {/* Texto */}
          <div className="au-presencia-text">
            <h2 className="au-presencia-titulo">
              Presencia Real en{' '}
              <span className="au-accent">Rosario y Región</span>
            </h2>
            <div className="au-presencia-items">
              {PRESENCIA.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="au-presencia-item">
                    <span className="au-presencia-item-icon"><Icon /></span>
                    <div>
                      <strong>{item.titulo}</strong>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <a href="/contacto" className="au-presencia-btn">
              Conocé nuestras sedes
            </a>
          </div>

          {/* Imagen */}
          <div className="au-presencia-img">
            <img
              src={sindicatoImg}
              alt="Sede SMATA Rosario"
            />
          </div>

        </div>
      </section>

    </div>
  );
}