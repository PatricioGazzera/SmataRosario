import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaWifi, FaPersonSwimming, FaUtensils, FaWind,
    FaSquareParking, FaSpa, FaDumbbell, FaStar,
    FaSliders, FaChevronDown, FaMugHot, FaBreadSlice,
    FaEgg, FaTv
} from '../../utils/icons/icons';
import './Hotels.css';

export const SERVICIOS_MAP = {
    wifi: { label: 'Wi-Fi Libre', icon: <FaWifi /> },
    piscina: { label: 'Piscina', icon: <FaPersonSwimming /> },
    desayuno: { label: 'Desayuno', icon: <FaMugHot /> },
    pension_completa: { label: 'Pensión Completa', icon: <FaUtensils /> },
    media_pension: { label: 'Media Pensión', icon: <FaBreadSlice/> },
    aire: { label: 'Aire Central', icon: <FaWind /> },
    estacionamiento: { label: 'Estacionamiento', icon: <FaSquareParking /> },
    spa: { label: 'SPA', icon: <FaSpa /> },
    gimnasio: { label: 'Gimnasio', icon: <FaDumbbell /> },
    tv: { label: 'TV', icon: <FaTv /> },
    desayuno: { label: 'Desayuno', icon: <FaEgg /> }
};

// ─────────────────────────────────────────────────────────────
// ESTRUCTURA DE HABITACIONES
//
// Cada habitación puede tener múltiples "categorías de pasajero":
// { categoria: 'Mayor',        precio_afiliado: X, precio_invitado: Y }
// { categoria: 'Menor de 12',  precio_afiliado: X, precio_invitado: Y }
// { categoria: 'Menor de 6',   precio_afiliado: X, precio_invitado: Y }
// { categoria: 'Menor de 4',   precio_afiliado: 'Sin cargo', precio_invitado: 'Sin cargo' }
//
// Si el hotel tiene UN solo tipo de habitación, el array "habitaciones"
// tiene UN elemento con nombre 'Estándar' (o el que corresponda).
// Si tiene VARIOS tipos, hay múltiples elementos.
// ─────────────────────────────────────────────────────────────

