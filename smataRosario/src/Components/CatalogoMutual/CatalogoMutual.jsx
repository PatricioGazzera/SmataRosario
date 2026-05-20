import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabase';
import './CatalogoMutual.css';
import {
    FaMagnifyingGlass,
    FaWhatsapp,
    FaBoxesStacked,
    FaShield,
    FaPlus,
    FaPenToSquare,
    FaTrashCan,
    FaCircleExclamation,
} from '../../utils/icons/icons';
import { useAuth } from '../../context/AuthContext.jsx';
import ProductForm from '../ProductForm/ProductForm.jsx';

const CATEGORIAS = ['Todos', 'Televisores', 'Electrodomésticos', 'Audio', 'Colchones y Sommiers', 'Hogar', 'Varios'];

const formatPrecio = (precio) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(precio);

export default function CatalogoMutual() {
    const { session } = useAuth();
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoriaActiva, setCategoriaActiva] = useState('Todos');
    const [busqueda, setBusqueda] = useState('');

    // ProductForm state
    const [showForm, setShowForm] = useState(false);
    const [editingProducto, setEditingProducto] = useState(null);

    // Delete confirm
    const [deletingId, setDeletingId] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const fetchProductos = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('productos')
            .select('id, nombre, descripcion, categoria, precio, imagenes, estado, destacado')
            .order('destacado', { ascending: false })
            .order('created_at', { ascending: false });

        if (!error && data) setProductos(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    const productosFiltrados = useMemo(() => {
        return productos.filter((p) => {
            const matchCategoria = categoriaActiva === 'Todos' || p.categoria === categoriaActiva;
            const matchBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                (p.descripcion || '').toLowerCase().includes(busqueda.toLowerCase());
            return matchCategoria && matchBusqueda;
        });
    }, [productos, categoriaActiva, busqueda]);

    const handleNewProducto = () => {
        setEditingProducto(null);
        setShowForm(true);
    };

    const handleEditProducto = (producto) => {
        setEditingProducto(producto);
        setShowForm(true);
    };

    const handleDeleteClick = (producto) => {
        setDeleteTarget(producto);
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = async () => {
        if (!deleteTarget) return;
        setDeletingId(deleteTarget.id);
        const { error } = await supabase.from('productos').delete().eq('id', deleteTarget.id);
        if (error) {
            alert('Error al eliminar. Intentá de nuevo.');
        } else {
            setProductos((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        }
        setDeletingId(null);
        setShowDeleteConfirm(false);
        setDeleteTarget(null);
    };

    return (
        <div className="cm-root">

            {/* ── HERO ── */}
            <section className="cm-hero">
                <div className="cm-hero-bg" />
                <div className="cm-hero-overlay" />
                <div className="cm-hero-content">
                    <span className="cm-hero-tag">Nuestros Productos</span>
                    <h1 className="cm-hero-title">
                        Catálogo Mutual<br />
                        <span className="cm-accent">SMATA</span>
                    </h1>
                    <p className="cm-hero-sub">
                        Productos exclusivos para afiliados con financiación y precios preferenciales.
                    </p>
                </div>
            </section>

            {/* ── BUSCADOR + FILTROS ── */}
            <section className="cm-filters-section">
                <div className="cm-search-wrap">
                    <FaMagnifyingGlass className="cm-search-icon" />
                    <input
                        id="cm-busqueda"
                        name="busqueda"
                        className="cm-search"
                        type="text"
                        placeholder="¿Qué estás buscando hoy?"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
                <div className="cm-categorias">
                    {CATEGORIAS.map((cat) => (
                        <button
                            key={cat}
                            className={`cm-cat-btn ${categoriaActiva === cat ? 'active' : ''}`}
                            onClick={() => setCategoriaActiva(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* ── MAIN (admin sidebar + grid) ── */}
            <div className={`cm-main ${session ? 'cm-main--admin' : ''}`}>

                {/* ── PANEL ADMIN ── */}
                {session && (
                    <aside className="cm-admin-panel">
                        <div className="cm-admin-panel-header">
                            <FaShield />
                            <span>Admin</span>
                        </div>

                        <button className="cm-admin-panel-new" onClick={handleNewProducto}>
                            <FaPlus />
                            Nuevo producto
                        </button>

                        {/* <div className="cm-admin-panel-divider" />

                        <p className="cm-admin-panel-label">Acciones por producto</p>
                        <ul className="cm-admin-panel-list">
                            {productos.map((item) => (
                                <li key={item.id} className="cm-admin-panel-item">
                                    <span className="cm-admin-panel-item-title">{item.nombre}</span>
                                    <div className="cm-admin-panel-item-actions">
                                        <button
                                            className="cm-admin-panel-edit"
                                            onClick={() => handleEditProducto(item)}
                                            title="Editar"
                                        >
                                            <FaPenToSquare />
                                        </button>
                                        <button
                                            className="cm-admin-panel-delete"
                                            onClick={() => handleDeleteClick(item)}
                                            title="Eliminar"
                                            disabled={deletingId === item.id}
                                        >
                                            <FaTrashCan />
                                        </button>
                                    </div>
                                </li>
                            ))}
                            {productos.length === 0 && !loading && (
                                <li className="cm-admin-panel-empty">No hay productos cargados.</li>
                            )}
                        </ul>
                        */}
                    </aside>
                )}

                {/* ── GRID ── */}
                <section className="cm-grid-section">
                    {loading ? (
                        <div className="cm-grid">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div className="cm-card cm-card--skeleton" key={i}>
                                    <div className="cm-card-img-skeleton" />
                                    <div className="cm-card-body">
                                        <div className="cm-skeleton-line cm-skeleton-line--short" />
                                        <div className="cm-skeleton-line" />
                                        <div className="cm-skeleton-line cm-skeleton-line--price" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : productosFiltrados.length === 0 ? (
                        <div className="cm-empty">
                            <span className="cm-empty-icon"><FaBoxesStacked /></span>
                            <h3>No encontramos productos</h3>
                            <p>Probá con otra categoría o término de búsqueda.</p>
                        </div>
                    ) : (
                        <div className="cm-grid">
                            {productosFiltrados.map((producto) => (
                                <div
                                    key={producto.id}
                                    className="cm-card"
                                    onClick={() => navigate(`/catalogo-mutual/${producto.id}`)}
                                >
                                    <div className="cm-card-img-wrap">
                                        {producto.imagenes?.[0] ? (
                                            <img
                                                src={producto.imagenes[0]}
                                                alt={producto.nombre}
                                                className="cm-card-img"
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        ) : (
                                            <div className="cm-card-img-placeholder">📦</div>
                                        )}
                                        {producto.destacado && (
                                            <span className="cm-badge-destacado">Destacado</span>
                                        )}
                                        {producto.estado === 'agotado' && (
                                            <span className="cm-badge-agotado">Agotado</span>
                                        )}
                                        {session && (
                                            <div className="cm-card-admin-actions">
                                                <button
                                                    className="cm-card-admin-edit"
                                                    onClick={(e) => { e.stopPropagation(); handleEditProducto(producto); }}
                                                    title="Editar"
                                                >
                                                    <FaPenToSquare />
                                                </button>
                                                <button
                                                    className="cm-card-admin-delete"
                                                    onClick={(e) => { e.stopPropagation(); handleDeleteClick(producto); }}
                                                    title="Eliminar"
                                                >
                                                    <FaTrashCan />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="cm-card-body">
                                        <span className="cm-card-categoria">{producto.categoria}</span>
                                        <h3 className="cm-card-nombre">{producto.nombre}</h3>
                                        {producto.descripcion && (
                                            <p className="cm-card-desc">{producto.descripcion}</p>
                                        )}
                                        <span className="cm-card-precio">{formatPrecio(producto.precio)}</span>
                                        <button
                                            className={`cm-card-btn ${producto.estado === 'agotado' ? 'cm-card-btn--agotado' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/catalogo-mutual/${producto.id}`);
                                            }}
                                            disabled={producto.estado === 'agotado'}
                                        >
                                            {producto.estado === 'agotado' ? 'Agotado' : 'Ver producto'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>

            {/* ── CTA FINAL ── */}
            <section className="cm-cta">
                <div className="cm-cta-inner">
                    <div>
                        <h2 className="cm-cta-title">¿No encontrás lo que buscás?</h2>
                        <p className="cm-cta-desc">
                            Nuestro equipo está disponible para asesorarte en compras especiales y convenios exclusivos para afiliados.
                        </p>
                    </div>
                    <a
                        href="https://wa.me/5493413130317?text=Hola%20quiero%20información%20sobre%20el%20catálogo%20mutual."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cm-cta-btn"
                    >
                        <FaWhatsapp /> Contactar Asesor
                    </a>
                </div>
            </section>

            {/* ── MODAL CREAR / EDITAR ── */}
            <ProductForm
                open={showForm}
                onClose={() => { setShowForm(false); setEditingProducto(null); }}
                onSuccess={fetchProductos}
                producto={editingProducto}
            />

            {/* ── CONFIRM DELETE ── */}
            {showDeleteConfirm && (
                <div className="cm-confirm-backdrop" onClick={() => setShowDeleteConfirm(false)}>
                    <div className="cm-confirm-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="cm-confirm-icon">
                            <FaCircleExclamation />
                        </div>
                        <h3 className="cm-confirm-title">¿Eliminar producto?</h3>
                        <p className="cm-confirm-text">
                            <strong>"{deleteTarget?.nombre}"</strong> será eliminado permanentemente.
                        </p>
                        <div className="cm-confirm-actions">
                            <button className="cm-confirm-cancel" onClick={() => setShowDeleteConfirm(false)}>
                                Cancelar
                            </button>
                            <button className="cm-confirm-delete" onClick={handleDeleteConfirm} disabled={!!deletingId}>
                                {deletingId ? 'Eliminando...' : 'Sí, eliminar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}