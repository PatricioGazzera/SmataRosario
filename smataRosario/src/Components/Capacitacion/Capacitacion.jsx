import './Capacitacion.css';
import {
    FaClock, FaCheck, FaLaptop, FaScaleBalanced, FaBullseye, FaArrowRight,
    FaPlus, FaPenToSquare, FaTrashCan, FaCircleExclamation, FaImage, FaX
} from '../../utils/icons/icons';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../../context/AuthContext.jsx';

// ── TALLERES ──
const talleres = [
    { icon: <FaLaptop />, title: 'Alfabetización Digital', desc: 'Dominio de herramientas informáticas y gestión de software industrial.' },
    { icon: <FaScaleBalanced />, title: 'Derecho Laboral y Sindical', desc: 'Conocimiento de convenios colectivos y normativas de seguridad e higiene.' },
    { icon: <FaBullseye />, title: 'Liderazgo y Gestión de Equipos', desc: 'Taller orientado a delegados y mandos medios de la industria.' },
];

const EMPTY_FORM = {
    titulo: '', descripcion: '', categoria: '', imagen_url: '',
    modalidad: 'Presencial', duracion: '', dificultad: '',
    certificacion: 'Oficial', periodo: '', dias_horarios: '', lugar: '',
    modulos: [],
};

// ══════════════════════════════════
// MODAL FORM
// ══════════════════════════════════
function CursoForm({ open, onClose, onSuccess, curso }) {
    const [form, setForm] = useState(EMPTY_FORM);
    const [moduloInput, setModuloInput] = useState({ titulo: '', contenido: '' });
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const fileRef = useRef();

    useEffect(() => {
        setForm(curso ? { ...EMPTY_FORM, ...curso } : EMPTY_FORM);
        setError(null);
    }, [curso, open]);

    if (!open) return null;

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(file.type)) {
            setError('Solo se permiten imágenes JPG, PNG o WEBP.');
            return;
        }
        setUploading(true);
        setError(null);
        const ext = file.name.split('.').pop();
        const fileName = `cursos/${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage.from('imagenes').upload(fileName, file, { upsert: true });
        if (uploadError) { setError('Error al subir: ' + uploadError.message); setUploading(false); return; }
        const { data: urlData } = supabase.storage.from('imagenes').getPublicUrl(fileName);
        setForm(prev => ({ ...prev, imagen_url: urlData.publicUrl }));
        setUploading(false);
    };

    const addModulo = () => {
        if (!moduloInput.titulo.trim()) return;
        setForm(prev => ({ ...prev, modulos: [...(prev.modulos || []), { ...moduloInput }] }));
        setModuloInput({ titulo: '', contenido: '' });
    };

    const removeModulo = (i) => setForm(prev => ({ ...prev, modulos: prev.modulos.filter((_, idx) => idx !== i) }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.titulo.trim()) { setError('El título es obligatorio.'); return; }
        setSaving(true);
        setError(null);
        const payload = {
            titulo: form.titulo, descripcion: form.descripcion, categoria: form.categoria,
            imagen_url: form.imagen_url, modalidad: form.modalidad, duracion: form.duracion,
            dificultad: form.dificultad, certificacion: form.certificacion, periodo: form.periodo,
            dias_horarios: form.dias_horarios, lugar: form.lugar, modulos: form.modulos || [],
        };
        let err;
        if (curso?.id) {
            ({ error: err } = await supabase.from('cursos').update(payload).eq('id', curso.id));
        } else {
            ({ error: err } = await supabase.from('cursos').insert([payload]));
        }
        setSaving(false);
        if (err) { setError('Error al guardar: ' + err.message); return; }
        onSuccess();
        onClose();
    };

    return (
        <div className="cf-backdrop" onClick={onClose}>
            <div className="cf-modal" onClick={e => e.stopPropagation()}>
                <div className="cf-modal-header">
                    <h2>{curso ? 'Editar Curso' : 'Nuevo Curso'}</h2>
                    <button className="cf-close" onClick={onClose}><FaX /></button>
                </div>

                <form className="cf-form" onSubmit={handleSubmit}>
                    {error && <div className="cf-error">{error}</div>}

                    {/* IMAGEN */}
                    <div className="cf-img-section">
                        {form.imagen_url ? (
                            <div className="cf-img-preview">
                                <img src={form.imagen_url} alt="preview" />
                                <button type="button" className="cf-img-remove" onClick={() => setForm(p => ({ ...p, imagen_url: '' }))}>
                                    <FaX /> Quitar imagen
                                </button>
                            </div>
                        ) : (
                            <div className="cf-img-placeholder" onClick={() => fileRef.current.click()}>
                                <FaImage />
                                <span>{uploading ? 'Subiendo...' : 'Subir imagen del curso'}</span>
                                <small>JPG, PNG o WEBP · máx. 5MB</small>
                            </div>
                        )}
                        <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp"
                            style={{ display: 'none' }} onChange={handleImageUpload} disabled={uploading} />
                    </div>

                    {/* CAMPOS */}
                    <div className="cf-grid-2">
                        <div className="cf-field cf-full">
                            <label>Título *</label>
                            <input name="titulo" value={form.titulo} onChange={handleChange} placeholder="Ej: Inyección Electrónica" />
                        </div>
                        <div className="cf-field cf-full">
                            <label>Descripción</label>
                            <textarea name="descripcion" value={form.descripcion} onChange={handleChange} rows={3} placeholder="Descripción breve del curso..." />
                        </div>
                        <div className="cf-field">
                            <label>Categoría / Nivel</label>
                            <input name="categoria" value={form.categoria} onChange={handleChange} placeholder="Ej: NIVEL · AVANZADO" />
                        </div>
                        <div className="cf-field">
                            <label>Modalidad</label>
                            <select name="modalidad" value={form.modalidad} onChange={handleChange}>
                                <option>Presencial</option>
                                <option>Virtual</option>
                                <option>Híbrido</option>
                            </select>
                        </div>
                        <div className="cf-field">
                            <label>Duración</label>
                            <input name="duracion" value={form.duracion} onChange={handleChange} placeholder="Ej: 12 semanas" />
                        </div>
                        <div className="cf-field">
                            <label>Dificultad</label>
                            <select name="dificultad" value={form.dificultad} onChange={handleChange}>
                                <option value="">Seleccionar...</option>
                                <option>Inicial</option>
                                <option>Intermedio</option>
                                <option>Avanzado</option>
                            </select>
                        </div>
                        <div className="cf-field">
                            <label>Certificación</label>
                            <input name="certificacion" value={form.certificacion} onChange={handleChange} placeholder="Ej: Oficial" />
                        </div>
                        <div className="cf-field">
                            <label>Período</label>
                            <input name="periodo" value={form.periodo} onChange={handleChange} placeholder="Ej: Sept 15 - Dic 15" />
                        </div>
                        <div className="cf-field cf-full">
                            <label>Días y Horarios</label>
                            <input name="dias_horarios" value={form.dias_horarios} onChange={handleChange} placeholder="Ej: Martes y Jueves, 18:30 a 21:30hs" />
                        </div>
                        <div className="cf-field cf-full">
                            <label>Lugar</label>
                            <input name="lugar" value={form.lugar} onChange={handleChange} placeholder="Ej: Sede Rosario · Gorriti 1101" />
                        </div>
                    </div>

                    {/* MÓDULOS */}
                    <div className="cf-modulos-section">
                        <label className="cf-modulos-label">Módulos del curso</label>
                        {(form.modulos || []).map((mod, i) => (
                            <div className="cf-modulo-item" key={i}>
                                <div className="cf-modulo-item-text">
                                    <strong>{String(i + 1).padStart(2, '0')}. {mod.titulo}</strong>
                                    <p>{mod.contenido}</p>
                                </div>
                                <button type="button" className="cf-modulo-remove" onClick={() => removeModulo(i)}><FaTrashCan /></button>
                            </div>
                        ))}
                        <div className="cf-modulo-add">
                            <input placeholder="Título del módulo" value={moduloInput.titulo}
                                onChange={e => setModuloInput(p => ({ ...p, titulo: e.target.value }))} />
                            <input placeholder="Contenido / descripción" value={moduloInput.contenido}
                                onChange={e => setModuloInput(p => ({ ...p, contenido: e.target.value }))} />
                            <button type="button" className="cf-modulo-btn" onClick={addModulo}>
                                <FaPlus /> Agregar módulo
                            </button>
                        </div>
                    </div>

                    <div className="cf-form-actions">
                        <button type="button" className="cf-btn-cancel" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="cf-btn-save" disabled={saving || uploading}>
                            {saving ? 'Guardando...' : curso ? 'Guardar cambios' : 'Crear curso'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ══════════════════════════════════
// COMPONENTE PRINCIPAL
// ══════════════════════════════════
export default function Capacitacion() {
    const navigate = useNavigate();
    const { session } = useAuth();
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingCurso, setEditingCurso] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => { fetchCursos(); }, []);

    const fetchCursos = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('cursos')
            .select('id, titulo, descripcion, imagen_url, categoria, duracion, dificultad')
            .order('created_at', { ascending: false });

        console.log('cursos:', data, 'error:', error);
        if (!error) setCursos(data || []);
        setLoading(false);
    };

    const handleDeleteConfirm = async () => {
        if (!deleteTarget) return;
        setDeletingId(deleteTarget.id);
        const { error } = await supabase.from('cursos').delete().eq('id', deleteTarget.id);
        if (error) alert('Error al eliminar. Intentá de nuevo.');
        else setCursos(prev => prev.filter(c => c.id !== deleteTarget.id));
        setDeletingId(null);
        setShowDeleteConfirm(false);
        setDeleteTarget(null);
    };

    return (
        <>
            {/* ── HERO ── */}
            <section className="cap-hero" id="inicio">
                <div className="cap-bg" />
                <div className="cap-hero-content">
                    <div className="cap-hero-badge">Nuevos Cursos Disponibles</div>
                    <h1 className="cap-hero-title">
                        Tu Futuro<br />Empieza <span className="accent">Acá</span>
                    </h1>
                    <p className="cap-hero-sub">
                        Capacitación de vanguardia para los trabajadores de la industria mecánica y automotriz.
                        Programas certificados con salida laboral inmediata.
                    </p>
                    <div className="cap-hero-btns">
                        <a className="btn-primary" href="#cursos">Ver Cursos</a>
                        <a className="btn-outline" href="#talleres">Ver Talleres de Desarrollo</a>
                    </div>
                </div>
            </section>

            {/* ── CURSOS ── */}
            <section className="cursos" id="cursos">
                <div className="cursos-header">
                    <div>
                        <div className="cursos-tag">Programas Técnicos</div>
                        <h2 className="cursos-title">Cursos de Capacitación Profesional</h2>
                        <div className="cursos-underline" />
                    </div>
                    {session && (
                        <button className="cap-admin-new" onClick={() => { setEditingCurso(null); setShowForm(true); }}>
                            <FaPlus /> Nuevo Curso
                        </button>
                    )}
                </div>

                {/* Skeleton */}
                {loading && (
                    <div className="cursos-grid">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="curso-card">
                                <div className="cap-skeleton-img" />
                                <div className="curso-body">
                                    <div className="cap-skeleton-line" />
                                    <div className="cap-skeleton-line cap-skeleton-line--short" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && cursos.length === 0 && (
                    <div className="cursos-empty">No hay cursos disponibles por el momento.</div>
                )}

                {!loading && cursos.length > 0 && (
                    <div className="cursos-grid">
                        {cursos.map((curso) => (
                            <div className="curso-card" key={curso.id}>
                                <div className="curso-image-wrap">
                                    <img
                                        src={curso.imagen_url || 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&q=80'}
                                        alt={curso.titulo}
                                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&q=80'; }}
                                    />
                                    <span className="curso-badge">{curso.categoria}</span>
                                    {session && (
                                        <div className="curso-admin-actions">
                                            <button className="curso-admin-edit" onClick={() => { setEditingCurso(curso); setShowForm(true); }} title="Editar">
                                                <FaPenToSquare />
                                            </button>
                                            <button className="curso-admin-delete" onClick={() => { setDeleteTarget(curso); setShowDeleteConfirm(true); }} title="Eliminar">
                                                <FaTrashCan />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="curso-body">
                                    <h3>{curso.titulo}</h3>
                                    <p>{curso.descripcion}</p>
                                    <div className="curso-meta">
                                        <span className="meta-horas"><FaClock /> {curso.duracion}</span>
                                        <span className="meta-cert"><FaCheck /> {curso.dificultad}</span>
                                    </div>
                                    <button className="btn-inscribirse" onClick={() => navigate(`/capacitacion/${curso.id}`)}>
                                        Más Información <FaArrowRight className="arrow-icon" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* ── TALLERES ── */}
            <section className="talleres" id="talleres">
                <div className="talleres-inner">
                    <div className="talleres-left">
                        <div className="talleres-tag">Desarrollo Profesional</div>
                        <h2 className="talleres-title">Talleres para el Crecimiento Laboral</h2>
                        <div className="talleres-list">
                            {talleres.map((t) => (
                                <div className="taller-item" key={t.title}>
                                    <div className="taller-icon">{t.icon}</div>
                                    <div><strong>{t.title}</strong><p>{t.desc}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="talleres-right">
                        <div className="talleres-img-wrap">
                            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80" alt="Taller grupal" />
                            <div className="talleres-quote">
                                <p>"La capacitación es la única herramienta que garantiza la libertad y el progreso del trabajador."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MODAL FORM ── */}
            <CursoForm
                open={showForm}
                onClose={() => { setShowForm(false); setEditingCurso(null); }}
                onSuccess={fetchCursos}
                curso={editingCurso}
            />

            {/* ── CONFIRM DELETE ── */}
            {showDeleteConfirm && (
                <div className="cap-confirm-backdrop" onClick={() => setShowDeleteConfirm(false)}>
                    <div className="cap-confirm-modal" onClick={e => e.stopPropagation()}>
                        <div className="cap-confirm-icon"><FaCircleExclamation /></div>
                        <h3 className="cap-confirm-title">¿Eliminar curso?</h3>
                        <p className="cap-confirm-text"><strong>"{deleteTarget?.titulo}"</strong> será eliminado permanentemente.</p>
                        <div className="cap-confirm-actions">
                            <button className="cap-confirm-cancel" onClick={() => setShowDeleteConfirm(false)}>Cancelar</button>
                            <button className="cap-confirm-delete" onClick={handleDeleteConfirm} disabled={!!deletingId}>
                                {deletingId ? 'Eliminando...' : 'Sí, eliminar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}