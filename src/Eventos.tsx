import { useEffect, useRef, useState } from "react";
import "./Eventos.css";
import { anteriores, proximos } from "./data/eventos";
import type { EventoAnterior, EventoProximo, PaginaDestino } from "./data/eventos";

interface EventosProps {
  navigate: (page: PaginaDestino, anchor?: string) => void;
}

/* ---------- Iconos ---------- */
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const ArrowIcon = () => (
  <svg {...iconProps}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);
const ClockIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
const PinIcon = () => (
  <svg {...iconProps}>
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
const UsersIcon = () => (
  <svg {...iconProps}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6" />
  </svg>
);
const CameraIcon = () => (
  <svg {...iconProps}>
    <path d="M4 8h3l2-3h6l2 3h3v12H4V8Z" />
    <circle cx="12" cy="13.5" r="3.5" />
  </svg>
);
const CloseIcon = () => (
  <svg {...iconProps}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
const ChevronIcon = ({ dir }: { dir: "left" | "right" }) => (
  <svg {...iconProps}>
    <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
  </svg>
);

/* ---------- Imagen con respaldo si no carga ---------- */
function Foto({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [error, setError] = useState(false);
  if (error) {
    return <span role="img" aria-label={alt} className={`ev-foto-missing ${className ?? ""}`.trim()} />;
  }
  return (
    <img className={className} src={src} alt={alt} loading="lazy" onError={() => setError(true)} />
  );
}

/* ---------- Página ---------- */
export default function Eventos({ navigate }: EventosProps) {
  const [detalle, setDetalle] = useState<EventoProximo | null>(null);
  const [galeria, setGaleria] = useState<EventoAnterior | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const focoPrevio = useRef<HTMLElement | null>(null);

  const totalFotos = anteriores.reduce((suma, ev) => suma + ev.fotos.length, 0);
  const hayCapa = detalle !== null || galeria !== null;

  /* Bloquea el scroll del fondo y devuelve el foco al cerrar */
  useEffect(() => {
    if (!hayCapa) return;
    focoPrevio.current = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      focoPrevio.current?.focus();
    };
  }, [hayCapa]);

  /* Teclado: Escape cierra la capa de arriba; flechas navegan el visor */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightbox !== null) setLightbox(null);
        else if (galeria) setGaleria(null);
        else if (detalle) setDetalle(null);
        return;
      }
      if (lightbox !== null && galeria) {
        const total = galeria.fotos.length;
        if (e.key === "ArrowLeft") setLightbox((lightbox - 1 + total) % total);
        if (e.key === "ArrowRight") setLightbox((lightbox + 1) % total);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, galeria, detalle]);

  const moverLightbox = (paso: number) => {
    if (lightbox === null || !galeria) return;
    const total = galeria.fotos.length;
    setLightbox((lightbox + paso + total) % total);
  };

  return (
    <main className="ev-page">
      <section className="ev-hero">
        <div className="shell ev-hero-inner">
          <span className="eyebrow light-eyebrow">Eventos</span>
          <h1>Eventos y actividades académicas</h1>
          <p>
            Convocatorias, talleres y ferias con los que AFINLAB comparte su trabajo y suma nuevos
            investigadores cada semestre.
          </p>
          <dl className="ev-stats">
            <div>
              <dt>Programados</dt>
              <dd>{proximos.length}</dd>
            </div>
            <div>
              <dt>Realizados</dt>
              <dd>{anteriores.length}</dd>
            </div>
            <div>
              <dt>Fotos publicadas</dt>
              <dd>{totalFotos}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="ev-section ev-section--next" aria-labelledby="ev-proximos">
        <div className="shell">
          <div className="ev-heading">
            <h2 id="ev-proximos">Próximos eventos</h2>
          </div>
          <div className="ev-next-list">
            {proximos.map((ev) => (
              <article className="ev-next" key={ev.id}>
                <div className="ev-next-date">
                  <strong>{ev.dia}</strong>
                  <span>{ev.mes}</span>
                </div>
                <div className="ev-next-body">
                  <span className="tag">{ev.categoria}</span>
                  <h3>{ev.titulo}</h3>
                  <ul className="ev-meta">
                    <li>
                      <ClockIcon /> {ev.cuando}
                    </li>
                    <li>
                      <PinIcon /> {ev.lugar}
                    </li>
                  </ul>
                  <p>{ev.descripcion}</p>
                  <div className="ev-actions">
                    <button
                      className="button primary"
                      onClick={() => navigate(ev.cta.page, ev.cta.anchor)}
                    >
                      {ev.cta.texto} <ArrowIcon />
                    </button>
                    <button className="button ghost" onClick={() => setDetalle(ev)}>
                      Ver detalles
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ev-section ev-section--past" aria-labelledby="ev-anteriores">
        <div className="shell">
          <div className="ev-heading">
            <h2 id="ev-anteriores">Eventos anteriores</h2>
            <span className="ev-count">{anteriores.length} realizados</span>
          </div>
          <div className="ev-grid">
            {anteriores.map((ev) => (
              <article className="ev-card" key={ev.id}>
                <button
                  className="ev-card-photo"
                  onClick={() => setGaleria(ev)}
                  aria-label={`Ver las ${ev.fotos.length} fotos de ${ev.titulo}`}
                >
                  <Foto src={ev.portada} alt="" />
                  <span className="ev-badge">
                    <CameraIcon /> {ev.fotos.length}
                  </span>
                </button>
                <div className="ev-card-body">
                  <span className="ev-card-date">{ev.fecha}</span>
                  <h3>{ev.titulo}</h3>
                  <p>{ev.descripcion}</p>
                  <div className="ev-card-foot">
                    {ev.asistentes !== undefined && (
                      <span className="ev-attendees">
                        <UsersIcon /> {ev.asistentes} asistentes
                      </span>
                    )}
                    <button className="ev-link" onClick={() => setGaleria(ev)}>
                      Ver galería <ArrowIcon />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Detalle de un próximo evento */}
      {detalle && (
        <div
          className="ev-overlay"
          onClick={(e) => e.target === e.currentTarget && setDetalle(null)}
        >
          <div className="ev-modal" role="dialog" aria-modal="true" aria-labelledby="ev-modal-title">
            <button
              className="ev-close"
              onClick={() => setDetalle(null)}
              aria-label="Cerrar"
              autoFocus
            >
              <CloseIcon />
            </button>
            <Foto src={detalle.imagen} alt={detalle.tituloDetalle} className="ev-modal-img" />
            <div className="ev-modal-body">
              <span className="ev-pill">{detalle.categoria}</span>
              <h2 id="ev-modal-title">{detalle.tituloDetalle}</h2>
              <p>{detalle.descripcionDetalle}</p>
              <ul className="ev-meta ev-meta--light">
                <li>
                  <ClockIcon /> {detalle.cuando}
                </li>
                <li>
                  <PinIcon /> {detalle.lugar}
                </li>
              </ul>
              <div className="ev-actions">
                <button
                  className="button dark"
                  onClick={() => {
                    setDetalle(null);
                    navigate(detalle.cta.page, detalle.cta.anchor);
                  }}
                >
                  {detalle.cta.texto} <ArrowIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Galería de fotos */}
      {galeria && (
        <div
          className="ev-overlay ev-overlay--wide"
          onClick={(e) => e.target === e.currentTarget && setGaleria(null)}
        >
          <div
            className="ev-gallery"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ev-gallery-title"
          >
            <header className="ev-gallery-head">
              <div>
                <h2 id="ev-gallery-title">{galeria.titulo}</h2>
                <span>
                  {galeria.fecha} · {galeria.fotos.length} fotos
                </span>
              </div>
              <button
                className="ev-close ev-close--inline"
                onClick={() => setGaleria(null)}
                aria-label="Cerrar galería"
                autoFocus
              >
                <CloseIcon />
              </button>
            </header>
            <div className="ev-gallery-grid">
              {galeria.fotos.map((src, i) => (
                <button
                  className="ev-thumb"
                  key={src}
                  onClick={() => setLightbox(i)}
                  aria-label={`Ampliar foto ${i + 1}`}
                >
                  <Foto src={src} alt={`${galeria.titulo}, foto ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Visor de foto ampliada */}
      {galeria && lightbox !== null && (
        <div
          className="ev-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Foto ampliada"
          onClick={(e) => e.target === e.currentTarget && setLightbox(null)}
        >
          <button
            className="ev-lb-btn ev-lb-close"
            onClick={() => setLightbox(null)}
            aria-label="Cerrar visor"
            autoFocus
          >
            <CloseIcon />
          </button>
          <button
            className="ev-lb-btn ev-lb-prev"
            onClick={() => moverLightbox(-1)}
            aria-label="Foto anterior"
          >
            <ChevronIcon dir="left" />
          </button>
          <Foto
            key={galeria.fotos[lightbox]}
            src={galeria.fotos[lightbox]}
            alt={`${galeria.titulo}, foto ${lightbox + 1}`}
            className="ev-lb-img"
          />
          <button
            className="ev-lb-btn ev-lb-next"
            onClick={() => moverLightbox(1)}
            aria-label="Foto siguiente"
          >
            <ChevronIcon dir="right" />
          </button>
          <div className="ev-lb-count">
            {lightbox + 1} / {galeria.fotos.length}
          </div>
        </div>
      )}
    </main>
  );
}
