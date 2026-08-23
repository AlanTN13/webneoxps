# Portadas editoriales de NexOps Insights

Registro de la implementación del issue #46, basada en la estrategia aprobada en #44.

## Política

La portada completa debe permitir inferir el tema sin leer el título. El orden de decisión es:

1. entidad o actor;
2. producto o interfaz;
3. diagrama, dato o flujo;
4. fotografía contextual cuando sea la forma más clara de comunicarlo.

No se acepta `foto genérica + logo/etiqueta`. Todas las portadas finales son assets locales de 1600×900, con metadata editorial, foco responsive y OG declarados en el JSON de cada noticia.

## Corpus activo

| Slug | Tipo visual | Protagonista | Fuente / crédito |
| --- | --- | --- | --- |
| `ai-overviews-de-google-ya-impacta-el-trafico-web-y-el-seo` | producto/interfaz | Google Search AI Overviews | Composición NexOps basada en Google Search Central |
| `como-armar-pipeline-ventas-crm` | producto/interfaz | pipeline CRM | Interfaz original NexOps |
| `como-integrar-whatsapp-con-un-crm-para-no-perder-leads` | producto/interfaz | WhatsApp Business ↔ CRM | Composición NexOps con referencia oficial de WhatsApp Business |
| `ia-necesita-contexto-del-negocio` | arquitectura | contexto operativo para IA | Diagrama original NexOps |
| `la-burbuja-de-la-ia-no-esta-en-wall-street` | datos/infraestructura | centro de datos, energía, capacidad y costo | Base generada con OpenAI ImageGen + composición NexOps |
| `meta-business-agent-whatsapp-leads-ventas` | marca/producto | Meta Business Agent en WhatsApp | Composición NexOps con referencias oficiales Meta/WhatsApp |
| `openai-enfrenta-demanda-por-presunta-filtracion-de-datos-a-meta-y-google` | seguridad | gobierno de datos hacia proveedores IA | Diagrama NexOps basado en NIST AI RMF |
| `que-procesos-automatizar-primero-pyme` | datos/matriz | priorización impacto × factibilidad | Visualización original NexOps |
| `rpa-vs-automatizacion-api` | comparación | RPA vs API vs híbrido | Diagrama comparativo original NexOps |
| `whatsapp-crm-circuito-automatico-seguimiento-leads` | proceso | circuito completo WhatsApp → CRM → KPI | Composición NexOps con referencia de WhatsApp Business |
| `agente-ia-no-es-empleado-digital-limites` | diagrama editorial | permisos y límites del agente | Diagrama original NexOps |
| `agentes-ia-produccion-control-limites` | interfaz operacional | control de agentes en producción | Interfaz original NexOps |
| `automatizar-un-proceso-roto-falla-mas-rapido` | proceso | error y retrabajo amplificados | Diagrama original NexOps |
| `big-tech-frena-regulaciones-mas-duras-sobre-ia-en-eeuu` | documento/diagrama | gobernanza y regulación de IA | Composición NexOps basada en NIST AI RMF y AI Act |
| `como-automatizar-reportes-de-ventas` | flujo de datos | fuentes → modelo → reporte programado | Diagrama e interfaz original NexOps |
| `solicitud-interna-flujo-automatico-trabajo` | workflow | solicitud → clasificación → responsable → métricas | Diagrama original NexOps |
| `como-hacer-dashboard-indicadores-gestion` | visualización de datos | KPIs, metas, tendencia y responsables | Dashboard original NexOps |

Los SVG fuente se generan con `npm run news:covers` y viven en `design/news-covers/`. Los PNG finales versionados se sirven desde `public/assets/insights/editorial/`.

## Fuente raster generada

Archivo fuente: `public/assets/insights/editorial-source/infraestructura-ia-data-center.png`.

Herramienta: modo integrado de OpenAI ImageGen, sin API key ni dependencia incorporada al proyecto.

Prompt final:

> Modern AI data center interior with real server racks, power distribution and cooling infrastructure; premium documentary editorial photography; 16:9 landscape; central safe area and darker right side for an editorial metrics layer; navy and subtle violet lighting; no people, trading imagery, text, logos, labels, watermark or fantasy holograms.

La imagen no se publica sola: la portada final agrega la capa editorial de energía, capacidad y costo y elimina cualquier lectura bursátil.

## Regla para futuras noticias

- Completar todos los campos visuales del contrato antes de materializar la nota.
- Versionar el asset cuando el uso lo permita; si es remoto, exigir HTTPS.
- No repetir `coverImage` entre noticias activas.
- Registrar fuente y crédito, incluso para piezas originales.
- Validar dimensiones reales, relación landscape, destacado, card, detalle, mobile y OG.
- Usar logos o interfaces sólo cuando son parte del tema, nunca como etiqueta sobre una escena genérica.
- `NO_PUBLICATION` sigue siendo válido cuando no existe una portada semánticamente sólida y con procedencia clara.
