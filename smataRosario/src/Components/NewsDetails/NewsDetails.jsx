import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import "./NewsDetails.css";
import { useAuth } from "../../context/AuthContext.jsx";
import { FaWhatsapp,
  FaShareNodes,
  FaCheck,
  FaCalendar,
  FaUser
} from "../../utils/icons/icons.js"

const RELATED_LIMIT = 3;

export default function NewsDetail() {
  const { session } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // UI
  const [copied, setCopied] = useState(false);

  // Lightbox
  const [lightboxImg, setLightboxImg] = useState(null);

  // Cerrar lightbox con Escape
  useEffect(() => {
    if (!lightboxImg) return;
    const onKey = (e) => { if (e.key === 'Escape') setLightboxImg(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxImg]);

  // Traer noticia
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setNotFound(false);

    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from("noticias")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setArticle(data);

      // Noticias relacionadas (misma categoría, distinto id)
      const { data: rel } = await supabase
        .from("noticias")
        .select("id, titulo, excerpt, categoria, imagen_url")
        .eq("categoria", data.categoria)
        .neq("id", id)
        .order("fecha", { ascending: false })
        .limit(RELATED_LIMIT);

      setRelated(rel || []);
      setLoading(false);
    };

    fetchArticle();
  }, [id]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    setDeleting(true);
    const { error } = await supabase.from("noticias").delete().eq("id", id);
    if (error) {
      alert("Error al eliminar la noticia. Intentá de nuevo.");
      setDeleting(false);
      return;
    }
    navigate("/noticias");
  };

  const reloadArticle = async () => {
    const { data } = await supabase.from("noticias").select("*").eq("id", id).single();
    if (data) setArticle(data);
  };

  const formatFecha = (fechaStr) => {
    if (!fechaStr) return "";
    return new Date(fechaStr).toLocaleDateString("es-AR", {
      day: "numeric", month: "long", year: "numeric",
    });
  };

  const renderContent = (text) => {
    if (!text) return null;

    const parts = text.split(/(\[img\].*?\[\/img\])/gs);

    return parts.map((part, i) => {
      const imgMatch = part.match(/^\[img\](.*?)\[\/img\]$/s);
      if (imgMatch) {
        const src = imgMatch[1].trim();
        return (
          <div key={i} className="nd-body-img-wrap">
            <img
              src={src}
              alt="Imagen de la noticia"
              className="nd-body-img"
              onClick={() => setLightboxImg(src)}
            />
          </div>
        );
      }

      const paragraphs = part.split(/\n\n+/).filter((p) => p.trim());
      return paragraphs.map((p, j) => (
        <p key={`${i}-${j}`} className="nd-paragraph">{p.trim()}</p>
      ));
    });
  };

  /* ── ESTADOS ── */
  if (loading) return (
    <div className="nd-root">
      <div className="nd-skeleton-hero" />
      <div className="nd-layout">
        <div />
        <div className="nd-article">
          <div className="nd-skeleton-line nd-skeleton-line--lead" />
          <div className="nd-skeleton-line" />
          <div className="nd-skeleton-line" />
          <div className="nd-skeleton-line nd-skeleton-line--short" />
        </div>
        <div />
      </div>
    </div>
  );

  if (notFound) return (
    <div className="nd-root">
      <div className="nd-not-found">
        <h2>Noticia no encontrada</h2>
        <p>Es posible que haya sido eliminada o que el enlace sea incorrecto.</p>
        <button className="nd-back-btn" onClick={() => navigate("/noticias")}>
          Volver a noticias
        </button>
      </div>
    </div>
  );

  return (
    <div className="nd-root">

      {/* ── LIGHTBOX ── */}
      {lightboxImg && (
        <div
          className="nd-lightbox-overlay"
          onClick={() => setLightboxImg(null)}
        >
          <button
            className="nd-lightbox-close"
            onClick={() => setLightboxImg(null)}
          >
            ✕
          </button>
          <img
            src={lightboxImg}
            alt="Vista ampliada"
            className="nd-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      {/* HERO */}
      <header
        className="nd-hero"
        style={{ backgroundImage: article.imagen_url ? `url(${article.imagen_url})` : undefined }}
      >
        <div className="nd-hero-overlay" />
        <div className="nd-hero-content">
          <span className="nd-tag">{article.categoria}</span>
          <h1 className="nd-hero-title">{article.titulo}</h1>
          <div className="nd-hero-meta">
            <span className="nd-meta-item">
              <FaCalendar />
              {formatFecha(article.fecha)}
            </span>
            {article.autor && (
              <>
                <span className="nd-meta-sep">·</span>
                <span className="nd-meta-item">
                  <FaUser />
                  Por {article.autor}
                </span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* LAYOUT */}
      <div className="nd-layout">

        {/* SHARE RAIL */}
        <aside className="nd-share-rail">
          <span className="nd-share-label">Compartir</span>
          <button className="nd-share-btn" onClick={handleShare} title={copied ? "¡Copiado!" : "Copiar enlace"}>
            {copied
              ? <FaCheck className="icons"/>
              : <FaShareNodes className="icons"/>
            }
          </button>
          <button className="nd-share-btn" title="WhatsApp">
            <FaWhatsapp className="icons" />
          </button>
        </aside>

        {/* ARTICLE */}
        <article className="nd-article">
          {article.excerpt && <p className="nd-lead">{article.excerpt}</p>}
          <div className="nd-body">{renderContent(article.contenido)}</div>
          <div className="nd-tags">
            <span className="nd-tag-chip">{article.categoria}</span>
            {article.autor && <span className="nd-tag-chip">{article.autor}</span>}
          </div>
        </article>

      </div>

      {/* RELACIONADAS */}
      {related.length > 0 && (
        <section className="nd-related">
          <div className="nd-related-header">
            <div>
              <span className="nd-related-eyebrow">Continuar Leyendo</span>
              <h2 className="nd-related-title">Noticias Relacionadas</h2>
            </div>
            <button className="nd-see-all" onClick={() => navigate("/noticias")}>
              Ver todas las noticias →
            </button>
          </div>
          <div className="nd-related-grid">
            {related.map((item) => (
              <article
                key={item.id}
                className="nd-related-card"
                onClick={() => navigate(`/noticias/${item.id}`)}
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