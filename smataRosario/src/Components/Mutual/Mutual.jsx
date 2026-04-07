import './Mutual.css'
import { FaArrowRight } from '../../utils/icons/icons';

export default function Mutual() {
    return(
        <div>
            <>
                
                    {/* ── HERO ── */}
                    <section className="hero" id="inicio">
                        <div className="hero-bg" />
                        <div className="hero-content">
                        <div className="hero-badge">Mutual de Smata Rosario</div>
                        <h1 className="hero-title">
                            Comprometidos con el <span className="accent">bienestar</span>{' '}
                            de la familia mecánica
                        </h1>
                        <p className="hero-sub">
                            Descubrí todos los beneficios y servicios exclusivos diseñados para brindar seguridad
                            y apoyo a nuestros afiliados en cada etapa de su vida.
                        </p>
                        <div className="hero-btns">
                            <button className="btn-primary">Asociarse ahora</button>
                            <button className="btn-outline">Ver Beneficios de Socio</button>
                        </div>
                        </div>
                    </section>
                    {/* ── CTA ── */}
                    <section className="cta">
                        <div className="cta-box">
                        <div className="cta-content">
                            <h2>
                            Formá Parte de<br />
                            Nuestra Comunidad
                            </h2>
                            <p>
                            Sumáte a más de 10.000 trabajadores de Rosario que confían en
                            SMATA para su seguridad laboral y bienestar familiar.
                            </p>
                            <div className="cta-btns">
                            <button className="btn-white">
                                ↓ Solicitar Afiliación
                            </button>
                            <button className="btn-white-outline">
                                Preguntas Frecuentes
                            </button>
                            </div>
                        </div>
                        </div>
                    </section>
                    </>
        </div>
    )
}