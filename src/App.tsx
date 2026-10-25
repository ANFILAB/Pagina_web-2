import { useState } from "react"

type IconName = "arrow" | "book" | "building" | "download" | "file" | "globe" | "menu" | "pin" | "users" | "x"

const icons: Record<IconName, React.ReactNode> = {
  arrow: (
    <>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
      <path d="M4 5.5v16" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V7l8-4 8 4v14" />
      <path d="M8 10h2m4 0h2M8 14h2m4 0h2M9 21v-3h6v3" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12m-5-5 5 5 5-5" />
      <path d="M5 20h14" />
    </>
  ),
  file: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16h16V8z" />
      <path d="M14 2v6h6M8 13h8m-8 4h6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  pin: (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M17 11a4 4 0 0 1 0 8h5" />
    </>
  ),
  x: <path d="m6 6 12 12M18 6 6 18" />,
}

function Icon({ name, size = 20 }: { name: IconName size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  )
}

const companies = [
  {
    id: "laredo",
    name: "Sol de Laredo",
    image: "/soldelaredo.png",
    location: "Laredo, Trujillo, La Libertad",
    owner: "Inversiones Manuelita",
    market: "14% – 15% del mercado nacional",
    extraLabel: "Diversificación",
    extra: "Línea inmobiliaria en desarrollo",
    description:
      "Empresa Agroindustrial Laredo es una de las principales azucareras del país. Integra el cultivo de caña, la elaboración de azúcar y derivados, y una estrategia de diversificación que explora nuevas líneas de negocio.",
    file: "Agroindustrial Laredo Aud31dic20 Separados.pdf",
  },
  {
    id: "cartavio",
    name: "Cartavio",
    image: "/cartavio.png",
    location: "Cartavio, Ascope, La Libertad",
    owner: "COAZUCAR · Grupo Gloria",
    market: "12% – 15% del mercado nacional",
    extraLabel: "Desempeño",
    extra: "Uno de los mayores márgenes del sector",
    description:
      "Cartavio desarrolla una operación agroindustrial integrada para producir azúcar, alcohol, melaza y bagazo. Destaca por una gestión productiva eficiente y sólidos márgenes dentro del sector peruano.",
    file: "1T 2020 CT Notas EEFFcartavio.pdf",
  },
  {
    id: "paramonga",
    name: "Paramonga",
    image: "/paramonga.png",
    location: "Paramonga, Barranca",
    owner: "Grupo Paramonga · Familia Wong",
    market: "11% – 13% del mercado nacional",
    extraLabel: "Superficie",
    extra: "Aprox. 6,900 ha de caña",
    description:
      "Agroindustrial Paramonga se dedica a la siembra, cultivo y procesamiento de caña de azúcar, complementando su producción con etanol y alcohol mediante una operación integrada.",
    file: "Notas EEFF al 31-03-20-Indiv-paramonga.pdf",
  },
  {
    id: "casagrande",
    name: "Casa Grande",
    image: "/casagrande.png",
    location: "Provincia de Ascope, La Libertad",
    owner: "COAZUCAR · Grupo Gloria",
    market: "22% – 25% del mercado nacional",
    extraLabel: "Superficie",
    extra: "28,128 ha cultivables",
    description:
      "Casa Grande S.A.A. es la mayor azucarera del Perú. Su escala y capacidad para producir azúcar, alcohol, melaza y bagazo la posicionan como referente productivo nacional.",
    file: "1T_2020_CG_Notas_EEFF-casagrande.pdf",
  },
  {
    id: "sanjacinto",
    name: "San Jacinto",
    image: "/sanjacinto.png",
    location: "Región Áncash",
    owner: "COAZUCAR · Grupo Gloria",
    market: "8% – 9% del mercado nacional",
    extraLabel: "Actividad",
    extra: "Azúcar y derivados industriales",
    description:
      "San Jacinto cultiva y procesa caña de azúcar para producir azúcar y derivados, con una operación que contribuye de manera significativa a la actividad económica de Áncash.",
    file: "1T 20 SJ Notas EEFF SMV-sanJacinto.pdf",
  },
]

const navItems = [
  "Sobre nosotros",
  "Equipo",
  "Proyectos",
  "Publicaciones",
  "Eventos",
  "Recursos",
  "Contacto",
]

