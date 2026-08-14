# Saneamiento editorial de Insights legacy

Fecha de ejecución: 13 de agosto de 2026  
Base: `19f2484a41c258113e00770606e99f94fead3f54`  
Alcance: las 13 notas migradas desde Sanity, identificadas por `legacySanityId`.

## Resumen

La auditoría aprobada propuso 1 KEEP, 3 REWORK, 3 REDIRECT y 6 RETIRE. Durante la ejecución, la antigua KEEP no superó el gate sin cambios: su núcleo sobre energía y capacidad seguía siendo válido, pero no traducía suficientemente el impacto a decisiones empresariales. Se reconstruyó como una cuarta REWORK.

| Resultado ejecutado | Cantidad |
| --- | ---: |
| KEEP sin cambios | 0 |
| REWORK | 4 |
| REDIRECT | 3 |
| RETIRE | 6 |
| Total legacy evaluado | 13 |

El corpus pasa de 21 a **12 artículos públicos únicos**: las 8 piezas del modelo nuevo y 4 piezas legacy reconstruidas. Los redirects y retiros ya no forman parte de `newsPosts`, listado, filtros, relacionados, sitemap ni generación SEO.

## Decisión por URL

| # | Slug | Decisión inicial | Decisión ejecutada | Resultado |
| ---: | --- | --- | --- | --- |
| 1 | `ai-overviews-de-google-ya-impacta-el-trafico-web-y-el-seo` | REWORK | REWORK | Guía aplicada sobre SEO, visibilidad, intención, medición y conversión. |
| 2 | `alphabet-despega-frente-a-meta-gracias-al-negocio-de-la-ia` | RETIRE | RETIRE | Fuera del corpus; URL con 404 real. |
| 3 | `big-tech-frena-regulaciones-mas-duras-sobre-ia-en-eeuu` | REWORK | REWORK | Análisis empresarial de gobernanza y preparación regulatoria. |
| 4 | `gemini-3-supera-a-chatgpt-y-redefine-el-liderazgo-en-inteligencia-artificial` | RETIRE | RETIRE | Fuera del corpus; URL con 404 real. |
| 5 | `google-reinventa-search-con-ia-y-cambia-el-juego-del-seo` | REDIRECT | REDIRECT | 308 hacia la guía de AI Overviews. |
| 6 | `google-y-openai-aceleran-la-era-de-los-agentes-autonomos` | REDIRECT | REDIRECT | 308 hacia agentes en producción. |
| 7 | `la-burbuja-de-la-ia-no-esta-en-wall-street` | KEEP condicionado | REWORK | Análisis sobre capacidad, costo, dependencia y continuidad. |
| 8 | `la-revolucion-tecnologica-de-enero-2026-en-Argentina` | RETIRE | RETIRE | Fuera del corpus; URL con 404 real. |
| 9 | `meta-acelera-la-carrera-de-ia-contra-openai-y-google` | REDIRECT | REDIRECT | 308 hacia Meta Business Agent. |
| 10 | `milei-impulsa-ia-para-disenar-politicas-publicas-en-argentina` | RETIRE | RETIRE | Fuera del corpus; URL con 404 real. |
| 11 | `nvidia-ya-destina-usd-90000-millones-al-ecosistema-de-ia` | RETIRE | RETIRE | Fuera del corpus; URL con 404 real. |
| 12 | `openai-enfrenta-demanda-por-presunta-filtracion-de-datos-a-meta-y-google` | REWORK | REWORK | Guía de control de datos sensibles, proveedores, permisos y retención. |
| 13 | `sam-altman-modera-su-discurso-sobre-el-impacto-laboral-de-la-ia` | RETIRE | RETIRE | Fuera del corpus; URL con 404 real. |

## Piezas reconstruidas

| URL preservada | Título final | Modelo editorial | Profundidad |
| --- | --- | --- | ---: |
| `ai-overviews-de-google-ya-impacta-el-trafico-web-y-el-seo` | Cómo cambia el SEO cuando Google responde con IA | `seo / guia / data-analytics` | 1.230 palabras |
| `big-tech-frena-regulaciones-mas-duras-sobre-ia-en-eeuu` | Qué debería preparar una empresa ante la regulación de IA | `actualidad / analisis / ia-aplicada-empresas` | 954 palabras |
| `openai-enfrenta-demanda-por-presunta-filtracion-de-datos-a-meta-y-google` | Qué revisar antes de enviar datos sensibles a una IA | `actualidad / analisis / ia-aplicada-empresas` | 1.023 palabras |
| `la-burbuja-de-la-ia-no-esta-en-wall-street` | La infraestructura de IA también es una decisión de negocio | `actualidad / analisis / ia-aplicada-empresas` | 978 palabras |

Las cuatro conservan `legacySanityId` únicamente como trazabilidad. Todas declaran `contentPurpose`, `contentType`, `territory`, metadata SEO, fuentes cuando corresponde, `topicFingerprint`, CTA, relacionados y portada local.

## Redirects permanentes

| Origen | Destino | Status |
| --- | --- | ---: |
| `/noticias/google-reinventa-search-con-ia-y-cambia-el-juego-del-seo` | `/noticias/ai-overviews-de-google-ya-impacta-el-trafico-web-y-el-seo` | 308 |
| `/noticias/google-y-openai-aceleran-la-era-de-los-agentes-autonomos` | `/noticias/agentes-ia-produccion-control-limites` | 308 |
| `/noticias/meta-acelera-la-carrera-de-ia-contra-openai-y-google` | `/noticias/meta-business-agent-whatsapp-leads-ventas` | 308 |

Los destinos son finales: no se generan cadenas y las URLs origen no producen páginas SEO.

## Retiros

Las seis piezas RETIRE se eliminaron del directorio activo. No aparecen en listado, filtros, sitemap, relacionados ni HTML SEO. Sus URLs responden **404 real** en Vercel porque el proyecto está basado en archivos estáticos y rewrites; obtener 410 requeriría introducir una función o reemplazar la estrategia de routing, una ampliación innecesaria para este saneamiento. No se usan redirects genéricos ni soft-404s.

## Dedupe final

- AI Overviews queda como única pieza sobre búsqueda generativa y medición.
- Gobernanza se concentra en documentación, responsabilidad y adaptación regulatoria.
- Datos sensibles se concentra en clasificación, recorrido, permisos y retención.
- Agentes en producción se concentra en ejecución, límites y control operativo.
- Infraestructura se concentra en capacidad, costo, dependencia y continuidad.

Los ángulos se relacionan, pero no responden sustancialmente la misma pregunta. El validador también rechaza `relatedSlugs` o enlaces editoriales que apunten a artículos inexistentes.
