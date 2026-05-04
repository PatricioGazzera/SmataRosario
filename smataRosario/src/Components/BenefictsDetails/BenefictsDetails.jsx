import { useParams, useNavigate } from 'react-router-dom';
import './BenefictsDetails.css';
import { FaWhatsapp, FaPhone, FaLocationDot, FaInfo, FaCheck, FaEnvelope } from "../../utils/icons/icons";
import gimnasioImg from '../../utils/images/gimnasio.jpg';
import juezImg from '../../utils/images/juez.png';
import cursoImg from '../../utils/images/cursito.jpg';
import transporteImg from '../../utils/images/transporteBoda.png';
import vajillaImg from '../../utils/images/vajilla.png';
import donAlejoImg from '../../utils/images/donAlejo.jpg';
import sierrasImg from '../../utils/images/Las Sierras/portada1.jpg';
import organizadorImg from '../../utils/images/organizador.png';
import spaImage from '../../utils/images/spa.jpg';
import indumentariaImg from '../../utils/images/indumentaria.png'
import eccoImg from '../../utils/images/ecco.jpg'

const BENEFICIOS = [
  {
    id: 'gimnasio-bienestar',
    title: 'Gimnasio y Bienestar',
    desc: 'Accedé al gimnasio exclusivo para afiliados, con entrenadores personales y programas de bienestar diseñados para mantenerte en forma y saludable.',
    image: gimnasioImg,
    telefono: '341 618-6835',
    whatsapp: '5493416186835',
    email: 'entrada2@smatarosario.com.ar',
    contacto: 'Para más información comunicarse con nuestra sede o por WhatsApp.',
    info: [
      {
        subtitulo: '¿En qué consiste?',
        texto: 'Accedé a un 20% de Descuento en la cuota y pase libre a clases y musculación.',
      },
      {
        subtitulo: '¿Quiénes pueden acceder?',
        texto: 'Todos los afiliados activos y su grupo familiar directo. Solo es necesario presentar el carnet de afiliado vigente al momento del ingreso.',
      },
      {
        subtitulo: '¿Cómo acceder?',
        texto: 'Presentate en la sede con tu carnet de afiliado para registrarte. Una vez registrado podés concurrir en los horarios habilitados sin necesidad de reserva previa.',
      },
    ],
  },
  {
    id: 'asesoria-legal',
    title: 'Asesoría Legal',
    desc: 'Nuestro equipo de abogados especializados en derecho laboral está disponible para brindar asesoría legal gratuita a nuestros afiliados.',
    image: juezImg,
    telefono: '341 618-6835',
    whatsapp: '5493416186835',
    email: 'entrada2@smatarosario.com.ar',
    contacto: 'Para solicitar un turno comunicarse con nuestra sede o por WhatsApp.',
    info: [
      {
        subtitulo: '¿En qué consiste?',
        texto: 'Contamos con un equipo de abogados que brindan asesoramiento gratuito a todos los afiliados activos en temas relacionados con convenios colectivos, accidentes laborales, despidos y negociaciones salariales.',
      },
      {
        subtitulo: '¿Quiénes pueden acceder?',
        texto: 'Todos los afiliados activos de SMATA Rosario. El beneficio cubre asesoramiento en derecho laboral, sindical y previsional.',
      },
      {
        subtitulo: '¿Cómo solicitarlo?',
        texto: 'Consulta mediante los canales de contacto días y horarios. El asesoramiento se realiza de forma presencial en la sede o telefónicamente según disponibilidad.',
      },
    ],
  },
  {
    id: 'ecco',
    title: 'ECCO Emergencias',
    desc: 'Accedé a atención médica con Ecco',
    image: eccoImg,
    telefono: '0810 888-3226',
    whatsapp: '541144499787',
    contacto: 'contacto directo con ECCO.',
    info: [
      {
        subtitulo: '¿En qué consiste?',
        texto: 'Accedé a atención médica a domicilio con ECCO Emergencias. (Coseguro de $10.000).',
      },
      {
        subtitulo: '¿Quiénes pueden acceder?',
        texto: 'Todos los afiliados activos.',
      },
      {
        subtitulo: '¿Cómo solicitarlo?',
        texto: 'Comunicate directamente con Ecco via whatsapp o mediante llamada.',
      },
    ],
  },
  {
    id: 'transporte-boda',
    title: 'Transporte el día de tu Boda',
    desc: 'Te regalamos el transporte en el día de tu Boda.',
    image: transporteImg,
    telefono: '341 313-0317',
    whatsapp: '5493413130317',
    email: 'mutualmecanica2@smatarosario.com.ar',
    contacto: 'Para coordinar el servicio comunicarse con anticipación por WhatsApp o mail.',
    info: [
      {
        subtitulo: '¿En qué consiste?',
        texto: 'SMATA Rosario te regala el servicio de transporte para el día de tu casamiento. Un beneficio especial para que ese día tan importante sea perfecto sin preocuparte por la logística.',
      },
      {
        subtitulo: '¿Quiénes pueden acceder?',
        texto: 'Todos los afiliados activos que contraigan matrimonio civil. El beneficio debe solicitarse con al menos 30 días de anticipación a la fecha del casamiento.',
      },
      {
        subtitulo: '¿Cómo solicitarlo?',
        texto: 'Comunicate mediante las formas de contacto que tenemos para vos.',
      },
    ],
  },
  {
    id: 'alquiler-vajilla',
    title: 'Alquiler de Vajilla',
    desc: 'Accedé a un descuento exclusivo en alquiler de vajilla.',
    image: vajillaImg,
    telefono: '341 313-0317',
    whatsapp: '5493413130317',
    email: 'mutualmecanica2@smatarosario.com.ar',
    contacto: 'Para más información comunicarse con nuestra sede o por WhatsApp.',
    info: [
      {
        subtitulo: '¿En qué consiste?',
        texto: 'Accedé a un 10% de Descuento en el alquiler de vajilla para eventos a través de nuestros proveedor Servicios Victoria',
      },
      {
        subtitulo: '¿Quiénes pueden acceder?',
        texto: 'Todos los afiliados activos y su grupo familiar directo. El beneficio aplica para eventos sociales y familiares.',
      },
      {
        subtitulo: '¿Cómo solicitarlo?',
        texto: 'Comunicarse con nuestra sede para obtener más información al respecto. Presentar el carnet de afiliado al momento de la contratación.',
      },
    ],
  },
  {
    id: 'autoservicio-don-alejo',
    title: 'Descuento Autoservicio Don Alejo',
    desc: 'Accedé a descuentos exclusivos en Autoservicio Don Alejo.',
    image: donAlejoImg,
    telefono: '341 313-0317',
    whatsapp: '5493413130317',
    email: 'mutualmecanica2@smatarosario.com.ar',
    contacto: 'Para más información comunicarse con nuestra sede o por WhatsApp.',
    info: [
      {
        subtitulo: '¿En qué consiste?',
        texto: 'Accedé a descuentos exclusivos en Autoservicio Don Alejo, ubicado en Alvear 360, Rosario y Av. Silvestre Begnis y Av. Santa Fe, Granadero Baigorria. 10% de Descuento todos los Lunes con todos los medios de pago. 15% de Descuento todos los Jueves con efectivo.',
      },
      {
        subtitulo: '¿Quiénes pueden acceder?',
        texto: 'Todos los afiliados activos y su grupo familiar. Solo es necesario presentar el carnet de afiliado vigente en el momento de la compra.',
      },
      {
        subtitulo: '¿Cómo acceder al descuento?',
        texto: 'Presentate en Autoservicio Don Alejo con tu carnet de afiliado. El descuento se aplica automáticamente en caja sobre los productos adheridos al convenio.',
      },
    ],
  },
  {
    id: 'descuento-sierras-hotel',
    title: 'Descuento exclusivo en Sierras Hotel',
    desc: 'Accedé a un descuento exclusivo en tu estadía.',
    image: sierrasImg,
    telefono: '341 313-0317',
    whatsapp: '5493413130317',
    email: 'mutualmecanica2@smatarosario.com.ar',
    contacto: 'Para reservas y más información comunicarse con nuestra sede o por WhatsApp.',
    info: [
      {
        subtitulo: '¿En qué consiste?',
        texto: 'Accedé a un 20% de descuento adicional y acumulativo sobre la tarifa para afiliados en tu estadía en Sierras Hotel.',
      },
      {
        subtitulo: '¿Quiénes pueden acceder?',
        texto: 'Todos los afiliados activos y su grupo familiar. La tarifa preferencial aplica sujeto a disponibilidad y debe solicitarse a través de nuestra sede.',
      },
      {
        subtitulo: '¿Cómo solicitarlo?',
        texto: 'Comunicate con nuestra sede mediante los canales de contacto para más información.',
      },
    ],
  },
  {
    id: 'organizador-profesional',
    title: 'Organizador Profesional',
    desc: 'Accedé a descuentos especiales en el servicio de Orden y Organización.',
    image: organizadorImg,
    telefono: '341 313-0317',
    whatsapp: '5493413130317',
    email: 'mutualmecanica2@smatarosario.com.ar',
    contacto: 'Para más información comunicarse con nuestra sede o por WhatsApp.',
    info: [
      {
        subtitulo: '¿En qué consiste?',
        texto: 'Accedé a un Descuento especial para el servicio de Órden y Organización en casa, coaching y asesorías virtuales con la organizadora profesional Laura Ramayo',
      },
      {
        subtitulo: '¿Quiénes pueden acceder?',
        texto: 'Todos los afiliados activos y su grupo familiar. El beneficio aplica para servicios de organización del hogar, mudanzas y optimización de espacios.',
      },
      {
        subtitulo: '¿Cómo solicitarlo?',
        texto: 'Comunicarse con nuestra sede para obtener más información sobre el descuento.',
      },
    ],
  },
  {
    id: 'spa-de-campo',
    title: 'Spa de Campo',
    desc: 'Accedé a precios y descuentos especiales en Spa.',
    image: spaImage,
    telefono: '341 313-0317',
    whatsapp: '5493413130317',
    email: 'mutualmecanica2@smatarosario.com.ar',
    contacto: 'Para reservas comunicarse con nuestra sede o por WhatsApp.',
    info: [
      {
        subtitulo: '¿En qué consiste?',
        texto: 'Accedé a un 15% de Descuento y a precios especiales en circuitos de spa con Spa de Campo.',
      },
      {
        subtitulo: '¿Quiénes pueden acceder?',
        texto: 'Todos los afiliados activos y su grupo familiar directo. Los descuentos varían según el servicio y están sujetos a disponibilidad de turnos.',
      },
      {
        subtitulo: '¿Cómo reservar?',
        texto: 'Comunicarse con nuestra sede para obtener más información.',
      },
    ],
  },
  {
    id: 'indumentaria-deportiva',
    title: 'Indumentaria Deportiva y Urbana',
    desc: 'Accedé a descuentos en Indumentaria Deportiva y Urbana Femenina.',
    image: indumentariaImg,
    telefono: '341 313-0317',
    whatsapp: '5493413130317',
    email: 'mutualmecanica2@smatarosario.com.ar',
    contacto: 'Para más información comunicarse con nuestra sede o por WhatsApp.',
    info: [
      {
        subtitulo: '¿En qué consiste?',
        texto: 'Obtené un 15% de Descuento en tu próxima compra en She Moves (solo pago en efectivo).',
      },
      {
        subtitulo: '¿Quiénes pueden acceder?',
        texto: 'Todos los afiliados activos y su grupo familiar. El beneficio aplica en los comercios adheridos al convenio vigente.',
      },
      {
        subtitulo: '¿Cómo acceder al descuento?',
        texto: 'Comunicate con nuestra sede para obtener más información sobre este beneficio.',
      },
    ],
  },
];

