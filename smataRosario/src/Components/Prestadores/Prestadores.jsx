import './Prestadores.css'
import { FaLocationDot, FaHeadset, FaArrowsRotate, FaArrowUpRightFromSquare } from '../../utils/icons/icons';

const informacion = [
    {
        icon: FaArrowsRotate,
        title: 'Actualización Diaria',
        desc: 'Información sincronizada en tiempo real y actualizada a diario.',
    },
    {
        icon: FaLocationDot,
        title: 'Cobertura Regional',
        desc: 'Accedé al Listado de Prestadores en Rosario y la región',
    },
    {
        icon: FaHeadset,
        title: 'Soporte',
        desc: '¿No encuentra lo que busca? Contáctenos y lo ayudaremos.',
    },
    ];
    
    export default function Prestadores() {
    return (
        <>
    
        {/* ── INICIO ── */}
        <section className="hero-prestadores" id="inicio">
            <div className="prestadores-hero-bg" />
            <div className="hero-content">
            <div className="hero-badge"> Portal oficial de Prestadores</div>
            <h1 className="hero-title">
                Prestadores {' '}
                <span className="accent">Osmata</span>{' '}
            </h1>
            <p className="hero-sub">
                Explora los beneficios exclusivos que tenemos para vos.
            </p>
            <div className="hero-btns">
                <a className="btn-primary" href='#centro-medico'>Centro Médico</a>
                <a 
                    href='https://sites.google.com/smatarosario.com.ar/prestadores/smatarosario'
                    target='_blank'
                    rel='noopener norefferer'
                    className="btn-outline">
                    Ver Listado Completo de Prestadores
                    <FaArrowUpRightFromSquare />
                </a>
            </div>
            </div>
        </section>
    
        {/* ── INFORMACION ── */}
        <section className="informacion">
            <div className="section-header">
            </div>
    
                <div className="informacion-grid">
                {informacion.map(({icon: Icon, title, info, desc}) => (
                    <div className="informacion-card" key={title}>
                            <div className="informacion-icon">
                                <Icon size={30} />
                            </div>
                        <h3>{title}</h3>
                        <p>{desc}</p>
                    </div>
                    ))}
                </div>
        </section>
    
        {/* ── CTA ── */}
        <section className="contact-cm" id='centro-medico'>
            <div className="contact-box-cm">
            <div className="contact-content-cm">
                <h2>
                    Centro Médico
                </h2>
                <p>
                    Solicitá un turno con nuestros Prestadores Internos
                    pertenecientes a nuestro Centro Médico
                </p>
                <div className="contact-btns">
                <a
                href='https://wa.me/5493412555416?text=Hola%20quiero%20pedir%20un%20turno'
                target='_blank'
                rel='noopener norefferer'
                className="contact-btn-white"
                >
                    Contactanos
                </a>
                </div>
            </div>
            </div>
        </section>
        </>
    );
    }