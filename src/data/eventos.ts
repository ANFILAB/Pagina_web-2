const RUTA = "/img/eventos";

const serie = (prefijo: string, desde: number, hasta: number, ext: string) =>
  Array.from({ length: hasta - desde + 1 }, (_, i) => `${RUTA}/${prefijo}${desde + i}.${ext}`);

export type PaginaDestino = "inicio" | "publicaciones" | "redes" | "eventos";

export interface EventoProximo {
  id: string;
  dia: string;
  mes: string;
  categoria: string;
  titulo: string;
  tituloDetalle: string;
  cuando: string;
  lugar: string;
  descripcion: string;
  descripcionDetalle: string;
  imagen: string;
  cta: { texto: string; page: PaginaDestino; anchor?: string };
}

export interface EventoAnterior {
  id: string;
  fecha: string;
  titulo: string;
  descripcion: string;
  asistentes?: number; // si falta, no se muestra
  portada: string;
  fotos: string[];
}

export const proximos: EventoProximo[] = [
  {
    id: "convocatoria-2026-2",
    dia: "II",
    mes: "2026",
    categoria: "Convocatoria general",
    titulo: "Convocatoria AFINLAB 2026-II",
    tituloDetalle: "Convocatoria de nuevos miembros AFINLAB 2026-II",
    cuando: "Próximamente · Semestre 2026-II",
    lugar: "Presencial y virtual · UNALM",
    descripcion:
      "Se acerca la nueva convocatoria para incorporar miembros al Semillero de Investigación AFINLAB. Prepárate para potenciar tus habilidades en análisis financiero e investigación aplicada.",
    descripcionDetalle:
      "Se acerca el proceso de postulación y selección para nuevos miembros del Semillero de Investigación AFINLAB (periodo académico 2026-II). Invitamos a todos los estudiantes de la UNALM apasionados por el análisis financiero, la modelación cuantitativa y la investigación aplicada a estar atentos a la apertura de inscripciones y a la publicación de las bases.",
    imagen: `${RUTA}/foto-equipo.png`,
    cta: { texto: "Ver convocatoria", page: "inicio", anchor: "contacto" },
  },
];

export const anteriores: EventoAnterior[] = [
  {
    id: "lanzamiento-2026-1",
    fecha: "12 de marzo de 2026",
    titulo: "Lanzamiento AFINLAB 2026-I",
    descripcion:
      "Ceremonia de bienvenida e integración de los nuevos miembros, con la presentación oficial de las líneas de investigación del semestre.",
    asistentes: 45,
    portada: `${RUTA}/img1.jpg`,
    fotos: serie("eventos", 1, 10, "png"),
  },
  {
    id: "talleres-learning-lab",
    fecha: "26 de marzo de 2026",
    titulo: "Talleres Learning Lab",
    descripcion:
      "Sesiones del Learning Lab con análisis financiero introductorio y comparativo de las principales empresas azucareras del país.",
    asistentes: 31,
    portada: `${RUTA}/taller1.png`,
    fotos: serie("taller", 1, 6, "png"),
  },
  {
    id: "semana-investigacion",
    fecha: "27 y 28 de mayo de 2026",
    titulo: "Semana de Investigación",
    descripcion:
      "Presentación del semillero dentro de la Semana de Investigación de la FCA-UNALM: quiénes somos, qué hacemos y qué investigamos.",
    portada: `${RUTA}/sem1.png`,
    fotos: serie("sem", 1, 6, "png"),
  },
  {
    id: "feria-vocacional",
    fecha: "29 de mayo de 2026",
    titulo: "Taller Feria Vocacional",
    descripcion:
      "Participación de AFINLAB en la Feria Vocacional para dar a conocer el semillero a estudiantes interesados en investigación financiera.",
    portada: `${RUTA}/fer1.png`,
    fotos: serie("fer", 1, 3, "png"),
  },
  {
    id: "applied-finance-day",
    fecha: "26 de agosto de 2026",
    titulo: "Applied Finance Day",
    descripcion:
      "Feria interna donde el semillero presentó los resultados de los talleres y de sus distintas áreas de trabajo.",
    portada: `${RUTA}/appi1.jpg`,
    fotos: serie("appi", 1, 11, "jpg"),
  },
];
