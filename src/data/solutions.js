export const systemSteps = [
  {
    id: "captacion",
    label: "Captación",
    description: "La oportunidad entra desde campañas, web o WhatsApp.",
    state: "Consulta detectada",
  },
  {
    id: "crm",
    label: "CRM",
    description: "Queda registrada, asignada y con una próxima acción.",
    state: "Responsable asignado",
  },
  {
    id: "ia",
    label: "IA",
    description: "Interpreta contexto, califica y prepara la respuesta.",
    state: "Contexto preparado",
  },
  {
    id: "automatizacion",
    label: "Automatización",
    description: "Ejecuta tareas y conecta los sistemas involucrados.",
    state: "Tarea ejecutada",
  },
  {
    id: "data",
    label: "Data",
    description: "Registra el resultado y muestra qué está funcionando.",
    state: "Resultado visible",
  },
];

export const solutions = [
  {
    slug: "captacion",
    title: "Captación",
    shortTitle: "Captación / Performance",
    navLabel: "Captación",
    eyebrow: "Demanda conectada con ventas",
    statement: "Generamos oportunidades y las conectamos con el proceso que tiene que convertirlas.",
    summary:
      "Campañas en Meta y Google, landings y medición trabajando junto al CRM para que cada lead tenga seguimiento.",
    problem:
      "La campaña genera consultas, pero después nadie sabe cuáles se respondieron, cuáles avanzaron ni cuánto negocio produjeron.",
    change:
      "La captación deja de ser una fuente aislada de leads y se vuelve la primera etapa de un sistema comercial medible.",
    nexy: "/assets/nexis/nexi-growth.webp",
    nexyRole: "Nexy detecta y encamina oportunidades",
    accent: "coral",
    icon: "Megaphone",
    capabilities: [
      "Estrategia y operación de Meta Ads y Google Ads",
      "Landings, formularios y eventos de conversión",
      "Audiencias, mensajes y experimentación",
      "Conexión del lead con CRM y responsables",
      "Medición desde la campaña hasta el avance comercial",
    ],
    flow: ["Generamos demanda", "Capturamos el lead", "Lo registramos en el CRM", "Medimos seguimiento y avance"],
    example: {
      title: "La campaña no termina en el formulario",
      before: "Los leads llegan por distintas vías y el equipo los busca entre mensajes, planillas y notificaciones.",
      after: "Cada oportunidad entra identificada, se asigna y queda lista para que ventas continúe con contexto.",
    },
    integrations: ["Meta Ads", "Google Ads", "GA4", "WhatsApp", "CRM"],
  },
  {
    slug: "crm",
    title: "CRM",
    shortTitle: "CRM y operación comercial",
    navLabel: "CRM",
    eyebrow: "Orden para vender mejor",
    statement: "Ordenamos cómo vende tu empresa, desde la primera consulta hasta el cierre.",
    summary:
      "Centralizamos conversaciones, oportunidades, responsables y próximas acciones para que ninguna venta dependa de la memoria.",
    problem:
      "Las consultas entran, pero nadie sabe con certeza quién las está siguiendo, qué se habló o cuál es el próximo paso.",
    change:
      "El equipo trabaja sobre un proceso visible: cada oportunidad tiene dueño, estado, contexto y una acción pendiente.",
    nexy: "/assets/nexis/nexi-sales.webp",
    nexyRole: "Nexy organiza y sostiene el seguimiento",
    accent: "indigo",
    icon: "PanelsTopLeft",
    capabilities: [
      "Diseño de pipeline y reglas comerciales",
      "WhatsApp, formularios y canales centralizados",
      "Asignación de responsables, tareas y alertas",
      "Automatizaciones dentro del proceso de ventas",
      "Implementación de Kommo y otras plataformas",
    ],
    flow: ["Centralizamos canales", "Definimos etapas", "Asignamos responsables", "Sostenemos el seguimiento"],
    example: {
      title: "Una consulta con dueño y próxima acción",
      before: "El cliente escribe por WhatsApp y la conversación queda atada al teléfono de una persona.",
      after: "El contacto, el historial y la oportunidad quedan visibles para que el equipo sepa qué hacer y cuándo.",
    },
    integrations: ["Kommo", "WhatsApp", "Email", "Formularios", "ERP"],
  },
  {
    slug: "agentes-ia",
    title: "Agentes IA",
    shortTitle: "Agentes de IA",
    navLabel: "Agentes IA",
    eyebrow: "IA dentro de una operación real",
    statement: "Creamos agentes que entienden el contexto y saben cuándo actuar, asistir o escalar a una persona.",
    summary:
      "Atención, calificación, seguimiento y asistencia interna conectados con reglas, datos y sistemas del negocio.",
    problem:
      "Un chatbot responde frases. La empresa necesita una IA que conozca el proceso, use contexto y respete límites.",
    change:
      "La IA deja de ser una demo aislada y se convierte en una capacidad controlada dentro del trabajo cotidiano.",
    nexy: "/assets/nexis/nexi-ai.webp",
    nexyRole: "Nexy interpreta contexto y prepara acciones",
    accent: "violet",
    icon: "Sparkles",
    capabilities: [
      "Atención y respuestas con contexto de negocio",
      "Calificación y priorización de consultas",
      "Asistencia a ventas y equipos internos",
      "Ejecución mediante herramientas autorizadas",
      "Escalamiento a personas, registro y control",
    ],
    flow: ["Recibe contexto", "Interpreta la intención", "Propone o ejecuta", "Escala cuando corresponde"],
    example: {
      title: "Responder bien también implica saber cuándo no responder",
      before: "El equipo repite las mismas respuestas y busca información en distintas fuentes antes de contestar.",
      after: "El agente prepara una respuesta contextual, consulta datos disponibles y deriva las excepciones a la persona correcta.",
    },
    integrations: ["WhatsApp", "CRM", "Bases de conocimiento", "Email", "APIs"],
  },
  {
    slug: "automatizacion",
    title: "Automatización",
    shortTitle: "Automatización de procesos",
    navLabel: "Automatización",
    eyebrow: "Menos trabajo repetido",
    statement: "Conectamos sistemas y eliminamos tareas manuales que frenan la operación.",
    summary:
      "Flujos con n8n, Make, APIs y RPA para mover información, ejecutar reglas y mantener trazabilidad.",
    problem:
      "Si una persona hace todos los días el mismo trabajo entre sistemas, el proceso es lento, frágil y difícil de escalar.",
    change:
      "Las tareas repetitivas se ejecutan de forma consistente y el equipo interviene donde realmente agrega criterio.",
    nexy: "/assets/nexis/nexi-flow.webp",
    nexyRole: "Nexy conecta y ejecuta tareas",
    accent: "cyan",
    icon: "Workflow",
    capabilities: [
      "Integraciones mediante APIs y webhooks",
      "Automatizaciones con n8n y Make",
      "RPA para sistemas sin integración disponible",
      "Sincronización, alertas y aprobaciones",
      "Monitoreo, reintentos y trazabilidad",
    ],
    flow: ["Detectamos repetición", "Diseñamos reglas", "Conectamos sistemas", "Medimos y controlamos"],
    example: {
      title: "La información viaja sin doble carga",
      before: "Una persona exporta una planilla, corrige columnas y vuelve a cargar la misma información en otro sistema.",
      after: "El flujo valida los datos, actualiza el sistema destino y avisa únicamente cuando necesita intervención.",
    },
    integrations: ["n8n", "Make", "APIs", "Google Sheets", "RPA"],
  },
  {
    slug: "data-analytics",
    title: "Data & Analytics",
    shortTitle: "Data & Analytics",
    navLabel: "Data & Analytics",
    eyebrow: "Información para decidir",
    statement: "Convertimos números dispersos en una lectura clara de lo que está pasando.",
    summary:
      "Métricas, reportería y tableros construidos alrededor de las decisiones del negocio, no alrededor de gráficos decorativos.",
    problem:
      "Los números existen, pero están repartidos entre plataformas y el reporte llega tarde o requiere trabajo manual.",
    change:
      "El dueño ve indicadores consistentes, entiende desvíos y puede decidir con una misma versión de la realidad.",
    nexy: "/assets/nexis/nexi-core.webp",
    nexyRole: "Nexy ordena señales y muestra lo relevante",
    accent: "violet",
    icon: "ChartNoAxesCombined",
    capabilities: [
      "Definición de KPIs y modelo de medición",
      "Implementación de GA4 y eventos",
      "Dashboards en Looker Studio y Power BI",
      "Integración de fuentes comerciales y operativas",
      "Reportería automática y control de calidad",
    ],
    flow: ["Unificamos fuentes", "Definimos indicadores", "Construimos lectura", "Activamos decisiones"],
    example: {
      title: "Un reporte que llega antes de la reunión",
      before: "Cada área arma su número y la conversación se consume discutiendo cuál versión es correcta.",
      after: "Las fuentes se actualizan con reglas comunes y el tablero pone el foco en desvíos y decisiones.",
    },
    integrations: ["GA4", "Looker Studio", "Power BI", "CRM", "Bases de datos"],
  },
  {
    slug: "desarrollo",
    title: "Desarrollo",
    shortTitle: "Desarrollo a medida",
    navLabel: "Desarrollo",
    eyebrow: "Software para el problema real",
    statement: "Construimos herramientas cuando las plataformas existentes no alcanzan.",
    summary:
      "Aplicaciones, portales, integraciones y productos digitales diseñados para una necesidad concreta y conectados al ecosistema existente.",
    problem:
      "El negocio necesita una capacidad específica y termina forzando planillas o software genérico que no acompaña el proceso.",
    change:
      "La empresa incorpora una herramienta enfocada, usable y preparada para integrarse, evolucionar y generar trazabilidad.",
    nexy: "/assets/nexis/nexi-core.webp",
    nexyRole: "Nexy construye y conecta la solución",
    accent: "blue",
    icon: "Blocks",
    capabilities: [
      "Aplicaciones internas y portales para clientes",
      "Productos digitales y MVPs",
      "Integraciones especiales entre plataformas",
      "Experiencias web y herramientas operativas",
      "Arquitectura, QA y evolución del producto",
    ],
    flow: ["Entendemos el proceso", "Definimos el producto mínimo", "Construimos e integramos", "Validamos y evolucionamos"],
    example: {
      title: "Una herramienta alrededor del proceso, no al revés",
      before: "El equipo combina formularios, chats y planillas para sostener una operación que ya superó esas herramientas.",
      after: "Un portal reúne la carga, las reglas, el estado y la información que cada actor necesita.",
    },
    integrations: ["Web", "Mobile", "APIs", "CRM", "ERP"],
  },
];

export const getSolution = (slug) => solutions.find((solution) => solution.slug === slug);
