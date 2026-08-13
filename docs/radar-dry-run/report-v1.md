# NexOps Radar — Dry Run V1

Fecha: 2026-08-13
Modo: dry-run real / no publicación
Rama: `test/radar-nexops-dry-run`
HEAD leído al iniciar: `5aeacb4a388ddc7abd04f5f51c85ee3b0f51ae61`

## Contrato y corpus revisados

Antes de investigar se leyó el contrato vigente de esta rama y las 13 publicaciones de `src/data/news/*.json`, además de la documentación del Content Engine y el borrador anterior de este dry-run.

Reglas relevantes del contrato actual:

- `contentType`: `actualidad | guia | analisis`.
- Territorios válidos: `automatizacion-procesos | ia-aplicada-empresas | crm-automatizacion-comercial | data-analytics`.
- Contenido nuevo usa slug en minúsculas y guiones.
- `actualidad` requiere fuente verificable.
- Para contenido del Radar se usan `topicFingerprint`, `engineRunId`, `engineScore` y `generatedByEngine`.
- Dedupe mínimo: `slug`, `sourceUrl`, `engineRunId` y `topicFingerprint`.

Esta rama todavía no define `contentPurpose`, por lo que no se inventó ese campo.

El corpus local cubre principalmente: Search/SEO con IA, competencia entre plataformas de IA, agentes autónomos en general, regulación/privacidad, infraestructura de IA, impacto laboral y algunas noticias tecnológicas de Argentina. No existe una pieza centrada específicamente en **operar agentes en producción con permisos, evaluaciones, acciones aprobadas, trazabilidad y escalamiento humano**.

## Regla de scoring

Se evaluaron oportunidades de Actualidad y Evergreen con el principio NexOps: **resultado antes que herramienta; problema real antes que tendencia**.

Pesos:

- Encaje con NexOps: 25
- Utilidad para decisor empresarial: 20
- Potencial evergreen / SEO plausible: 20
- Ángulo NexOps no trivial: 15
- Cercanía comercial: 10
- Calidad de fuentes: 5
- Recencia cuando aplica: 5

Umbral de selección: `>=85` y gates de calidad, fuentes, confidencialidad y dedupe aprobados. Máximo una pieza por corrida. Cero publicaciones era válido.

## Radar A — Actualidad

### A1. Agentes de IA en producción: el problema pasa de la demo al control operativo

Territorio: IA aplicada a empresas
Tipo propuesto: `actualidad`
Score: **96/100**

Breakdown:

- Encaje NexOps: 25/25
- Utilidad para decisor: 20/20
- Potencial evergreen / SEO: 17/20
- Ángulo NexOps: 15/15
- Cercanía comercial: 9/10
- Calidad de fuentes: 5/5
- Recencia: 5/5

Qué cambió:

OpenAI presentó **OpenAI Presence** el 22 de julio de 2026 como un producto empresarial administrado para desplegar agentes en flujos de voz y chat. La propuesta pone alrededor del modelo políticas, procedimientos, guardrails, acciones aprobadas, simulaciones, evaluaciones, conexión con sistemas y escalamiento humano. La documentación oficial actualizada también lo describe como una plataforma para operar y mejorar agentes gobernados en flujos de alto volumen o alto riesgo.

Ángulo NexOps:

La noticia no se trata de “otro agente”. Permite explicar una decisión empresarial concreta: **un agente que funciona en una demo no está listo para producción hasta que la empresa define permisos, evaluaciones, trazabilidad, métricas, excepciones y handoff humano**.

Fuentes:

- OpenAI, 22 Jul 2026 — https://openai.com/index/introducing-openai-presence/
- OpenAI Help Center, actualizado 12 Aug 2026 — https://help.openai.com/en/articles/20001405
- Business Insider, 22 Jul 2026 — https://www.businessinsider.com/openai-presence-corporate-software-customer-service-sales-2026-7

Gate de fuentes: **PASS**. El anuncio oficial es fuente primaria suficiente y la cobertura independiente confirma el sentido del lanzamiento.

Decisión: **SELECTED**

---

### A2. Meta Business Agent: WhatsApp pasa de responder a ejecutar acciones comerciales

Territorio: CRM + automatización comercial
Tipo propuesto: `actualidad`
Score: **94/100**

Breakdown:

- Encaje NexOps: 25/25
- Utilidad para decisor: 20/20
- Potencial evergreen / SEO: 18/20
- Ángulo NexOps: 14/15
- Cercanía comercial: 10/10
- Calidad de fuentes: 5/5
- Recencia: 2/5

Fuentes:

- Meta, 3 Jun 2026 — https://about.fb.com/news/2026/06/meta-business-agent/
- Reuters, 3 Jun 2026 — https://www.reuters.com/business/meta-launches-enterprise-focused-ai-business-agent-automate-daily-operations-2026-06-03/

Motivo de no selección:

Sigue siendo una oportunidad fuerte, especialmente para WhatsApp + CRM, pero es menos reciente que A1. El borrador anterior de `candidate-v1.json` usaba este tema y era demasiado corto para el estándar de profundidad actual. Se reemplaza por el candidato seleccionado en vez de crear otro archivo.

Decisión: `SAVE_FOR_LATER`

---

### A3. Incidentes con agentes autónomos reabren la discusión sobre supervisión y permisos

Territorio: IA aplicada a empresas
Tipo propuesto: `actualidad`
Score: **86/100**

Breakdown:

- Encaje NexOps: 21/25
- Utilidad para decisor: 20/20
- Potencial evergreen / SEO: 12/20
- Ángulo NexOps: 15/15
- Cercanía comercial: 8/10
- Calidad de fuentes: 5/5
- Recencia: 5/5

Fuente principal:

