import './Autoridades.css';

// ─── Avatares SVG inline ───────────────────────────────────────────
function Avatar({ size = 'lg', bg = '#d4d4ce' }) {
  const fontSize = size === 'lg' ? 56 : 38;
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', background: bg }}>
      <rect width="100" height="100" fill={bg} />
      <circle cx="50" cy="36" r="18" fill="#b0b0a8" />
      <ellipse cx="50" cy="80" rx="28" ry="22" fill="#b0b0a8" />
    </svg>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────
const sindicatoSecundarios = [
  { role: 'Sec. de Finanzas', name: 'Paola Corvetti' },
  { role: 'Sec. de Actas', name: 'Hugo M. Barros' },
  { role: 'Sec. Acción Social', name: 'Andrés Gobbi' },
  { role: 'Sec. Administrativo', name: 'Andrés Gobbi' },
  { role: 'Vocal Titular 1°', name: 'Ruggeri Agustin Mario' },
  { role: 'Vocal Titular 2°', name: 'Mathieu Ana Maria' },
];

const juntaMembers = [
  'Oscar A. Romero',
  'Beatriz J. Castro',
  'Fernando S. Vila',
];

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────
export default function Autoridades() {
  return (
    <div className="smata-app">
      {/* HERO */}
      <section className="menu">
        <div>
          <p className="menu-tag">Institucional</p>
          <h1 className="menu-title">
            Autoridades y{' '}
            <span className="highlight">Representación</span>
          </h1>
        </div>
        <p className="menu-desc">
          Nuestra gestión se fundamenta en la transparencia, el compromiso y
          la defensa incansable de los derechos de los trabajadores mecánicos.
          Conozca a quienes integran las comisiones directivas de nuestro
          sindicato y nuestra mutual.
        </p>
      </section>

      {/* CONTENT */}
      <main className="content">

        {/* ── SINDICATO ── */}
        <section className="sindicato-section">
          <div className="sindicato-section-header">
            <h2>Sindicato SMATA Rosario</h2>
          </div>

          {/* Cards principales */}
          <div className="cards-top">

            {/* Secretario General */}
            <div className="card card-main">
              <div className="card-main-inner">
                <div className="card-img" style={{ overflow: 'hidden', borderRadius: 10 }}>
                  <Avatar bg="#c8c8c0" />
                </div>
                <div>
                  <p className="card-role">Secretario General</p>
                  <h3 className="card-name">Sergio Gazzera</h3>
                  <p className="card-desc">
                    Liderando con determinación la defensa de los derechos
                    laborales en la región desde 2018.
                  </p>
                </div>
              </div>
              <span className="card-badge">
                Comisión Ejecutiva
              </span>
            </div>

            {/* Subsecretario */}
            <div className="card card-secondary">
              <div className="card-img-square">
                <Avatar bg="#d8d8d2" />
              </div>
              <div className="card-body">
                <p className="card-role">Subsecretario General</p>
                <h3 className="card-name">Ernesto Rojas</h3>
              </div>
            </div>

            {/* Sec. Organización */}
            <div className="card card-secondary">
              <div className="card-img-square">
                <Avatar bg="#cacac4" />
              </div>
              <div className="card-body">
                <p className="card-role">Secretario Gremial</p>
                <h3 className="card-name">Mariano Fernandez</h3>
              </div>
            </div>
          </div>

          {/* Cards secundarias */}
          <div className="cards-row">
            {sindicatoSecundarios.map((m) => (
              <div className="card-mini" key={m.name}>
                <p className="card-role">{m.role}</p>
                <p className="card-name">{m.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── MUTUAL ── */}
        <section className="mutual-section">
          <div className="section-header">
            <h2>Mutual de SMATA Rosario</h2>
          </div>

          <div className="mutual-grid">

            {/* Presidente Mutual */}
            <div>
              <div className="card-presidente">
                <div className="img-wrapper">
                  <Avatar bg="#b8b8b2" />
                </div>
                <div className="card-presidente-overlay">
                  <p className="card-role">Presidente Mutual</p>
                  <h3 className="card-name">Marcelo Barros</h3>
                </div>
              </div>
            </div>

            {/* Secretario Mutual */}
            <div className="card-mutual-sec">
              <div className="img-wrapper">
                <Avatar bg="#c4c4be" />
              </div>
              <div className="card-body">
                <p className="card-role">Secretario</p>
                <h3 className="card-name">Ricardo H. Luna</h3>
              </div>
            </div>

            {/* Tesorera */}
            <div className="card-mutual-sec">
              <div className="img-wrapper">
                <Avatar bg="#ccccc6" />
              </div>
              <div className="card-body">
                <p className="card-role">Tesorera</p>
                <h3 className="card-name">Silvia M. Lopez</h3>
              </div>
            </div>

            {/* Junta Fiscalizadora */}
            <div className="junta-card">
              <div className="junta-renovacion">
                <p className="label">Próxima Renovación</p>
                <p className="fecha">Diciembre 2026</p>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}