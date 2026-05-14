import { useState, useEffect, useRef } from "react";
import { supabase } from "../../utils/supabase";
import "./ProductForm.css";

const CATEGORIAS = ["Televisores", "Electrodomésticos", "Colchones y Sommiers", "Hogar", "Varios"];
const BUCKET = "productos-imagenes";

const formatPrecio = (precio) => {
  const num = parseFloat(precio);
  if (isNaN(num)) return "$ —";
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(num);
};

export default function ProductForm({ open, onClose, onSuccess, producto = null }) {
  const isEdit = !!producto;

  const emptyForm = {
    nombre: "",
    descripcion: "",
    descripcion_larga: "",
    categoria: CATEGORIAS[0],
    precio: "",
    estado: "disponible",
    destacado: false,
    imagenes: [],
  };

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const imgInputRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    if (producto) {
      setForm({
        nombre:           producto.nombre           || "",
        descripcion:      producto.descripcion      || "",
        descripcion_larga: producto.descripcion_larga || "",
        categoria:        producto.categoria        || CATEGORIAS[0],
        precio:           producto.precio           || "",
        estado:           producto.estado           || "disponible",
        destacado:        producto.destacado        || false,
        imagenes:         producto.imagenes         || [],
      });
    } else {
      setForm(emptyForm);
    }
    setError(null);
    setSuccess(false);
  }, [producto, open]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  // ── Subir imagen al bucket ──
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploadingImg(true);
    const nuevasUrls = [];

    for (const file of files) {
      const ext = file.name.split(".").pop();
      const fileName = `producto-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(fileName, file, { upsert: true });

      if (upErr) {
        setError("Error al subir una imagen. Intentá de nuevo.");
        setUploadingImg(false);
        return;
      }

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
      nuevasUrls.push(data.publicUrl);
    }

    setForm((prev) => ({ ...prev, imagenes: [...prev.imagenes, ...nuevasUrls] }));
    setUploadingImg(false);
    e.target.value = "";
  };

  // ── Eliminar imagen del array ──
  const handleRemoveImage = (index) => {
    setForm((prev) => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== index),
    }));
  };

  // ── Mover imagen (reordenar) ──
  const moverImagen = (index, direccion) => {
    const nuevas = [...form.imagenes];
    const target = index + direccion;
    if (target < 0 || target >= nuevas.length) return;
    [nuevas[index], nuevas[target]] = [nuevas[target], nuevas[index]];
    setForm((prev) => ({ ...prev, imagenes: nuevas }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      nombre:            form.nombre,
      descripcion:       form.descripcion,
      descripcion_larga: form.descripcion_larga,
      categoria:         form.categoria,
      precio:            parseFloat(form.precio),
      estado:            form.estado,
      destacado:         form.destacado,
      imagenes:          form.imagenes,
    };

    let result;
    if (isEdit) {
      result = await supabase.from("productos").update(payload).eq("id", producto.id);
    } else {
      result = await supabase.from("productos").insert([payload]);
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
    <div className="nf-backdrop">
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
              <h2 className="nf-title">{isEdit ? "Editar Producto" : "Nuevo Producto"}</h2>
              <p className="nf-subtitle">
                {isEdit ? `Modificando: ${producto.nombre?.slice(0, 40)}…` : "Completá los campos para publicar"}
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

            {/* Nombre */}
            <div className="nf-field nf-field--full">
              <label className="nf-label" htmlFor="pf-nombre">Nombre *</label>
              <input
                id="pf-nombre" name="nombre" className="nf-input"
                placeholder="Ej: Smart TV Samsung 55"
                value={form.nombre} onChange={handleChange} required
              />
            </div>

            {/* Descripción corta */}
            <div className="nf-field nf-field--full">
              <label className="nf-label" htmlFor="pf-descripcion">Descripción corta</label>
              <input
                id="pf-descripcion" name="descripcion" className="nf-input"
                placeholder="Breve descripción para la card del catálogo"
                value={form.descripcion} onChange={handleChange}
              />
            </div>

            {/* Categoría */}
            <div className="nf-field">
              <label className="nf-label" htmlFor="pf-categoria">Categoría *</label>
              <select
                id="pf-categoria" name="categoria"
                className="nf-input nf-select"
                value={form.categoria} onChange={handleChange} required
              >
                {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Precio */}
            <div className="nf-field">
              <label className="nf-label" htmlFor="pf-precio">Precio *</label>
              <input
                id="pf-precio" name="precio" type="number" className="nf-input"
                placeholder="Ej: 150000"
                value={form.precio} onChange={handleChange} required min="0"
              />
            </div>

            {/* Estado */}
            <div className="nf-field">
              <label className="nf-label" htmlFor="pf-estado">Estado *</label>
              <select
                id="pf-estado" name="estado"
                className="nf-input nf-select"
                value={form.estado} onChange={handleChange} required
              >
                <option value="disponible">Disponible</option>
                <option value="agotado">Agotado</option>
              </select>
            </div>

            {/* Destacado */}
            <div className="nf-field pf-field-destacado">
              <label className="nf-label">Opciones</label>
              <label className="pf-checkbox-label">
                <input
                  type="checkbox"
                  name="destacado"
                  checked={form.destacado}
                  onChange={handleChange}
                  className="pf-checkbox"
                />
                Marcar como destacado
              </label>
            </div>

            {/* Descripción larga */}
            <div className="nf-field nf-field--full">
              <label className="nf-label" htmlFor="pf-descripcion-larga">Descripción completa</label>
              <textarea
                id="pf-descripcion-larga" name="descripcion_larga"
                className="nf-input nf-textarea"
                placeholder="Descripción detallada que se muestra en la página del producto"
                value={form.descripcion_larga} onChange={handleChange}
                rows={4}
              />
            </div>

            {/* Imágenes */}
            <div className="nf-field nf-field--full">
              <div className="nf-contenido-header">
                <label className="nf-label">Imágenes del producto</label>
                <button
                  type="button"
                  className="nf-insert-img-btn"
                  onClick={() => imgInputRef.current?.click()}
                  disabled={uploadingImg}
                >
                  {uploadingImg ? (
                    <><span className="nf-spinner nf-spinner--sm" /> Subiendo...</>
                  ) : (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                      Agregar imágenes
                    </>
                  )}
                </button>
                <input
                  ref={imgInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
              </div>

              {/* Grid de imágenes subidas */}
              {form.imagenes.length > 0 ? (
                <div className="pf-imagenes-grid">
                  {form.imagenes.map((url, i) => (
                    <div key={i} className={`pf-imagen-item ${i === 0 ? 'pf-imagen-item--principal' : ''}`}>
                      <img src={url} alt={`Imagen ${i + 1}`} />
                      {i === 0 && <span className="pf-badge-principal">Principal</span>}
                      <div className="pf-imagen-actions">
                        <button
                          type="button"
                          className="pf-imagen-action-btn"
                          onClick={() => moverImagen(i, -1)}
                          disabled={i === 0}
                          title="Mover izquierda"
                        >‹</button>
                        <button
                          type="button"
                          className="pf-imagen-action-btn pf-imagen-action-btn--delete"
                          onClick={() => handleRemoveImage(i)}
                          title="Eliminar"
                        >✕</button>
                        <button
                          type="button"
                          className="pf-imagen-action-btn"
                          onClick={() => moverImagen(i, 1)}
                          disabled={i === form.imagenes.length - 1}
                          title="Mover derecha"
                        >›</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="pf-imagenes-empty">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <p>No hay imágenes. Agregá al menos una.</p>
                </div>
              )}
              <span className="nf-hint">La primera imagen es la principal. Podés reordenarlas con las flechas.</span>
            </div>

            {/* Vista previa de card */}
            {(form.nombre || form.imagenes.length > 0) && (
              <div className="nf-field nf-field--full">
                <span className="nf-label">Vista previa de la card</span>
                <div className="pf-preview-wrap">
                  <div className="pf-preview-card">
                    <div className="pf-preview-img-wrap">
                      {form.imagenes[0] ? (
                        <img src={form.imagenes[0]} alt="preview" className="pf-preview-img" />
                      ) : (
                        <div className="pf-preview-img-placeholder">📦</div>
                      )}
                      {form.destacado && <span className="pf-preview-badge-destacado">Destacado</span>}
                      {form.estado === 'agotado' && <span className="pf-preview-badge-agotado">Agotado</span>}
                    </div>
                    <div className="pf-preview-body">
                      <span className="pf-preview-categoria">{form.categoria}</span>
                      <p className="pf-preview-nombre">{form.nombre || 'Nombre del producto'}</p>
                      {form.descripcion && <p className="pf-preview-desc">{form.descripcion}</p>}
                      <span className="pf-preview-precio">{formatPrecio(form.precio)}</span>
                      <button className="pf-preview-btn" disabled>Ver producto</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
              {isEdit ? "¡Producto actualizado correctamente!" : "¡Producto publicado correctamente!"}
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
                isEdit ? "Guardar cambios" : "Publicar producto"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}