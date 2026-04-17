import './Prestadores.css'

const informacion = [
    {
        title: 'Actualización Diaria',
        desc: 'Información sincronizada en tiempo real y actualizada a diario.',
    },
    {
        title: 'Cobertura Regional',
        desc: 'Accedé al Listado de Prestadores en Rosario y la región',
    },
    {
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
                <button className="btn-outline"> Ver Listado Completo de Prestadores</button>
            </div>
            </div>
        </section>
    
        {/* ── INFORMACION ── */}
        <section className="informacion">
            <div className="section-header">
            </div>
    
            <div className="informacion-grid">
                {informacion.map((info) => (
                <div className="informacion-card" key={info.title}>

                    {/* Overlay para mejorar legibilidad */}
                    <div className="informacion-overlay"></div>

                    {/* Contenido */}
                    <div className="informacion-content">
                        <h3>{info.title}</h3>
                        <p>{info.desc}</p>
                    </div>
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