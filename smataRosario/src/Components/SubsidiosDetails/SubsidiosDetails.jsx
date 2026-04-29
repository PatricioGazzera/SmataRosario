import { useParams, useNavigate } from 'react-router-dom';
import './SubsidiosDetails.css';
import { FaWhatsapp, FaPhone, FaLocationDot, FaInfo, FaCheck, FaEnvelope } from "../../utils/icons/icons";

import farmaciaImg    from '../../utils/images/farmacia.jpg';
import mochilasImg    from '../../utils/images/mochilas.png';
import bebeImg        from '../../utils/images/subsidios/bebe.png';
import bodaImg        from '../../utils/images/subsidios/boda.png';
import dentistaImg    from '../../utils/images/subsidios/dentista.png';
import girasolImg     from '../../utils/images/subsidios/girasol.png';
import lentesImg      from '../../utils/images/subsidios/lentes.png';
import medicamentoImg from '../../utils/images/subsidios/medicamento.png';
import familiaImg     from '../../utils/images/subsidios/familia.png';

// ── ARRAY DE SUBSIDIOS ──
// Cada subsidio tiene: telefono, whatsapp, email — cambiá los que correspondan.
const SUBSIDIOS = [
  {
    id: 'kits-escolares',
    title: 'Kits Escolares',
    desc: 'Cada año, brindamos kits escolares gratuitos a los hijos de nuestros afiliados, asegurando que tengan todo lo necesario para un año escolar exitoso.',
    image: mochilasImg,
    telefono: '+54 341 618-6835',    // COMPLETAR
    whatsapp: '549341618835',       // COMPLETAR — solo números
    email: 'entrada2@smatarosario.com.ar', // COMPLETAR
    contacto: 'Para más información comunicarse con nuestra sede o por WhatsApp.',
    info: [
      {
        subtitulo: '¿En qué consiste?',
        texto: 'El beneficio de Kits Escolares consiste en la entrega anual de materiales escolares completos para los hijos de nuestros afiliados en edad escolar.',
      },
      {
        subtitulo: '¿Quiénes pueden acceder?',
        texto: 'Todos los afiliados activos con hijos en edad escolar (nivel inicial, primario y secundario). El/los hijo/s del afiliado debe tener entre 3 y 12 años.',
      },
      {
        subtitulo: '¿Cómo solicitarlo?',
        texto: 'Presentate en nuestra sede con el DNI del titular, el carnet de afiliado y el certificado de alumno regular del/los hijo/s. La entrega se realiza en los meses de febrero y marzo de cada año.',
      },
    ],
  },
  {
    id: 'nacimiento-adopcion',
    title: 'Presente por Nacimiento / Adopción',
    desc: 'Accedé a un presente exclusivo por nacimiento/adopción.',
    image: bebeImg,
    telefono: '+54 341 618-6835',    // COMPLETAR
    whatsapp: '549341618835',       // COMPLETAR
    email: 'entrada2@smatarosario.com.ar', // COMPLETAR
    contacto: 'Para más información comunicarse con nuestra sede o por WhatsApp.',
    info: [
      {
        subtitulo: '¿En qué consiste?',
        texto: 'El sindicato otorga un presente especial ante el nacimiento o adopción de un hijo de afiliado, como forma de acompañar este momento tan importante para la familia mecánica. El mismo se entrega a los 7 meses.',
      },
      {
        subtitulo: '¿Quiénes pueden acceder?',
        texto: 'Todos los afiliados activos ante el nacimiento o adopción de un hijo.',
      },
      {
        subtitulo: '¿Cómo solicitarlo?',
        texto: 'Presentate en sede con el DNI del titular, carnet de afiliado y partida de nacimiento o resolución de adopción.',
      },
    ],
  },
  {
    id: 'subsidio-casamiento',
    title: 'Subsidio por Casamiento',
    desc: 'Accedé a un subsidio exclusivo por Casamiento.',
    image: bodaImg,
    telefono: '+54 341 255-5424',    // COMPLETAR
    whatsapp: '5493412555424',       // COMPLETAR
    email: 'afiliaciones@smatarosario.com.ar', // COMPLETAR
    contacto: 'Para más información comunicarse con nuestra sede o por WhatsApp.',
    info: [
      {
        subtitulo: '¿En qué consiste?',
        texto: 'Si sos afiliado/a a SMATA y estás por casarte, tenemos un beneficio especial para vos: 7 días de alojamiento y pensión completa en nuestros hoteles para que disfrutes de tu luna de miel sin preocupaciones. Destinos disponibles: Mar del Plata, Mendoza y San Luis. Importante: El beneficio cubre alojamiento y pensión completa. El traslado es a cargo del afiliado. Para acceder al beneficio deben contar como mínimo con tres meses de afiliación al seguro de vida (sindicato).',
      },
      {
        subtitulo: '¿Quiénes pueden acceder?',
        texto: 'Todos los afiliados activos que contraigan matrimonio civil. Para gozar del beneficio debe contar como mínimo con tres meses de afiliación al seguro de vida.',
      },
      {
        subtitulo: '¿Cómo solicitarlo?',
        texto: 'Para iniciar el trámite se solicitará DNI de ambos, carnet del afiliado titular, últimos tres recibos de sueldo y constancia de turno (en el mismo debe aclarar datos de al menos uno de los contrayentes, fecha, membrete del registro y motivo del turno – matrimonio). Debe enviar todo por mail, indicando en el cuerpo del mail datos del titular, fecha de ingreso, fecha de egreso de la luna de miel y hotel de su preferencia.',
      },
    ],
  },
  {
    id: 'reintegro-medicamentos',
    title: 'Reintegro sobre Medicamentos',
    desc: 'Accedé a reintegros en medicamentos en nuestra farmacia y las farmacias adheridas.',
    image: medicamentoImg,
    telefono: '+54 341 618-6835',    // COMPLETAR
    whatsapp: '549341618835',       // COMPLETAR
    email: 'entrada2@smatarosario.com.ar', // COMPLETAR
    contacto: 'Para más información comunicarse con nuestra sede o por WhatsApp.',
    info: [
      {
        subtitulo: '¿En qué consiste?',
        texto: 'El sindicato reintegra un porcentaje del gasto en medicamentos realizados en farmacias adheridas, complementando la cobertura de obra social. Si está en vademécum se reintegra el 20% del valor, si no se encuentra en vademécum se reintegra el 30% del valor.',
      },
      {
        subtitulo: '¿Quiénes pueden acceder?',
        texto: 'Todos los afiliados activos y su grupo familiar. Se requieren los tickets originales de compra para realizar el trámite.',
      },
      {
        subtitulo: '¿Cómo solicitarlo?',
        texto: 'Presentate en sede con los tickets originales de compra, receta médica cuando corresponda, DNI y carnet de afiliado. El reintegro se acredita en cuenta dentro de los 30 días hábiles.',
      },
    ],
  },
  {
    id: 'anteojos-recetados',
    title: 'Anteojos Recetados',
    desc: 'Accedé a un descuento exclusivo en anteojos recetados.',
    image: lentesImg,
    telefono: '+54 341 618-6835',    // COMPLETAR
    whatsapp: '549341618835',       // COMPLETAR
    email: 'entrada2@smatarosario.com.ar', // COMPLETAR
    contacto: 'Consultá la lista de ópticas adheridas en nuestra sede o por WhatsApp.',
    info: [
      {
        subtitulo: '¿En qué consiste?',
        texto: 'El sindicato otorga un subsidio o descuento para la compra de anteojos recetados (armazón + cristales) para afiliados y su grupo familiar. Tope máximo de $50.000.',
      },
      {
        subtitulo: '¿Quiénes pueden acceder?',
        texto: 'Todos los afiliados activos y su grupo familiar directo. Se requiere Factura B o C y orden médica.',
      },
      {
        subtitulo: '¿Cómo solicitarlo?',
        texto: 'Presentate en sede con la receta oftalmológica, DNI, carnet de afiliado y ticket de compra (para reintegro). El beneficio se tramita en ópticas adheridas al convenio.',
      },
    ],
  },
  {
    id: 'subsidio-fallecimiento-sepelio-seguro',
    title: 'Subsidio por Fallecimiento, Cobertura de Sepelio y Seguro de Vida',
    desc: 'Accedé a un subsidio exclusivo por fallecimiento.',
    image: girasolImg,
    telefono: '+54 341 255-5424',    // COMPLETAR
    whatsapp: '5493412555424',       // COMPLETAR
    email: 'afiliaciones@smatarosario.com.ar', // COMPLETAR
    contacto: 'Para más información comunicarse urgente con nuestra sede o por WhatsApp.',
    info: [
      {
        subtitulo: '¿En qué consiste?',
        texto: 'Ante el fallecimiento del afiliado o de un familiar directo, el sindicato otorga un subsidio económico para acompañar a la familia en este difícil momento.',
      },
      {
        subtitulo: '¿Quiénes pueden acceder?',
        texto: 'Los beneficiarios designados ante el fallecimiento del afiliado titular. También aplica ante el fallecimiento del cónyuge o hijos a cargo. Seguro de Vida y Sepelio hasta 80 años.',
      },
      {
        subtitulo: '¿Cómo solicitarlo?',
        texto: 'Solicitar Info via mail o whatsapp.',
      },
    ],
  },
];

