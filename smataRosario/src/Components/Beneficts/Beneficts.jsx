    import './Beneficts.css';
    import { Link } from 'react-router-dom';
    import { FaCompass } from '../../utils/icons/icons';
    import farmaciaImg from '../../utils/images/farmacia.jpg';
    import gimnasioImg from '../../utils/images/gimnasio.jpg';
    import mochilasImg from '../../utils/images/mochilas.png';
    import juezImg from '../../utils/images/juez.png';
    import turismoImg from '../../utils/images/turismo.jpg';
    import campingImg from '../../utils/images/Camping/camping.png';

    const beneficts = [
    {
        title: 'Salud y Medicina',
        desc: 'Accedé a servicios de salud de alta calidad, incluyendo consultas médicas, estudios clínicos y medicamentos gratuitos para nuestros afiliados.',
        link: 'Conocé Más',
        route: '/prestadores',
        image: farmaciaImg,
    },
    {
        title: 'Gimnasio y Bienestar',
        desc: 'Accedé al gimnasio exclusivo para afiliados, con entrenadores personales y programas de bienestar diseñados para mantenerte en forma y saludable.',
        link: 'Conocé Más',
        image: gimnasioImg,
    },
    {
        title: 'Kits escolares',
        desc: 'Cada año, brindamos kits escolares gratuitos a los hijos de nuestros afiliados, asegurando que tengan todo lo necesario para un año escolar exitoso.',
        link: 'Conocé Más',
        image: mochilasImg,
    },
    {
        title: 'Asesoría Legal',
        desc: 'Nuestro equipo de abogados especializados en derecho laboral está disponible para brindar asesoría legal gratuita a nuestros afiliados, protegiendo sus derechos y garantizando su seguridad laboral.',
        link: 'Conocé Más',
        image: juezImg,
    },
    {
        title: 'Turismo',
        desc: 'Disfrutá de descuentos exclusivos en hoteles diseñados para el descanso y la recreación de nuestros afiliados, con destinos ideales para escapadas familiares o viajes de relax.',
        link: 'Conocé Más',
        image: turismoImg,
    },
    {
        title: 'Complejos Recreativos',
        desc: 'Accedé a complejos recreativos exclusivos para afiliados, con actividades para toda la familia, desde piscinas hasta áreas de picnic y deportes al aire libre.',
        link: 'Conocé Más',
        route: '/camping',
        image: campingImg,
    }
    ];
    
    export default function Beneficts() {
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
                <a href='#beneficios' className="btn-primary"> Ver Beneficios</a>
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
                <div className="beneficts-card" key={benefict.title}>
                    
                    {/* Imagen de fondo */}
                    <div
                        className="beneficts-bg"
                        style={{ backgroundImage: `url(${benefict.image})` }}
                    ></div>

                    {/* Overlay para mejorar legibilidad */}
                    <div className="beneficts-overlay"></div>

                    {/* Contenido */}
                    <div className="beneficts-content">
                        <h3>{benefict.title}</h3>
                        <p>{benefict.desc}</p>
                        <a href="#">
                        {benefict.route ? (
                            <Link to={benefict.route} className="beneficts-link" key={benefict.title}>
                                {benefict.link} →
                            </Link>
                        ) : (
                            <span className="beneficts-link" key={benefict.title}>
                                {benefict.link} →
                            </span>
                        )}
                        </a>
                    </div>
                </div>
                ))}
            </div>
        </section>
    
        {/* ── CTA ── */}
        <section className="contact" id='contact-section'>
            <div className="contact-box">
            <div className="contact-content">
                <h2>
                ¿No encontrás lo que buscás?
                </h2>
                <p>
                Sumáte a más de 10.000 trabajadores de Rosario que confían en
                SMATA para su seguridad laboral y bienestar familiar.
                </p>
                <div className="contact-btns">
                <button className="contact-btn-white">
                    Contactanos
                </button>
                </div>
            </div>
            </div>
        </section>
        </>
    );
    }