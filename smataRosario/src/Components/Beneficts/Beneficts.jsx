import './Beneficts.css';
import prestadoresImg from '../../utils/images/prestadores.png'
import farmaciaImg from '../../utils/images/farmacia.jpg';
import mochilasImg from '../../utils/images/mochilas.png';
import turismoImg from '../../utils/images/turismo.jpg';
import campingImg from '../../utils/images/Camping/camping.png';
import cursoImg from '../../utils/images/cursito.jpg';
import gimnasioImg from '../../utils/images/gimnasio.jpg';
import juezImg from '../../utils/images/juez.png';
import transporteImg from '../../utils/images/transporteBoda.png';
import vajillaImg from '../../utils/images/vajilla.png';
import donAlejoImg from '../../utils/images/donAlejo.jpg';
import sierrasImg from '../../utils/images/Las Sierras/portada1.jpg';
import organizadorImg from '../../utils/images/organizador.png';
import spaImage from '../../utils/images/spa.jpg';
import indumentariaImg from '../../utils/images/indumentaria.png'
import eccoImg from '../../utils/images/ecco.jpg'
import { useNavigate } from 'react-router-dom';
import { FaStar } from '../../utils/icons/icons.js'

const beneficts = [
  {
    title: 'Obra Social',
    desc: 'Accedé a servicios de salud de alta calidad, incluyendo consultas médicas, estudios clínicos y medicamentos gratuitos para nuestros afiliados.',
    link: 'Conocé Más',
    route: '/obra-social',
    image: prestadoresImg,
  },
  {
    title: 'Farmacía',
    desc: 'Conocé nuestra Farmacía sindical.',
    link: 'Conocé Más',
    route: '/farmacia',
    image: farmaciaImg,
  },
  {
    title: 'Gimnasio y Bienestar',
    desc: 'Accedé al gimnasio exclusivo para afiliados, con entrenadores personales y programas de bienestar.',
    link: 'Conocé Más',
    route: '/beneficios/gimnasio-bienestar',
    image: gimnasioImg,
  },
  {
    title: 'Subsidios y Descuentos',
    desc: 'Accedé a subsidios y descuentos exclusivos para nuestros afiliados.',
    link: 'Conocé Más',
    route: '/subsidios',
    image: mochilasImg,
  },
  {
    title: 'Asesoría Legal',
    desc: 'Nuestro equipo de abogados especializados en derecho laboral está disponible para brindar asesoría legal gratuita.',
    link: 'Conocé Más',
    route: '/beneficios/asesoria-legal',
    image: juezImg,
  },
  {
    title: 'Turismo',
    desc: 'Disfrutá de descuentos exclusivos en hoteles diseñados para el descanso y la recreación.',
    link: 'Conocé Más',
    route: '/turismo',
    image: turismoImg,
  },
  {
    title: 'Complejos Recreativos',
    desc: 'Accedé a complejos recreativos exclusivos para afiliados, con actividades para toda la familia.',
    link: 'Conocé Más',
    route: '/camping',
    image: campingImg,
  },
  {
    title: 'Cursos exclusivos',
    desc: 'Accedé a cursos y capacitaciones exclusivas para nuestros afiliados.',
    link: 'Conocé Más',
    route: '/capacitacion',
    image: cursoImg,
  },
  {
    title: 'ECCO Emergencias',
    desc: 'Accedé a atención médica con ECCO Emergencias...',
    link: 'Conocé Más',
    route: '/beneficios/ecco',
    image: eccoImg,
  },
  {
    title: 'Transporte el día de tu Boda',
    desc: 'Te regalamos el transporte en el día de tu Boda!',
    link: 'Conocé Más',
    route: '/beneficios/transporte-boda',
    image: transporteImg,
    mutual: true,
  },
  {
    title: 'Alquiler de Vajilla',
    desc: 'Accedé a un descuento exclusivo en Alquiler de vajilla.',
    link: 'Conocé Más',
    route: '/beneficios/alquiler-vajilla',
    image: vajillaImg,
    mutual: true,
  },
  {
    title: 'Descuento Autoservicio Don Alejo',
    desc: 'Accedé a descuentos exclusivos en Autoservicio Don Alejo.',
    link: 'Conocé Más',
    route: '/beneficios/autoservicio-don-alejo',
    image: donAlejoImg,
    mutual: true,
  },
  {
    title: 'Descuento exclusivo en Sierras Hotel',
    desc: 'Accedé a un descuento exclusivo en tu estadía.',
    link: 'Conocé Más',
    route: '/beneficios/descuento-sierras-hotel',
    image: sierrasImg,
    mutual: true,
  },
  {
    title: 'Organizador Profesional',
    desc: 'Accedé a descuentos especiales en el servicio de Orden y Organización.',
    link: 'Conocé Más',
    route: '/beneficios/organizador-profesional',
    image: organizadorImg,
    mutual: true,
  },
  {
    title: 'Spa de Campo',
    desc: 'Accedé a precios y descuentos especiales en Spa.',
    link: 'Conocé Más',
    route: '/beneficios/spa-de-campo',
    image: spaImage,
    mutual: true,
  },
  {
    title: 'Indumentaria Deportiva y Urbana',
    desc: 'Accedé a descuentos en Indumentaria Deportiva y Urbana Femenina.',
    link: 'Conocé Más',
    route: '/beneficios/indumentaria-deportiva',
    image: indumentariaImg,
    mutual: true,
  },
];

