import { useEffect, useState } from "react";

type Page = "inicio" | "publicaciones";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" />
      <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h7l4 4v14H7V3Z" />
      <path d="M14 3v5h5M10 13h5M10 17h5" />
    </svg>
  );
}

function Header({
  page,
  navigate,
}: {
  page: Page;
  navigate: (page: Page, anchor?: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (nextPage: Page, anchor?: string) => {
    setMenuOpen(false);
    navigate(nextPage, anchor);
  };

  return (
    <>
      <div className="institution-bar">
        <div className="shell institution-inner">
          <span>Universidad Nacional Agraria La Molina</span>
          <span className="status">
            <i />
            Semillero de investigación activo
          </span>
        </div>
      </div>
      <header className="site-header">
        <div className="shell nav-wrap">
          <button className="brand" onClick={() => go("inicio")} aria-label="Ir al inicio">
            <span className="brand-mark">
              <img src="/afinlab-logo.png" alt="" />
            </span>
            <span className="brand-copy">
              <strong>AFINLAB</strong>
              <small>Applied Finance Learning Lab</small>
            </span>
          </button>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Abrir menú"
          >
            <span />
            <span />
          </button>

          <nav
            className={menuOpen ? "main-nav open" : "main-nav"}
            aria-label="Navegación principal"
          >
            <button onClick={() => go("inicio", "nosotros")}>Nosotros</button>
            <button onClick={() => go("inicio", "proyectos")}>Proyectos</button>
            <button
              className={page === "publicaciones" ? "active" : ""}
              onClick={() => go("publicaciones")}
            >
              Publicaciones
            </button>
            <button onClick={() => go("inicio", "recursos")}>Recursos</button>
            <button className="nav-cta" onClick={() => go("inicio", "contacto")}>
              Conversemos
            </button>
          </nav>
        </div>
      </header>
    </>
  );
}

function Footer({ navigate }: { navigate: (page: Page, anchor?: string) => void }) {
  return (
    <footer className="footer" id="contacto">
      <div className="shell footer-grid">
        <div>
          <button className="brand footer-brand" onClick={() => navigate("inicio")}>
            <span className="brand-mark light">
              <img src="/afinlab-logo.png" alt="" />
            </span>
            <span className="brand-copy">
              <strong>AFINLAB</strong>
              <small>Semillero de Investigación UNALM</small>
            </span>
          </button>
          <p>
            Investigación financiera aplicada para transformar decisiones y generar impacto en el
            Perú.
          </p>
        </div>
        <div className="footer-links">
          <span>Explora</span>
          <button onClick={() => navigate("inicio", "proyectos")}>Proyectos</button>
          <button onClick={() => navigate("publicaciones")}>Publicaciones</button>
          <button onClick={() => navigate("inicio", "nosotros")}>Sobre AFINLAB</button>
        </div>
        <div className="footer-contact">
          <span>Contacto</span>
          <a href="mailto:afinlab@lamolina.edu.pe">afinlab@lamolina.edu.pe</a>
          <p>La Molina, Lima — Perú</p>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 AFINLAB · Universidad Nacional Agraria La Molina</span>
        <span>Conocimiento que genera impacto</span>
      </div>
    </footer>
  );
}

function Home({ navigate }: { navigate: (page: Page, anchor?: string) => void }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-grid-overlay" />
        <div className="shell hero-content">
          <div className="hero-copy">
            <span className="eyebrow light-eyebrow">Applied Finance Learning Lab · UNALM</span>
            <h1>
              Investigación que convierte <em>datos en decisiones.</em>
            </h1>
            <p>
              Somos un semillero universitario que impulsa el análisis financiero, la innovación y
              el desarrollo sostenible a través de investigación aplicada.
            </p>
            <div className="hero-actions">
              <button className="button primary" onClick={() => navigate("inicio", "proyectos")}>
                Conoce nuestros proyectos <ArrowIcon />
              </button>
              <button className="button ghost" onClick={() => navigate("publicaciones")}>
                Ver publicaciones
              </button>
            </div>
          </div>
          <aside className="hero-panel">
            <div className="panel-kicker">Nuestro enfoque</div>
            <div className="hero-metric">
              <strong>03</strong>
              <span>sectores económicos analizados</span>
            </div>
            <div className="metric-divider" />
            <div className="hero-metric">
              <strong>04</strong>
              <span>etapas en nuestra ruta de investigación</span>
            </div>
            <button onClick={() => navigate("publicaciones")}>
              Conocer el proceso <ArrowIcon />
            </button>
          </aside>
        </div>
      </section>

      <section className="intro-section" id="nosotros">
        <div className="shell intro-grid">
          <div>
            <span className="eyebrow">Quiénes somos</span>
            <h2>Un laboratorio para aprender investigando</h2>
          </div>
          <div className="intro-body">
            <p>
              AFINLAB reúne a estudiantes y docentes para estudiar problemas financieros reales con
              rigor académico y una mirada sostenible.
            </p>
            <div className="principles">
              <span>Rigor académico</span>
              <span>Aprendizaje colaborativo</span>
              <span>Impacto aplicado</span>
            </div>
          </div>
        </div>
      </section>

      <section className="projects-section" id="proyectos">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <span className="eyebrow">Del análisis al conocimiento</span>
              <h2>Proyectos que avanzan hacia una publicación</h2>
            </div>
            <button className="text-link" onClick={() => navigate("publicaciones")}>
              Ver ruta de publicaciones <ArrowIcon />
            </button>
          </div>

          <div className="project-grid">
            <article className="featured-project">
              <div className="project-top">
                <span className="tag">Proyecto destacado</span>
                <span className="project-number">AF · 001</span>
              </div>
              <div>
                <span className="project-sector">Análisis financiero · Agroindustria</span>
                <h3>Observatorio financiero empresarial</h3>
                <p>
                  Comparamos indicadores de rentabilidad, endeudamiento y riesgo para comprender el
                  desempeño de sectores estratégicos del país.
                </p>
              </div>
              <div className="project-action-row">
                <div className="project-metrics">
                  <span>
                    <strong>8</strong> empresas
                  </span>
                  <span>
                    <strong>3</strong> sectores
                  </span>
                </div>
                <button className="circle-button" onClick={() => navigate("publicaciones")}>
                  <ArrowIcon />
                  <span className="sr-only">Ver publicaciones relacionadas</span>
                </button>
              </div>
            </article>

            <aside className="publication-bridge">
              <div className="bridge-icon">
                <BookIcon />
              </div>
              <span className="eyebrow">Siguiente etapa</span>
              <h3>¿Cómo se transforma un proyecto en un paper?</h3>
              <p>
                Conoce nuestro proceso de trabajo y descubre dónde se publicarán los resultados
                cuando estén finalizados.
              </p>
              <button className="button dark" onClick={() => navigate("publicaciones")}>
                Ir a Publicaciones <ArrowIcon />
              </button>
            </aside>
          </div>

          <div className="connection-strip">
            <span>Proyecto</span>
            <i />
            <span>Análisis</span>
            <i />
            <span>Validación</span>
            <i />
            <span className="current">Publicación</span>
          </div>
        </div>
      </section>

      <section className="resources-section" id="recursos">
        <div className="shell resources-grid">
          <div>
            <span className="eyebrow">Conocimiento abierto</span>
            <h2>Aprende con nuestros hallazgos</h2>
          </div>
          <div className="resource-card">
            <ChartIcon />
            <div>
              <strong>Datos y análisis</strong>
              <p>Indicadores financieros explicados con claridad.</p>
            </div>
          </div>
          <button className="resource-card clickable" onClick={() => navigate("publicaciones")}>
            <FileIcon />
            <div>
              <strong>Investigaciones</strong>
              <p>Conoce el proceso de nuestros próximos papers.</p>
            </div>
            <ArrowIcon />
          </button>
        </div>
      </section>
    </main>
  );
}

function Publications({ navigate }: { navigate: (page: Page, anchor?: string) => void }) {
  return (
    <main className="publication-page">
      <div className="shell publication-content">
        <div className="publication-top-row">
          <button className="back-projects" onClick={() => navigate("inicio", "proyectos")}>
            <span>←</span> Volver a Proyectos
          </button>
          <div className="breadcrumb" aria-label="Migas de pan">
            <button onClick={() => navigate("inicio", "proyectos")}>Proyectos</button>
            <span>/</span>
            <strong>Desarrollo de Investigaciones</strong>
          </div>
        </div>

        <section className="publication-heading">
          <span className="eyebrow">Publicaciones</span>
          <h1>Desarrollo de Investigaciones</h1>
          <p>
            AFINLAB impulsa la producción de investigación aplicada original, acompañando a sus
            miembros desde la formación de un equipo hasta la publicación de un paper académico.
          </p>
        </section>

        <div className="publication-notice">
          Actualmente el semillero aún no cuenta con investigaciones. Los futuros papers
          finalizados se compartirán en esta sección.
        </div>

        <section className="process-section">
          <div className="section-heading compact-heading">
            <h2>Cómo trabajamos una investigación</h2>
          </div>
          <div className="process-grid">
            {[
              "Formación de equipo",
              "Investigación y análisis",
              "Postulación a fondos",
              "Publicación",
            ].map((title) => (
              <article className="process-step" key={title}>
                <div className="step-line">
                  <span />
                </div>
                <h3>{title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="published-section">
          <div className="section-heading">
            <h2>Investigaciones publicadas</h2>
          </div>
          <div className="empty-library">
            <div className="empty-icon">
              <span>PDF</span>
            </div>
            <div>
              <h3>Aún no hay investigaciones publicadas</h3>
              <p>El primer paper del semillero se publicará aquí apenas esté finalizado.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function App() {
  const initialPage: Page = window.location.hash.startsWith("#/publicaciones")
    ? "publicaciones"
    : "inicio";
  const [page, setPage] = useState<Page>(initialPage);

  useEffect(() => {
    const handleHashChange = () => {
      setPage(window.location.hash.startsWith("#/publicaciones") ? "publicaciones" : "inicio");
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = (nextPage: Page, anchor?: string) => {
    const hash = nextPage === "publicaciones" ? "#/publicaciones" : "#/inicio";
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    }
    setPage(nextPage);
    window.setTimeout(() => {
      if (anchor) {
        document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 0);
  };

  return (
    <div className="app">
      <Header page={page} navigate={navigate} />
      {page === "inicio" ? <Home navigate={navigate} /> : <Publications navigate={navigate} />}
      <Footer navigate={navigate} />
    </div>
  );
}
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Redes Sociales | AFINLAB</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      /* Paleta: azul noche + destello verde esmeralda de la marca */
      --bg-top: #0a1a33;
      --bg-mid: #0f2a4f;
      --bg-bottom: #12335c;
      --glow-green: rgba(38, 166, 108, .28);
      --glow-blue: rgba(52, 120, 220, .30);
      --navy: #16284a;          /* texto de chips */
      --footer: #09152b;        /* footer */
      --green: #1e6b43;         /* texto activo del menú */
      --white: #ffffff;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    body {
      font-family: 'Inter', sans-serif;
      color: var(--white);
      background: var(--footer);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    a { color: inherit; text-decoration: none; }
    ul { list-style: none; }

    /* ---------- HEADER ---------- */
    .header {
      position: sticky;
      top: 0;
      z-index: 50;
      height: 76px;
      background: linear-gradient(180deg, #8a8a8a 0%, #e4e4e4 38%, #ffffff 80%);
      box-shadow: 0 2px 8px rgba(0, 0, 0, .25);
    }
    .header__inner {
      max-width: 896px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      gap: 70px;
    }
    .logo { display: block; flex-shrink: 0; }
    .logo img { height: 46px; width: auto; display: block; }
    .nav { display: flex; align-items: center; gap: 6px; }
    .nav a {
      font-size: 13px;
      font-weight: 600;
      color: #111;
      padding: 8px 13px;
      border-radius: 999px;
      transition: background .2s;
    }
    .nav a:hover { background: rgba(0, 0, 0, .06); }
    .nav a.active {
      background: rgba(150, 150, 150, .28);
      color: var(--green);
    }

    /* ---------- SECCIÓN PRINCIPAL ---------- */
    .hero {
      flex: 1;
      padding: 22px 20px 78px;
      background:
        radial-gradient(ellipse 55% 60% at 0% 0%, var(--glow-green) 0%, rgba(38, 166, 108, 0) 70%),
        radial-gradient(ellipse 55% 65% at 100% 100%, var(--glow-blue) 0%, rgba(52, 120, 220, 0) 70%),
        linear-gradient(165deg, var(--bg-top) 0%, var(--bg-mid) 55%, var(--bg-bottom) 100%);
    }
    .container { max-width: 896px; margin: 0 auto; }

    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      margin-top: 6px;
    }
    .back { font-weight: 700; }
    .back:hover { text-decoration: underline; }
    .breadcrumb { color: rgba(255, 255, 255, .72); }
    .breadcrumb b { color: var(--white); font-weight: 700; }
    .breadcrumb i { font-style: normal; margin: 0 6px; }

    .eyebrow {
      margin-top: 28px;
      font-family: 'Poppins', sans-serif;
      font-weight: 700;
      font-size: 10.5px;
      letter-spacing: 2.2px;
      text-transform: uppercase;
    }
    h1 {
      margin-top: 8px;
      font-family: 'Poppins', sans-serif;
      font-weight: 700;
      font-size: 28px;
      line-height: 1.2;
    }
    .lead {
      margin-top: 10px;
      font-size: 13px;
      color: rgba(255, 255, 255, .88);
    }

    /* ---------- TARJETAS ---------- */
    .grid {
      margin-top: 32px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      align-items: start;
    }
    .card {
      padding: 22px;
      border: 1px solid rgba(255, 255, 255, .25);
      border-radius: 20px;
      background: rgba(255, 255, 255, .08);
      backdrop-filter: blur(6px);
    }
    .card__head { display: flex; align-items: center; gap: 14px; }
    .icon {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: var(--white);
      display: grid;
      place-items: center;
      flex-shrink: 0;
    }
    .icon svg { width: 20px; height: 20px; }
    .icon--in { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 20px; color: #0a66c2; }
    .card__title {
      font-family: 'Poppins', sans-serif;
      font-weight: 700;
      font-size: 18px;
      line-height: 1.2;
    }
    .card__handle {
      margin-top: 4px;
      font-size: 11px;
      font-weight: 600;
      color: rgba(255, 255, 255, .62);
    }

    .label {
      margin: 22px 0 12px;
      font-size: 9.5px;
      font-weight: 700;
      letter-spacing: .7px;
      text-transform: uppercase;
      color: rgba(255, 255, 255, .62);
    }
    .card p {
      margin-top: 14px;
      font-size: 12px;
      line-height: 1.55;
      color: rgba(255, 255, 255, .92);
    }

    .media { display: flex; gap: 8px; }
    .media img {
      width: 125px;
      height: 125px;
      object-fit: cover;
      border-radius: 10px;
      background: rgba(255, 255, 255, .15);
      display: block;
    }
    .media img.qr {
      object-fit: contain;
      background: #f1f1f1;
      padding: 10px;
    }

    .linkedin {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .linkedin img {
      width: 120px;
      height: 120px;
      object-fit: contain;
      border-radius: 12px;
      background: #f1f1f1;
      padding: 6px;
      flex-shrink: 0;
    }
    .linkedin li {
      font-size: 12px;
      font-weight: 700;
      line-height: 1;
      padding: 7px 0;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .linkedin li::before {
      content: "";
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--white);
      flex-shrink: 0;
    }

    .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 4px; }
    .chip {
      background: var(--white);
      color: var(--navy);
      font-size: 11px;
      font-weight: 700;
      padding: 8px 14px;
      border-radius: 999px;
    }

    /* ---------- FOOTER ---------- */
    .footer {
      background: var(--footer);
      padding: 40px 20px 50px;
    }
    .footer__inner {
      max-width: 896px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .footer__logo {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: #f3f4f6;
      display: grid;
      place-items: center;
      padding: 4px;
      flex-shrink: 0;
    }
    .footer__logo img { max-width: 100%; max-height: 100%; display: block; }
    .footer__name { font-weight: 700; font-size: 16px; letter-spacing: .3px; }
    .footer__sub {
      margin-top: 5px;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #8fa3c4;
    }

    /* ---------- RESPONSIVE ---------- */
    @media (max-width: 860px) {
      .header__inner { padding: 0 16px; gap: 24px; overflow-x: auto; }
      .grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 520px) {
      .media img { width: calc((100% - 16px) / 3); height: auto; aspect-ratio: 1; }
      .linkedin { flex-direction: column; align-items: flex-start; }
      .topbar { flex-direction: column; align-items: flex-start; gap: 8px; }
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <header class="header">
    <div class="header__inner">
      <a href="#" class="logo" aria-label="AFINLAB">
        <img data-auto="img/redes-logo-afinlab" alt="AFINLAB">
      </a>
      <nav class="nav">
        <a href="#">Sobre nosotros</a>
        <a href="#">Equipo</a>
        <a href="#" class="active">Proyectos</a>
        <a href="#">Publicaciones</a>
        <a href="#">Eventos</a>
        <a href="#">Recursos</a>
        <a href="#">Contacto</a>
      </nav>
    </div>
  </header>

  <!-- CONTENIDO -->
  <main class="hero">
    <div class="container">

      <div class="topbar">
        <a href="#" class="back">‹ Volver a Proyectos</a>
        <div class="breadcrumb">Proyectos <i>/</i> <b>Difusión en Redes Sociales</b></div>
      </div>

      <div class="eyebrow">Proyecto 4</div>
      <h1>Redes Sociales</h1>
      <p class="lead">Difusión de contenido, cobertura de eventos y posicionamiento externo del semillero.</p>

      <div class="grid">

        <!-- INSTAGRAM -->
        <article class="card">
          <div class="card__head">
            <div class="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="#c13584" stroke-width="2" stroke-linecap="round">
                <rect x="3" y="3" width="18" height="18" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.3" cy="6.7" r="1" fill="#c13584" stroke="none"/>
              </svg>
            </div>
            <div>
              <div class="card__title">Instagram</div>
              <div class="card__handle">@afinlab.unalm</div>
            </div>
          </div>

          <div class="label">Contenido que publican</div>
          <div class="media">
            <img class="qr" data-auto="img/redes-instagram-qr" alt="QR de Instagram AFINLAB">
            <img data-auto="img/redes-instagram-evento-1" alt="Evento AFINLAB 1">
            <img data-auto="img/redes-instagram-evento-2" alt="Evento AFINLAB 2">
          </div>

          <p>Resultados de investigaciones sectoriales, cobertura de eventos y contenido educativo de finanzas aplicadas.</p>

          <div class="label">Tecnología</div>
          <div class="chips">
            <span class="chip">Canva</span>
            <span class="chip">Instagram (Reels / Stories)</span>
          </div>
        </article>

        <!-- LINKEDIN -->
        <article class="card">
          <div class="card__head">
            <div class="icon icon--in" aria-hidden="true">in</div>
            <div>
              <div class="card__title">LinkedIn</div>
              <div class="card__handle">linktr.ee/afinlab.unalm</div>
            </div>
          </div>

          <div class="label">Qué encontrarás</div>
          <div class="linkedin">
            <img data-auto="img/redes-linkedin-qr" alt="QR de LinkedIn / Linktree AFINLAB">
            <ul>
              <li>Web oficial de AFINLAB</li>
              <li>Redes y publicaciones</li>
              <li>Formulario de postulación</li>
            </ul>
          </div>

          <p>Un solo enlace en la bio de Instagram que centraliza todo el acceso externo al semillero.</p>

          <div class="label">Tecnología</div>
          <div class="chips">
            <span class="chip">LinkedIn</span>
            <span class="chip">Linktree</span>
          </div>
        </article>

      </div>
    </div>
  </main>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__logo">
        <img data-auto="img/redes-logo-afinlab" alt="AFINLAB">
      </div>
      <div>
        <div class="footer__name">AFINLAB</div>
        <div class="footer__sub">Semillero de Investigación UNALM</div>
      </div>
    </div>
  </footer>

  <!-- Carga automática de imágenes: sube el archivo a /img con el nombre indicado
       (.png, .jpg, .jpeg o .webp) y aparece solo. -->
  <script>
    const EXTS = ['png', 'jpg', 'jpeg', 'webp'];
    document.querySelectorAll('img[data-auto]').forEach(img => {
      const base = img.dataset.auto;
      let i = 0;
      img.onerror = () => {
        i++;
        if (i < EXTS.length) img.src = base + '.' + EXTS[i];
        else img.onerror = null;
      };
      img.src = base + '.' + EXTS[0];
    });
  </script>

</body>
</html>