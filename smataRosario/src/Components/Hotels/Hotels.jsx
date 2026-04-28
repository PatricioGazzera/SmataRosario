import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaWifi, FaPersonSwimming, FaUtensils, FaWind,
    FaSquareParking, FaSpa, FaDumbbell, FaStar,
    FaSliders, FaChevronDown, FaMugHot, FaBreadSlice,
    FaEgg, FaTv
} from '../../utils/icons/icons';
import './Hotels.css';

// 17 de Noviembre
import portadaImg17 from "../../utils/images/17 de noviembre/portada.jpg"
import habitacionImg1 from "../../utils/images/17 de noviembre/habitacion1.jpeg"
import habitacionImg2 from "../../utils/images/17 de noviembre/habitacion2.jpeg"
import vistaImg17 from "../../utils/images/17 de noviembre/vista.jpg"
import desayunoImg17 from "../../utils/images/17 de noviembre/desayuno.jpg"

// Sierras Hotel
import portadaImgSH from "../../utils/images/Las Sierras/portada1.jpg"
import habitacionImgSH from "../../utils/images/Las Sierras/habitacion1.jpg"
import comedorImgSH from "../../utils/images/Las Sierras/comedor1.jpg"
import livingImgSH from "../../utils/images/Las Sierras/living1.jpg"
import piletaImgSH from "../../utils/images/Las Sierras/pileta1.jpg"

// 17 de Octubre
import portada17 from "../../utils/images/17 de octubre/portada17.jpg"
import hotel17 from "../../utils/images/17 de octubre/hotel17.jpg"
import habitacion17 from "../../utils/images/17 de octubre/habitacion17.jpg"
import baño17 from "../../utils/images/17 de octubre/baño17.jpg"
import pileta17 from "../../utils/images/17 de octubre/pileta2-17.jpg"

//Avenida del Mar
import portadaAV from "../../utils/images/Avenida del mar/portadaAV.jpeg"
import habitacionAV from "../../utils/images/Avenida del mar/habitacionAV.jpg"
import comedorAV from "../../utils/images/Avenida del mar/comedorAV.jpg"
import desayunoAV from "../../utils/images/Avenida del mar/desayunoAV.jpg"
import vistaAV from "../../utils/images/Avenida del mar/vistaAV.jpg"

// Hotel Biondis
import portadaHB from "../../utils/images/Hotel biondis/portadaHB.jpg"
import habitacion1HB from "../../utils/images/Hotel biondis/habitacion1HB.jpg"
import habitacion2HB from "../../utils/images/Hotel biondis/habitacion2HB.jpg"
import bañoHB from "../../utils/images/Hotel biondis/bañoHB.jpg"
import piletaHB from "../../utils/images/Hotel biondis/piletaHB.jpg"

// Conte Hotel
import portadaCH from "../../utils/images/Conte Hotel/portadaCH.jpeg"
import exteriorCH from "../../utils/images/Conte Hotel/exteriorCH.jpg"
import comedorCH from "../../utils/images/Conte Hotel/comedorCH.jpg"
import desayunoCH from "../../utils/images/Conte Hotel/desayunoCH.jpg"
import habitacionCH from "../../utils/images/Conte Hotel/habitacionCH.jpg"

// El Nihuil
import portadaEN from "../../utils/images/El Nihuil/portadaEN.jpg"
import habitacionEN from "../../utils/images/El Nihuil/habitacionEN.jpeg"
import bañoEN from "../../utils/images/El Nihuil/bañoEN.jpeg"
import comedorEN from "../../utils/images/El Nihuil/comedorEN.jpeg"
import piletaEN from "../../utils/images/El Nihuil/piletaEN.png"

// Convenios
import portadaTDS from "../../utils/images/Convenios/tierraDelSol.png"
import portadaCBM from "../../utils/images/Convenios/cbym.jpg"
import portadaCVC from "../../utils/images/Convenios/cvc.jpg"
import portadaHL from "../../utils/images/Convenios/hotelLujan.jpg"


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

