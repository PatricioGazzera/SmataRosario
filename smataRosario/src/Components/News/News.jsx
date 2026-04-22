import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import {
  FaList,
  FaBorderAll,
  FaArrowTrendUp
} from "../../utils/icons/icons"
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
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  const [activeFilter, setActiveFilter] = useState("Todas");
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Traer noticias desde Supabase
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

      if (activeFilter !== "Todas") {
        query = query.eq("categoria", activeFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      if (reset) {
        setNoticias(data);
      } else {
        setNoticias((prev) => [...prev, ...data]);
      }

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

  const formatFecha = (fechaStr) => {
    if (!fechaStr) return "";
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="np-root">
      {/* HERO */}
      <section className="np-hero">
        <div className="np-hero-overlay" />
        <div className="np-hero-content">
          <h1 className="np-hero-title">Portal de <span className="accent"> Noticias</span></h1>
          <p className="np-hero-excerpt">Accedé al portal de noticias de la Seccional Rosario e informate de las últimas novedades.</p>
        </div>
      </section>

      {/* MAIN */}
      <main className="np-main">
        <div className="np-content-col">
          {/* TOOLBAR */}
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

          {/* ESTADOS */}
          {error && (
            <div className="np-error">{error}</div>
          )}

          {!error && noticias.length === 0 && !loading && (
            <div className="np-empty">No hay noticias en esta categoría por el momento.</div>
          )}

          {/* NEWS GRID / LIST */}
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

          {/* SKELETON mientras carga */}
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

        {/* SIDEBAR */}
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
    </div>
  );
}