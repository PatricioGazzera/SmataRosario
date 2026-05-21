import './Prestadores.css'
import {
    FaLocationDot,
    FaHeadset,
    FaArrowsRotate,
    FaArrowUpRightFromSquare,
    FaPhone,
    FaWhatsapp,
    FaCheck,
    FaEnvelope,
    FaTruckMedical
} from '../../utils/icons/icons';
import { useEffect, useState } from 'react';

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
    {
        icon: FaTruckMedical,
        title: 'Emergencia Médica',
        desc: 'Contamos con servicio de emergencia médica mediante ECCO',
        link: '/beneficios/ecco'
    }
];

const requisitos = [
    'CUD vigente',
    'Alta en Obra Social',
    'Alta Discapacidad en Obra Social'
]

const subject = encodeURIComponent("Consulta sobre trámite de discapacidad.");
const body = encodeURIComponent("Hola, quiero información sobre el trámite de discapacidad.");

const contactDiscapacidad = [
    {
        label: 'WhatsApp',
        desc: 'Contactanos por WhatsApp',
        icon: FaWhatsapp,
        link: 'https://wa.me/5493416124513?text=Hola%20quiero%20información%20sobre%20el%20trámite%20de%20discapacidad.',
        colorClass: 'contact-btn-wsp',
    },
    {
        label: 'Correo Electrónico',
        desc: 'Envianos un email',
        icon: FaEnvelope,
        link: /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
            ? `mailto:auditoriametal2@smatarosario.com.ar?subject=${subject}`
            : `https://mail.google.com/mail/?view=cm&to=auditoriametal1@smatarosario.com.ar&su=${subject}&body=${body}`,
        colorClass: 'contact-btn-email',
    },
];

export default function Prestadores() {

    const [showContact, setShowContact] = useState(false);

    useEffect(() => {
        if (!showContact) return;
        const onKey = (e) => {
            if (e.key === 'Escape') setShowContact(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [showContact]);

    return (
        <>
            {/* ── MODAL CONTACTO DISCAPACIDAD ── */}
            {showContact && (
                <div className="dl-overlay" onClick={() => setShowContact(false)}>
                    <div className="dl-modal" onClick={e => e.stopPropagation()}>
                        <div className="dl-modal-header">
                            <h3>Contacto Discapacidad</h3>
                            <button className="dl-close" onClick={() => setShowContact(false)}>✕</button>
                        </div>
                        <p className="dl-modal-sub">Elegí cómo querés comunicarte con el área de Auditoría Médica.</p>
                        <ul className="dl-list">
                            {contactDiscapacidad.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <li key={i} className="dl-item">
                                        <div className="dl-item-info">
                                            <p className="dl-item-name">{item.label}</p>
                                            <p className="dl-item-desc">{item.desc}</p>
                                        </div>
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={`dl-item-btn ${item.colorClass}`}
                                        >
                                            <Icon />
                                            {item.label}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )}

            {/* ── INICIO ── */}
            <section className="hero-prestadores" id="inicio">
                <div className="prestadores-hero-bg" />
                <div className="prestadores-hero-content">
                    <h1 className="prestadores-hero-title">
                        Obra Social {' '}
                        <span className="accent">Osmata</span>{' '}
                    </h1>
                    <p className="prestadores-hero-sub">
                        Accedé de forma directa a los Beneficios que ofrece nuestra Obra Social.
                    </p>
                    <div className="prestadores-hero-btns">
                        <a className="prestadores-btn-primary" href='#centro-medico'>Centro Médico</a>
                        <a
                            href='https://sites.google.com/smatarosario.com.ar/prestadores/smatarosario'
                            target='_blank'
                            rel='noopener norefferer'
                            className="prestadores-btn-outline">
                            Ver Listado Completo de Prestadores
                            <FaArrowUpRightFromSquare />
                        </a>
                    </div>
                </div>
            </section>

            {/* ── INFORMACION ── */}
            <section className="informacion">
                <div className="section-header" />
                <div className="informacion-grid">
                    {informacion.map(({ icon: Icon, title, desc, link }) => (
                        <div className="informacion-card" key={title}>
                            <div className="informacion-icon">
                                <Icon size={30} />
                            </div>
                            <h3>{title}</h3>
                            <p>{desc}</p>
                            {link && (
                                <a href={link} className="informacion-card-btn">
                                    Ver más
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CENTRO MÉDICO ── */}
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

            {/* ── DISCAPACIDAD ── */}
            <section className='discapacidad' id='discapacidad'>
                <div className="dir-centro-info">
                    <span className="dir-centro-badge">UBICACIÓN DISCAPACIDAD</span>
                    <h2 className="dir-centro-title">Auditoría Médica</h2>
                    <div className="dir-centro-row">
                        <FaLocationDot className="dir-centro-icon" />
                        <span>Gorriti 1095,<br />S2000 Rosario, Santa Fe</span>
                    </div>

                    <div>
                        {requisitos.map((item, i) => (
                            <div className="requisito-discapacidad" key={i}>
                                <FaCheck size={20} color="#4CAF50" style={{ marginRight: '0.5rem' }} />
                                <span className='requisito-text'>{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className='discapacidad-btns'>
                        {/* Ahora abre el modal en lugar de ir directo a WhatsApp */}
                        <button
                            className='dir-disc-btn'
                            onClick={() => setShowContact(true)}
                        >
                            Contacto
                        </button>
                        <a
                            href='https://maps.app.goo.gl/SGtishKLUsPw2rhe9'
                            target="_blank"
                            rel="noreferrer"
                            className="dir-centro-btn"
                        >Cómo llegar</a>
                    </div>
                </div>

                <div className="dir-centro-mapa">
                    <iframe
                        title="centro SMATA Rosario"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.041998523815!2d-60.680641200000004!3d-32.9234886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b6535753100e95%3A0x80700f4d976e8183!2sAsociacion%20Mutual%20Rosario%20Metalmecanica%20Y%20Afines!5e0!3m2!1ses-419!2sar!4v1777299576283!5m2!1ses-419!2sar"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </section>
        </>
    );
}