const IconBack = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="15 18 9 12 15 6" /></svg>;

export default function BenefictsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const beneficio = BENEFICIOS.find(b => b.id === id);

  if (!beneficio) return (
    <div className="bd-notfound">
      <h2>Beneficio no encontrado</h2>
      <button className="bd-btn-back" onClick={() => navigate('/beneficios')}>
        Volver a Beneficios
      </button>
    </div>
  );

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const asunto = encodeURIComponent(`Consulta sobre: ${beneficio.title}`);
  const mailtoLink = isMobile
    ? `mailto:${beneficio.email}?subject=${asunto}`
    : `https://mail.google.com/mail/?view=cm&to=${beneficio.email}&su=${asunto}`;



  return (
    <div className="bd-root">

      {/* HERO */}
      <div className="bd-hero">
        <div className="bd-hero-bg" style={{ backgroundImage: `url(${beneficio.image})` }} />
        <div className="bd-hero-overlay" />
        <div className="bd-hero-content">
          <span className="bd-hero-tag">Beneficios para Afiliados</span>
          <h1 className="bd-hero-title">{beneficio.title}</h1>
          <p className="bd-hero-desc">{beneficio.desc}</p>
        </div>
      </div>

      {/* BODY */}
      <div className="bd-body">

        {/* IZQUIERDA */}
        <div className="bd-left">

          {beneficio.info.map((bloque, i) => (
            <section className="bd-section" key={i}>
              <h2 className="bd-section-title">{bloque.subtitulo}</h2>
              <p className="bd-section-text">{bloque.texto}</p>
            </section>
          ))}

          <section className="bd-section">
            <h2 className="bd-section-title">Requisitos Generales</h2>
            <ul className="bd-req-list">
              <li><FaCheck /> Ser afiliado activo de SMATA Rosario</li>
              <li><FaCheck /> Presentar DNI del titular</li>
              <li><FaCheck /> Presentar carnet de afiliado vigente</li>
              <li><FaCheck /> Documentación específica según el beneficio</li>
            </ul>
          </section>

        </div>

        {/* DERECHA */}
        <div className="bd-right">

          <div className="bd-contact-card">
            <div className="bd-contact-header">
              <h3>¿Necesitás ayuda?</h3>
              <p>Nuestro equipo está disponible para asesorarte sobre este beneficio.</p>
            </div>
            <div className="bd-contact-body">
              <p className="bd-contact-note">{beneficio.contacto}</p>

              <a
                href={`https://wa.me/${beneficio.whatsapp}?text=Hola%20quiero%20información%20sobre%20${encodeURIComponent(beneficio.title)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bd-btn-wa"
              >
                <FaWhatsapp /> Consultar por WhatsApp
              </a>

              <a
                href={mailtoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bd-btn-mail"
              >
                <FaEnvelope /> Enviar un Mail
              </a>

              <a
                href={`tel:${beneficio.telefono.replace(/\D/g, '')}`}
                className="bd-btn-tel"
              >
                <FaPhone /> Llamar a la Sede
              </a>
            </div>
          </div>

          <div className="bd-sede-card">
            <div className="bd-sede-icon"><FaLocationDot /></div>
            <div>
              <div className="bd-sede-title">Sede Central</div>
              <div className="bd-sede-dir">Gorriti 1046, Rosario, SF</div>
              <div className="bd-sede-horario">Lun a Vie — 08:00 a 17:00 hs</div>
            </div>
          </div>

          <div className="bd-req-card">
            <div className="bd-req-icon"><FaInfo /></div>
            <div>
              <div className="bd-req-title">Recordá llevar</div>
              <div className="bd-req-sub">DNI + Carnet de Afiliado</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}