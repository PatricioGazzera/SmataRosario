import { useParams, useNavigate } from 'react-router-dom';
import './SubsidiosDetails.css';

// ── IMPORTÁ LAS IMÁGENES (mismas que en subsidios.jsx) ──
import farmaciaImg    from '../../utils/images/farmacia.jpg';
import mochilasImg    from '../../utils/images/mochilas.png';
import bebeImg        from '../../utils/images/subsidios/bebe.png';
import bodaImg        from '../../utils/images/subsidios/boda.png';
import dentistaImg    from '../../utils/images/subsidios/dentista.png';
import girasolImg     from '../../utils/images/subsidios/girasol.png';
import lentesImg      from '../../utils/images/subsidios/lentes.png';
import medicamentoImg from '../../utils/images/subsidios/medicamento.png';
import familiaImg     from '../../utils/images/subsidios/familia.png';

// ── ARRAY DE SUBSIDIOS — mismo que subsidios.jsx pero con id e info ──
// Cuando quieras modificar la info de uno, solo cambiás el texto de ese item.
const SUBSIDIOS = [
  {
    id: 'kits-escolares',
    title: 'Kits Escolares',
    desc: 'Cada año, brindamos kits escolares gratuitos a los hijos de nuestros afiliados, asegurando que tengan todo lo necesario para un año escolar exitoso.',
    image: mochilasImg,
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
    contacto: 'Para más información comunicarse con nuestra sede o por WhatsApp.',
  },
  /*{
    id: 'planes-farmacias',
    title: 'Planes de Farmacias',
    desc: 'Accedé a descuentos exclusivos en nuestra farmacia y las adheridas.',
    image: farmaciaImg,
    info: [
      {
        subtitulo: '¿En qué consiste?',
        texto: 'Accedé a descuentos especiales en medicamentos y productos farmacéuticos en nuestra farmacia sindical y en la red de farmacias adheridas al convenio.',
      },
      {
        subtitulo: '¿Quiénes pueden acceder?',
        texto: 'Todos los afiliados activos y su grupo familiar directo (cónyuge e hijos). Solo es necesario presentar el carnet de afiliado.',
      },
      {
        subtitulo: '¿Cómo solicitarlo?',
        texto: 'Presentate directamente en cualquiera de las farmacias adheridas mostrando tu carnet de afiliado. El descuento se aplica automáticamente en el momento de la compra.',
      },
    ],
    contacto: 'Consultá la lista de farmacias adheridas en nuestra sede o por WhatsApp.',
  }, */
  {
    id: 'nacimiento-adopcion',
    title: 'Presente por Nacimiento / Adopción',
    desc: 'Accedé a un presente exclusivo por nacimiento/adopción.',
    image: bebeImg,
    info: [
      {
        subtitulo: '¿En qué consiste?',
        texto: 'El sindicato otorga un presente especial ante el nacimiento o adopción de un hijo de afiliado, como forma de acompañar este momento tan importante para la familia mecánica.',
      },
      {
        subtitulo: '¿Quiénes pueden acceder?',
        texto: 'Todos los afiliados activos ante el nacimiento o adopción de un hijo. El beneficio debe solicitarse dentro de los 60 días del evento.',
      },
      {
        subtitulo: '¿Cómo solicitarlo?',
        texto: 'Presentate en sede con el DNI del titular, carnet de afiliado y partida de nacimiento o resolución de adopción. El presente se entrega en el momento.',
      },
    ],
    contacto: 'Para más información comunicarse con nuestra sede o por WhatsApp.',
  },
  {
    id: 'subsidio-casamiento',
    title: 'Subsidio por Casamiento',
    desc: 'Accedé a un subsidio exclusivo por Casamiento.',
    image: bodaImg,
    info: [
      {
        subtitulo: '¿En qué consiste?',
        texto: 'Si sos afiliado/a a SMATA y estás por casarte, tenemos un beneficio especial para vos: 7 días de alojamiento y pensión completa en nuestros hoteles para que disfrutes de tu luna de miel sin preocupaciones. Destinos disponibles: Mar del Plata, Mendoza y San Luis. Importante: El beneficio cubre alojamiento y pensión completa . El traslado es a cargo del afiliado. Para acceder al beneficio deben contar como mínimo con tres meses de afiliación al seguro de vida (sindicato).',
      },
      {
        subtitulo: '¿Quiénes pueden acceder?',
        texto: 'Todos los afiliados activos que contraigan matrimonio civil. Para gozar del beneficio debe contar como mínimo con tres meses de afiliación al seguro de vida.',
      },
      {
        subtitulo: '¿Cómo solicitarlo?',
        texto: 'Para iniciar el trámite se solicitará DNI de ambos, carnet del afiliado titular, últimos tres recibos de sueldo y constancia de turno (en el mismo debe aclarar datos de al menos uno de los contrayentes, fecha, membrete del registro y motivo del turno – matrimonio). Debe enviar todo por mail, indicando en el cuerpo del mail datos del titular, fecha de ingreso, fecha de egreso de la luna de miel y hotel de su preferencia, si se quiere agregar menores a la luna de miel debe mandar DNI (frente y dorso), lo que se abona por los menores lo liquida buenos aires. ',
      },
    ],
    contacto: 'Para más información comunicarse con nuestra sede o por WhatsApp.',
  },
  {
    id: 'reintegro-medicamentos',
    title: 'Reintegro sobre Medicamentos',
    desc: 'Accedé a reintegros en medicamentos en nuestra farmacia y las farmacias adheridas.',
    image: medicamentoImg,
    info: [
      {
        subtitulo: '¿En qué consiste?',
        texto: 'El sindicato reintegra un porcentaje del gasto en medicamentos realizados en farmacias adheridas, complementando la cobertura de obra social. Si esta en vademécum se reintegra el 20% del valor, si no se encuentra en vademécum se reintegra el 30% del valor.',
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
    contacto: 'Para más información comunicarse con nuestra sede o por WhatsApp.',
  },
  {
    id: 'anteojos-recetados',
    title: 'Anteojos Recetados',
    desc: 'Accedé a un descuento exclusivo en anteojos recetados.',
    image: lentesImg,
    info: [
      {
        subtitulo: '¿En qué consiste?',
        texto: 'El sindicato otorga un subsidio o descuento para la compra de anteojos recetados (armazón + cristales) para afiliados y su grupo familiar. Tope máximo de $50000.',
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
    contacto: 'Consultá la lista de ópticas adheridas en nuestra sede o por WhatsApp.',
  },
  {
    id: 'subsidio-fallecimiento',
    title: 'Subsidio por Fallecimiento',
    desc: 'Accedé a un subsidio exclusivo por fallecimiento.',
    image: girasolImg,
    info: [
      {
        subtitulo: '¿En qué consiste?',
        texto: 'Ante el fallecimiento del afiliado o de un familiar directo, el sindicato otorga un subsidio económico para acompañar a la familia en este difícil momento.',
      },
      {
        subtitulo: '¿Quiénes pueden acceder?',
        texto: 'Los beneficiarios designados ante el fallecimiento del afiliado titular. También aplica ante el fallecimiento del cónyuge o hijos a cargo. El beneficio debe solicitarse dentro de los 90 días del fallecimiento.',
      },
      {
        subtitulo: '¿Cómo solicitarlo?',
        texto: 'Presentarse en sede con el acta de defunción, DNI del titular y beneficiarios, carnet de afiliado y documentación que acredite el vínculo. El subsidio se tramita en el menor tiempo posible.',
      },
    ],
    contacto: 'Para más información comunicarse urgente con nuestra sede o por WhatsApp.',
  },
  {
    id: 'cobertura-sepelio',
    title: 'Cobertura de Sepelio',
    desc: 'Cobertura exclusiva en sepelio.',
    image: girasolImg,
    info: [
      {
        subtitulo: '¿En qué consiste?',
        texto: 'El sindicato brinda cobertura total o parcial de los gastos de sepelio ante el fallecimiento del afiliado titular, a través de convenios con empresas de servicios fúnebres.',
      },
      {
        subtitulo: '¿Quiénes pueden acceder?',
        texto: 'Todos los afiliados activos. La cobertura aplica para el titular. El beneficio debe activarse dentro de las 24 horas del fallecimiento llamando a nuestra sede.',
      },
      {
        subtitulo: '¿Cómo activarlo?',
        texto: 'Llamar inmediatamente a nuestra sede o número de emergencias para coordinar el servicio con las empresas adheridas. Es importante no contratar el servicio por cuenta propia antes de consultar, para no perder la cobertura.',
      },
    ],
    contacto: 'Ante una emergencia llamar inmediatamente a nuestra sede.',
  },
  {
    id: 'seguro-de-vida',
    title: 'Seguro de Vida',
    desc: 'Accedé a nuestro Seguro de Vida.',
    image: familiaImg,
    info: [
      {
        subtitulo: '¿En qué consiste?',
        texto: 'El sindicato gestiona un seguro de vida colectivo para todos los afiliados activos, que protege a su familia ante un fallecimiento o invalidez total y permanente.',
      },
      {
        subtitulo: '¿Quiénes pueden acceder?',
        texto: 'Todos los afiliados activos son incluidos automáticamente en la póliza colectiva. Los beneficiarios son designados por el titular al momento de la afiliación o pueden modificarse posteriormente.',
      },
      {
        subtitulo: '¿Cómo actualizar los beneficiarios?',
        texto: 'Presentate en sede con tu DNI y carnet de afiliado para actualizar o designar beneficiarios. Te recomendamos mantener esta información siempre actualizada.',
      },
    ],
    contacto: 'Para más información comunicarse con nuestra sede o por WhatsApp.',
  },
];

const IconBack  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="15 18 9 12 15 6"/></svg>;
const IconCheck = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg>;

export default function SubsidioDetails() {
  const { id } = useParams();
  console.log('ID recibido:', id);
  const navigate = useNavigate();

  const subsidio = SUBSIDIOS.find(s => s.id === id);
  console.log('Subsidio encontrado:', subsidio);

  if (!subsidio) return (
    <div className="sd-notfound">
      <h2>Subsidio no encontrado</h2>
      <button className="sd-btn-back" onClick={() => navigate('/beneficios')}>
        Volver a Beneficios
      </button>
    </div>
  );

  return (
    <div className="sd-root">

      {/* BACK */}
      <div className="sd-topbar">
        <button className="sd-btn-back" onClick={() => navigate('/beneficios')}>
          <IconBack /> Volver a Beneficios
        </button>
      </div>

      {/* HERO */}
      <div className="sd-hero">
        <div
          className="sd-hero-bg"
          style={{ backgroundImage: `url(${subsidio.image})` }}
        />
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

          {/* Secciones de info */}
          {subsidio.info.map((bloque, i) => (
            <section className="sd-section" key={i}>
              <h2 className="sd-section-title">{bloque.subtitulo}</h2>
              <p className="sd-section-text">{bloque.texto}</p>
            </section>
          ))}

          {/* Requisitos generales */}
          <section className="sd-section">
            <h2 className="sd-section-title">Requisitos Generales</h2>
            <ul className="sd-req-list">
              <li><IconCheck /> Ser afiliado activo de SMATA Rosario</li>
              <li><IconCheck /> Presentar DNI del titular</li>
              <li><IconCheck /> Presentar carnet de afiliado vigente</li>
              <li><IconCheck /> Documentación específica según el beneficio</li>
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
              <a
                href="https://wa.me/5493412555424?text=Hola%20quiero%20información%20sobre%20un%20subsidio."
                target="_blank"
                rel="noopener noreferrer"
                className="sd-btn-wa"
              >
                💬 Consultar por WhatsApp
              </a>
              <a
                href="tel:+543416831506"
                className="sd-btn-tel"
              >
                📞 Llamar a la Sede
              </a>
            </div>
          </div>

          {/* Card sede */}
          <div className="sd-sede-card">
            <div className="sd-sede-icon">📍</div>
            <div>
              <div className="sd-sede-title">Sede Central</div>
              <div className="sd-sede-dir">Gorriti 1046, Rosario, SF</div>
              <div className="sd-sede-horario">Lun a Vie — 08:00 a 17:00 hs</div>
            </div>
          </div>

          {/* Card requisito */}
          <div className="sd-req-card">
            <div className="sd-req-icon">ℹ</div>
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