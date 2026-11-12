import { useEffect, useState } from "react";
import Eventos from "./Eventos";
import RedesSociales from "./RedesSociales";

type Page = "inicio" | "publicaciones" | "redes" | "eventos";
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
            <button
              className={page === "eventos" ? "active" : ""}
              onClick={() => go("eventos")}
            >
              Eventos
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
          <button onClick={() => navigate("eventos")}>Eventos</button>
          <button onClick={() => navigate("redes")}>Redes Sociales</button>
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

function getPageFromHash(): Page {
  const hash = window.location.hash;
  if (hash.startsWith("#/publicaciones")) return "publicaciones";
  if (hash.startsWith("#/eventos")) return "eventos";
  if (hash.startsWith("#/redes")) return "redes";
  return "inicio";
}

export default function App() {
  const [page, setPage] = useState<Page>(getPageFromHash());

  useEffect(() => {
    const handleHashChange = () => {
      setPage(getPageFromHash());
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = (nextPage: Page, anchor?: string) => {
    const hash =
      nextPage === "publicaciones"
        ? "#/publicaciones"
        : nextPage === "eventos"
          ? "#/eventos"
          : nextPage === "redes"
            ? "#/redes"
            : "#/inicio";
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
      {page === "inicio" && <Home navigate={navigate} />}
      {page === "publicaciones" && <Publications navigate={navigate} />}
      {page === "eventos" && <Eventos navigate={navigate} />}
      {page === "redes" && <RedesSociales navigate={navigate} />}
      <Footer navigate={navigate} />
    </div>
  );
}