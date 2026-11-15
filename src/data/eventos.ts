const RUTA = "/img/eventos";

/* Un "medio" es una foto, un video propio (.mp4) o un video de YouTube. */
export type Medio =
  | { tipo: "foto"; src: string }
  | { tipo: "video"; src: string; poster?: string }
  | { tipo: "youtube"; id: string };

/* Crea fotos numeradas: fotos("taller", 1, 6, "png") -> taller1.png ... taller6.png */
const fotos = (prefijo: string, desde: number, hasta: number, ext: string): Medio[] =>
  Array.from({ length: hasta - desde + 1 }, (_, i): Medio => ({
    tipo: "foto",
    src: `${RUTA}/${prefijo}${desde + i}.${ext}`,
  }));

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
  },
    {
    id: "applied-finance-day-26-2",
    dia: "II",
    mes: "2026",
    titulo: "Applied Finance Day",
    cuando: "Próximamente en el semestre 2026 - II",
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
    portada: `${RUTA}/img1.jpg`,
    medios: fotos("eventos", 1, 10, "png"),
  },
  {
    id: "talleres-learning-lab",
    periodo: "2026-I",
    fecha: "26 de marzo de 2026",
    titulo: "Talleres Learning Lab",
    descripcion:
      "Sesiones del Learning Lab con análisis financiero introductorio y comparativo de las principales empresas azucareras del país.",
    asistentes: 31,
    portada: `${RUTA}/taller1.png`,
    medios: fotos("taller", 1, 6, "png"),
  },
  {
    id: "semana-investigacion",
    periodo: "2026-I",
    fecha: "27 y 28 de mayo de 2026",
    titulo: "Semana de Investigación",
    descripcion:
      "Presentación del semillero dentro de la Semana de Investigación de la FCA-UNALM: quiénes somos, qué hacemos y qué investigamos.",
    portada: `${RUTA}/sem1.png`,
    medios: fotos("sem", 1, 6, "png"),
  },
  {
    id: "feria-vocacional",
    periodo: "2026-I",
    fecha: "29 de mayo de 2026",
    titulo: "Taller Feria Vocacional",
    descripcion:
      "Participación de AFINLAB en la Feria Vocacional para dar a conocer el semillero a estudiantes interesados en investigación financiera.",
    portada: `${RUTA}/fer1.png`,
    medios: fotos("fer", 1, 3, "png"),
  },
  {
    id: "applied-finance-day",
    periodo: "2026-I",
    fecha: "26 de agosto de 2026",
    titulo: "Applied Finance Day",
    descripcion:
      "Feria interna donde el semillero presentó los resultados de los talleres y de sus distintas áreas de trabajo.",
    portada: `${RUTA}/appi1.jpg`,
    medios: fotos("appi", 1, 11, "jpg"),
  },
  {
    id: "convocatoria-2026-2",
    periodo: "2026-II",
    fecha: "Semestre 2026-II",
    titulo: "Convocatoria AFINLAB",
    descripcion:
      "Convocatoria para la incorporación de nuevos miembros al Semillero de Investigación AFINLAB durante el periodo académico 2026-II.",
    portada: `${RUTA}/1_convocatoria.jpeg`,
    medios: [
      { tipo: "foto", src: `${RUTA}/1_convocatoria.jpeg` },
      { tipo: "foto", src: `${RUTA}/2_convocatoria.jpeg` },
      { tipo: "video", src: `${RUTA}/3_convocatoria_vid.mp4` },
      { tipo: "foto", src: `${RUTA}/4_convocatoria.jpeg` },
      { tipo: "foto", src: `${RUTA}/5_convocatoria.jpeg` },
      { tipo: "foto", src: `${RUTA}/6_convocatoria.jpeg` },
      { tipo: "foto", src: `${RUTA}/7_convocatoria.jpeg` },
      { tipo: "foto", src: `${RUTA}/8_convocatoria.jpeg` },
      { tipo: "foto", src: `${RUTA}/9_convocatoria.jpeg` },
      { tipo: "video", src: `${RUTA}/10_convocatoria_vid.mp4` },
      { tipo: "foto", src: `${RUTA}/11_convocatoria.jpeg` },
    ],
  },
];