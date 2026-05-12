import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../utils/supabase';
import './CatalogoMutualDetails.css';
import { FaWhatsapp, FaChevronLeft, FaChevronRight } from '../../utils/icons/icons';

const formatPrecio = (precio) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(precio);

export default function CatalogoMutualDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imgActiva, setImgActiva] = useState(0);

    useEffect(() => {
        const fetchProducto = async () => {
            const { data, error } = await supabase
                .from('productos')
                .select('*')
                .eq('id', id)
                .single();

            if (error || !data) {
                navigate('/catalogo-mutual');
            } else {
                setProducto(data);
            }
            setLoading(false);
        };
        fetchProducto();
    }, [id, navigate]);

    const imagenes = producto?.imagenes?.length > 0 ? producto.imagenes : [];

    const anterior = () => setImgActiva((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
    const siguiente = () => setImgActiva((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));

    if (loading) {
        return (
            <div className="cmd-loading">
                <div className="cmd-spinner" />
            </div>
        );
    }

    if (!producto) return null;

    const mensajeWsp = encodeURIComponent(
        `Hola! Quiero información sobre el producto: ${producto.nombre}.`
    );

    return (
        <div className="cmd-page">

            {/* ── BREADCRUMB ── */}
            <nav className="cmd-breadcrumb">
                <Link to="/">Inicio</Link>
                <span>›</span>
                <Link to="/catalogo-mutual">Catálogo</Link>
                <span>›</span>
                <span>{producto.categoria}</span>
                <span>›</span>
                <span className="cmd-breadcrumb-actual">{producto.nombre}</span>
            </nav>

            {/* ── BODY ── */}
            <div className="cmd-body">

                {/* ── GALERÍA ── */}
                <div className="cmd-galeria">
                    <div className="cmd-img-principal-wrap">
                        {imagenes.length > 0 ? (
                            <>
                                <img
                                    src={imagenes[imgActiva]}
                                    alt={producto.nombre}
                                    className="cmd-img-principal"
                                />
                                {imagenes.length > 1 && (
                                    <>
                                        <button className="cmd-galeria-btn cmd-galeria-btn--prev" onClick={anterior}>
                                            <FaChevronLeft />
                                        </button>
                                        <button className="cmd-galeria-btn cmd-galeria-btn--next" onClick={siguiente}>
                                            <FaChevronRight />
                                        </button>
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="cmd-img-placeholder">📦</div>
                        )}

                        {producto.destacado && (
                            <span className="cmd-badge-destacado">Destacado</span>
                        )}
                        {producto.estado === 'agotado' && (
                            <span className="cmd-badge-agotado">Agotado</span>
                        )}
                    </div>

                    {/* Thumbnails */}
                    {imagenes.length > 1 && (
                        <div className="cmd-thumbnails">
                            {imagenes.map((img, i) => (
                                <button
                                    key={i}
                                    className={`cmd-thumb ${i === imgActiva ? 'active' : ''}`}
                                    onClick={() => setImgActiva(i)}
                                >
                                    <img src={img} alt={`${producto.nombre} ${i + 1}`} />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* ── INFO ── */}
                <div className="cmd-info">
                    <span className="cmd-info-categoria">{producto.categoria}</span>
                    <h1 className="cmd-info-nombre">{producto.nombre}</h1>

                    {producto.descripcion && (
                        <p className="cmd-info-desc">{producto.descripcion}</p>
                    )}

                    <div className="cmd-info-precio">
                        {formatPrecio(producto.precio)}
                    </div>

                    {producto.descripcion_larga && (
                        <div className="cmd-info-larga">
                            <h3>Descripción</h3>
                            <p>{producto.descripcion_larga}</p>
                        </div>
                    )}

                    <div className="cmd-info-actions">
                        {producto.estado === 'agotado' ? (
                            <div className="cmd-agotado-msg">
                                Este producto no está disponible actualmente.
                            </div>
                        ) : (
                            <a
                                href={`https://wa.me/5493412555424?text=${mensajeWsp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cmd-wsp-btn"
                            >
                                <FaWhatsapp /> Consultar por WhatsApp
                            </a>
                        )}

                        <button
                            className="cmd-back-btn"
                            onClick={() => navigate('/catalogo-mutual')}
                        >
                            ← Volver al catálogo
                        </button>
                    </div>

                    <div className="cmd-info-envio">
                        <span className="cmd-info-envio-icon">🏢</span>
                        <div>
                            <strong>Retiro en Sede Central</strong>
                            <p>Gorriti 1095, Rosario — Lunes a Viernes</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
