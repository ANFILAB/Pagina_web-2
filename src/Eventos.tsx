import { useEffect, useRef, useState } from "react";
import "./Eventos.css";
import { anteriores, periodos, proximos } from "./data/eventos";
import type { EventoAnterior, EventoProximo, Medio, PaginaDestino } from "./data/eventos";

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
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
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

/* ---------- Utilidades ---------- */
const contarFotos = (medios: Medio[]) => medios.filter((m) => m.tipo === "foto").length;
const contarVideos = (medios: Medio[]) => medios.filter((m) => m.tipo !== "foto").length;

function resumenMedios(medios: Medio[]) {
  const f = contarFotos(medios);
  const v = contarVideos(medios);
  const partes: string[] = [];
  if (f > 0) partes.push(`${f} ${f === 1 ? "foto" : "fotos"}`);
  if (v > 0) partes.push(`${v} ${v === 1 ? "video" : "videos"}`);
  return partes.join(" · ");
}

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

/* ---------- Miniatura de la galería (foto o video) ---------- */
function Miniatura({ medio, alt }: { medio: Medio; alt: string }) {
  if (medio.tipo === "foto") return <Foto src={medio.src} alt={alt} />;
  return (
    <>
      {medio.tipo === "youtube" ? (
        <Foto src={`https://i.ytimg.com/vi/${medio.id}/hqdefault.jpg`} alt={alt} />
      ) : medio.poster ? (
        <Foto src={medio.poster} alt={alt} />
      ) : (
        <video src={`${medio.src}#t=0.5`} preload="metadata" muted playsInline aria-label={alt} />
      )}
      <span className="ev-play" aria-hidden="true">
        <PlayIcon />
      </span>
    </>
  );
}

/* ---------- Contenido ampliado en el visor ---------- */
function Visor({ medio, alt }: { medio: Medio; alt: string }) {
  if (medio.tipo === "foto") return <Foto src={medio.src} alt={alt} className="ev-lb-img" />;
  if (medio.tipo === "video") {
    return (
      <video
        className="ev-lb-img"
        src={medio.src}
        poster={medio.poster}
        controls
        autoPlay
        playsInline
      />
    );
  }
  return (
    <iframe
      className="ev-lb-frame"
      src={`https://www.youtube-nocookie.com/embed/${medio.id}?autoplay=1&rel=0`}
      title={alt}
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowFullScreen
    />
  );
}

/* ---------- Portada de la tarjeta, con vista previa al pasar el mouse ----------
   VISTA_PREVIA_EN_TODOS = true  -> funciona en todos los eventos realizados.
   Si lo pones en false, solo funciona en los "id" de la lista VISTA_PREVIA
   (son los "id" que están en eventos.ts). */
const VISTA_PREVIA_EN_TODOS = true;
const VISTA_PREVIA = new Set([
  "lanzamiento-2026-1",
  "talleres-learning-lab",
  "semana-investigacion",
  "feria-vocacional",
  "applied-finance-day",
  "convocatoria-2026-2",
]);
const PAUSA_FOTO = 2800; // milisegundos que dura cada foto (incluye el degradado)
const MAX_VIDEO = 8000; // máximo que se reproduce cada video
const FADE_MS = 900; // duración del degradado; debe coincidir con .ev-slide en Eventos.css