export const HOTELES = [

    // ── 1. HOTEL 17 DE NOVIEMBRE ── datos reales
    {
        id: 1,
        nombre: 'Hotel 17 de Noviembre',
        destino: 'Mar del Plata',
        tipo: 'propio',
        rating: 4.8,
        precio_socio: 68600, // precio base (mayor afiliado) para mostrar en la card
        imagen_portada: portadaImg17,
        imagenes: [
            habitacionImg1,
            habitacionImg2,
            vistaImg17,
            desayunoImg17,
        ],
        descripcion: 'Ubicado en una posición privilegiada frente al mar y al icónico Torreón del Monje, el Hotel Punta Piedras "17 de Noviembre" es tu destino soñado en Mar del Plata. Despierta cada mañana con una vista inigualable al Atlántico y disfruta de instalaciones confortables, ideales para descansar en pareja o familia. Nuestra ubicación estratégica te permite estar a un paso de las mejores playas y puntos turísticos de la ciudad. ¡Vení a disfrutar de una estadía inolvidable donde el relax y la belleza costera se encuentran!',
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
        mapa_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.194434754323!2d-57.53342379999999!3d-38.0087136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584dd80fcd64b37%3A0xb46a8c726d273f48!2sHotel%20Punta%20Piedras!5e1!3m2!1ses-419!2sar!4v1777379025206!5m2!1ses-419!2sar',
        telefono: '341 683-1506',
        whatsapp: '341 683-1506',
        email: 'administracion@smatarosario.com.ar',
        instagram: 'puntapiedrashotel',
        facebook: 'puntapiedrashotel',
    },

    // ── 2. SIERRAS HOTEL ── datos reales
    {
        id: 2,
        nombre: 'Sierras Hotel',
        destino: 'San Luis',
        tipo: 'propio',
        rating: 4.3,
        precio_socio: 38400,
        imagen_portada: portadaImgSH,
        imagenes: [
            habitacionImgSH,
            comedorImgSH,
            livingImgSH,
            piletaImgSH,
        ],
        descripcion: 'Rodeado de los atractivos turísticos más importantes de la región, se encuentra Sierras Hotel, un emprendimiento turístico que busca satisfacer todas las expectativas de quienes lo visitan, sin perder los valores tradicionales de familia y amistad que caracterizan a estos pagos puntanos.',
        servicios: ['wifi', 'desayuno', 'piscina', 'estacionamiento'],
        habitaciones: [
            {
                tipo: 'Estándar',
                desc: '',
                destacada: false,
                amenities: [], // COMPLETAR
                tarifas: [
                    { categoria: 'Mayor', precio_afiliado: 38400, precio_invitado: 48600, precio_particular: '-' },
                    { categoria: 'Menor de 12', precio_afiliado: 28000, precio_invitado: 32400, precio_particular: '-' },
                    { categoria: 'Menor de 3', precio_afiliado: 'Sin cargo', precio_invitado: 'Sin cargo', precio_particular: '-'}
                ],
            },
        ],
        direccion: 'Las Calandrias 100, Las Chacras, Juana Koslay',
        mapa_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3175.264428021916!2d-66.23325369999999!3d-33.266955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d415f4b81b104d%3A0x9a426bad3f1455cd!2sSierras%20Hotel%20-%20Las%20Chacras%2FJuana%20Koslay!5e1!3m2!1ses-419!2sar!4v1777378632908!5m2!1ses-419!2sar',
        telefono: '341 683-1506',
        whatsapp: '341 683-1506',
        email: 'administracion@smatarosario.com.ar',
        instagram: 'sierrashotel',
        facebook: 'SierrasHotelLasChacras',
    },

    // ── 3. HOTEL 17 DE OCTUBRE ── 2 tipos de habitación
    {
        id: 3,
        nombre: 'Hotel 17 de Octubre',
        destino: 'San Luis',
        tipo: 'propio',
        rating: 4.7, // COMPLETAR
        precio_socio: 77500, // COMPLETAR — precio base para la card
        imagen_portada: portada17,
        imagenes: [
            hotel17,
            habitacion17,
            baño17,
            pileta17,
        ],
        descripcion: 'Ubicada en la localidad de Luján, nuestra Hostería 17 de Octubre es el destino ideal para quienes buscan desconectar en medio de la paz de las sierras puntanas. Rodeada de un extenso entorno natural, ofrecemos instalaciones pensadas para el disfrute familiar, destacando nuestra pileta climatizada y espacios recreativos al aire libre. Vení a vivir una estadía de pleno descanso y confort, con la atención cálida y el servicio integral que nos caracteriza. ¡Te esperamos para compartir momentos inolvidables en San Luis!',
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
        direccion: 'Ruta 20 y 146, Coronel Loyola, Luján, San Luis',
        mapa_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3206.652610243943!2d-65.93487139999999!3d-32.39345430000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d4a6ae5564bb17%3A0x15d391c1bdbd14a!2sHosteria%2017%20de%20octubre%20(smata)!5e1!3m2!1ses-419!2sar!4v1777378060332!5m2!1ses-419!2sar',
        telefono: '341 683-1506',
        whatsapp: '341 683-1506',
        email: 'administracion@smatarosario.com.ar',
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
        imagen_portada: portadaAV,
        imagenes: [
            habitacionAV,
            comedorAV,
            desayunoAV,
            vistaAV,
        ],
        descripcion: 'Ubicado en el corazón de Mar del Plata, nuestro hotel es el punto de encuentro perfecto entre el relax de la playa y la vibrante vida céntrica. A solo metros del mar y del emblemático Casino Central, te ofrecemos la comodidad que buscas para disfrutar de una estadía inolvidable en familia. Disfruta de una ubicación privilegiada, instalaciones renovadas y la calidez de un servicio diseñado para que tu descanso sea total. ¡Vení a vivir la experiencia de la costa con nosotros!',
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
        direccion: 'Av. Pedro Luro, Centro 2252, B7600GTO Mar del Plata, Provincia de Buenos Aires',
        mapa_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.5320363994624!2d-57.5429604!3d-38.0004412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584dc1a88a53c79%3A0xcc492dd3ca7edb42!2sHotel%20Avenida%20del%20Mar!5e1!3m2!1ses-419!2sar!4v1777377835388!5m2!1ses-419!2sar',
        telefono: '341 683-1506',
        whatsapp: '341 683-1506',
        email: 'administracion@smatarosario.com.ar',
        instagram: ' ',
        facebook: 'avenidadelmarhotel',
    },

    // ── 5. HOTEL BIONDIS ── 2 tipos de habitación
    {
        id: 5,
        nombre: 'Hotel Biondis',
        destino: 'Córdoba',
        tipo: 'propio',
        rating: 4.0, // COMPLETAR
        precio_socio: 37000, // COMPLETAR
        imagen_portada: portadaHB,
        imagenes: [
            habitacion1HB,
            habitacion2HB,
            bañoHB,
            piletaHB,
        ],
        descripcion: 'Descubre el Hotel Biondis, tu refugio de descanso en el corazón de Valle Hermoso, rodeado por la magia natural de las sierras cordobesas. Disfruta de una estadía familiar con piscina al aire libre, quincho con asador y la calidez de un servicio pensado para tu bienestar. Es el destino ideal para quienes buscan desconectar y reconectar con la naturaleza en un entorno auténtico y acogedor. ¡Te esperamos para vivir unas vacaciones inolvidables en el Valle de Punilla!',
        servicios: ['piscina', 'wifi', 'estacionamiento', 'desayuno'], // COMPLETAR
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
        direccion: 'Av. Gral Paz 186 - Valle Hermoso - Córdoba',
        mapa_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3251.065085421038!2d-64.4836122!3d-31.120300999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942d82ead5871651%3A0x7aca75930dfb9008!2sHotel%20Biondis!5e1!3m2!1ses-419!2sar!4v1777377728261!5m2!1ses-419!2sar',
        telefono: '341 683-1506',
        whatsapp: '341 683-1506',
        email: 'administracion@smatarosario.com.ar',
        instagram: 'hotelbiondis',
        facebook: 'HotelBiondis',
    },

    // ── 6. CONTE HOTEL ── 5 tipos de habitación
    {
        id: 6,
        nombre: 'Conte Hotel',
        destino: 'Buenos Aires',
        tipo: 'externo',
        rating: 4.0, // COMPLETAR
        precio_socio: 95000, // COMPLETAR
        imagen_portada: portadaCH,
        imagenes: [
            exteriorCH,
            comedorCH,
            desayunoCH,
            habitacionCH,
        ],
        descripcion: 'Ubicado a pasos del emblemático Obelisco, el Conte Hotel es el punto de partida ideal para vivir Buenos Aires en todo su esplendor. Disfruta de habitaciones confortables, un desayuno buffet completo y la atención dedicada del personal en el corazón de la ciudad. Con una ubicación estratégica inmejorable y servicios pensados para tu bienestar, somos tu mejor opción tanto para viajes de negocios como de turismo. ¡Vení a descubrir la verdadera esencia porteña hospedándote con nosotros!',
        servicios: ['wifi', 'desayuno', 'aire'], // COMPLETAR
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
                desc: '',
                destacada: true,
                amenities: [],
                tarifas: [
                    { categoria: 'Mayor', precio_afiliado: 110000, precio_invitado: '-', precio_particular: '-' },
                    { categoria: 'Menor de 3', precio_afiliado: 'Sin Cargo', precio_invitado: '-', precio_particular: '-' },
                ],
            },
            {
                tipo: 'Triple Estándar',
                desc: '',
                destacada: false,
                amenities: [],
                tarifas: [
                    { categoria: 'Mayor', precio_afiliado: 125000, precio_invitado: '-', precio_particular: '-' },
                    { categoria: 'Menor de 3', precio_afiliado: 'Sin Cargo', precio_invitado: '-', precio_particular: '-' },
                ],
            },
            {
                tipo: 'Suite Junior',
                desc: '',
                destacada: false,
                amenities: [],
                tarifas: [
                    { categoria: 'Mayor', precio_afiliado: 120000, precio_invitado: '-', precio_particular: '-' },
                    { categoria: 'Menor de 3', precio_afiliado: 'Sin Cargo', precio_invitado: '-', precio_particular: '-' },
                ],
            },
            {
                tipo: 'Suite Ejecutiva',
                desc: '',
                destacada: false,
                amenities: [],
                tarifas: [
                    { categoria: 'Mayor', precio_afiliado: 140000, precio_invitado: '-', precio_particular: '-' },
                    { categoria: 'Menor de 3', precio_afiliado: 'Sin Cargo', precio_invitado: '-', precio_particular: '-' },
                ],
            },
        ],
        direccion: 'Carlos Pellegrini 101, C1009 Cdad. Autónoma de Buenos Aires',
        mapa_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3125.676121269136!2d-58.380647599999996!3d-34.607092699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccad0282e80ef%3A0x8ec181c3d5f349fa!2sConte%20Hotel!5e1!3m2!1ses-419!2sar!4v1777376529987!5m2!1ses-419!2sar',
        telefono: '341 683-1506',
        whatsapp: '341 683-1506',
        email: 'administracion@smatarosario.com.ar',
        instagram: 'conte.hotel',
        facebook: ' ',
    },

    // ── 7. EL NIHUIL ── 5 tipos de habitación
    {
        id: 7,
        nombre: 'El Nihuil',
        destino: 'Mendoza',
        tipo: 'propio',
        rating: 4.5, // COMPLETAR
        precio_socio: 62700, // COMPLETAR
        imagen_portada: portadaEN,
        imagenes: [
            habitacionEN,
            bañoEN,
            comedorEN,
            piletaEN,
        ],
        descripcion: 'Ubicado frente al imponente Lago El Nihuil, nuestro hotel es el refugio ideal para conectar con la naturaleza y el descanso en Mendoza. Disfruta de instalaciones completas, piletas y una gastronomía regional que garantiza una estadía inigualable para toda la familia. Combinamos confort, limpieza impecable y una atención cálida que te hará sentir como en casa. ¡Ven a vivir tu mejor experiencia en el sur mendocino!',
        servicios: ['wifi', 'piscina', 'estacionamiento', 'desayuno'], // COMPLETAR
        habitaciones: [
            {
                tipo: 'Estándar',
                desc: 'COMPLETAR',
                destacada: false,
                amenities: [],
                tarifas: [
                    { categoria: 'Mayor', precio_afiliado: 62700, precio_invitado: 86100, precio_particular: '-' },
                    { categoria: 'Menor de 12', precio_afiliado: 39500, precio_invitado: 55800, precio_particular: '-' },
                    { categoria: 'Menor de 6', precio_afiliado: 19200, precio_invitado: 37400, precio_particular: '-' },
                    { categoria: 'Menor de 3', precio_afiliado: 'Sin Cargo', precio_invitado: 'Sin Cargo', precio_particular: '-' },
                ],
            },
        ],
        direccion: 'C del Nihuil S/n, M5605 El Nihuil, Mendoza',
        mapa_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1554.7179561477762!2d-68.68334653375578!3d-35.036186146605786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9679ed3b311e5f6d%3A0xeb04d0e9efe80502!2sEl%20Nihuil%20Hotel!5e1!3m2!1ses-419!2sar!4v1777375270685!5m2!1ses-419!2sar',
        telefono: '341 683-1506',
        whatsapp: '341 683-1506',
        email: 'administracion@smatarosario.com.ar',
        instagram: 'smata.oficial',
        facebook: 'elnihuilhotel',
    },
];

