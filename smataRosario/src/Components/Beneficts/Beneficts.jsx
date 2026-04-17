    import './Beneficts.css';
    import { FaCompass } from '../../utils/icons/icons';
    import asociateImg from '../../utils/images/asociate.jpeg';
    import farmaciaImg from '../../utils/images/farmacia.jpg';
    import gimnasioImg from '../../utils/images/gimnasio.jpg';
    import mochilasImg from '../../utils/images/mochilas.png';
    import juezImg from '../../utils/images/juez.png';
    import turismoImg from '../../utils/images/turismo.jpg';
    import campingImg from '../../utils/images/camping.png';

    const beneficts = [
    {
        title: 'Salud y Medicina',
        desc: 'Accedé a servicios de salud de alta calidad, incluyendo consultas médicas, estudios clínicos y medicamentos gratuitos para nuestros afiliados.',
        link: 'Conocé Más',
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
        image: campingImg,
    }
    ];
    
    export default function Beneficts() {
    return (
        <>
    
        {/* ── INICIO ── */}
        <section className="hero" id="inicio">
            <div className="home-bg" />
            <div className="hero-content">
            <h1 className="hero-title">
                Fuerza y <span className="accent">Unidad</span>{' '}
                para el Trabajador
            </h1>
            <p className="hero-sub">
                Redefiniendo el apoyo sindical para el profesional automotriz moderno
                en Rosario. Accedé a servicios de salud premium, turismo exclusivo y
                protección legal colectiva.
            </p>
            <div className="hero-btns">
                <button className="btn-primary"> Ver Beneficios</button>
            </div>
            </div>
        </section>
    
        {/* ── SERVICES ── */}
        <section className="services" id="beneficios">
            <div className="section-header">
            <div>
                <div className="section-tag">Nuestros Beneficios</div>
                <h2 className="section-title">Beneficios exclusivos para nuestros Afiliados.</h2>
            </div>
            </div>
    
            <div className="services-grid">
                {beneficts.map((benefict) => (
                <div className="service-card" key={benefict.title}>
                    
                    {/* Imagen de fondo */}
                    <div
                        className="service-bg"
                        style={{ backgroundImage: `url(${benefict.image})` }}
                    ></div>

                    {/* Overlay para mejorar legibilidad */}
                    <div className="service-overlay"></div>

                    {/* Contenido */}
                    <div className="service-content">
                        <h3>{benefict.title}</h3>
                        <p>{benefict.desc}</p>
                        <a href="#" className="service-link">
                        {benefict.link} →
                        </a>
                    </div>
                </div>
                ))}
            </div>
        </section>
    
        {/* ── CTA ── */}
        <section className="cta">
            <div className="cta-box">
            <div className="cta-content">
                <h2>
                Formá Parte de<br />
                Nuestra Comunidad
                </h2>
                <p>
                Sumáte a más de 10.000 trabajadores de Rosario que confían en
                SMATA para su seguridad laboral y bienestar familiar.
                </p>
                <div className="cta-btns">
                <button className="btn-white">
                    ↓ Solicitar Afiliación
                </button>
                <button className="btn-white-outline">
                    Preguntas Frecuentes
                </button>
                </div>
            </div>
            <div className="cta-illustration">
                <img src={asociateImg} alt="Asociate" className='asociate-img' />
            </div>
            </div>
        </section>
        </>
    );
    }