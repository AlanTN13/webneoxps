# NexOps Radar — Dry Run V1

Fecha: 2026-08-13
Modo: manual / no publicación
Rama: `test/radar-nexops-dry-run`

## Regla aplicada

Se evaluaron oportunidades de Actualidad y Evergreen con el criterio aprobado de NexOps: **resultado antes que herramienta; problema real antes que tendencia**.

Pesos:
- Encaje con NexOps: 25
- Utilidad para decisor empresarial: 20
- Potencial SEO / demanda plausible: 20
- Ángulo NexOps no trivial: 15
- Cercanía comercial: 10
- Calidad de fuentes: 5
- Actualidad: 5

Umbral de selección: `>=85` y todos los gates de calidad/fuentes/dedupe aprobados.

## Oportunidades consideradas

### 1. WhatsApp con agentes de IA: qué cambia cuando el canal también califica leads y cierra ventas

Tipo: Actualidad
Territorio: CRM + automatización comercial

Score: **94/100**

Breakdown:
- Encaje NexOps: 25/25
- Utilidad para decisor: 20/20
- Potencial SEO: 18/20
- Ángulo NexOps: 14/15
- Cercanía comercial: 10/10
- Fuentes: 5/5
- Actualidad: 2/5

Por qué entra:
- Ataca un problema real: seguimiento comercial, calificación y continuidad entre WhatsApp, CRM y operación.
- La novedad permite explicar una transición concreta: el canal de mensajería deja de ser sólo conversación y empieza a ejecutar acciones comerciales.
- NexOps puede aportar criterio propio sobre integración, trazabilidad, handoff humano y diseño del proceso.
- No duplica la nota legacy `google-y-openai-aceleran-la-era-de-los-agentes-autonomos`: aquella es general sobre agentes; ésta se enfoca en WhatsApp, CRM, calificación de leads y cierre comercial.

Fuentes:
- Meta, 3 Jun 2026 — https://about.fb.com/news/2026/06/meta-business-agent/
- Reuters, 3 Jun 2026 — https://www.reuters.com/business/meta-launches-enterprise-focused-ai-business-agent-automate-daily-operations-2026-06-03/

Decisión: **SELECTED**

---

### 2. Agentes de IA en empresas: por qué el modelo no alcanza sin proceso, controles y contexto

Tipo: Análisis / Evergreen
Territorio: IA aplicada a empresas

Score: **90/100**

Breakdown:
- Encaje NexOps: 25/25
- Utilidad para decisor: 19/20
- Potencial SEO: 18/20
- Ángulo NexOps: 15/15
- Cercanía comercial: 8/10
- Fuentes: 5/5
- Actualidad: 0/5

Fuentes de apoyo:
- OpenAI Presence — https://openai.com/index/introducing-openai-presence/
- Microsoft — https://blogs.microsoft.com/blog/2026/06/02/ai-alone-wont-change-your-business-the-system-running-it-will/

Motivo de no selección:
- Muy buen evergreen, pero se solapa parcialmente con contenido existente sobre agentes autónomos.
- Menor proximidad comercial inmediata que la oportunidad WhatsApp + CRM.

Decisión: `SAVE_FOR_LATER`

---

### 3. Cómo automatizar el seguimiento de leads sin perder trazabilidad

Tipo: Guía / Evergreen
Territorio: CRM + automatización comercial

Score: **91/100**

Breakdown:
- Encaje NexOps: 25/25
- Utilidad para decisor: 20/20
- Potencial SEO: 20/20
- Ángulo NexOps: 13/15
- Cercanía comercial: 10/10
- Fuentes: 3/5
- Actualidad: 0/5

Motivo de no selección:
- Excelente oportunidad evergreen y debería quedar priorizada para futuras corridas.
- La oportunidad seleccionada permite combinar actualidad con exactamente este problema comercial, evitando publicar dos piezas cercanas en la misma corrida.

Decisión: `SAVE_FOR_LATER`

---

### 4. Google Workspace y agentes personales 24/7: qué tareas conviene delegar y cuáles no

Tipo: Actualidad / Análisis
Territorio: Automatización de procesos

Score: **81/100**

Fuente principal:
- Google Workspace, 19 May 2026 — https://blog.google/products-and-platforms/products/workspace/workspace-updates/

Motivo de rechazo:
- Señal válida, pero demasiado centrada en producto y menos cercana a un problema empresarial concreto que las alternativas superiores.

Decisión: `REJECT`

## Dedupe

Se revisó la colección local existente. No se encontró:
- slug igual a `whatsapp-agentes-ia-crm-leads-ventas`;
- `topicFingerprint` equivalente;
- las URLs fuente de Meta o Reuters usadas por el candidato;
- una pieza centrada específicamente en WhatsApp + CRM + agentes que califican leads y ejecutan acciones comerciales.

Existe contenido general sobre agentes autónomos, pero el ángulo y la intención son suficientemente distintos.

## Decisión final

**PUBLISHABLE_CANDIDATE — score 94/100**

Se generó `candidate-v1.json` únicamente como artefacto de prueba.

No se escribió nada en `src/data/news/`, no se abrió PR y no se publicó contenido.