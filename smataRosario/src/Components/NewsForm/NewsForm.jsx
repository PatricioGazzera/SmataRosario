import { useState, useEffect, useRef } from "react";
import { supabase } from "../../utils/supabase";
import "./NewsForm.css";

const CATEGORIES = ["Gremial", "Beneficios", "Escala Salarial", "Novedades", "Acción Social"];
const BUCKET = "noticias-imagenes";

export default function NewsForm({ open, onClose, onSuccess, noticia = null }) {
  const isEdit = !!noticia;

  const emptyForm = {
    titulo: "",
    excerpt: "",
    categoria: CATEGORIES[0],
    imagen_url: "",
    autor: "",
    contenido: "",
    fecha: new Date().toISOString().split("T")[0],
  };

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Upload states
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingBody, setUploadingBody] = useState(false);
  const coverInputRef = useRef(null);
  const bodyInputRef = useRef(null);

  // Textarea ref para insertar imagen en el cursor
  const contenidoRef = useRef(null);

  // Estado para el modal de caption de imagen
  const [captionModal, setCaptionModal] = useState(null); // { url, cursorStart, cursorEnd } | null
  const [captionInput, setCaptionInput] = useState("");

useEffect(() => {
  if (!open) return;

  if (noticia) {
    const [year, month, day] = (noticia.fecha || '').split('T')[0].split('-');
    const fechaLocal = year && month && day
      ? `${year}-${month}-${day}`
      : new Date().toISOString().split('T')[0];

    setForm({
      titulo:     noticia.titulo     || '',
      excerpt:    noticia.excerpt    || '',
      categoria:  noticia.categoria  || CATEGORIES[0],
      imagen_url: noticia.imagen_url || '',
      autor:      noticia.autor      || '',
      contenido:  noticia.contenido  || '',
      fecha:      fechaLocal,
    });
  } else {
    setForm({
      titulo: '', excerpt: '', categoria: CATEGORIES[0],
      imagen_url: '', autor: '', contenido: '',
      fecha: new Date().toISOString().split('T')[0],
    });
  }
  setError(null);
  setSuccess(false);
}, [noticia, open]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ── Subir imagen de portada ──────────────────────
  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    const ext = file.name.split(".").pop();
    const fileName = `portada-${Date.now()}.${ext}`;

    const { error: upErr } = await supabase.storage
      .from(BUCKET)
      .upload(fileName, file, { upsert: true });

    if (upErr) {
      setError("Error al subir la imagen de portada.");
      setUploadingCover(false);
      return;
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
    setForm((prev) => ({ ...prev, imagen_url: data.publicUrl }));
    setUploadingCover(false);
    e.target.value = "";
  };

  // ── Subir imagen para el cuerpo ──────────────────
  const handleBodyImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingBody(true);
    const ext = file.name.split(".").pop();
    const fileName = `cuerpo-${Date.now()}.${ext}`;

    const { error: upErr } = await supabase.storage
      .from(BUCKET)
      .upload(fileName, file, { upsert: true });

    if (upErr) {
      setError("Error al subir la imagen.");
      setUploadingBody(false);
      return;
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);

    // Guardar posición del cursor antes de abrir el modal
    const textarea = contenidoRef.current;
    const cursorStart = textarea ? textarea.selectionStart : form.contenido.length;
    const cursorEnd = textarea ? textarea.selectionEnd : form.contenido.length;

    // Abrir modal de caption en lugar de window.prompt
    setCaptionInput("");
    setCaptionModal({ url: data.publicUrl, cursorStart, cursorEnd });

    setUploadingBody(false);
    e.target.value = "";
  };

  // ── Confirmar inserción desde el modal ───────────
  const handleCaptionConfirm = () => {
    if (!captionModal) return;

    const { url, cursorStart, cursorEnd } = captionModal;
    const imageTag = captionInput.trim()
      ? `\n[img caption="${captionInput.trim()}"]${url}[/img]\n`
      : `\n[img]${url}[/img]\n`;

    const current = form.contenido;
    const newContenido = current.slice(0, cursorStart) + imageTag + current.slice(cursorEnd);
    setForm((prev) => ({ ...prev, contenido: newContenido }));

    // Mover cursor después de la imagen insertada
    setTimeout(() => {
      const textarea = contenidoRef.current;
      if (textarea) {
        textarea.selectionStart = cursorStart + imageTag.length;
        textarea.selectionEnd = cursorStart + imageTag.length;
        textarea.focus();
      }
    }, 0);

    setCaptionModal(null);
    setCaptionInput("");
  };

  const handleCaptionCancel = () => {
    setCaptionModal(null);
    setCaptionInput("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = { 
      ...form, 
      fecha: form.fecha ? `${form.fecha}T12:00:00` : form.fecha,
    };

    let result;
    if (isEdit) {
      result = await supabase.from("noticias").update(payload).eq("id", noticia.id);
    } else {
      result = await supabase.from("noticias").insert([payload]);
    }

    setLoading(false);

    if (result.error) {
      setError("Ocurrió un error al guardar. Intentá de nuevo.");
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onSuccess?.();
      onClose();
    }, 1200);
  };

  if (!open) return null;

  return (
    <>
    <div className="nf-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="nf-modal">

        {/* HEADER */}
        <div className="nf-header">
          <div className="nf-header-left">
            <div className="nf-header-icon">
              {isEdit ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              )}
            </div>
            <div>
              <h2 className="nf-title">{isEdit ? "Editar Noticia" : "Nueva Noticia"}</h2>
              <p className="nf-subtitle">
                {isEdit ? `Modificando: ${noticia.titulo?.slice(0, 40)}…` : "Completá los campos para publicar"}
              </p>
            </div>
          </div>
          <button className="nf-close-btn" onClick={onClose} aria-label="Cerrar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* FORM */}
        <form className="nf-form" onSubmit={handleSubmit}>
          <div className="nf-grid-2">

            {/* Título */}
            <div className="nf-field nf-field--full">
              <label className="nf-label" htmlFor="titulo">Título *</label>
              <input
                id="titulo" name="titulo" className="nf-input"
                placeholder="Ej: Acuerdo histórico en paritarias 2024"
                value={form.titulo} onChange={handleChange} required
              />
            </div>

            {/* Excerpt */}
            <div className="nf-field nf-field--full">
              <label className="nf-label" htmlFor="excerpt">Resumen *</label>
              <textarea
                id="excerpt" name="excerpt"
                className="nf-input nf-textarea nf-textarea--short"
                placeholder="Breve descripción para las tarjetas de noticias"
                value={form.excerpt} onChange={handleChange} required rows={2}
              />
            </div>

            {/* Categoría */}
            <div className="nf-field">
              <label className="nf-label" htmlFor="categoria">Categoría *</label>
              <select
                id="categoria" name="categoria"
                className="nf-input nf-select"
                value={form.categoria} onChange={handleChange} required
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Fecha */}
            <div className="nf-field">
              <label className="nf-label" htmlFor="fecha">Fecha de publicación *</label>
              <input
                id="fecha" name="fecha" type="date" className="nf-input"
                value={form.fecha} onChange={handleChange} required
              />
            </div>

            {/* Autor */}
            <div className="nf-field">
              <label className="nf-label" htmlFor="autor">Autor</label>
              <input
                id="autor" name="autor" className="nf-input"
                placeholder="Ej: Secretaría de Prensa"
                value={form.autor} onChange={handleChange}
              />
            </div>

            {/* Imagen de portada */}
            <div className="nf-field">
              <label className="nf-label">Imagen de portada</label>
              <div className="nf-upload-row">
                <input
                  name="imagen_url" className="nf-input nf-input--url"
                  placeholder="https://... o subí una imagen →"
                  value={form.imagen_url}
                  onChange={(e) => setForm((prev) => ({ ...prev, imagen_url: e.target.value }))}
                />
                <button
                  type="button"
                  className="nf-upload-btn"
                  onClick={() => coverInputRef.current?.click()}
                  disabled={uploadingCover}
                  title="Subir imagen desde tu PC"
                >
                  {uploadingCover ? (
                    <span className="nf-spinner" />
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                  )}
                </button>
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleCoverUpload}
                />
              </div>
            </div>

            {/* Preview imagen portada */}
            {form.imagen_url && (
              <div className="nf-field nf-field--full">
                <span className="nf-label">Vista previa de portada</span>
                <div className="nf-img-preview">
                  <img src={form.imagen_url} alt="preview"
                    onError={(e) => { e.target.style.display = "none"; }} />
                </div>
              </div>
            )}

            {/* Contenido */}
            <div className="nf-field nf-field--full">
              <div className="nf-contenido-header">
                <label className="nf-label" htmlFor="contenido">Contenido completo *</label>
                <button
                  type="button"
                  className="nf-insert-img-btn"
                  onClick={() => bodyInputRef.current?.click()}
                  disabled={uploadingBody}
                  title="Insertar imagen en el cuerpo"
                >
                  {uploadingBody ? (
                    <><span className="nf-spinner nf-spinner--sm" /> Subiendo...</>
                  ) : (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                      Insertar imagen
                    </>
                  )}
                </button>
                <input
                  ref={bodyInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleBodyImageUpload}
                />
              </div>
              <textarea
                ref={contenidoRef}
                id="contenido" name="contenido"
                className="nf-input nf-textarea"
                placeholder={`Escribí el cuerpo de la noticia aquí...\n\nPara insertar imágenes, usá el botón "Insertar imagen" de arriba.\nLas imágenes se insertan como: [img]url[/img]`}
                value={form.contenido} onChange={handleChange} required rows={12}
              />
              <span className="nf-hint">
                Separá los párrafos con una línea en blanco. Usá el botón para insertar imágenes desde tu PC.
              </span>
            </div>
          </div>

          {error && (
            <div className="nf-error">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          {success && (
            <div className="nf-success">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {isEdit ? "¡Noticia actualizada correctamente!" : "¡Noticia publicada correctamente!"}
            </div>
          )}

          <div className="nf-footer">
            <button type="button" className="nf-cancel-btn" onClick={onClose} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="nf-submit-btn" disabled={loading || success}>
              {loading ? (
                <><span className="nf-spinner" /> Guardando...</>
              ) : success ? (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Guardado
                </>
              ) : (
                isEdit ? "Guardar cambios" : "Publicar noticia"
              )}
            </button>
          </div>
        </form>
      </div>

    </div>

      {/* ── MODAL DE CAPTION — fuera del backdrop principal para evitar stacking context ── */}
      {captionModal && (
        <div className="nf-caption-backdrop" onClick={(e) => e.target === e.currentTarget && handleCaptionCancel()}>
          <div className="nf-caption-modal">
            <div className="nf-caption-header">
              <div className="nf-caption-header-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              <h3 className="nf-caption-title">Agregar descripción a la imagen</h3>
              <button className="nf-close-btn" onClick={handleCaptionCancel} aria-label="Cerrar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="nf-caption-body">
              <div className="nf-caption-preview-wrap">
                <img
                  src={captionModal.url}
                  alt="Vista previa"
                  className="nf-caption-preview-img"
                />
                {captionInput.trim() && (
                  <p className="nf-caption-preview-text">{captionInput}</p>
                )}
              </div>

              <div className="nf-caption-input-wrap">
                <label className="nf-label" htmlFor="caption-input">
                  Descripción <span className="nf-caption-optional">(opcional)</span>
                </label>
                <input
                  id="caption-input"
                  className="nf-input"
                  placeholder="Ej: Trabajadores reunidos en asamblea"
                  value={captionInput}
                  onChange={(e) => setCaptionInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCaptionConfirm()}
                  autoFocus
                />
                <span className="nf-hint">
                  La descripción aparece debajo de la imagen en la nota. Podés dejarla vacía.
                </span>
              </div>
            </div>

            <div className="nf-caption-footer">
              <button type="button" className="nf-cancel-btn" onClick={handleCaptionCancel}>
                Cancelar
              </button>
              <button type="button" className="nf-submit-btn" onClick={handleCaptionConfirm}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Insertar imagen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}