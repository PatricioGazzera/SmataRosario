import './Contact.css';
import {
    FaPhone,
    FaWhatsapp,
    FaEnvelope,
    FaClock,
    FaLocationDot,
    FaFax,
    FaUserTie,
    FaHospital,
    FaShop,
    FaMoneyBill,
    FaAddressCard,
    FaPills,
    FaHandsHelping,
    FaBellConcierge,
    FaGear,
    FaCheckToSlot,
    FaSuitcaseMedical,
    FaUniversalAccess,
    FaPaperPlane
} from '../../utils/icons/icons';

const areas = [
    {
        id: 'administracion',
        nombre: 'Administración',
        icon: FaUserTie,
        atencion: 'Lunes a Jueves, 08:00hs - 17:00hs / Viernes 08:00hs - 16:00hs',
        telefono: '341 6831506',
        whatsapp: '5493416655027',
        whatsappLabel: 'WhatsApp',
        email: 'administracion1@smatarosario.com.ar',
    },
    {
        id: 'mutual',
        nombre: 'Mutual',
        icon: FaShop,
        atencion: 'Lunes a Jueves, 08:00hs - 17:00hs / Viernes 08:00hs - 16:00hs',
        telefono: '341 3130317',
        whatsapp: '5493413130317',
        whatsappLabel: 'WhatsApp',
        email: 'mutual@smata-rosario.com.ar',
    },
    /* {
        id: 'accion-social',
        nombre: 'Acción Social',
        icon: FaHandsHelping,
        atencion: 'Lunes a Jueves, 08:00hs - 17:00hs / Viernes 08:00hs - 16:00hs',
        telefono: '341 444-7777',
        whatsapp: '5493414447777',
        whatsappLabel: 'WhatsApp',
        email: 'turismo@smata-rosario.com.ar',
    }, */
    {
        id: 'autorizaciones',
        nombre: 'Autorizaciones de Estudios',
        icon: FaCheckToSlot,
        atencion: 'Lunes a Jueves, 08:00hs - 17:00hs / Viernes 08:00hs - 16:00hs',
        telefono: '341 6901214',
        whatsapp: '5493416901214',
        whatsappLabel: 'WhatsApp Autorizaciones',
        email: 'centromedico2@smatarosario.com.ar',
    },
    {
        id: 'centro',
        nombre: 'Centro Médico',
        icon: FaHospital,
        atencion: 'Lunes a Jueves, 08:00hs - 17:00hs / Viernes 08:00hs - 16:00hs',
        telefono: '341 2555416',
        whatsapp: '5493412555416',
        whatsappLabel: 'WhatsApp Turnos',
        email: 'salud@osmata.com.ar',
    },
    {
        id: 'farmacia',
        nombre: 'Farmacia',
        icon: FaPills,
        atencion: 'Lunes a Jueves, 08:00hs - 17:00hs / Viernes 08:00hs - 16:00hs',
        telefono: '341 3750103',
        whatsapp: '5493413750103',
        whatsappLabel: 'WhatsApp Pedidos',
        farmacia: true,
    },
    {
        id: 'auditoria',
        nombre: 'Auditoria Médica',
        icon: FaSuitcaseMedical,
        atencion: 'Lunes a Jueves, 08:00hs - 17:00hs / Viernes 08:00hs - 16:00hs',
        telefono: '341 2555330',
        whatsapp: '5493412555330',
        whatsappLabel: 'WhatsApp Autorizaciones',
        email: 'auditoriametal1@smatarosario.com.ar',
    },
    {
        id: 'discapacidad',
        nombre: 'Discapacidad',
        icon: FaUniversalAccess,
        atencion: 'Lunes a Jueves, 08:00hs - 17:00hs / Viernes 08:00hs - 16:00hs',
        telefono: '341 6124513',
        whatsapp: '5493416124513',
        whatsappLabel: 'WhatsApp Discapacidad',
        email: 'auditoriametal1@smatarosario.com.ar',
    },
    {
        id: 'aportes',
        nombre: 'Sector Aportes',
        icon: FaMoneyBill,
        atencion: 'Lunes a Jueves, 08:00hs - 17:00hs / Viernes 08:00hs - 16:00hs',
        telefono: '341 6655032',
        whatsapp: '5493416655032',
        whatsappLabel: 'WhatsApp',
        email: 'controlaportes3@smatarosario.com.ar',
    },
    {
        id: 'afiliaciones',
        nombre: 'Afiliaciones',
        icon: FaAddressCard,
        atencion: 'Lunes a Jueves, 08:00hs - 17:00hs / Viernes 08:00hs - 16:00hs',
        telefono: '341 2555424',
        whatsapp: '5493412555424',
        whatsappLabel: 'WhatsApp Afiliaciones',
        email: 'afiliaciones@smatarosario.com.ar',
    },
    {
        id: 'mesa',
        nombre: 'Mesa de Entrada',
        icon: FaBellConcierge,
        atencion: 'Lunes a Jueves, 08:00hs - 17:00hs / Viernes 08:00hs - 16:00hs',
        telefono: '341 6186835',
        whatsapp: '5493416186835',
        whatsappLabel: 'WhatsApp Mesa de Entrada',
        email: 'entrada2@smatarosario.com.ar',
    },
    {
        id: 'gremiales',
        nombre: 'Gremiales',
        icon: FaGear,
        atencion: 'Lunes a Jueves, 08:00hs - 17:00hs / Viernes 08:00hs - 16:00hs',
        telefono: '341 4380095',
        whatsapp: '5493416186835',
        whatsappLabel: 'WhatsApp Gremiales',
        email: 'gremiales@smatarosario.com.ar',
    },
];