- Reuters, 24 Jul y 10 Aug 2026 — cobertura sobre incidentes de agentes autónomos y pedidos de explicaciones de legisladores estadounidenses.

Motivo de no selección:

El aprendizaje sobre controles es relevante, pero el hecho está atravesado por seguridad, investigación y política pública. A1 permite desarrollar el mismo criterio de gobernanza desde una señal empresarial más directa y menos sensacionalista.

Decisión: `REJECT`

---

### A4. Salesforce compra Fin para profundizar atención automatizada con agentes

Territorio: CRM + automatización comercial
Tipo propuesto: `actualidad`
Score: **73/100**

Fuente:

- Reuters, 15 Jun 2026 — https://www.reuters.com/business/salesforce-buy-fin-about-36-billion-2026-06-15/

Motivo de rechazo:

La operación confirma la dirección del mercado, pero la noticia nace de una adquisición y queda demasiado centrada en proveedor. El ángulo empresarial es menos accionable que las oportunidades superiores.

Decisión: `REJECT`

## Radar B — Evergreen

### B1. Cómo automatizar el seguimiento de leads sin perder trazabilidad

Territorio: CRM + automatización comercial
Tipo propuesto: `guia`
Score: **92/100**

Breakdown:

- Encaje NexOps: 25/25
- Utilidad para decisor: 20/20
- Potencial evergreen / SEO: 20/20
- Ángulo NexOps: 14/15
- Cercanía comercial: 10/10
- Calidad de fuentes/señales: 3/5
- Recencia: 0/5

Señales de intención persistente:

- HubSpot mantiene guías específicas sobre automatización de follow-up y tracking comercial.
- Zapier publica patrones recurrentes de alta de leads + tareas de seguimiento.
- La intención conecta directamente con CRM, integración de canales, ownership y próxima acción.

Motivo de no selección:

Es una oportunidad evergreen muy fuerte y queda priorizada para una corrida futura. En esta corrida A1 aporta una señal reciente y un ángulo de autoridad más diferencial sin perder cercanía comercial.

Decisión: `SAVE_FOR_LATER`

---

### B2. Cómo automatizar reportes de ventas sin seguir reconstruyendo planillas

Territorio: Data & Analytics
Tipo propuesto: `guia`
Score: **89/100**

Breakdown:

- Encaje NexOps: 24/25
- Utilidad para decisor: 20/20
- Potencial evergreen / SEO: 19/20
- Ángulo NexOps: 13/15
- Cercanía comercial: 9/10
- Calidad de fuentes/señales: 4/5
- Recencia: 0/5

Señal de intención:

- HubSpot publicó en 2026 una guía específica sobre automatización de reporting empresarial y eliminación de recolección/manualidad en planillas.

Motivo de no selección:

Pasa el umbral y tiene buena cercanía comercial, pero el máximo es una pieza por corrida. Queda como backlog evergreen prioritario.

Decisión: `SAVE_FOR_LATER`

---

### B3. Cómo integrar WhatsApp con un CRM sin convertir la automatización en otro silo

Territorio: CRM + automatización comercial
Tipo propuesto: `guia`
Score: **90/100**

Breakdown:

- Encaje NexOps: 25/25
- Utilidad para decisor: 20/20
- Potencial evergreen / SEO: 20/20
- Ángulo NexOps: 13/15
- Cercanía comercial: 10/10
- Calidad de fuentes/señales: 2/5
- Recencia: 0/5

Señal de intención:

- Pipedrive y múltiples guías recientes mantienen contenido específico sobre integración de WhatsApp Business con CRM, lo que confirma una necesidad operativa persistente aunque no se usa como estimación de volumen de búsqueda.

Motivo de no selección:

Es publicable conceptualmente, pero comparte territorio con A2 y no supera a A1 en novedad ni diferenciación editorial para esta corrida.

Decisión: `SAVE_FOR_LATER`

## Dedupe del candidato seleccionado

Se comparó A1 contra los 13 JSON publicados en la rama por tema, slug y URL de fuente.

No se encontró:

- slug `agentes-ia-produccion-control-gobernanza`;
- `topicFingerprint` `ia:agentes-produccion:gobernanza:evaluaciones:acciones-aprobadas`;
- `sourceUrl` de OpenAI Presence;
- una pieza con foco específico en controles operativos para agentes ya desplegados en producción.

Solapamientos revisados:

- `google-y-openai-aceleran-la-era-de-los-agentes-autonomos`: cubre la transición general de asistentes a agentes capaces de actuar, pero no desarrolla la capa de producción, evaluación, permisos y operación continua.
- `big-tech-frena-regulaciones-mas-duras-sobre-ia-en-eeuu`: trata regulación externa; A1 trata control operativo interno.
- `openai-enfrenta-demanda-por-presunta-filtracion-de-datos-a-meta-y-google`: trata privacidad/tracking; A1 trata diseño y gobernanza del agente dentro del workflow.

Gate de dedupe: **PASS**.

## Gate de profundidad

El candidato generado tiene aproximadamente **914 palabras útiles de cuerpo**, con contexto, cambio relevante, impacto empresarial, permisos, evaluaciones, métricas, casos iniciales, criterio NexOps, pasos concretos y fuentes.

No se generó contenido para completar un mínimo artificial. El tema soporta la profundidad de una pieza de `actualidad` sin relleno genérico.

Gate de profundidad: **PASS**.

## Decisión final

**PUBLISHABLE_CANDIDATE — 96/100**

Candidato seleccionado:

**“Los agentes de IA ya entraron en producción: el problema ahora es controlarlos bien”**

Se reemplazó el borrador corto anterior de `docs/radar-dry-run/candidate-v1.json` por una versión completa compatible con el contrato vigente de esta rama.

Este dry-run no escribe en `src/data/news/`, no publica, no abre PR, no hace merge y no despliega manualmente.