function PortadaCard({ ev, onAbrir }: { ev: EventoAnterior; onAbrir: () => void }) {
  const [hover, setHover] = useState(false);
  const [i, setI] = useState(0); // elemento que se ve ahora
  const [prev, setPrev] = useState<number | null>(null); // elemento que se está desvaneciendo

  const nFotos = contarFotos(ev.medios);
  const nVideos = contarVideos(ev.medios);

  const reducido =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const conVistaPrevia = (VISTA_PREVIA_EN_TODOS || VISTA_PREVIA.has(ev.id)) && !reducido;

  /* Primero la portada y luego la galería, sin repetir la portada */
  const secuencia: Medio[] = [
    { tipo: "foto", src: ev.portada },
    ...ev.medios.filter((m) => m.tipo !== "youtube" && !(m.tipo === "foto" && m.src === ev.portada)),
  ];
  const total = secuencia.length;
  const reproduciendo = conVistaPrevia && hover;

  const avanzar = () => {
    setPrev(i);
    setI((i + 1) % total);
  };

  /* Pasa al siguiente elemento después de una pausa */
  useEffect(() => {
    if (!reproduciendo || total < 2) return;
    const espera = secuencia[i].tipo === "video" ? MAX_VIDEO : PAUSA_FOTO;
    const t = window.setTimeout(avanzar, espera);
    return () => window.clearTimeout(t);
  }, [reproduciendo, i]);

  /* Carga las fotos por adelantado para que el degradado no parpadee */
  useEffect(() => {
    if (!reproduciendo) return;
    secuencia.forEach((m) => {
      if (m.tipo === "foto") new Image().src = m.src;
    });
  }, [reproduciendo]);

  /* Cuando termina el degradado, retira la imagen anterior */
  useEffect(() => {
    if (prev === null) return;
    const t = window.setTimeout(() => setPrev(null), FADE_MS + 60);
    return () => window.clearTimeout(t);
  }, [prev]);

  const entrar = () => {
    if (!conVistaPrevia || total < 2) return;
    setHover(true);
    avanzar();
  };

  const salir = () => {
    setHover(false);
    if (i !== 0) {
      setPrev(i);
      setI(0);
    }
  };

  /* Cada elemento es una capa; la nueva se disuelve encima de la anterior */
  const capa = (idx: number, esActual: boolean) => {
    const m = secuencia[idx];
    const clase = esActual && prev !== null ? "ev-layer ev-slide" : "ev-layer";
    if (m.tipo === "video") {
      return (
        <video
          key={idx}
          className={clase}
          src={m.src}
          muted
          playsInline
          autoPlay
          preload="auto"
          onEnded={esActual && reproduciendo ? avanzar : undefined}
          onError={esActual && reproduciendo ? avanzar : undefined}
        />
      );
    }
    if (m.tipo === "foto") return <Foto key={idx} src={m.src} alt="" className={clase} />;
    return null;
  };

  const capas = prev !== null && prev !== i ? [capa(prev, false), capa(i, true)] : [capa(i, true)];

  return (
    <button
      className="ev-card-photo"
      onClick={onAbrir}
      onMouseEnter={entrar}
      onMouseLeave={salir}
      aria-label={`Ver galería de ${ev.titulo}: ${resumenMedios(ev.medios)}`}
    >
      {capas}

      {reproduciendo && total > 1 && (
        <span className="ev-dots" aria-hidden="true">
          {secuencia.map((_, n) => (
            <i key={n} className={n <= i ? "on" : ""} />
          ))}
        </span>
      )}

      {nFotos > 0 && (
        <span className="ev-badge">
          <CameraIcon /> {nFotos}
        </span>
      )}
      {nVideos > 0 && (
        <span className="ev-badge ev-badge--video">
          <PlayIcon /> {nVideos}
        </span>
      )}
    </button>
  );
}

