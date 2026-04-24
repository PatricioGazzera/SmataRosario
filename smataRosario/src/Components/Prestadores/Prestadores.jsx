import './Prestadores.css'
import { FaLocationDot, FaHeadset, FaArrowsRotate, FaArrowUpRightFromSquare, FaPhone, FaWhatsapp } from '../../utils/icons/icons';

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
                    <div className="hero-badge"> Obra Social</div>
                    <h1 className="hero-title">
                        Obra Social {' '}
                        <span className="accent">Osmata</span>{' '}
                    </h1>
                    <p className="hero-sub">
                        Accedé de forma directa a los Beneficios que ofrece nuestra Obra Social.
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
                    {informacion.map(({ icon: Icon, title, info, desc }) => (
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

            <section className='discapacidad' id='discapacidad'>
                <h1>hola</h1>
            </section>

            <section className="dir-centro-section" id='centro-medico'>
                <div className="dir-centro-info">
                    <span className="dir-centro-badge">UBICACIÓN CENTRAL</span>
                    <h2 className="dir-centro-title">Centro Médico Rosario</h2>
                    <div className="dir-centro-row">
                        <FaLocationDot className="dir-centro-icon" />
                        <span>Gorriti 1046,<br />S2000 Rosario, Santa Fe</span>
                    </div>
                    <div className="dir-centro-row">
                        <FaWhatsapp className="dir-centro-icon" />
                        <a 
                        href='https://wa.me/5493412555416?text=Hola%20quiero%20pedir%20un%20turno.' 
                        target='_blank'
                        rel='noreferrer'
                        className='dir-centro-wsp'
                        >
                            Contacto: 341 255-5416
                        </a>
                    </div>
                    <a
                        href='https://maps.app.goo.gl/SGtishKLUsPw2rhe9'
                        target="_blank"
                        rel="noreferrer"
                        className="dir-centro-btn"
                    >Cómo llegar</a>
                </div>

                <div className="dir-centro-mapa">
                    <iframe
                        title="centro SMATA Rosario"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3187.6995424950646!2d-60.682379924397075!3d-32.9233603707127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b653575b11a40d%3A0xdf6f2e27b39ce3eb!2sS.M.A.T.A.%20Seccional%20Rosario!5e1!3m2!1ses-419!2sar!4v1776866351987!5m2!1ses-419!2sar"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </section>
        </>
    );
}