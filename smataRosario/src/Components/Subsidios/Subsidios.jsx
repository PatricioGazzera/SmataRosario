import './Subsidios.css';
import farmaciaImg    from '../../utils/images/farmacia.jpg';
import mochilasImg    from '../../utils/images/mochilas.png';
import bebeImg        from '../../utils/images/subsidios/bebe.png';
import bodaImg        from '../../utils/images/subsidios/boda.png';
import dentistaImg    from '../../utils/images/subsidios/dentista.png';
import girasolImg     from '../../utils/images/subsidios/girasol.png';
import lentesImg      from '../../utils/images/subsidios/lentes.png';
import medicamentoImg from '../../utils/images/subsidios/medicamento.png';
import familiaImg     from '../../utils/images/subsidios/familia.png';
import { useNavigate } from 'react-router-dom';

const subsidios = [
    {
        id: 'kits-escolares',
        title: 'Kits escolares',
        desc: 'Cada año, brindamos kits escolares gratuitos a los hijos de nuestros afiliados, asegurando que tengan todo lo necesario para un año escolar exitoso.',
        link: 'Conocé Más',
        image: mochilasImg,
    },
    {
        id: 'nacimiento-adopcion',
        title: 'Presente por nacimiento - adopción',
        desc: 'Accedé a un presente exclusivo por nacimiento/adopción.',
        link: 'Conocé Más',
        image: bebeImg,
    },
    {
        id: 'subsidio-casamiento',
        title: 'Subsidio por Casamiento',
        desc: 'Accedé a un subsidio exclusivo por Casamiento',
        link: 'Conocé Más',
        image: bodaImg,
    },
    {
        id: 'reintegro-medicamentos',
        title: 'Reintegro sobre medicamentos',
        desc: 'Accedé a Reintegros en medicamentos en nuestra farmacia y las farmacias adheridas.',
        link: 'Conocé Más',
        image: medicamentoImg,
    },
    {
        id: 'anteojos-recetados',
        title: 'Anteojos Recetados',
        desc: 'Accedé a un descuento exclusivo en anteojos recetados.',
        link: 'Conocé Más',
        image: lentesImg,
    },
    {
        id: 'subsidio-fallecimiento-sepelio-seguro',
        title: 'Subsidio por Fallecimiento, Cobertura de Sepelio y Seguro de vida',
        desc: 'Accedé a un subsidio exclusivo por fallecimiento.',
        link: 'Conocé Más',
        image: girasolImg,
    },
    /*{
        id: 'cobertura-sepelio',
        title: 'Cobertura de Sepelio',
        desc: 'Cobertura exclusiva en sepelio.',
        link: 'Conocé Más',
        image: girasolImg,
    },
    {
        id: 'seguro-de-vida',
        title: 'Seguro de Vida',
        desc: 'Accedé a nuestro Seguro de Vida',
        link: 'Conocé Más',
        image: familiaImg,
    }, */
];

export default function Subsidios() {
    const navigate = useNavigate();

    return (
        <>
            {/* ── INICIO ── */}
            <section className="hero-subsidios" id="inicio">
                <div className="subsidios-hero-bg" />
                <div className="hero-content">
                    <h1 className="hero-title">
                        <span className="accent">Subsidios</span>{' '}
                        para el Trabajador
                    </h1>
                    <p className="hero-sub">
                        Accedé a los subsidios exclusivos que tenemos para vos.
                    </p>
                    <div className="hero-btns">
                        <a href='#subsidios' className="btn-primary">Ver Subsidios</a>
                    </div>
                </div>
            </section>

            {/* ── SUBSIDIOS ── */}
            <section className="services" id="subsidios">
                <div className="section-header">
                    <div>
                        <div className="section-tag">Nuestros Subsidios y Descuentos</div>
                        <h2 className="section-title">Subsidios y descuentos exclusivos para nuestros Afiliados.</h2>
                    </div>
                </div>

                <div className="subsidios-grid">
                    {subsidios.map((subsidio) => (
                        <div
                            className="subsidios-card"
                            key={subsidio.id}
                            onClick={() => navigate(`/subsidios/${subsidio.id}`)}
                        >
                            {/* Imagen de fondo */}
                            <div
                                className="subsidios-bg"
                                style={{ backgroundImage: `url(${subsidio.image})` }}
                            />

                            {/* Overlay */}
                            <div className="subsidios-overlay" />

                            {/* Contenido — sin ningún <a> adentro */}
                            <div className="subsidios-content">
                                <h3>{subsidio.title}</h3>
                                <p>{subsidio.desc}</p>
                                <span className="subsidios-link">
                                    {subsidio.link} →
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}