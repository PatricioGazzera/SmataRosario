    import './Home.css';
    import { FaHospital, FaPills, FaSkiing, FaBalanceScale, FaWhatsapp } from '../../utils/icons/icons';
    import asociateImg from '../../utils/images/asociate.jpg';

    const services = [
    {
        icon: FaHospital,
        title: 'Centro de Salud',
        desc: 'Accedé a los servicios médicos de OSMATA...',
        link: 'Conocé Más',
    },
    {
        icon: FaPills,
        title: 'Farmacia',
        desc: 'Encontrá tu farmacia sindical más cercana...',
        link: 'Ver Descuentos',
    },
    {
        icon: FaSkiing,
        title: 'Recreación',
        desc: 'Explorá paquetes turísticos...',
        link: 'Ver Destinos',
    },
    {
        icon: FaBalanceScale,
        title: 'Asesoría Legal',
        desc: 'Asesoramiento jurídico profesional...',
        link: 'Consultar',
    },
    ];
    
    const news = [
    {
        category: 'PARITARIAS',
        date: '24 de octubre, 2023',
        title: 'Nuevo Acuerdo Salarial Alcanzado para el Ciclo 2024',
        desc: 'Avances significativos en paritarias garantizan ajustes salariales alineados con índices de inflación para todos los trabajadores automotrices.',
        img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80',
    },
    {
        category: 'TURISMO',
        date: '20 de octubre, 2023',
        title: 'Temporada de Verano en Mar del Plata: Reservas Abiertas',
        desc: 'Tarifas exclusivas para afiliados en nuestros hoteles sindicales. Reservá el lugar de tu familia para las próximas vacaciones.',
        img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
    },
    {
        category: 'SALUD',
        date: '15 de octubre, 2023',
        title: 'Nuevo Ala de Cardiología Inaugurada en Rosario',
        desc: 'OSMATA continúa expandiendo su infraestructura de salud local con equipamiento cardiovascular de última generación.',
        img: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&q=80',
    },
    ];
    
    export default function SmataRosario() {
    return (
        <>
    
        {/* ── HERO ── */}
        <section className="hero" id="inicio">
            <div className="home-bg" />
            <div className="hero-content">
            <div className="hero-badge">Nuevos beneficios disponibles</div>
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
                <a className="btn-primary" href='#afiliarse'>Afiliarse a SMATA</a>
                <a className="btn-outline" href='#beneficios'>Ver Beneficios de Socio</a>
            </div>
            </div>
        </section>
    
        {/* ── SERVICES ── */}
        <section className="services" id="beneficios">
            <div className="section-header">
            <div>
                <div className="section-tag">Nuestra Red</div>
                <h2 className="section-title">Servicios de Acceso Rápido</h2>
            </div>
            <p className="section-desc">
                Todo lo que necesitás como socio, accesible con un clic.
                Desde turnos médicos hasta planificación de vacaciones.
            </p>
            </div>
    
            <div className="services-grid">
                    {services.map(({ icon: Icon, title, desc, link }) => (
                        <div className="service-card" key={title}>
                            <div className="service-icon">
                                <Icon size={30} />
                            </div>
                            <h3>{title}</h3>
                            <p>{desc}</p>
                            <a href="#" className="service-link">{link} →</a>
                        </div>
                ))}
            </div>
        </section>
    
        {/* ── NEWS ── */}
        <section className="news" id="noticias">
            <div className="news-header">
            <div className="news-tag">Mantenete Informado</div>
            <h2 className="news-title">Últimas Noticias y Novedades</h2>
            <div className="news-underline" />
            </div>
    
            <div className="news-grid">
            {news.map((n) => (
                <div className="news-card" key={n.title}>
                <div className="news-img">
                    <img src={n.img} alt={n.title} />
                    <span className="news-category">{n.category}</span>
                </div>
                <div className="news-body">
                    <div className="news-date">{n.date}</div>
                    <h3>{n.title}</h3>
                    <p>{n.desc}</p>
                    <a href="#" className="news-read">Leer Artículo ↗</a>
                </div>
                </div>
            ))}
            </div>
    
            <div className="news-all">
            <button className="btn-ghost">Ver Archivo de Noticias</button>
            </div>
        </section>
    
        {/* ── CTA ── */}
        <section className="cta" id='afiliarse'>
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
                <a 
                    href='https://wa.me/5493412555424?text=Hola%20quiero%20información%20para%20afiliarme.'
                    target='_blank'
                    rel='noopener norefferer'
                    className="btn-white"
                >
                    <FaWhatsapp className='whatsapp-btn'/> Solicitar Afiliación
                </a>
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