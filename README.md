# 📑 Reporte de Desarrollo: Liminal Space (Plataforma Psicoterapéutica)

## 🛠 1. Stack Tecnológico (The Stack)
La aplicación es una SPA (Single Page Application) optimizada para dispositivos móviles, construida con los estándares más modernos de desarrollo web:

- **Framework**: React 18+ con TypeScript.
- **Build Tool**: Vite (rápido y eficiente).
- **Estilos**: Tailwind CSS (utilizando el nuevo motor de compilación `@import "tailwindcss"`).
- **Animaciones**: `motion/react` (Framer Motion) para transiciones de rutas y micro-interacciones suaves.
- **Iconografía**: `lucide-react`.
- **Gestión de Estado**: React Context API para Autenticación, Internacionalización (I18n) y Moneda (Currency).
- **Backend (Infraestructura)**: Preparado para Supabase (PostgreSQL + Auth + Storage).

## 🚀 2. Funcionalidades Implementadas
El desarrollo se ha centrado en la experiencia de usuario (UX) y el diseño emocional:

- **Layout Multi-Nivel**: Sistema de navegación inferior (Bottom Nav) con transiciones animadas.
- **Agendamiento Avanzado (Booking)**: Interfaz para selección de servicios, terapeutas, fechas y horas. Incluye lógica de selección y confirmación visual.
- **Blog & Recursos (ArticlesHub)**: Sistema de lectura de artículos con categorías, buscador y vista de lector a pantalla completa.
- **Portal del Paciente (Login-Ready)**:
  - **Autenticación**: Flujo de login con Google (simulado/maquetado con Supabase Auth).
  - **Gestión de Citas**: Vista de próximas sesiones y enlace a videollamada.
  - **Repositorio de Recursos**: Descarga de documentos y audios compartidos por el terapeuta.
  - **Módulo de Bienestar**: Mood tracker (seguimiento de ánimo) y ejercicio de respiración guiada (Coherencia Cardíaca) animado.
- **Internacionalización**: Contexto global para cambio de idiomas (Español/Inglés) y conversión de moneda.
- **Soporte & FAQ**: Sección expandible de preguntas frecuentes y contacto directo.

## 🗂 3. Arquitectura de Archivos
- `/src/contexts/`: Manejo de lógica global (Auth, I18n).
- `/src/screens/`: Vistas principales (Inicio, Servicios, Agenda, Artículos, Portal).
- `/src/components/`: Componentes UI reutilizables (Buttons, Layouts, Widgets).
- `/src/lib/`: Configuración de servicios externos (Supabase).
- `/src/data.ts`: Mock de datos (Terapeutas, Artículos) para desarrollo rápido.

## 🚧 4. Pendientes y Próximos Pasos (Roadmap)
Para continuar con el desarrollo, estos son los puntos clave:

- **Persistencia de Datos**: Conectar las tablas de Supabase para reemplazar los "datos mock" (terapeutas, citas reales, artículos).
- **Auth Producción**: Configurar las API Keys y Redirect URLs en el Dashboard de Supabase para que el login de Google/Apple sea funcional.
- **Sistema de Pagos**: Integrar el SDK de Stripe en el flujo de agendamiento.
- **Seguridad (RR.SS)**: Implementar RLS (Row Level Security) en Supabase para proteger la privacidad de los pacientes.
- **Notificaciones**: Configurar triggers para correos de confirmación de cita (vía Resend o Supabase Edge Functions).
- **Panel Admin (CRM)**: Desarrollar la herramienta interna separada para que los terapeutas gestionen pacientes, suban recursos y editen el blog.

> **Nota para el equipo de desarrollo:**  
> "El layout está diseñado como una web-app móvil pero es totalmente responsivo. Se debe priorizar el mantenimiento de la 'limpieza' visual y las animaciones suaves que definen la marca Liminal Space."
