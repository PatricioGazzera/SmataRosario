import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import "./NewsDetails.css";
import {
  FaClock,
  FaCalendar,
  FaUser,
  FaWhatsapp,
  FaEnvelope,
  FaShareNodes,
  FaCheck,
  FaArrowRight
} from "../../utils/icons/icons"

const MOST_READ = [
  { category: "Acción Social", title: "Nuevos servicios médicos en el Policlínico Rosario" },
  { category: "Beneficios", title: "Temporada de Invierno: Descuentos en Turismo Cordillerano" },
  { category: "Novedades", title: "Resultados de la última Asamblea General Extraordinaria" },
];

export default function NewsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    setLoading(true);
    setError(null);

    try {
      // Traer artículo por id
      const { data, error } = await supabase
        .from("noticias")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      setArticle(data);

      // Traer noticias relacionadas (misma categoría, distinto id)
      if (data?.categoria) {
        const { data: relatedData } = await supabase
          .from("noticias")
          .select("id, titulo, excerpt, categoria, imagen_url")
          .eq("categoria", data.categoria)
          .neq("id", id)
          .order("fecha", { ascending: false })
          .limit(3);

        setRelated(relatedData || []);
      }
    } catch (err) {
      console.error("Error al traer el artículo:", err);
      setError("No se pudo cargar la noticia.");
    } finally {
      setLoading(false);
    }
  };

  const formatFecha = (fechaStr) => {
    if (!fechaStr) return "";
    return new Date(fechaStr).toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Estado de carga ──
  if (loading) {
    return (
      <div className="nd-root">
        <div className="nd-loading">
          <div className="nd-skeleton-hero" />
          <div className="nd-layout">
            <div />
            <div className="nd-article">
              <div className="nd-skeleton-line nd-skeleton-line--lead" />
              <div className="nd-skeleton-line" />
              <div className="nd-skeleton-line" />
              <div className="nd-skeleton-line nd-skeleton-line--short" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Error o no encontrado ──
  if (error || !article) {
    return (
      <div className="nd-root">
        <div className="nd-not-found">
          <h2>No se encontró la noticia</h2>
          <p>{error || "Es posible que haya sido eliminada o el enlace sea incorrecto."}</p>
          <button className="nd-back-btn" onClick={() => navigate("/noticias")}>
            ← Volver al portal de noticias
          </button>
        </div>
      </div>
    );
  }

  // ── El contenido puede ser texto plano o un array de bloques (jsonb) ──
  const renderBody = () => {
    if (!article.contenido) return null;

    // Si es string (texto plano), mostrarlo como párrafo
    if (typeof article.contenido === "string") {
      return <p className="nd-paragraph">{article.contenido}</p>;
    }

    // Si es array de bloques
    if (Array.isArray(article.contenido)) {
      return article.contenido.map((block, i) => {
        if (block.type === "paragraph")
          return <p key={i} className="nd-paragraph">{block.content}</p>;

        if (block.type === "heading")
          return <h2 key={i} className="nd-heading">{block.content}</h2>;

        if (block.type === "quote")
          return (
            <blockquote key={i} className="nd-quote">
              <span className="nd-quote-mark">"</span>
              <p>{block.content}</p>
              {block.attribution && (
                <footer className="nd-quote-attribution">— {block.attribution}</footer>
              )}
            </blockquote>
          );

        if (block.type === "callout")
          return (
            <div key={i} className="nd-callout">
              <div className="nd-callout-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div>
                <strong className="nd-callout-label">{block.label}</strong>
                <p className="nd-callout-text">{block.content}</p>
              </div>
            </div>
          );

        return null;
      });
    }

    return null;
  };

  return (
    <div className="nd-root">
      {/* HERO COVER */}
      <header
        className="nd-hero"
        style={{ backgroundImage: `url(${article.imagen_url || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80"})` }}
      >
        <div className="nd-hero-overlay" />
        <div className="nd-hero-content">
          <span className="nd-tag">{article.categoria}</span>
          <h1 className="nd-hero-title">{article.titulo}</h1>
          <div className="nd-hero-meta">
            <span className="nd-meta-item">
              <FaCalendar className="hero-icon" />
              {formatFecha(article.fecha)}
            </span>
            <span className="nd-meta-sep">·</span>
            <span className="nd-meta-item">
              <FaUser className="hero-icon" />
              Por {article.autor || "Secretaría de Prensa"}
            </span>
            {article.read_time && (
              <>
                <span className="nd-meta-sep">·</span>
                <span className="nd-meta-item">
                  <FaClock className="hero-icon" />
                  {article.read_time}
                </span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="nd-layout">

        {/* SHARE SIDEBAR */}
        <aside className="nd-share-rail">
          <span className="nd-share-label">Compartir</span>
          <button className="nd-share-btn" onClick={handleShare} title={copied ? "¡Copiado!" : "Copiar enlace"}>
            {copied ? <FaCheck /> : <FaShareNodes />}
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(article.titulo + " " + window.location.href)}`}
            target="_blank"
            rel="noreferrer"
            className="nd-share-btn"
            title="WhatsApp"
          >
            <FaWhatsapp />
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(article.titulo)}&body=${encodeURIComponent(window.location.href)}`}
            className="nd-share-btn"
            title="Enviar por email"
          >
            <FaEnvelope />
          </a>
        </aside>

        {/* ARTICLE CONTENT */}
        <article className="nd-article">
          {article.excerpt && (
            <p className="nd-lead">{article.excerpt}</p>
          )}

          {renderBody()}

          {article.tags && Array.isArray(article.tags) && article.tags.length > 0 && (
            <div className="nd-tags">
              {article.tags.map((tag) => (
                <span key={tag} className="nd-tag-chip">{tag}</span>
              ))}
            </div>
          )}
        </article>

        {/* RIGHT SIDEBAR */}
        <aside className="nd-sidebar">
          <div className="nd-sidebar-block">
            <h3 className="nd-sidebar-title">Lo Más Leído</h3>
            <ul className="nd-most-read">
              {MOST_READ.map((item, i) => (
                <li key={i} className="nd-most-read-item">
                  <span className="nd-most-read-cat">{item.category}</span>
                  <span className="nd-most-read-title">{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* RELATED NEWS */}
      {related.length > 0 && (
        <section className="nd-related">
          <div className="nd-related-header">
            <div>
              <span className="nd-related-eyebrow">Continuar Leyendo</span>
              <h2 className="nd-related-title">Noticias Relacionadas</h2>
            </div>
            <Link className="nd-see-all" to="/noticias">
              Ver todas las noticias <FaArrowRight />
            </Link>
          </div>

          <div className="nd-related-grid">
            {related.map((item) => (
              <article
                key={item.id}
                className="nd-related-card"
                onClick={() => navigate(`/noticias/${item.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="nd-related-img-wrap">
                  <img
                    src={item.imagen_url || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80"}
                    alt={item.titulo}
                    className="nd-related-img"
                  />
                </div>
                <div className="nd-related-body">
                  <span className="nd-related-cat">{item.categoria}</span>
                  <h3 className="nd-related-card-title">{item.titulo}</h3>
                  <p className="nd-related-excerpt">{item.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}