function HomePage({ onProject }: { onProject: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="site home-page">
      <header className="navbar">
        <a className="logo-link" href="#inicio" aria-label="AFINLAB, inicio"><img src="/logo.png" alt="AFINLAB" /></a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navegación principal">
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}><Icon name={menuOpen ? "x" : "menu"} /></button>
      </header>

      <main id="inicio">
        <section className="home-hero">
          <div className="home-hero-photo" />
          <div className="container home-hero-inner">
            <div className="home-copy">
              <span className="eyebrow">APPLIED FINANCE LEARNING LAB · UNALM</span>
              <h1>Investigación que transforma las finanzas.</h1>
              <p>Formamos investigadores capaces de convertir datos en evidencia, conocimiento y mejores decisiones para el desarrollo sostenible.</p>
              <div className="home-actions">
                <a className="light-button" href="#sobre-nosotros">Conoce AFINLAB <Icon name="arrow" size={17} /></a>
                <button className="outline-light" onClick={onProject}>Explorar proyectos</button>
              </div>
            </div>
            <div className="home-metrics">
              <div><strong>06</strong><span>Proyectos activos</span></div>
              <div><strong>25+</strong><span>Investigadores</span></div>
              <div><strong>05</strong><span>Empresas analizadas</span></div>
            </div>
          </div>
        </section>

        <section className="home-about" id="sobre-nosotros">
          <div className="container home-about-grid">
            <div><span className="eyebrow dark">QUIÉNES SOMOS</span><h2>Un laboratorio para aprender investigando.</h2></div>
            <div><p>Somos el semillero de investigación financiera de la Universidad Nacional Agraria La Molina. Reunimos estudiantes de distintas especialidades para analizar problemas reales con una mirada rigurosa, colaborativa y aplicada.</p><a href="#proyectos">Conoce nuestro propósito <Icon name="arrow" size={16} /></a></div>
          </div>
          <div className="container value-grid">
            <article><span>01</span><h3>Investigación aplicada</h3><p>Conectamos teoría, datos y realidad empresarial.</p></article>
            <article><span>02</span><h3>Aprendizaje colaborativo</h3><p>Creamos conocimiento entre distintas disciplinas.</p></article>
            <article><span>03</span><h3>Impacto sostenible</h3><p>Impulsamos decisiones con valor para el país.</p></article>
          </div>
        </section>

        <section className="featured-projects" id="proyectos">
          <div className="container">
            <div className="section-intro"><div><span className="eyebrow dark">LO QUE ESTAMOS INVESTIGANDO</span><h2>Proyectos destacados</h2></div><p>Iniciativas donde los datos financieros se convierten en herramientas de aprendizaje y decisión.</p></div>
            <div className="project-showcase">
              <article className="main-project">
                <img src="/soldelaredo.png" alt="Productos del sector azucarero peruano" />
                <div><span>DATOS · AGROINDUSTRIA</span><h3>Gestión de base de datos</h3><p>Análisis financiero de las principales empresas azucareras del Perú.</p><button onClick={onProject}>Ver investigación <Icon name="arrow" size={17} /></button></div>
              </article>
              <div className="small-projects">
                <article><span>LEARNING LAB</span><h3>Sesiones de análisis sectorial</h3><p>Espacios para interpretar datos y construir hallazgos en equipo.</p><a href="#eventos">Conocer más <Icon name="arrow" size={15} /></a></article>
                <article><span>PUBLICACIONES</span><h3>Financial Insights</h3><p>Ideas y resultados explicados de manera clara y accesible.</p><a href="#publicaciones">Leer publicaciones <Icon name="arrow" size={15} /></a></article>
              </div>
            </div>
          </div>
        </section>

        <section className="home-community">
          <div className="container community-grid">
            <div className="community-photo"><img src="https://images.unsplash.com/photo-1758270705290-62b6294dd044?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200" alt="Estudiantes universitarios colaborando alrededor de una laptop" /></div>
            <div><span className="eyebrow">CRECE CON NOSOTROS</span><h2>Una comunidad curiosa, rigurosa y multidisciplinaria.</h2><p>Participa en proyectos, talleres y conversaciones que fortalecen tus capacidades para investigar y tomar mejores decisiones financieras.</p><a className="light-button" href="#contacto">Quiero ser parte <Icon name="arrow" size={17} /></a></div>
          </div>
        </section>
      </main>

      <footer><div className="container footer-inner"><div><img src="/logo.png" alt="" /><span><strong>AFINLAB</strong><small>Applied Finance Learning Lab · UNALM</small></span></div><p>Investigación financiera aplicada para transformar decisiones.</p></div></footer>
    </div>
  )
}