export const CONVENIOS = [
    { 
        id: 101, 
        nombre: 'Hotel Tierra del Sol',
        destino: 'Salta', 
        tipo: 'convenio', 
        rating: 4.4, 
        precio_socio: ' ', 
        descuento: ' ', 
        imagen_portada: portadaTDS, 
        servicios: ['wifi', 'desayuno'], 
        descripcion: 'Hotel Ubicado en Salta. Reservas manejadas directamente con el hotel, Solicitan carnet de afiliado a SMATA y se hace el descuento.', 
        habitaciones: [], 
        direccion: 'Urquiza 1646, A4400 Salta', 
        mapa_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3447.624419753053!2d-65.42569139999999!3d-24.791070800000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941bc3e877dc22a9%3A0x68e1bc5883f61656!2sHotel%20Tierra%20del%20Sol!5e1!3m2!1ses-419!2sar!4v1777380060647!5m2!1ses-419!2sar', 
        telefono: '387 474-2436', 
        whatsapp: '387 474-2436', 
        email: 'infohoteltierradelsol@gmail.com', 
        instagram: 'hoteltierradelsolsalta', 
        facebook: 'hoteltierradelsolsla' 
    },
    { 
        id: 102, 
        nombre: 'Cabañas Bosque y Mar', 
        destino: 'Mar de Cobo', 
        tipo: 'convenio', 
        rating: 4.8, 
        precio_socio: ' ', 
        descuento: ' ', 
        imagen_portada: portadaCBM, 
        servicios: ['wifi', 'piscina', 'desayuno'], 
        descripcion: 'Complejo ubicado en Mar de Cobo. Reservas manejadas directamente con el hotel, Solicitan carnet de afiliado a SMATA y se hace el descuento.', 
        habitaciones: [], 
        direccion: 'Buena Vista 369, B7609 Mar de Cobo, Provincia de Buenos Aires', 
        mapa_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.904587257929!2d-57.45810529999999!3d-37.7701674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584cd7f276eb32d%3A0xb142acba057bc0c9!2sBuena%20Vista%20369%2C%20B7609%20Mar%20de%20Cobo%2C%20Provincia%20de%20Buenos%20Aires!5e1!3m2!1ses-419!2sar!4v1777380638932!5m2!1ses-419!2sar', 
        telefono: '223 570-5779', 
        whatsapp: '223 570-5779', 
        email: 'bosqueymarreservas@gmail.com', 
        instagram: 'bosqueymar.apart', 
        facebook: ' ' 
    },
    { 
        id: 103, 
        nombre: 'Cabañas Villa Chenaut', 
        destino: 'Tucumán', 
        tipo: 'convenio', 
        rating: 4.5, 
        precio_socio: ' ', 
        descuento: '', 
        imagen_portada: portadaCVC, 
        servicios: ['wifi', 'estacionamiento', 'desayuno'], 
        descripcion: 'Complejo ubicado en Tucumán. Reservas manejadas por Smata secc. Tucumán, Solicitan carnet de afiliado a SMATA y se hace el descuento.', 
        habitaciones: [], 
        direccion: '', 
        mapa_embed: '', 
        telefono: '0381 231-8433', 
        whatsapp: '', 
        email: 'tucuman@smata.com.ar', 
        instagram: '', 
        facebook: '' 
    },
    { 
        id: 104, 
        nombre: 'Hotel Real Luján', 
        destino: 'Buenos Aires', 
        tipo: 'convenio', 
        rating: 4.3, 
        precio_socio: ' ', 
        descuento: ' ', 
        imagen_portada: portadaHL, 
        servicios: ['desayuno', 'wifi', 'aire'], 
        descripcion: 'Hotel Ubicado en Luján. Reservas manejadas directamente con el hotel, Solicitan carnet de afiliado a SMATA y se hace el descuento.', 
        habitaciones: [], 
        direccion: 'Av. Ntra Sra de Luján 816, B6700CCU Luján, Provincia de Buenos Aires', 
        mapa_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3127.3712184945553!2d-59.11991739999999!3d-34.5620371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc7deb8ae4de5b%3A0xf2b5dd112d3f208c!2sReal%20Hotel%20Luj%C3%A1n!5e1!3m2!1ses-419!2sar!4v1777381205037!5m2!1ses-419!2sar', 
        telefono: '11 3417-1313', 
        whatsapp: '11 3417-1313', 
        email: 'hotelreallujan@gmail.com', 
        instagram: 'hotel.reallujan', 
        facebook: 'people/Real-Luján/pfbid02wy47zSFTKfTgMkAK45WVG4srH2LMEW1hqumEFMXQ7CpMpkff5RL9FZb9eUUeNV5zl/?mibextid=ZbWKwL' 
    },
];

export const TODOS_LOS_HOTELES = [...HOTELES, ...CONVENIOS];

const DESTINOS = ['Todos', 'Mar del Plata', 'Buenos Aires', 'San Luis', 'Córdoba', 'Mendoza', 'Salta', 'Mar de Cobo', 'Tucumán'];
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