export const HOTELES = [

    // ── 1. HOTEL 17 DE NOVIEMBRE ── datos reales
    {
        id: 1,
        nombre: 'Hotel 17 de Noviembre',
        destino: 'Mar del Plata',
        tipo: 'propio',
        rating: 4.8,
        precio_socio: 68600, // precio base (mayor afiliado) para mostrar en la card
        imagen_portada: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        imagenes: [
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80',
            'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&q=80',
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
            'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=400&q=80',
        ],
        descripcion: 'COMPLETAR — Descripción del Hotel 17 de Noviembre.',
        servicios: ['media_pension', 'wifi', 'estacionamiento', 'aire'],
        habitaciones: [
            {
                tipo: 'Estándar',
                desc: '',
                destacada: false,
                amenities: [], // COMPLETAR
                tarifas: [
                    { categoria: 'Mayor', precio_afiliado: 68600, precio_invitado: 85100, precio_particular: 95200 },
                    { categoria: 'Menor de 12', precio_afiliado: 61200, precio_invitado: 76200, precio_particular: 85700 },
                    { categoria: 'Menor de 6', precio_afiliado: 17500, precio_invitado: 21900, precio_particular: 24600 },
                    { categoria: 'Menor de 4', precio_afiliado: 'Sin cargo', precio_invitado: 'Sin cargo', precio_particular: 'Sin cargo' },
                ],
            },
        ],
        direccion: 'Boulevard Marítimo Patricio Peralta Ramos 3185, Mar del Plata, Buenos Aires, Argentina',
        mapa_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3141.8!2d-57.5559!3d-38.0023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBoulevard%20Mar%C3%ADtimo%203185%2C%20Mar%20del%20Plata!5e0!3m2!1ses!2sar!4v1700000000000',
        telefono: 'COMPLETAR',
        whatsapp: 'COMPLETAR',
        email: 'COMPLETAR',
        instagram: 'COMPLETAR',
        facebook: 'COMPLETAR',
    },

    // ── 2. SIERRAS HOTEL ── datos reales
    {
        id: 2,
        nombre: 'Sierras Hotel',
        destino: 'San Luis',
        tipo: 'propio',
        rating: 4.3,
        precio_socio: 38400,
        imagen_portada: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        imagenes: [
            'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=400&q=80',
            'https://images.unsplash.com/photo-1501117716987-c8c394bb29df?w=400&q=80',
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80',
            'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&q=80',
        ],
        descripcion: 'Rodeado de los atractivos turísticos más importantes de la región, se encuentra Sierras Hotel, un emprendimiento turístico que busca satisfacer todas las expectativas de quienes lo visitan, sin perder los valores tradicionales de familia y amistad que caracterizan a estos pagos puntanos.',
        servicios: ['wifi', 'desayuno', 'estacionamiento'],
        habitaciones: [
            {
                tipo: 'Estándar',
                desc: '',
                destacada: false,
                amenities: [], // COMPLETAR
                tarifas: [
                    { categoria: 'Mayor', precio_afiliado: 38400, precio_invitado: 48600 },
                    { categoria: 'Menor de 12', precio_afiliado: 28000, precio_invitado: 32400 },
                    { categoria: 'Menor de 3', precio_afiliado: 'Sin cargo', precio_afiliado: 'Sin cargo'}
                ],
            },
        ],
        direccion: 'COMPLETAR — Dirección Sierras Hotel, San Luis',
        mapa_embed: 'COMPLETAR',
        telefono: 'COMPLETAR',
        whatsapp: 'COMPLETAR',
        email: 'COMPLETAR',
        instagram: 'COMPLETAR',
        facebook: 'COMPLETAR',
    },

    // ── 3. HOTEL 17 DE OCTUBRE ── 2 tipos de habitación
    {
        id: 3,
        nombre: 'Hotel 17 de Octubre',
        destino: 'Lujan, San Luis',
        tipo: 'propio',
        rating: 4.7, // COMPLETAR
        precio_socio: 77500, // COMPLETAR — precio base para la card
        imagen_portada: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
        imagenes: [
            'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=400&q=80',
            'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&q=80',
            'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=400&q=80',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80',
        ],
        descripcion: 'COMPLETAR — Descripción del Hotel 17 de Octubre.',
        servicios: ['wifi', 'pension_completa', 'piscina'], // COMPLETAR
        habitaciones: [
            {
                tipo: 'Estándar',
                desc: '',
                destacada: false,
                amenities: [], // COMPLETAR
                tarifas: [
                    { categoria: 'Mayor', precio_afiliado: 77500, precio_invitado: 132500, precio_particular: 194500 }, // COMPLETAR
                    { categoria: 'Menor de 12', precio_afiliado: 53700, precio_invitado: 104200, precio_particular: 145900 }, // COMPLETAR
                    { categoria: 'Menor de 6', precio_afiliado: 37000, precio_invitado: 92600, precio_particular: 135900 }, // COMPLETAR
                    { categoria: 'Menor de 3', precio_afiliado: 'Sin Cargo', precio_invitado: 33100, precio_particular: 76400 }, // COMPLETAR
                ],
            },
            {
                tipo: 'Premium',
                desc: '',
                destacada: true,
                amenities: [], // COMPLETAR
                tarifas: [
                    { categoria: 'Mayor', precio_afiliado: 101800, precio_invitado: 172800, precio_particular: 251700 }, // COMPLETAR
                    { categoria: 'Menor de 12', precio_afiliado: 76800, precio_invitado: 135900, precio_particular: 193200 }, // COMPLETAR
                    { categoria: 'Menor de 6', precio_afiliado: 60800, precio_invitado: 99000, precio_particular: 143300 }, // COMPLETAR
                    { categoria: 'Menor de 3', precio_afiliado: 'Sin Cargo', precio_invitado: 43000, precio_particular: 89100 }, // COMPLETAR
                ],
            },
        ],
        direccion: 'COMPLETAR',
        mapa_embed: 'COMPLETAR',
        telefono: 'COMPLETAR',
        whatsapp: 'COMPLETAR',
        email: 'COMPLETAR',
        instagram: 'COMPLETAR',
        facebook: 'COMPLETAR',
    },

    // ── 4. HOTEL AVENIDA DEL MAR ── 1 tipo de habitación
    {
        id: 4,
        nombre: 'Hotel Avenida del Mar',
        destino: 'Mar del Plata',
        tipo: 'propio',
        rating: 4.0, // COMPLETAR
        precio_socio: 59100, // COMPLETAR
        imagen_portada: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
        imagenes: [
            'https://images.unsplash.com/photo-1587213811864-46e59f6873e1?w=400&q=80',
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80',
            'https://images.unsplash.com/photo-1455587734955-081b22074882?w=400&q=80',
            'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&q=80',
        ],
        descripcion: 'COMPLETAR — Descripción del Hotel Avenida del Mar.',
        servicios: [ 'wifi', 'desayuno',  ], // COMPLETAR
        habitaciones: [
            {
                tipo: 'Estándar',
                desc: '',
                destacada: true,
                amenities: [], // COMPLETAR
                tarifas: [
                    { categoria: 'Mayor', precio_afiliado: 59100, precio_invitado: 80500, precio_particular: 89400 }, // COMPLETAR
                    { categoria: 'Menor de 12', precio_afiliado: 53500, precio_invitado: 72200, precio_particular: 81500 }, // COMPLETAR
                    { categoria: 'Menor de 6', precio_afiliado: 15800, precio_invitado: 19600, precio_particular: 22400 }, // COMPLETAR
                    { categoria: 'Menor de 4', precio_afiliado: 'Sin Cargo', precio_invitado: 'Sin Cargo', precio_particular: 'Sin Cargo' }, // COMPLETAR
                    { categoria: 'Single Mayor', precio_afiliado: 85900, precio_invitado: 116200, precio_particular: 129900 }, // COMPLETAR
                ],
            },
        ],
        direccion: 'COMPLETAR',
        mapa_embed: 'COMPLETAR',
        telefono: 'COMPLETAR',
        whatsapp: 'COMPLETAR',
        email: 'COMPLETAR',
        instagram: 'COMPLETAR',
        facebook: 'COMPLETAR',
    },

    // ── 5. HOTEL BIONDIS ── 2 tipos de habitación
    {
        id: 5,
        nombre: 'Hotel Biondis',
        destino: 'Valle Hermoso, Córdoba',
        tipo: 'propio',
        rating: 4.0, // COMPLETAR
        precio_socio: 37000, // COMPLETAR
        imagen_portada: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
        imagenes: [
            'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=80',
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80',
            'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&q=80',
            'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&q=80',
        ],
        descripcion: 'COMPLETAR — Descripción del Hotel Biondis.',
        servicios: [], // COMPLETAR
        habitaciones: [
            {
                tipo: 'Estándar',
                desc: '',
                destacada: false,
                amenities: [], // COMPLETAR
                tarifas: [
                    { categoria: 'Mayor con desayuno', precio_afiliado: 37000, precio_invitado: '-', precio_particular: '-' }, // COMPLETAR
                    { categoria: 'Menor de 9 años con Desayuno', precio_afiliado: 18500, precio_invitado: '-', precio_particular: '-' }, // COMPLETAR
                    { categoria: 'Mayor con Media Pensión', precio_afiliado: 50000, precio_invitado: '-', precio_particular: '-' }, // COMPLETAR
                    { categoria: 'Menor con Media Pensión', precio_afiliado: 25000, precio_invitado: '-', precio_particular: '-' }, // COMPLETAR
                    { categoria: 'Menor de 3 años', precio_afiliado: 'Sin Cargo', precio_invitado: '-', precio_particular: '-' }, // COMPLETAR
                ],
            },
            {
                tipo: 'Superior',
                desc: '',
                destacada: true,
                amenities: [], // COMPLETAR
                tarifas: [
                    { categoria: 'Mayor con desayuno', precio_afiliado: 46000, precio_invitado: '-', precio_particular: '-' }, // COMPLETAR
                    { categoria: 'Menor de 9 años con Desayuno', precio_afiliado: 23000, precio_invitado: '-', precio_particular: '-' }, // COMPLETAR
                    { categoria: 'Mayor con Media Pensión', precio_afiliado: 59000, precio_invitado: '-', precio_particular: '-' }, // COMPLETAR
                    { categoria: 'Menor con Media Pensión', precio_afiliado: 29500, precio_invitado: '-', precio_particular: '-' }, // COMPLETAR
                    { categoria: 'Menor de 3 años', precio_afiliado: 'Sin Cargo', precio_invitado: '-', precio_particular: '-' },
                ],
            },
        ],
        direccion: 'COMPLETAR',
        mapa_embed: 'COMPLETAR',
        telefono: 'COMPLETAR',
        whatsapp: 'COMPLETAR',
        email: 'COMPLETAR',
        instagram: 'COMPLETAR',
        facebook: 'COMPLETAR',
    },

    // ── 6. CONTE HOTEL ── 5 tipos de habitación
    {
        id: 6,
        nombre: 'Conte Hotel',
        destino: 'Buenos Aires',
        tipo: 'propio',
        rating: 4.0, // COMPLETAR
        precio_socio: 95000, // COMPLETAR
        imagen_portada: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        imagenes: [
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80',
            'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=400&q=80',
            'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&q=80',
            'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&q=80',
        ],
        descripcion: 'COMPLETAR — Descripción del Conte Hotel.',
        servicios: [], // COMPLETAR
        habitaciones: [
            {
                tipo: 'Single/Doble Estándar',
                desc: '',
                destacada: false,
                amenities: [],
                tarifas: [
                    { categoria: 'Mayor', precio_afiliado: 95000, precio_invitado: '-', precio_particular: '-' },
                    { categoria: 'Menor de 3', precio_afiliado: 'Sin Cargo', precio_invitado: '-', precio_particular: '-' },
                ],
            },
            {
                tipo: 'Single/Doble Superior',
                desc: 'COMPLETAR',
                destacada: true,
                amenities: [],
                tarifas: [
                    { categoria: 'Mayor', precio_afiliado: 110000, precio_invitado: '-', precio_particular: '-' },
                    { categoria: 'Menor de 3', precio_afiliado: 'Sin Cargo', precio_invitado: '-', precio_particular: '-' },
                ],
            },
            {
                tipo: 'Triple Estándar',
                desc: 'COMPLETAR',
                destacada: false,
                amenities: [],
                tarifas: [
                    { categoria: 'Mayor', precio_afiliado: 125000, precio_invitado: '-', precio_particular: '-' },
                    { categoria: 'Menor de 3', precio_afiliado: 'Sin Cargo', precio_invitado: '-', precio_particular: '-' },
                ],
            },
            {
                tipo: 'Suite Junior',
                desc: 'COMPLETAR',
                destacada: false,
                amenities: [],
                tarifas: [
                    { categoria: 'Mayor', precio_afiliado: 120000, precio_invitado: '-', precio_particular: '-' },
                    { categoria: 'Menor de 3', precio_afiliado: 'Sin Cargo', precio_invitado: '-', precio_particular: '-' },
                ],
            },
            {
                tipo: 'Suite Ejecutiva',
                desc: 'COMPLETAR',
                destacada: false,
                amenities: [],
                tarifas: [
                    { categoria: 'Mayor', precio_afiliado: 140000, precio_invitado: '-', precio_particular: '-' },
                    { categoria: 'Menor de 3', precio_afiliado: 'Sin Cargo', precio_invitado: '-', precio_particular: '-' },
                ],
            },
        ],
        direccion: 'COMPLETAR',
        mapa_embed: 'COMPLETAR',
        telefono: 'COMPLETAR',
        whatsapp: 'COMPLETAR',
        email: 'COMPLETAR',
        instagram: 'COMPLETAR',
        facebook: 'COMPLETAR',
    },

    // ── 7. EL NIHUIL ── 5 tipos de habitación
    {
        id: 7,
        nombre: 'El Nihuil',
        destino: 'COMPLETAR',
        tipo: 'propio',
        rating: 0.0, // COMPLETAR
        precio_socio: 0, // COMPLETAR
        imagen_portada: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80',
        imagenes: [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
            'https://images.unsplash.com/photo-1501117716987-c8c394bb29df?w=400&q=80',
            'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&q=80',
            'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80',
        ],
        descripcion: 'COMPLETAR — Descripción de El Nihuil.',
        servicios: [], // COMPLETAR
        habitaciones: [
            {
                tipo: 'Estándar',
                desc: 'COMPLETAR',
                destacada: false,
                amenities: [],
                tarifas: [
                    { categoria: 'Mayor', precio_afiliado: 62700, precio_invitado: 86100 },
                    { categoria: 'Menor de 12', precio_afiliado: 39500, precio_invitado: 55800 },
                    { categoria: 'Menor de 6', precio_afiliado: 19200, precio_invitado: 37400 },
                    { categoria: 'Menor de 3', precio_afiliado: 'Sin Cargo', precio_invitado: 'Sin Cargo' },
                ],
            },
        ],
        direccion: 'COMPLETAR',
        mapa_embed: 'COMPLETAR',
        telefono: 'COMPLETAR',
        whatsapp: 'COMPLETAR',
        email: 'COMPLETAR',
        instagram: 'COMPLETAR',
        facebook: 'COMPLETAR',
    },
];

