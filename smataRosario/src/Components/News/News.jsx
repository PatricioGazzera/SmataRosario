import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import { FaList,
  FaBorderAll,
  FaArrowTrendUp,
  FaShield,
  FaPlus,
  FaPenToSquare,
  FaTrashCan,
  FaCircleExclamation,
} from "../../utils/icons/icons";
import NewsForm from "../NewsForm/NewsForm";
import { useAuth } from "../../context/AuthContext.jsx";
import "./News.css";

const CATEGORIES = ["Todas", "Gremial", "Beneficios", "Escala Salarial", "Novedades", "Acción Social"];

const MOST_READ = [
  { tag: "Guía de Beneficios", title: "Cómo solicitar el Kit Escolar 2024" },
  { tag: "Comunicado Oficial", title: "Declaración sobre la nueva Política de Exportación Automotriz" },
  { tag: "Salud", title: "Campaña de Vacunación Antigripal: Lugares y Horarios" },
  { tag: "Archivo", title: "Reseña Histórica: 70 Años de SMATA Rosario" },
];

const ARCHIVE_MONTHS = ["Mayo 2024", "Abril 2024", "Marzo 2024", "Febrero 2024", "Enero 2024", "Archivo 2023"];

const PAGE_SIZE = 6;

export default function News() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  const [activeFilter, setActiveFilter] = useState("Todas");
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // NewsForm state
  const [showForm, setShowForm] = useState(false);
  const [editingNoticia, setEditingNoticia] = useState(null);

  // Delete confirm
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    setNoticias([]);
    setPage(0);
    setHasMore(true);
    fetchNoticias(0, true);
  }, [activeFilter]);

  const fetchNoticias = async (pageNum, reset = false) => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from("noticias")
        .select("id, titulo, excerpt, categoria, imagen_url, autor, fecha")
        .order("fecha", { ascending: false })
        .range(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE - 1);

      if (activeFilter !== "Todas") query = query.eq("categoria", activeFilter);

      const { data, error } = await query;
      if (error) throw error;

      if (reset) setNoticias(data);
      else setNoticias((prev) => [...prev, ...data]);

      setHasMore(data.length === PAGE_SIZE);
    } catch (err) {
      console.error("Error al traer noticias:", err);
      setError("No se pudieron cargar las noticias. Intentá de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNoticias(nextPage);
  };

  const handleNewNoticia = () => {
    setEditingNoticia(null);
    setShowForm(true);
  };

  const handleEditNoticia = (noticia) => {
    setEditingNoticia(noticia);
    setShowForm(true);
  };

  const handleDeleteClick = (noticia) => {
    setDeleteTarget(noticia);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget.id);
    const { error } = await supabase.from("noticias").delete().eq("id", deleteTarget.id);
    if (error) {
      alert("Error al eliminar. Intentá de nuevo.");
    } else {
      setNoticias((prev) => prev.filter((n) => n.id !== deleteTarget.id));
    }
    setDeletingId(null);
    setShowDeleteConfirm(false);
    setDeleteTarget(null);
  };

  const formatFecha = (fechaStr) => {
    if (!fechaStr) return "";
    return new Date(fechaStr).toLocaleDateString("es-AR", {
      day: "numeric", month: "long", year: "numeric",
    });
  };

  return (
    <div className="np-root">

      {/* HERO */}
      <section className="np-hero">
        <div className="np-hero-overlay" />
        <div className="np-hero-content">
          <h1 className="np-hero-title">Portal de <span className="accent">Noticias</span></h1>
          <p className="np-hero-excerpt">Accedé al portal de noticias de la Seccional Rosario e informate de las últimas novedades.</p>
        </div>
      </section>

      {/* MAIN */}
      <main className={`np-main ${session ? "np-main--admin" : ""}`}>

        {/* PANEL ADMIN IZQUIERDO — solo si hay sesión */}
        {session && (
          <aside className="np-admin-panel">
            <div className="np-admin-panel-header">
              <FaShield />
              <span>Admin</span>
            </div>

            <button className="np-admin-panel-new" onClick={handleNewNoticia}>
              <FaPlus />
              Nueva noticia
            </button>

            <div className="np-admin-panel-divider" />

            <p className="np-admin-panel-label">Acciones por noticia</p>
            <ul className="np-admin-panel-list">
              {noticias.map((item) => (
                <li key={item.id} className="np-admin-panel-item">
                  <span className="np-admin-panel-item-title">{item.titulo}</span>
                  <div className="np-admin-panel-item-actions">
                    <button
                      className="np-admin-panel-edit"
                      onClick={() => handleEditNoticia(item)}
                      title="Editar"
                    >
                      <FaPenToSquare />
                    </button>
                    <button
                      className="np-admin-panel-delete"
                      onClick={() => handleDeleteClick(item)}
                      title="Eliminar"
                      disabled={deletingId === item.id}
                    >
                      <FaTrashCan />
                    </button>
                  </div>
                </li>
              ))}
              {noticias.length === 0 && !loading && (
                <li className="np-admin-panel-empty">No hay noticias cargadas.</li>
              )}
            </ul>
          </aside>
        )}

        {/* CONTENIDO PRINCIPAL */}
        <div className="np-content-col">
          <div className="np-toolbar">
            <h2 className="np-section-title">Últimas Noticias</h2>
            <div className="np-toolbar-right">
              <div className="np-filter-pills">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    className={`np-pill ${activeFilter === cat ? "active" : ""}`}
                    onClick={() => setActiveFilter(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="np-view-toggle">
                <button
                  className={`np-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
                  onClick={() => setViewMode("grid")}
                  title="Vista cuadrilla"
                >
                  <FaBorderAll />
                </button>
                <button
                  className={`np-toggle-btn ${viewMode === "list" ? "active" : ""}`}
                  onClick={() => setViewMode("list")}
                  title="Vista lista"
                >
                  <FaList />
                </button>
              </div>
            </div>
          </div>

          {error && <div className="np-error">{error}</div>}

          {!error && noticias.length === 0 && !loading && (
            <div className="np-empty">No hay noticias en esta categoría por el momento.</div>
          )}

          {noticias.length > 0 && (
            <div className={`np-news-container ${viewMode === "list" ? "np-list" : "np-grid"}`}>
              {noticias.map((item) => (
                <article key={item.id} className={`np-card ${viewMode === "list" ? "np-card--list" : ""}`}>
                  <div className="np-card-img-wrap">
                    <img
                      src={item.imagen_url || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80"}
                      alt={item.titulo}
                      className="np-card-img"
                    />
                  </div>
                  <div className="np-card-body">
                    <div className="np-card-meta">
                      <span className="np-card-cat">{item.categoria}</span>
                      <span className="np-card-date">{formatFecha(item.fecha)}</span>
                    </div>
                    <h3 className="np-card-title">{item.titulo}</h3>
                    <p className="np-card-excerpt">{item.excerpt}</p>
                    <button
                      className="np-read-more"
                      onClick={() => navigate(`/noticias/${item.id}`)}
                    >
                      Leer más →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {loading && (
            <div className={`np-news-container ${viewMode === "list" ? "np-list" : "np-grid"}`}>
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <div key={i} className="np-card np-card--skeleton">
                  <div className="np-skeleton-img" />
                  <div className="np-card-body">
                    <div className="np-skeleton-line np-skeleton-line--short" />
                    <div className="np-skeleton-line" />
                    <div className="np-skeleton-line" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {hasMore && !loading && (
            <div className="np-load-more-wrap">
              <button className="np-load-more" onClick={handleLoadMore}>
                Cargar más noticias
              </button>
            </div>
          )}
        </div>

        {/* SIDEBAR DERECHO */}
        <aside className="np-sidebar">
          <div className="np-sidebar-block">
            <h3 className="np-sidebar-title">
              <FaArrowTrendUp />
              Más leídas
            </h3>
            <ul className="np-most-read">
              {MOST_READ.map((item, i) => (
                <li key={i} className="np-most-read-item">
                  <span className="np-most-read-tag">{item.tag}</span>
                  <span className="np-most-read-title">{item.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="np-sidebar-block np-archive-block">
            <h3 className="np-sidebar-title np-sidebar-title--light">Archivo de Noticias</h3>
            <div className="np-archive-pills">
              {ARCHIVE_MONTHS.map((m) => (
                <button key={m} className="np-archive-pill">{m}</button>
              ))}
            </div>
          </div>
        </aside>
      </main>

      {/* MODAL CREAR / EDITAR */}
      <NewsForm
        open={showForm}
        onClose={() => { setShowForm(false); setEditingNoticia(null); }}
        onSuccess={() => {
          setNoticias([]);
          setPage(0);
          fetchNoticias(0, true);
        }}
        noticia={editingNoticia}
      />

      {/* CONFIRM DELETE */}
      {showDeleteConfirm && (
        <div className="np-confirm-backdrop" onClick={() => setShowDeleteConfirm(false)}>
          <div className="np-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="np-confirm-icon">
              <FaCircleExclamation />
            </div>
            <h3 className="np-confirm-title">¿Eliminar noticia?</h3>
            <p className="np-confirm-text">
              <strong>"{deleteTarget?.titulo}"</strong> será eliminada permanentemente.
            </p>
            <div className="np-confirm-actions">
              <button className="np-confirm-cancel" onClick={() => setShowDeleteConfirm(false)}>
                Cancelar
              </button>
              <button className="np-confirm-delete" onClick={handleDeleteConfirm} disabled={!!deletingId}>
                {deletingId ? "Eliminando..." : "Sí, eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}