function AreaCard({ area }) {
    const Icon = area.icon;
    const subject = encodeURIComponent(`Consulta sobre ${area.nombre}.`);
    const message = encodeURIComponent(
        `Hola! Quiero información sobre ${area.nombre}.`
    );

    return (
        <div className={`dir-card ${area.urgencia ? 'dir-card--urgencia' : ''}`}>
            <div className="dir-card-header">
                <h3 className="dir-card-nombre">{area.nombre}</h3>
                <span className="dir-card-icon-wrap">
                    <Icon />
                </span>
            </div>

            <div className="dir-card-atencion">
                <div className='dir-card-atencion-top'>
                    <FaClock className="dir-meta-icon" />
                    <span className="dir-atencion-label">ATENCIÓN</span>
                </div>
                <span className="dir-atencion-valor">{area.atencion}</span>
            </div>

            <div className="dir-card-actions">
                <a
                    href={`tel:+${area.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className={"dir-action dir-action--tel"}
                >
                    <FaPhone className="dir-action-icon" />
                    <span className="dir-action-num">
                        {area.telefono}
                    </span>
                    <span className="dir-action-badge">{'Llamar'}</span>
                </a>

                <a
                    href={`https://wa.me/${area.whatsapp.replace(/\D/g, '')}?text=${message}`}
                    target="_blank"
                    rel="noreferrer"
                    className="dir-action dir-action--wa"
                >
                    <FaWhatsapp className="dir-action-icon" />
                    <span className="dir-action-num">{area.whatsappLabel}</span>
                    <span className="dir-action-badge">{'Envía un Mensaje'}</span>
                </a>

                {area.id !== 'farmacia' && (
                    <a
                        href={`https://mail.google.com/mail/?view=cm&to=${area.email}&su=${subject}`}
                        target="_blank"
                        rel="noreferrer"
                        className="dir-action dir-action--mail">
                        <FaEnvelope className="dir-action-icon" />
                        <span className="dir-action-email">{area.email}</span>
                        <span className="dir-action-icon"><FaPaperPlane /></span>
                    </a>
                )}
            </div>
        </div>
    );
}

export default function Contact() {
    return (
        <div className="dir-page">

            {/* ── HERO ── */}
            <section className="dir-hero">
                <div className="dir-hero-overlay" />
                <div className="dir-hero-content">
                    <h1 className="dir-hero-title">
                        Directorio de <span className='accent'>Contactos</span><br />de la Seccional
                    </h1>
                    <p className="dir-hero-sub">
                        Estamos para apoyarte. Encontrá todas las vías de contacto directo con cada
                        área de nuestra organización.
                    </p>
                </div>
            </section>

            {/* ── GRILLA DE ÁREAS ── */}
            <section className="dir-grid-section">
                <div className="dir-grid">
                    {areas.map((area) => (
                        <AreaCard key={area.id} area={area} />
                    ))}
                </div>
            </section>

            {/* ── SEDE ── */}
            <section className="dir-sede-section">
                <div className="dir-sede-info">
                    <span className="dir-sede-badge">UBICACIÓN CENTRAL</span>
                    <h2 className="dir-sede-title">Sede Rosario</h2>
                    <div className="dir-sede-row">
                        <FaLocationDot className="dir-sede-icon" />
                        <span>Gorriti 1046,<br />S2000 Rosario, Santa Fe</span>
                    </div>
                    <div className="dir-sede-row">
                        <FaPhone className="dir-sede-icon" />
                        <span>Contacto: +54 341 6831506</span>
                    </div>
                    <a
                    href='https://maps.app.goo.gl/SGtishKLUsPw2rhe9' 
                    target="_blank"
                    rel="noreferrer"
                    className="dir-sede-btn"
                    >Cómo llegar</a>
                </div>

                <div className="dir-sede-mapa">
                    <iframe
                        title="Sede SMATA Rosario"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3187.6995424950646!2d-60.682379924397075!3d-32.9233603707127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b653575b11a40d%3A0xdf6f2e27b39ce3eb!2sS.M.A.T.A.%20Seccional%20Rosario!5e1!3m2!1ses-419!2sar!4v1776866351987!5m2!1ses-419!2sar"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </section>

        </div>
    );
}