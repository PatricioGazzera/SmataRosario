import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaWhatsapp } from '../../utils/icons/icons';
import { supabase } from '../../utils/supabase';
import './CapacitacionDetails.css';

export default function CapacitacionDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [curso, setCurso] = useState(null);
    const [loading, setLoading] = useState(true);
    const [moduloAbierto, setModuloAbierto] = useState(null);

    useEffect(() => {
        const fetchCurso = async () => {
            const { data, error } = await supabase
                .from('cursos')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error al obtener el curso:', error);
            } else {
                setCurso(data);
            }
            setLoading(false);
        };

        fetchCurso();
    }, [id]);

    const toggleModulo = (i) => {
        setModuloAbierto(moduloAbierto === i ? null : i);
    };

    if (loading) {
        return (
            <div className="cd-loading">
                <div className="cd-spinner" />
            </div>
        );
    }

    if (!curso) {
        return (
            <div className="cd-notfound">
                <h2>Curso no encontrado</h2>
                <button className="btn-primary" onClick={() => navigate('/capacitacion')}>
                    Volver a Capacitación
                </button>
            </div>
        );
    }

    // modulos es un array JSON guardado en Supabase
    const modulos = curso.modulos || [];

    return (
        <div className="cd-page">

            {/* ── HERO ── */}
            <div className="cd-hero">
                {curso.imagen_url && (
                    <img src={curso.imagen_url} alt={curso.titulo} className="cd-hero-img" />
                )}
                <div className="cd-hero-overlay" />
                <div className="cd-hero-content">
                    <span className="cd-hero-tag">{curso.categoria || 'Especialización Técnica'}</span>
                    <h1 className="cd-hero-title">{curso.titulo}</h1>
                    <p className="cd-hero-desc">{curso.descripcion}</p>
                </div>
            </div>

            {/* ── STATS ── */}
            <div className="cd-stats">
                <div className="cd-stat">
                    <span className="cd-stat-icon">👤</span>
                    <div>
                        <div className="cd-stat-label">Modalidad</div>
                        <div className="cd-stat-value">{curso.modalidad || 'Presencial'}</div>
                    </div>
                </div>
                <div className="cd-stat">
                    <span className="cd-stat-icon">🕐</span>
                    <div>
                        <div className="cd-stat-label">Duración</div>
                        <div className="cd-stat-value">{curso.duracion || '—'}</div>
                    </div>
                </div>
                <div className="cd-stat">
                    <span className="cd-stat-icon">📊</span>
                    <div>
                        <div className="cd-stat-label">Dificultad</div>
                        <div className="cd-stat-value">{curso.dificultad || '—'}</div>
                    </div>
                </div>
                <div className="cd-stat">
                    <span className="cd-stat-icon">✅</span>
                    <div>
                        <div className="cd-stat-label">Certificación</div>
                        <div className="cd-stat-value">{curso.certificacion || 'Oficial'}</div>
                    </div>
                </div>
            </div>

            {/* ── BODY ── */}
            <div className="cd-body">

                {/* ── COLUMNA IZQUIERDA ── */}
                <div className="cd-left">

                    {/* Contenido del Curso */}
                    {modulos.length > 0 && (
                        <div className="cd-section">
                            <h2 className="cd-section-title">
                                <span className="cd-section-bar" />
                                Contenido del Curso
                            </h2>
                            <div className="cd-modulos">
                                {modulos.map((mod, i) => (
                                    <div
                                        className={`cd-modulo ${moduloAbierto === i ? 'open' : ''}`}
                                        key={i}
                                    >
                                        <button
                                            className="cd-modulo-header"
                                            onClick={() => toggleModulo(i)}
                                        >
                                            <span className="cd-modulo-num">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            <span className="cd-modulo-name">{mod.titulo}</span>
                                            <span className="cd-modulo-arrow">
                                                {moduloAbierto === i ? '∧' : '∨'}
                                            </span>
                                        </button>
                                        {moduloAbierto === i && (
                                            <div className="cd-modulo-body">
                                                <p>{mod.contenido}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Horarios y Ubicación */}
                    <div className="cd-section">
                        <h2 className="cd-section-title">Horarios y Ubicación</h2>
                        <div className="cd-horarios-grid">
                            <div className="cd-horarios-info">
                                <div className="cd-horario-item">
                                    <span className="cd-horario-icon">📅</span>
                                    <div>
                                        <strong>Período</strong>
                                        <p>{curso.periodo || '—'}</p>
                                    </div>
                                </div>
                                <div className="cd-horario-item">
                                    <span className="cd-horario-icon">📅</span>
                                    <div>
                                        <strong>Días y Horarios</strong>
                                        <p>{curso.dias_horarios || '—'}</p>
                                    </div>
                                </div>
                                <div className="cd-horario-item">
                                    <span className="cd-horario-icon">📍</span>
                                    <div>
                                        <strong>Lugar</strong>
                                        <p>{curso.lugar || 'Sede Rosario'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="cd-mapa">
                                <iframe
                                    title="Ubicación sede"
                                    src={curso.mapa_embed || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.0445108561307!2d-60.68279802460992!3d-32.92342222071546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b6535753100e95%3A0x80700f4d976e8183!2sAsociacion%20Mutual%20Rosario%20Metalmecanica%20Y%20Afines!5e0!3m2!1ses-419!2sar!4v1775616877668!5m2!1ses-419!2sar"}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>

                </div>

                {/* ── COLUMNA DERECHA ── */}
                <div className="cd-right">

                    {/* Card de inscripción */}
                    <div className="cd-inscripcion-card">
                        <h3>Inscripción Abierta</h3>
                        <p>Asegurá tu lugar en la próxima cohorte. Cupos limitados para garantizar calidad educativa.</p>

                        <div className="cd-precios">
                            <div className="cd-precio-row">
                                <span>Afiliados SMATA</span>
                                <span className="cd-precio-badge">
                                    {curso.precio_afiliados || 'Beca 50%'}
                                </span>
                            </div>
                            <div className="cd-precio-row">
                                <span>Particulares</span>
                                <span className="cd-precio-particular">
                                    {curso.precio_particulares || 'Consulte Plan'}
                                </span>
                            </div>
                        </div>

                        <a
                            href={`https://wa.me/5493412555424?text=Hola%20quiero%20inscribirme%20al%20curso%20${encodeURIComponent(curso.titulo)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-preinscribirse"
                        >
                            Pre-inscribirme
                        </a>

                        <div className="cd-contacto-educacion">
                            <div className="cd-contacto-label">Consultas Educación</div>
                            <div className="cd-contacto-icons">
                                <a href="tel:+5493412555424" title="Teléfono">📞</a>
                                <a href="mailto:capacitacion@smatarosario.com.ar" title="Email">✉️</a>
                                <a href="https://wa.me/5493412555424" target="_blank" rel="noopener noreferrer" title="WhatsApp">💬</a>
                            </div>
                        </div>
                    </div>

                    {/* Card de ayuda */}
                    <div className="cd-ayuda-card">
                        <div className="cd-ayuda-content">
                            <h4>¿Necesitas ayuda?</h4>
                            <p>Nuestro equipo de formación profesional está disponible para asesorarte sobre este curso.</p>
                            <a href="/capacitacion" className="cd-ayuda-link">Ver otras sedes →</a>
                        </div>
                        <div className="cd-ayuda-icon">📚</div>
                    </div>

                </div>
            </div>
        </div>
    );
}