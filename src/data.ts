import { Therapist, Service, Article } from "./types";

export const therapists: Therapist[] = [
  {
    id: "t1",
    name: "Camila Malebrán F",
    role: "Psicóloga Clínica",
    bio: "Especialista en terapia cognitivo-conductual, enfocada en trastornos de ansiedad, estrés por adaptación cultural y crisis de identidad en la experiencia de expatriación.",
    imageUrl: "https://images.unsplash.com/photo-1594824406560-6dd8802d08a5?w=400&q=80&fit=crop",
  },
  {
    id: "t2",
    name: "Jonathan Petersen Z",
    role: "Psicólogo Clínico",
    bio: "Orientación psicoanalítica y sistémica, abordando procesos de crisis, trauma migratorio, desarraigo y complejas dinámicas vinculares a distancia.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&fit=crop",
  }
];

export const services: Service[] = [
  {
    id: "s1",
    title: "Psicoterapia Individual (Online)",
    description: "Un espacio seguro desde cualquier lugar del mundo. Abordamos ansiedad, soledad y los desafíos emocionales de vivir lejos de tu país de origen.",
    duration: 60,
    price: "$50",
    iconType: "individual",
    imageUrl: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&q=80&fit=crop"
  },
  {
    id: "s2",
    title: "Terapia de Pareja Transcultural",
    description: "Herramientas para fortalecer el vínculo afectivo enfrentando cambios vitales, adaptación a nuevos países o barreras interculturales.",
    duration: 90,
    price: "$80",
    iconType: "couple",
    imageUrl: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=400&q=80&fit=crop"
  },
  {
    id: "s3",
    title: "Acompañamiento en Migración",
    description: "Soporte específico para el choque cultural, la construcción de una nueva red de apoyo y la redefinición de tu identidad como expatriado.",
    duration: 60,
    price: "$50",
    iconType: "online",
    imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&q=80&fit=crop"
  }
];

export const articles: Article[] = [
  {
    id: "a1",
    title: "Cómo manejar la ansiedad en el trabajo",
    summary: "Estrategias prácticas para lidiar con el estrés laboral y mejorar tu bienestar emocional en la oficina.",
    content: "La ansiedad en entornos laborales es una de las afecciones más comunes en el mundo moderno. Constantemente estamos expuestos a fechas de entrega, expectativas de rendimiento y dinámicas de equipo complejas. \n\nPara manejarla, es fundamental establecer límites saludables. Primero, identifica tus detonantes. ¿Son los correos de última hora? ¿Las reuniones sin agenda? Una vez los tengas claros, es necesario empezar a aplicar estrategias de afrontamiento como la técnica de Pomodoro para no sobrecargarte cognitivamente. Además, no subestimes el poder de las pausas cortas. Levantarse a por agua, respirar profundo por 2 minutos o mirar por una ventana pueden reiniciar tu sistema nervioso.",
    category: "Ansiedad",
    date: "12 Oct, 2026",
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&q=80&fit=crop"
  },
  {
    id: "a2",
    title: "¿Cuándo es momento de ir a terapia de pareja?",
    summary: "Señales de alerta y beneficios de buscar ayuda profesional antes de que los conflictos se vuelvan irreversibles.",
    content: "Muchas parejas esperan demasiado tiempo antes de buscar ayuda, acudiendo cuando el resentimiento y el daño emocional han creado barreras profundas. La terapia de pareja no es solo para evitar un divorcio; es un espacio para aprender a comunicarse y reencontrarse.\n\nAlgunas señales de que podrían beneficiarse incluyen: críticas continuas, vivir como 'compañeros de piso', falta de intimidad o la misma discusión una y otra vez sin llegar a una resolución. Asistir a terapia no es admitir un fracaso, sino mostrar compromiso por la relación y voluntad constructiva.",
    category: "Relaciones",
    date: "28 Sep, 2026",
    imageUrl: "https://images.unsplash.com/photo-1522844990619-3b60eddb7d88?w=400&q=80&fit=crop"
  },
  {
    id: "a3",
    title: "Mindfulness: reconectando con el presente",
    summary: "Una guía básica para integrar la atención plena en tu vida cotidiana y reducir la preocupación excesiva.",
    content: "Gran parte del sufrimiento humano proviene de la rumiación: habitar el pasado melancólicamente o vivir en un futuro lleno de miedos y escenarios catastróficos que la mayoría de veces jamás ocurren.\n\nEl mindfulness nos entrena para volver al 'aquí y ahora'. No consiste en dejar la mente en blanco, sino en prestar atención de manera intencional y sin juzgar a la experiencia presente. Empieza por lo básico: siente el agua caliente en la ducha, concéntrate en los sabores de tu comida o dedica cinco minutos al despertar para escuchar los sonidos lejanos. Este anclaje calma la amígdala (tu centro del miedo).",
    category: "Bienestar",
    date: "05 Sep, 2026",
    imageUrl: "https://images.unsplash.com/photo-1510936111840-65e151ad71bb?w=400&q=80&fit=crop"
  },
  {
    id: "a4",
    title: "Entendiendo tu apego adulto",
    summary: "Cómo las relaciones de la infancia siguen moldeando la forma en la que te vinculas hoy.",
    content: "La teoría del apego, popularizada por John Bowlby, nos muestra cómo los estilos de vinculación desarrollados con nuestros padres influyen enormemente en la edad adulta.\n\nExisten patrones comunes: el apego seguro (confían y dan espacio), el ansioso (temen constantemente el abandono), el evitativo (huyen de la intimidad profunda) y el desorganizado. Identificar tu estilo no es una sentencia de por vida. Es más bien el primer paso para realizar un trabajo consciente, y aprender paulatinamente otras formas de relacionarte con vínculos mucho más sanos, recíprocos y seguros.",
    category: "Terapia",
    date: "01 Sep, 2026",
    imageUrl: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=400&q=80&fit=crop"
  },
  {
    id: "a5",
    title: "Síndrome del Impostor: cómo superarlo",
    summary: "Sentir que eres un fraude a pesar de tus evidentes logos y capacidades es muy común. Así es como puedes empezar a mitigarlo.",
    content: "El Síndrome del Impostor es esa voz interna que dice: 'Has tenido suerte', o 'Estás a punto de ser descubierto'. Afecta fuertemente a profesionales, estudiantes y cualquier persona asumiendo un riesgo.\n\nEl primer antídoto es nombrarlo. Conversar acerca de esto con colegas a menudo revela que casi todos se sienten así en algún momento. El segundo paso es documentar objetivamente tus logros emocionales y profesionales. Reemplaza el sesgo de confirmación negativo intentando integrar activamente reconocimientos pasados a tu relato de identidad.",
    category: "Bienestar",
    date: "20 Ago, 2026",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80&fit=crop"
  }
];
