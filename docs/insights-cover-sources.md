# Sistema editorial de portadas de NexOps Insights

Audit y contrato visual del corpus activo de `/noticias`. Las fotografías se sirven desde Unsplash con un recorte fijo `1600×1000` (16:10), una URL base única por artículo y foco independiente para mobile y desktop.

## Resultado del audit

- El lote anterior tenía 17 URLs diferentes, pero varias escenas eran intercambiables entre notas.
- Tres portadas repetían casi la misma oficina con pizarrón; otras asociaban infraestructura de IA con trading, contexto de negocio con e-commerce y priorización con una máquina sin relación clara.
- Los JSON históricos conservaban cuatro archivos repetidos y dos fuentes verticales. Los overrides ocultaban el duplicado, pero no expresaban criterio ni foco responsive.
- La portada de detalle usaba una proporción distinta a cards y destacada.

## Matriz editorial aplicada

| Artículo | Tratamiento | Universo visual | Foco mobile / desktop |
| --- | --- | --- | --- |
| `agente-ia-no-es-empleado-digital-limites` | análisis | equipo técnico + supervisión humana | 58% 50% / 50% 50% |
| `agentes-ia-produccion-control-limites` | análisis | observabilidad y métricas de producción | 50% 50% / 50% 48% |
| `ai-overviews-de-google-ya-impacta-el-trafico-web-y-el-seo` | marca | Google Search + experiencia de búsqueda | 58% 50% / 52% 50% |
| `automatizar-un-proceso-roto-falla-mas-rapido` | análisis | proceso visible antes de automatizar | 62% 48% / 54% 48% |
| `big-tech-frena-regulaciones-mas-duras-sobre-ia-en-eeuu` | análisis | documentación, política y gobernanza | 42% 54% / 50% 50% |
| `como-armar-pipeline-ventas-crm` | operación | CRM y dashboard comercial | 58% 48% / 50% 50% |
| `como-automatizar-reportes-de-ventas` | operación | reporting y métricas | 50% 50% / 50% 50% |
| `como-hacer-dashboard-indicadores-gestion` | operación | dashboard de gestión en uso | 50% 52% / 50% 50% |
| `como-integrar-whatsapp-con-un-crm-para-no-perder-leads` | marca | WhatsApp + operación en notebook | 52% 46% / 50% 50% |
| `ia-necesita-contexto-del-negocio` | análisis | equipo contrastando información | 58% 50% / 50% 50% |
| `la-burbuja-de-la-ia-no-esta-en-wall-street` | análisis | infraestructura física y servidores | 50% 48% / 50% 50% |
| `meta-business-agent-whatsapp-leads-ventas` | marca | Meta + operación comercial digital | 68% 50% / 60% 50% |
| `openai-enfrenta-demanda-por-presunta-filtracion-de-datos-a-meta-y-google` | marca | OpenAI + datos sensibles | 66% 52% / 58% 50% |
| `que-procesos-automatizar-primero-pyme` | operación | decisión y priorización en equipo | 54% 46% / 50% 48% |
| `solicitud-interna-flujo-automatico-trabajo` | operación | etapas y workflow interno | 42% 50% / 48% 50% |
| `whatsapp-crm-circuito-automatico-seguimiento-leads` | marca | WhatsApp → CRM + equipo comercial | 50% 46% / 50% 50% |
| `rpa-vs-automatizacion-api` | operación | desarrollo e integración de sistemas | 64% 50% / 58% 50% |

La URL, el texto alternativo, el tratamiento, el acento y ambos focos viven en `src/data/news/cover-overrides.js`. `NewsVisual` aplica el mismo contrato en destacada, cards y detalle.

## Reglas para publicaciones futuras

1. Cada artículo debe declarar un `coverEditorial` completo: `kind`, `label`, `alt`, `accent`, `objectPositionMobile` y `objectPositionDesktop`.
2. `kind` sólo admite `brand`, `operation` o `analysis`.
3. Las notas de plataforma deben tener una señal de marca o contexto reconocible; las operativas deben mostrar el sistema o la operación; las de análisis deben representar su tesis central.
4. La fotografía debe provenir de Unsplash o Pexels, entregar un recorte landscape de al menos 1200×675 y no compartir su URL base con ninguna nota activa.
5. El gate `news:audit` rechaza portadas sin criterio editorial, sin focos responsive, verticales o duplicadas.
6. La portada puede incluir una señal contextual breve. No repite título, fecha, propósito ni excerpt.