/* ---------- Página ---------- */
export default function Eventos({ navigate }: EventosProps) {
  const [detalle, setDetalle] = useState<EventoProximo | null>(null);
  const [galeria, setGaleria] = useState<EventoAnterior | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [periodoActivo, setPeriodoActivo] = useState<string>(periodos[0]?.id ?? "");
  const focoPrevio = useRef<HTMLElement | null>(null);

  const visibles = anteriores.filter((ev) => ev.periodo === periodoActivo);
  const totalFotos = anteriores.reduce((suma, ev) => suma + contarFotos(ev.medios), 0);
  const totalVideos = anteriores.reduce((suma, ev) => suma + contarVideos(ev.medios), 0);
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
        if ((e.target as HTMLElement).tagName === "VIDEO") return;
        const total = galeria.medios.length;
        if (e.key === "ArrowLeft") setLightbox((lightbox - 1 + total) % total);
        if (e.key === "ArrowRight") setLightbox((lightbox + 1) % total);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, galeria, detalle]);

  const moverLightbox = (paso: number) => {
    if (lightbox === null || !galeria) return;
    const total = galeria.medios.length;
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
            {totalVideos > 0 && (
              <div>
                <dt>Videos</dt>
                <dd>{totalVideos}</dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      <section className="ev-section ev-section--next" aria-labelledby="ev-proximos">
        <div className="shell">
          <div className="ev-heading">
            <h2 id="ev-proximos">Próximos eventos</h2>
          </div>

          {proximos.length === 0 ? (
            <div className="ev-empty">
              <h3>No hay eventos programados por ahora</h3>
              <p>
                Cuando se anuncie el próximo, aparecerá aquí. Mientras tanto, síguenos en redes
                para enterarte primero.
              </p>
              <button className="button dark" onClick={() => navigate("redes")}>
                Ver redes sociales <ArrowIcon />
              </button>
            </div>
          ) : (
            <div className="ev-next-list">
              {proximos.map((ev) => {
                const cta = ev.cta;
                const tieneDetalle = Boolean(ev.descripcionDetalle);
                return (
                  <article className="ev-next" key={ev.id}>
                    <div className="ev-next-date">
                      <strong>{ev.dia}</strong>
                      <span>{ev.mes}</span>
                    </div>
                    <div className="ev-next-body">
                      {ev.categoria && <span className="tag">{ev.categoria}</span>}
                      <h3>{ev.titulo}</h3>
                      <ul className="ev-meta">
                        <li>
                          <ClockIcon /> {ev.cuando}
                        </li>
                        {ev.lugar && (
                          <li>
                            <PinIcon /> {ev.lugar}
                          </li>
                        )}
                      </ul>
                      {ev.descripcion && <p>{ev.descripcion}</p>}
                      {(cta || tieneDetalle) && (
                        <div className="ev-actions">
                          {cta && (
                            <button
                              className="button primary"
                              onClick={() => navigate(cta.page, cta.anchor)}
                            >
                              {cta.texto} <ArrowIcon />
                            </button>
                          )}
                          {tieneDetalle && (
                            <button className="button ghost" onClick={() => setDetalle(ev)}>
                              Ver detalles
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="ev-section ev-section--past" aria-labelledby="ev-realizados">
        <div className="shell">
          <div className="ev-heading">
            <h2 id="ev-realizados">Eventos realizados</h2>
            <span className="ev-count">
              {visibles.length} {visibles.length === 1 ? "realizado" : "realizados"}
            </span>
          </div>

          <div className="ev-tabs" role="tablist" aria-label="Periodo académico">
            {periodos.map((p) => {
              const cantidad = anteriores.filter((ev) => ev.periodo === p.id).length;
              const activo = periodoActivo === p.id;
              return (
                <button
                  key={p.id}
                  role="tab"
                  id={`ev-tab-${p.id}`}
                  aria-selected={activo}
                  aria-controls="ev-panel"
                  className={activo ? "ev-tab active" : "ev-tab"}
                  onClick={() => setPeriodoActivo(p.id)}
                >
                  {p.etiqueta} <span>{cantidad}</span>
                </button>
              );
            })}
          </div>

          <div
            className="ev-grid"
            id="ev-panel"
            role="tabpanel"
            aria-labelledby={`ev-tab-${periodoActivo}`}
          >
            {visibles.length === 0 && (
              <p className="ev-count">Todavía no hay eventos en este periodo.</p>
            )}
            {visibles.map((ev) => (
              <article className="ev-card" key={ev.id}>
                <PortadaCard ev={ev} onAbrir={() => setGaleria(ev)} />
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
            {detalle.imagen && (
              <Foto
                src={detalle.imagen}
                alt={detalle.tituloDetalle ?? detalle.titulo}
                className="ev-modal-img"
              />
            )}
            <div className="ev-modal-body">
              {detalle.categoria && <span className="ev-pill">{detalle.categoria}</span>}
              <h2 id="ev-modal-title">{detalle.tituloDetalle ?? detalle.titulo}</h2>
              {detalle.descripcionDetalle && <p>{detalle.descripcionDetalle}</p>}
              <ul className="ev-meta ev-meta--light">
                <li>
                  <ClockIcon /> {detalle.cuando}
                </li>
                {detalle.lugar && (
                  <li>
                    <PinIcon /> {detalle.lugar}
                  </li>
                )}
              </ul>
              {detalle.cta && (
                <div className="ev-actions">
                  <button
                    className="button dark"
                    onClick={() => {
                      setDetalle(null);
                      if (detalle.cta) navigate(detalle.cta.page, detalle.cta.anchor);
                    }}
                  >
                    {detalle.cta.texto} <ArrowIcon />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Galería de fotos y videos */}
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
                  {galeria.fecha} · {resumenMedios(galeria.medios)}
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
              {galeria.medios.map((medio, i) => (
                <button
                  className="ev-thumb"
                  key={medio.tipo === "youtube" ? `yt-${medio.id}` : medio.src}
                  onClick={() => setLightbox(i)}
                  aria-label={
                    medio.tipo === "foto" ? `Ampliar foto ${i + 1}` : `Reproducir video ${i + 1}`
                  }
                >
                  <Miniatura medio={medio} alt={`${galeria.titulo}, elemento ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Visor de foto o video ampliado */}
      {galeria && lightbox !== null && (
        <div
          className="ev-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Visor"
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
            aria-label="Anterior"
          >
            <ChevronIcon dir="left" />
          </button>
          <Visor
            key={lightbox}
            medio={galeria.medios[lightbox]}
            alt={`${galeria.titulo}, elemento ${lightbox + 1}`}
          />
          <button
            className="ev-lb-btn ev-lb-next"
            onClick={() => moverLightbox(1)}
            aria-label="Siguiente"
          >
            <ChevronIcon dir="right" />
          </button>
          <div className="ev-lb-count">
            {lightbox + 1} / {galeria.medios.length}
          </div>
        </div>
      )}
    </main>
  );
}