export const CONVENIOS = [
    { id: 101, nombre: 'Patagonia Resort & Spa', destino: 'Bariloche', tipo: 'convenio', rating: 4.7, precio_socio: 28000, descuento: '30% OFF', imagen_portada: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80', servicios: ['wifi', 'piscina', 'spa', 'gimnasio', 'desayuno'], descripcion: 'Resort de montaña con vistas al lago Nahuel Huapi. Descuento del 30% para afiliados SMATA.', habitaciones: [], direccion: 'Av. Bustillo km 8.5, Bariloche', mapa_embed: '', telefono: '', whatsapp: '', email: '', instagram: '', facebook: '' },
    { id: 102, nombre: 'Iguazú Grand Hotel', destino: 'Puerto Iguazú', tipo: 'convenio', rating: 4.8, precio_socio: 24500, descuento: '25% OFF', imagen_portada: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80', servicios: ['wifi', 'piscina', 'aire', 'desayuno'], descripcion: 'A pasos de las Cataratas del Iguazú con tarifas preferenciales para socios.', habitaciones: [], direccion: 'Ruta 12 km 1640, Puerto Iguazú', mapa_embed: '', telefono: '', whatsapp: '', email: '', instagram: '', facebook: '' },
    { id: 103, nombre: 'Cabañas Fin del Mundo', destino: 'Ushuaia', tipo: 'convenio', rating: 4.5, precio_socio: 32000, descuento: '20% OFF', imagen_portada: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80', servicios: ['wifi', 'estacionamiento', 'desayuno'], descripcion: 'Cabañas de montaña en el confín del mundo con naturaleza patagónica premium.', habitaciones: [], direccion: 'Los Ñires 2850, Ushuaia', mapa_embed: '', telefono: '', whatsapp: '', email: '', instagram: '', facebook: '' },
    { id: 104, nombre: 'Mendoza Wine Resort', destino: 'Mendoza', tipo: 'convenio', rating: 4.6, precio_socio: 21000, descuento: '35% OFF', imagen_portada: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80', servicios: ['wifi', 'piscina', 'spa', 'aire'], descripcion: 'En el corazón vitivinícola argentino. Bodegas, spa y gastronomía de primer nivel.', habitaciones: [], direccion: 'Luján de Cuyo, Mendoza', mapa_embed: '', telefono: '', whatsapp: '', email: '', instagram: '', facebook: '' },
];

export const TODOS_LOS_HOTELES = [...HOTELES, ...CONVENIOS];

const DESTINOS = ['Todos', 'Mar del Plata', 'Villa Carlos Paz', 'Salta Capital', 'San Luis', 'Córdoba', 'Bariloche', 'Puerto Iguazú', 'Ushuaia', 'Mendoza'];
const SERVICIOS = ['wifi', 'piscina', 'desayuno', 'media_pension', 'aire', 'estacionamiento', 'spa', 'gimnasio'];
const ORDEN_OPTS = ['Recomendados', 'Precio: menor a mayor', 'Precio: mayor a menor', 'Mejor puntuación'];
const PAGE_SIZE = 6;

export default function Hotels() {
    const navigate = useNavigate();
    const [tab, setTab] = useState('propios');
    const [destino, setDestino] = useState('Todos');
    const [serviciosFil, setServiciosFil] = useState([]);
    const [precioMax, setPrecioMax] = useState(100000);
    const [orden, setOrden] = useState('Recomendados');
    const [page, setPage] = useState(1);

    const toggleServicio = s => setServiciosFil(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);
    const limpiar = () => { setDestino('Todos'); setServiciosFil([]); setPrecioMax(100000); setOrden('Recomendados'); setPage(1); };

    const base = tab === 'propios' ? HOTELES : CONVENIOS;

    const filtered = useMemo(() => {
        let l = [...base];
        if (destino !== 'Todos') l = l.filter(h => h.destino === destino);
        if (serviciosFil.length) l = l.filter(h => serviciosFil.every(s => h.servicios.includes(s)));
        l = l.filter(h => h.precio_socio <= precioMax);
        if (orden === 'Precio: menor a mayor') l.sort((a, b) => a.precio_socio - b.precio_socio);
        if (orden === 'Precio: mayor a menor') l.sort((a, b) => b.precio_socio - a.precio_socio);
        if (orden === 'Mejor puntuación') l.sort((a, b) => b.rating - a.rating);
        return l;
    }, [base, destino, serviciosFil, precioMax, orden]);

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const goPage = p => { setPage(p); document.getElementById('ht-grid-anchor')?.scrollIntoView({ behavior: 'smooth' }); };
    const goTab = t => { setTab(t); setPage(1); };

    return (
        <div className="ht-root">

            {/* HERO */}
            <section className="ht-hero">
                <div className="ht-hero-overlay" />
                <div className="ht-hero-content">
                    <h1 className="ht-hero-title">Hoteles y Turismo <span className="accent">SMATA</span></h1>
                    <p className="ht-hero-sub">Descubrí los destinos exclusivos de SMATA con la calidad y el confort que te merecés.</p>
                    <div className="ht-hero-btns">
                        <button className="ht-btn-primary" onClick={() => document.getElementById('ht-grid-anchor')?.scrollIntoView({ behavior: 'smooth' })}>Explorar Ahora</button>
                        <button className="ht-btn-outline" onClick={() => goTab('convenios')}>Ver Convenios</button>
                    </div>
                </div>
            </section>

            {/* TABS */}
            <div className="ht-tabs">
                <div className="ht-tabs-inner">
                    <button className={`ht-tab ${tab === 'propios' ? 'active' : ''}`} onClick={() => goTab('propios')}>Hoteles Propios <span className="ht-tab-count">{HOTELES.length}</span></button>
                    <button className={`ht-tab ${tab === 'convenios' ? 'active' : ''}`} onClick={() => goTab('convenios')}>Convenios <span className="ht-tab-count">{CONVENIOS.length}</span></button>
                </div>
            </div>

            {/* MAIN */}
            <div className="ht-main" id="ht-grid-anchor">

                {/* SIDEBAR */}
                <aside className="ht-sidebar">
                    <div className="ht-sidebar-title"><FaSliders /> Filtros</div>

                    <div className="ht-filter-block">
                        <div className="ht-filter-label">DESTINO</div>
                        {DESTINOS.map(d => (
                            <label key={d} className="ht-check-row">
                                <input type="checkbox" checked={destino === d} onChange={() => { setDestino(d); setPage(1); }} />
                                <span className="ht-checkmark" />
                                <span>{d}</span>
                            </label>
                        ))}
                    </div>

                    <div className="ht-filter-block">
                        <div className="ht-filter-label">RANGO DE PRECIO</div>
                        <input type="range" min={10000} max={100000} step={1000} value={precioMax}
                            onChange={e => { setPrecioMax(Number(e.target.value)); setPage(1); }} className="ht-range" />
                        <div className="ht-range-labels">
                            <span>$10.000</span>
                            <span>${precioMax >= 100000 ? '100.000+' : precioMax.toLocaleString('es-AR')}</span>
                        </div>
                    </div>

                    <div className="ht-filter-block">
                        <div className="ht-filter-label">SERVICIOS</div>
                        {SERVICIOS.map(s => (
                            <label key={s} className="ht-check-row">
                                <input type="checkbox" checked={serviciosFil.includes(s)} onChange={() => { toggleServicio(s); setPage(1); }} />
                                <span className="ht-checkmark" />
                                <span className="ht-check-icon">{SERVICIOS_MAP[s]?.icon}</span>
                                <span>{SERVICIOS_MAP[s]?.label}</span>
                            </label>
                        ))}
                    </div>

                    <button className="ht-btn-clear" onClick={limpiar}>Limpiar Filtros</button>
                </aside>

                {/* CONTENIDO */}
                <div className="ht-content">
                    <div className="ht-content-bar">
                        <span className="ht-count">Mostrando <strong>{filtered.length}</strong> {tab === 'propios' ? 'hoteles' : 'convenios'}</span>
                        <div className="ht-orden">
                            <span>Ordenar por:</span>
                            <div className="ht-select-wrap">
                                <select value={orden} onChange={e => { setOrden(e.target.value); setPage(1); }}>
                                    {ORDEN_OPTS.map(o => <option key={o}>{o}</option>)}
                                </select>
                                <span className="ht-select-chevron"><FaChevronDown /></span>
                            </div>
                        </div>
                    </div>

                    {paginated.length === 0 && (
                        <div className="ht-empty">No hay alojamientos que coincidan con los filtros seleccionados.</div>
                    )}

                    <div className="ht-grid">
                        {paginated.map(h => (
                            <div className="ht-card" key={h.id} onClick={() => navigate(`/turismo/${h.id}`)}>
                                <div className="ht-card-img">
                                    <img src={h.imagen_portada} alt={h.nombre} />
                                    <span className="ht-card-rating"><FaStar />{h.rating}</span>
                                    {h.tipo === 'propio' && <span className="ht-card-badge">PROPIO SMATA</span>}
                                    {h.tipo === 'convenio' && <span className="ht-card-badge ht-conv">{h.descuento}</span>}
                                </div>
                                <div className="ht-card-body">
                                    <div className="ht-card-dest">{h.destino}</div>
                                    <h3 className="ht-card-name">{h.nombre}</h3>
                                    <div className="ht-card-svcs">
                                        {h.servicios.slice(0, 3).map(s => (
                                            <span key={s} className="ht-svc" title={SERVICIOS_MAP[s]?.label}>
                                                {SERVICIOS_MAP[s]?.icon}
                                                <small>{SERVICIOS_MAP[s]?.label}</small>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="ht-card-footer">
                                        <div className="ht-precio">
                                            <span className="ht-precio-label">Precio Socio / día</span>
                                            <span className="ht-precio-val">${h.precio_socio.toLocaleString('es-AR')}</span>
                                            <span className="ht-precio-noche">por persona</span>
                                        </div>
                                        <button className="ht-btn-ver">Ver<br />Disponibilidad</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="ht-pagination">
                            <button className="ht-pag-btn" onClick={() => goPage(Math.max(1, page - 1))} disabled={page === 1}>‹</button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                <button key={p} className={`ht-pag-btn ${p === page ? 'active' : ''}`} onClick={() => goPage(p)}>{p}</button>
                            ))}
                            <button className="ht-pag-btn" onClick={() => goPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>›</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}