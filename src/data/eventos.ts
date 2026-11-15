const RUTA = `${import.meta.env.BASE_URL}img/eventos`;
const CONVOCATORIA = `${RUTA}/convocatoria`;
const LANZAMIENTO = `${RUTA}/lanzamiento`;
const TALLERES = `${RUTA}/talleres_azucar`;
const SEMANA = `${RUTA}/semana_investiga`;
const FERIA = `${RUTA}/feria_vocacional`;
const APPLIED = `${RUTA}/Applied_Finance_Day`;

/* Un "medio" es una foto, un video propio (.mp4) o un video de YouTube. */
export type Medio =
  | { tipo: "foto"; src: string }
  | { tipo: "video"; src: string; poster?: string }
  | { tipo: "youtube"; id: string };

export type PaginaDestino = "inicio" | "publicaciones" | "redes" | "eventos";

/* Solo id, dia, mes, titulo y cuando son obligatorios. Lo demás es opcional:
   si lo omites, simplemente no se muestra en la tarjeta. */
export interface EventoProximo {
  id: string;
  dia: string;
  mes: string;
  titulo: string;
  cuando: string;
  categoria?: string;
  lugar?: string;
  descripcion?: string;
  // Si escribes descripcionDetalle, aparece el botón "Ver detalles"
  tituloDetalle?: string;
  descripcionDetalle?: string;
  imagen?: string;
  // Si escribes cta, aparece un botón que lleva a otra parte de la página
  cta?: { texto: string; page: PaginaDestino; anchor?: string };
}

export interface EventoAnterior {
  id: string;
  periodo: string; // debe coincidir con el "id" de un periodo de la lista de abajo
  fecha: string;
  titulo: string;
  descripcion: string;
  asistentes?: number; // si falta, no se muestra
  portada: string;
  medios: Medio[];
}

/* Botones de "Eventos realizados". "etiqueta" es lo que se lee en el botón. */
export interface Periodo {
  id: string;
  etiqueta: string;
}

export const periodos: Periodo[] = [
  { id: "2026-I", etiqueta: "26 - I" },
  { id: "2026-II", etiqueta: "26 - II" },
];

export const proximos: EventoProximo[] = [
  {
    id: "colaboracion-gestion-liderazgo",
    dia: "3",
    mes: "DIC",
    titulo: "Colaboración con la agrupación Gestión & Liderazgo",
    cuando: "3 de diciembre",
    descripcion:
      "Conversatorio sobre la revista del sector azucarero, con la participación de especialistas en el tema. Durante el encuentro se compartirán sus perspectivas y se realizará una retroalimentación de la revista.",
  },
  {
    id: "applied-finance-day-26-2",
    dia: "II",
    mes: "2026",
    titulo: "Applied Finance Day 26 - II",
    cuando: "Próximamente",
    descripcion:
      "Feria interna donde el semillero presenta los resultados de los talleres y de sus distintas áreas de trabajo.",
  },
];