const IconBack = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="15 18 9 12 15 6"/></svg>;

export default function SubsidioDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const subsidio = SUBSIDIOS.find(s => s.id === id);

  if (!subsidio) return (
    <div className="sd-notfound">
      <h2>Subsidio no encontrado</h2>
      <button className="sd-btn-back" onClick={() => navigate('/subsidios')}>
        Volver a Beneficios
      </button>
    </div>
  );

  const asunto = encodeURIComponent(`Consulta sobre: ${subsidio.title}`);
  const mailtoLink = `https://mail.google.com/mail/?view=cm&to=${subsidio.email}&su=${asunto}`;

  return (
    <div className="sd-root">

      {/* HERO */}
      <div className="sd-hero">
        <div className="sd-hero-bg" style={{ backgroundImage: `url(${subsidio.image})` }} />
        <div className="sd-hero-overlay" />
        <div className="sd-hero-content">
          <span className="sd-hero-tag">Subsidios y Beneficios</span>
          <h1 className="sd-hero-title">{subsidio.title}</h1>
          <p className="sd-hero-desc">{subsidio.desc}</p>
        </div>
      </div>

      {/* BODY */}
      <div className="sd-body">

        {/* IZQUIERDA */}
        <div className="sd-left">

          {subsidio.info.map((bloque, i) => (
            <section className="sd-section" key={i}>
              <h2 className="sd-section-title">{bloque.subtitulo}</h2>
              <p className="sd-section-text">{bloque.texto}</p>
            </section>
          ))}

          <section className="sd-section">
            <h2 className="sd-section-title">Requisitos Generales</h2>
            <ul className="sd-req-list">
              <li><FaCheck /> Ser afiliado activo de SMATA Rosario</li>
              <li><FaCheck /> Presentar DNI del titular</li>
              <li><FaCheck /> Presentar carnet de afiliado vigente</li>
              <li><FaCheck /> Documentación específica según el beneficio</li>
            </ul>
          </section>

        </div>

        {/* DERECHA */}
        <div className="sd-right">

          {/* Card de contacto */}
          <div className="sd-contact-card">
            <div className="sd-contact-header">
              <h3>¿Necesitás ayuda?</h3>
              <p>Nuestro equipo está disponible para asesorarte sobre este beneficio.</p>
            </div>
            <div className="sd-contact-body">
              <p className="sd-contact-note">{subsidio.contacto}</p>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${subsidio.whatsapp}?text=Hola%20quiero%20información%20sobre%20${encodeURIComponent(subsidio.title)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="sd-btn-wa"
              >
                <FaWhatsapp /> Consultar por WhatsApp
              </a>

              {/* Email */}
              <a href={mailtoLink}
                target='_blank'
                rel='noopener noreferrer'
                className="sd-btn-mail">
                <FaEnvelope /> Enviar un Mail
              </a>

              {/* Teléfono */}
              <a
                href={`tel:${subsidio.telefono.replace(/\D/g, '')}`}
                className="sd-btn-tel"
              >
                <FaPhone /> Llamar a la Sede
              </a>
            </div>
          </div>

          {/* Card sede */}
          <div className="sd-sede-card">
            <div className="sd-sede-icon"><FaLocationDot /></div>
            <div>
              <div className="sd-sede-title">Sede Central</div>
              <div className="sd-sede-dir">Gorriti 1046, Rosario, SF</div>
              <div className="sd-sede-horario">Lun a Vie — 08:00 a 17:00 hs</div>
            </div>
          </div>

          {/* Card requisito */}
          <div className="sd-req-card">
            <div className="sd-req-icon"><FaInfo /></div>
            <div>
              <div className="sd-req-title">Recordá llevar</div>
              <div className="sd-req-sub">DNI + Carnet de Afiliado</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}