function ProjectPage({ onHome }: { onHome: () => void }) {
  const [selectedId, setSelectedId] = useState("laredo")
  const [menuOpen, setMenuOpen] = useState(false)
  const company =
    companies.find((item) => item.id === selectedId) ?? companies[0]
  const sourceBase = "https://anfilab.github.io/afinlab.github.io"

  return (
    <div className="site">
      <header className="navbar">
        <a className="logo-link" href="#inicio" aria-label="AFINLAB, inicio" onClick={onHome}>
          <img src="/logo.png" alt="AFINLAB" />
        </a>
        <nav
          className={menuOpen ? "nav open" : "nav"}
          aria-label="Navegación principal"
        >
          {navItems.map((item) => (
            <a
              key={item}
              className={item === "Proyectos" ? "active" : ""}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <Icon name={menuOpen ? "x" : "menu"} />
        </button>
      </header>

      <main id="inicio">
        <section className="project-hero">
          <div className="hero-glow" />
          <div className="container hero-inner">
            <div className="breadcrumbs">
              <a href="#proyectos">Proyectos</a>
              <span>/</span>
              <span>Base de datos</span>
            </div>
            <div className="hero-grid">
              <div>
                <span className="eyebrow">PROYECTO DE INVESTIGACIÓN · 01</span>
                <h1>Radiografía financiera del sector azucarero peruano</h1>
                <p>
                  Una base documental que organiza información empresarial y
                  estados financieros para facilitar el análisis, la comparación
                  y nuevas investigaciones.
                </p>
              </div>
              <div className="hero-stat">
                <strong>05</strong>
                <span>empresas analizadas</span>
                <small>Información financiera auditada · 2020</small>
              </div>
            </div>
          </div>
        </section>

        <section className="explorer">
          <div className="container">
            <div className="section-intro">
              <div>
                <span className="eyebrow dark">EXPLORA LA BASE DE DATOS</span>
                <h2>Selecciona una empresa</h2>
              </div>
              <p>
                Compara perfiles y accede a las fuentes oficiales utilizadas por
                el equipo de investigación.
              </p>
            </div>

            <div
              className="company-tabs"
              role="tablist"
              aria-label="Empresas analizadas"
            >
              {companies.map((item, index) => (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={selectedId === item.id}
                  className={selectedId === item.id ? "selected" : ""}
                  onClick={() => setSelectedId(item.id)}
                >
                  <span>0{index + 1}</span>
                  {item.name}
                </button>
              ))}
            </div>

            <article className="company-card" key={company.id}>
              <div className="company-image">
                <img
                  src={company.image}
                  alt={`Productos e instalaciones de ${company.name}`}
                />
                <div className="image-label">
                  <span>Empresa analizada</span>
                  <strong>{company.name}</strong>
                </div>
              </div>

              <div className="company-content">
                <div className="company-heading">
                  <div>
                    <span className="eyebrow dark">PERFIL CORPORATIVO</span>
                    <h2>{company.name}</h2>
                  </div>
                  <span className="verified">Fuente verificada</span>
                </div>
                <p className="company-description">{company.description}</p>

                <div className="facts-grid">
                  <div>
                    <Icon name="pin" />
                    <span>
                      <small>Ubicación</small>
                      <strong>{company.location}</strong>
                    </span>
                  </div>
                  <div>
                    <Icon name="users" />
                    <span>
                      <small>Grupo propietario</small>
                      <strong>{company.owner}</strong>
                    </span>
                  </div>
                  <div>
                    <Icon name="building" />
                    <span>
                      <small>Participación estimada</small>
                      <strong>{company.market}</strong>
                    </span>
                  </div>
                  <div>
                    <Icon name="globe" />
                    <span>
                      <small>{company.extraLabel}</small>
                      <strong>{company.extra}</strong>
                    </span>
                  </div>
                </div>

                <div className="document-card">
                  <div className="document-icon">
                    <Icon name="file" size={24} />
                  </div>
                  <div className="document-copy">
                    <span>DOCUMENTO OFICIAL · PDF</span>
                    <h3>Estados financieros auditados</h3>
                    <p>{company.file}</p>
                  </div>
                  <a
                    className="download-button"
                    href={`${sourceBase}/${encodeURIComponent(company.file)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon name="download" size={18} /> Descargar{" "}
                    <span>PDF</span>
                  </a>
                </div>

                <div className="company-footer">
                  <p>
                    <strong>Fuente:</strong> Superintendencia del Mercado de
                    Valores (2020). Documento sistematizado por AFINLAB.
                  </p>
                  <a
                    href={`${sourceBase}/sesiones-learning-lab.html#${encodeURIComponent(company.name)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon name="book" size={18} /> Ver sesiones Learning Lab{" "}
                    <Icon name="arrow" size={16} />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="method">
          <div className="container method-grid">
            <div>
              <span className="eyebrow">SOBRE EL PROYECTO</span>
              <h2>Datos que se convierten en conocimiento aplicado.</h2>
            </div>
            <div className="method-steps">
              <span>
                <b>01</b>
                <strong>Recopilamos</strong>
                <small>Fuentes oficiales y estados auditados.</small>
              </span>
              <span>
                <b>02</b>
                <strong>Sistematizamos</strong>
                <small>Información comparable y trazable.</small>
              </span>
              <span>
                <b>03</b>
                <strong>Analizamos</strong>
                <small>Hallazgos para decisiones financieras.</small>
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <div>
            <img src="/logo.png" alt="" />
            <span>
              <strong>AFINLAB</strong>
              <small>Applied Finance Learning Lab · UNALM</small>
            </span>
          </div>
          <p>Investigación financiera aplicada para transformar decisiones.</p>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  const [view, setView] = useState<"home" | "project">("home")
  return view === "home" ? <HomePage onProject={() => setView("project")} /> : <ProjectPage onHome={() => setView("home")} />
}