export const anteriores: EventoAnterior[] = [
  {
    id: "lanzamiento-2026-1",
    periodo: "2026-I",
    fecha: "12 de marzo de 2026",
    titulo: "Lanzamiento AFINLAB",
    descripcion:
      "Ceremonia de bienvenida e integración de los nuevos miembros, con la presentación oficial de las líneas de investigación del semestre.",
    asistentes: 45,
    portada: `${LANZAMIENTO}/1_lanzamiento.png`,
    medios: [
      { tipo: "foto", src: `${LANZAMIENTO}/2_lanzamiento.jpeg` },
      { tipo: "foto", src: `${LANZAMIENTO}/3_lanzamiento.jpeg` },
      { tipo: "foto", src: `${LANZAMIENTO}/4_lanzamiento.jpeg` },
      { tipo: "foto", src: `${LANZAMIENTO}/5_lanzamiento.jpeg` },
      { tipo: "foto", src: `${LANZAMIENTO}/6_lanzamiento.jpeg` },
      { tipo: "foto", src: `${LANZAMIENTO}/7_lanzamiento.jpeg` },
      { tipo: "foto", src: `${LANZAMIENTO}/8_lanzamiento.jpeg` },
      { tipo: "foto", src: `${LANZAMIENTO}/9_lanzamiento.jpeg` },
    ],
  },
  {
    id: "talleres-learning-lab",
    periodo: "2026-I",
    fecha: "26 de marzo de 2026",
    titulo: "Talleres Learning Lab",
    descripcion:
      "Sesiones del Learning Lab con análisis financiero introductorio y comparativo de las principales empresas azucareras del país.",
    asistentes: 31,
    portada: `${TALLERES}/1_talleres_azucar.jpeg`,
    medios: [
      { tipo: "foto", src: `${TALLERES}/1_talleres_azucar.jpeg` },
      { tipo: "foto", src: `${TALLERES}/2_talleres_azucar.jpeg` },
      { tipo: "foto", src: `${TALLERES}/3_talleres_azucar.jpeg` },
      { tipo: "foto", src: `${TALLERES}/4_talleres_azucar.jpeg` },
      { tipo: "foto", src: `${TALLERES}/5_talleres_azucar.jpeg` },
      { tipo: "foto", src: `${TALLERES}/6_talleres_azucar.jpeg` },
    ],
  },
  {
    id: "semana-investigacion",
    periodo: "2026-I",
    fecha: "27 y 28 de mayo de 2026",
    titulo: "Semana de Investigación",
    descripcion:
      "Presentación del semillero dentro de la Semana de Investigación de la FCA-UNALM: quiénes somos, qué hacemos y qué investigamos.",
    portada: `${SEMANA}/1_sem_investiga.jpeg`,
    medios: [
      { tipo: "foto", src: `${SEMANA}/1_sem_investiga.jpeg` },
      { tipo: "foto", src: `${SEMANA}/2_sem_investiga.jpeg` },
      { tipo: "video", src: `${SEMANA}/3_sem_investiga.mp4` },
      { tipo: "foto", src: `${SEMANA}/4_sem_investiga.jpeg` },
      { tipo: "video", src: `${SEMANA}/5_sem_investiga.mp4` },
      { tipo: "foto", src: `${SEMANA}/6_sem_investiga.jpeg` },
    ],
  },
  {
    id: "feria-vocacional",
    periodo: "2026-I",
    fecha: "29 de mayo de 2026",
    titulo: "Taller Feria Vocacional",
    descripcion:
      "Participación de AFINLAB en la Feria Vocacional para dar a conocer el semillero a estudiantes interesados en investigación financiera.",
    portada: `${FERIA}/1_feria_vocacional.jpeg`,
    medios: [
      { tipo: "foto", src: `${FERIA}/1_feria_vocacional.jpeg` },
      { tipo: "video", src: `${FERIA}/2_feria_vocacional.mp4` },
      { tipo: "foto", src: `${FERIA}/3_feria_vocacional.jpeg` },
      { tipo: "foto", src: `${FERIA}/4_feria_vocacional.jpeg` },
    ],
  },
  {
    id: "applied-finance-day",
    periodo: "2026-I",
    fecha: "26 de agosto de 2026",
    titulo: "Applied Finance Day",
    descripcion:
      "Feria interna donde el semillero presentó los resultados de los talleres y de sus distintas áreas de trabajo.",
    portada: `${APPLIED}/1_Applied_Finance_Day.jpeg`,
    medios: [
      { tipo: "foto", src: `${APPLIED}/1_Applied_Finance_Day.jpeg` },
      { tipo: "foto", src: `${APPLIED}/2_Applied_Finance_Day.jpeg` },
      { tipo: "foto", src: `${APPLIED}/3_Applied_Finance_Day.jpeg` },
      { tipo: "video", src: `${APPLIED}/4_Applied_Finance_Day.mp4` },
      { tipo: "foto", src: `${APPLIED}/5_Applied_Finance_Day.jpeg` },
      { tipo: "foto", src: `${APPLIED}/6_Applied_Finance_Day.jpeg` },
      { tipo: "foto", src: `${APPLIED}/7_Applied_Finance_Day.jpeg` },
      { tipo: "foto", src: `${APPLIED}/8_Applied_Finance_Day.jpeg` },
      { tipo: "foto", src: `${APPLIED}/9_Applied_Finance_Day.jpeg` },
    ],
  },
  {
    id: "convocatoria-2026-2",
    periodo: "2026-II",
    fecha: "Semestre 2026-II",
    titulo: "Convocatoria AFINLAB",
    descripcion:
      "Convocatoria para la incorporación de nuevos miembros al Semillero de Investigación AFINLAB durante el periodo académico 2026-II.",
    portada: `${CONVOCATORIA}/1_convocatoria.jpeg`,
    medios: [
      { tipo: "foto", src: `${CONVOCATORIA}/1_convocatoria.jpeg` },
      { tipo: "foto", src: `${CONVOCATORIA}/2_convocatoria.jpeg` },
      { tipo: "video", src: `${CONVOCATORIA}/3_convocatoria_vid.mp4` },
      { tipo: "foto", src: `${CONVOCATORIA}/4_convocatoria.jpeg` },
      { tipo: "foto", src: `${CONVOCATORIA}/5_convocatoria.jpeg` },
      { tipo: "foto", src: `${CONVOCATORIA}/6_convocatoria.jpeg` },
      { tipo: "foto", src: `${CONVOCATORIA}/7_convocatoria.jpeg` },
      { tipo: "foto", src: `${CONVOCATORIA}/8_convocatoria.jpeg` },
      { tipo: "foto", src: `${CONVOCATORIA}/9_convocatoria.jpeg` },
      { tipo: "video", src: `${CONVOCATORIA}/10_convocatoria_vid.mp4` },
      { tipo: "foto", src: `${CONVOCATORIA}/11_convocatoria.jpeg` },
    ],
  },
];