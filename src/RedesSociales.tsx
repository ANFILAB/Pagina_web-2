import { useState } from "react";
import "./RedesSociales.css";

type PageName = "inicio" | "publicaciones" | "redes";

interface RedesSocialesProps {
  navigate: (page: PageName, anchor?: string) => void;
}

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
        className={`rs-img-missing ${className ?? ""}`.trim()}
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
    <div className="rs-chips">
      {items.map((item) => (
        <span className="rs-chip" key={item}>
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

/* ---------- Página ---------- */
export default function RedesSociales({ navigate }: RedesSocialesProps) {
  return (
    <main className="rs-page">
      <div className="rs-container">
        <div className="rs-topbar">
          <button
            className="rs-back"
            onClick={() => navigate("inicio", "proyectos")}
          >
            ‹ Volver a Proyectos
          </button>
          <div className="rs-breadcrumb">
            <button onClick={() => navigate("inicio", "proyectos")}>
              Proyectos
            </button>
            <span>/</span>
            <strong>Difusión en Redes Sociales</strong>
          </div>
        </div>

        <div className="rs-eyebrow">Proyecto 4</div>
        <h1 className="rs-title">Redes Sociales</h1>
        <p className="rs-lead">
          Difusión de contenido, cobertura de eventos y posicionamiento externo
          del semillero.
        </p>

        <div className="rs-grid">
          {/* INSTAGRAM */}
          <article className="rs-card">
            <div className="rs-card-head">
              <div className="rs-icon" aria-hidden="true">
                <InstagramIcon />
              </div>
              <div>
                <div className="rs-card-title">Instagram</div>
                <div className="rs-card-handle">@afinlab.unalm</div>
              </div>
            </div>

            <div className="rs-label">Contenido que publican</div>
            <div className="rs-media">
              <AutoImage
                className="rs-qr"
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

            <p className="rs-text">
              Resultados de investigaciones sectoriales, cobertura de eventos y
              contenido educativo de finanzas aplicadas.
            </p>

            <div className="rs-label">Tecnología</div>
            <Chips items={INSTAGRAM_TECH} />
          </article>

          {/* LINKEDIN */}
          <article className="rs-card">
            <div className="rs-card-head">
              <div className="rs-icon rs-icon-in" aria-hidden="true">
                in
              </div>
              <div>
                <div className="rs-card-title">LinkedIn</div>
                <div className="rs-card-handle">linktr.ee/afinlab.unalm</div>
              </div>
            </div>

            <div className="rs-label">Qué encontrarás</div>
            <div className="rs-linkedin">
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

            <p className="rs-text">
              Un solo enlace en la bio de Instagram que centraliza todo el
              acceso externo al semillero.
            </p>

            <div className="rs-label">Tecnología</div>
            <Chips items={LINKEDIN_TECH} />
          </article>
        </div>
      </div>
    </main>
  );
}
