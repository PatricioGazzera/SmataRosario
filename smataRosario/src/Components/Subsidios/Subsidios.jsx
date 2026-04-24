    import './subsidios.css';
    import { Link } from 'react-router-dom';
    import { FaCompass } from '../../utils/icons/icons';
    import farmaciaImg from '../../utils/images/farmacia.jpg';
    import mochilasImg from '../../utils/images/mochilas.png';

    const subsidios = [
    {
        title: 'Kits escolares',
        desc: 'Cada año, brindamos kits escolares gratuitos a los hijos de nuestros afiliados, asegurando que tengan todo lo necesario para un año escolar exitoso.',
        link: 'Conocé Más',
        image: mochilasImg,
    },
    {
        title: 'Planes de Farmacias',
        desc: 'Accedé a descuentos exclusivos en nuestra farmacia y las adheridas.',
        link: 'Conocé Más',
        image: farmaciaImg,
    },
    {
        title: 'Presente por nacimiento - adopción',
        desc: 'Accedé a un presente exclusivo por nacimiento/adopción.',
        link: 'Conocé Más',
        image: mochilasImg,
    },
    {
        title: 'Subsidio por Casamiento',
        desc: 'Accedé a un subsidio exclusivo por Casamiento',
        link: 'Conocé Más',
        image: juezImg,
    },
    {
        title: 'Reintegro sobre medicamentos',
        desc: 'Accedé a Reintegros en medicamentos en nuestra farmacia y las farmacias adheridas.',
        link: 'Conocé Más',
        image: turismoImg,
    },
    {
        title: 'Anteojos Recetados',
        desc: 'Accedé a un descuento exclusivo en anteojos recetados.',
        link: 'Conocé Más',
        route: '/camping',
        image: campingImg,
    },
    {
        title: 'Descuento Odontología',
        desc: 'Accedé a descuentos en Odontología.',
        link: 'Conocé Más',
        route: '/capacitacion',
        image: cursoImg,
    },
    {
        title: 'Subsidio por Fallecimiento',
        desc: 'Accedé a un subsidio exclusivo por fallecimiento.',
        link: 'Conocé Más',
        route: '/capacitacion',
        image: cursoImg,
    },
    {
        title: 'Cobertura de Sepelio',
        desc: 'Cobertura exclusiva en sepelio.',
        link: 'Conocé Más',
        route: '/capacitacion',
        image: cursoImg,
    },
    {
        title: 'Seguro de Vida',
        desc: 'Accedé a nuestro Seguro de Vida',
        link: 'Conocé Más',
        route: '/capacitacion',
        image: cursoImg,
    },
    ];
    
    export default function Subsidios() {
    return (
        <>
    
        {/* ── INICIO ── */}
        <section className="hero-subsidios" id="inicio">
            <div className="subsidios-hero-bg" />
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
    
        {/* ── subsidios ── */}
        <section className="services" id="subsidios">
            <div className="section-header">
            <div>
                <div className="section-tag">Nuestros Subsidios y Descuentos</div>
                <h2 className="section-title">Subsidios y descuentos exclusivos para nuestros Afiliados.</h2>
            </div>
            </div>
    
            <div className="subsidios-grid">
                {subsidios.map((subsidios) => (
                <div className="subsidios-card" key={subsidios.title}>
                    
                    {/* Imagen de fondo */}
                    <div
                        className="subsidios-bg"
                        style={{ backgroundImage: `url(${subsidios.image})` }}
                    ></div>

                    {/* Overlay para mejorar legibilidad */}
                    <div className="subsidios-overlay"></div>

                    {/* Contenido */}
                    <div className="subsidios-content">
                        <h3>{subsidios.title}</h3>
                        <p>{subsidios.desc}</p>
                        <a href="#">
                        {subsidios.route ? (
                            <Link to={subsidios.route} className="subsidios-link" key={subsidios.title}>
                                {subsidios.link} →
                            </Link>
                        ) : (
                            <span className="subsidios-link" key={subsidios.title}>
                                {subsidios.link} →
                            </span>
                        )}
                        </a>
                    </div>
                </div>
                ))}
            </div>
        </section>
        </>
    );
    }