export default function Beneficts() {
  const navigate = useNavigate();

  return (
    <>
      {/* ── INICIO ── */}
      <section className="hero-beneficts" id="inicio">
        <div className="beneficts-hero-bg" />
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="accent">Beneficios</span>{' '}
            para el Trabajador
          </h1>
          <p className="hero-sub">
            Explora los beneficios exclusivos que tenemos para vos.
          </p>
          <div className="hero-btns">
            <a href='#beneficios' className="btn-primary">Ver Beneficios</a>
            <a href='#contact-section' className='btn-outline'>Contacto</a>
          </div>
        </div>
      </section>

      {/* ── BENEFICTS ── */}
      <section className="services" id="beneficios">
        <div className="section-header">
          <div>
            <div className="section-tag">Nuestros Beneficios</div>
            <h2 className="section-title">Beneficios exclusivos para nuestros Afiliados.</h2>
          </div>
        </div>

        <div className="beneficts-grid">
          {beneficts.map((benefict) => (
            <div
              className="beneficts-card"
              key={benefict.title}
              onClick={() => benefict.route && navigate(benefict.route)}
              style={{ cursor: benefict.route ? 'pointer' : 'default' }}
            >
              <div
                className="beneficts-bg"
                style={{ backgroundImage: `url(${benefict.image})` }}
              />

              {benefict.mutual && (
                <div className="beneficts-mutual-badge"><FaStar /> Exclusivo Mutual </div>
              )}

              {/* Overlay */}
              <div className="beneficts-overlay" />

              {/* Contenido — sin ningún <a> ni <Link> adentro */}
              <div className="beneficts-content">
                <h3>{benefict.title}</h3>
                <p>{benefict.desc}</p>
                <span className="beneficts-link">{benefict.link} →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="contact" id='contact-section'>
        <div className="contact-box">
          <div className="contact-content">
            <h2>¿No encontrás lo que buscás?</h2>
            <p>
              Sumáte a más de 10.000 trabajadores de Rosario que confían en
              SMATA para su seguridad laboral y bienestar familiar.
            </p>
            <div className="contact-btns">
              <a
                href='https://wa.me/5493413130317?text=Hola%20quiero%20hacer%20una%20consulta%20sobre%20los%20beneficios'
                target='_blank'
                rel='noopener norefferer'
                className="contact-btn-white">Contactanos</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}