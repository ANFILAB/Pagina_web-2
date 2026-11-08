import { useState } from "react";
import "./RedesSociales.css";

/* ---------- Imagen con carga automática ----------
   Guarda el archivo en public/img/ con el nombre indicado
   (.png, .jpg, .jpeg o .webp) y aparece solo. */
const EXTENSIONS = ["png", "jpg", "jpeg", "webp"] as const;

interface AutoImageProps {
  name: string;
  alt: string;
  className?: string;
}

function AutoImage({ name, alt, className }: AutoImageProps) {
  const [index, setIndex] = useState<number>(0);
  const [failed, setFailed] = useState<boolean>(false);

  if (failed) {
    return (
      <span
        role="img"
        aria-label={alt}
        className={`img-missing ${className ?? ""}`.trim()}
      />
    );
  }

  return (
    <img
      className={className}
      src={`/img/${name}.${EXTENSIONS[index]}`}
      alt={alt}
      onError={() =>
        index < EXTENSIONS.length - 1 ? setIndex(index + 1) : setFailed(true)
      }
    />
  );
}

/* ---------- Datos ---------- */
interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Sobre nosotros", href: "#" },
  { label: "Equipo", href: "#" },
  { label: "Proyectos", href: "#", active: true },
  { label: "Publicaciones", href: "#" },
  { label: "Eventos", href: "#" },
  { label: "Recursos", href: "#" },
  { label: "Contacto", href: "#" },
];

const INSTAGRAM_TECH: string[] = ["Canva", "Instagram (Reels / Stories)"];
const LINKEDIN_TECH: string[] = ["LinkedIn", "Linktree"];
const LINKEDIN_ITEMS: string[] = [
  "Web oficial de AFINLAB",
  "Redes y publicaciones",
  "Formulario de postulación",
];

/* ---------- Subcomponentes ---------- */
function Chips({ items }: { items: string[] }) {
  return (
    <div className="chips">
      {items.map((item) => (
        <span className="chip" key={item}>
          {item}
        </span>
      ))}
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#c13584"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="#c13584" stroke="none" />
    </svg>
  );
}

/* ---------- Componente principal ---------- */
export default function RedesSociales() {
  return (
    <div className="redes-page">
      {/* HEADER */}
      <header className="header">
        <div className="header__inner">
          <a href="#" className="logo" aria-label="AFINLAB">
            <img src="/afinlab-logo.png" alt="AFINLAB" />
          </a>
          <nav className="nav">
            {NAV_ITEMS.map(({ label, href, active }) => (
              <a
                key={label}
                href={href}
                className={active ? "active" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="hero">
        <div className="container">
          <div className="topbar">
            <a href="#" className="back">
              ‹ Volver a Proyectos
            </a>
            <div className="breadcrumb">
              Proyectos <i>/</i> <b>Difusión en Redes Sociales</b>
            </div>
          </div>

          <div className="eyebrow">Proyecto 4</div>
          <h1>Redes Sociales</h1>
          <p className="lead">
            Difusión de contenido, cobertura de eventos y posicionamiento
            externo del semillero.
          </p>

          <div className="grid">
            {/* INSTAGRAM */}
            <article className="card">
              <div className="card__head">
                <div className="icon" aria-hidden="true">
                  <InstagramIcon />
                </div>
                <div>
                  <div className="card__title">Instagram</div>
                  <div className="card__handle">@afinlab.unalm</div>
                </div>
              </div>

              <div className="label">Contenido que publican</div>
              <div className="media">
                <AutoImage
                  className="qr"
                  name="redes-instagram-qr"
                  alt="QR de Instagram AFINLAB"
                />
                <AutoImage
                  name="redes-instagram-evento-1"
                  alt="Evento AFINLAB 1"
                />
                <AutoImage
                  name="redes-instagram-evento-2"
                  alt="Evento AFINLAB 2"
                />
              </div>

              <p>
                Resultados de investigaciones sectoriales, cobertura de eventos
                y contenido educativo de finanzas aplicadas.
              </p>

              <div className="label">Tecnología</div>
              <Chips items={INSTAGRAM_TECH} />
            </article>

            {/* LINKEDIN */}
            <article className="card">
              <div className="card__head">
                <div className="icon icon--in" aria-hidden="true">
                  in
                </div>
                <div>
                  <div className="card__title">LinkedIn</div>
                  <div className="card__handle">linktr.ee/afinlab.unalm</div>
                </div>
              </div>

              <div className="label">Qué encontrarás</div>
              <div className="linkedin">
                <AutoImage
                  name="redes-linkedin-qr"
                  alt="QR de LinkedIn / Linktree AFINLAB"
                />
                <ul>
                  {LINKEDIN_ITEMS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <p>
                Un solo enlace en la bio de Instagram que centraliza todo el
                acceso externo al semillero.
              </p>

              <div className="label">Tecnología</div>
              <Chips items={LINKEDIN_TECH} />
            </article>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__logo">
            <img src="/afinlab-logo.png" alt="AFINLAB" />
          </div>
          <div>
            <div className="footer__name">AFINLAB</div>
            <div className="footer__sub">Semillero de Investigación UNALM</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
