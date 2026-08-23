# NexOps Content Engine + Radar V3

## Arquitectura

La web no busca, puntúa, agenda ni genera contenido. El Radar/editor vive fuera de este repo.

Flujo autónomo aprobado:

`Radar externo -> decision.json + PR de handoff no-draft -> materialización atómica -> gates -> checks verdes -> merge -> Vercel production READY -> URL/OG verificados`

Alan no aprueba nota por nota. Una corrida `PUBLICATION` válida se publica sin intervención humana; el PR se conserva como registro auditable y nunca se hace push directo a `main`. `npm run news:run -- decision.json --commit` sigue siendo el primitivo local de materialización, pero el punto de entrada operativo completo es `.github/workflows/radar-v3-publication.yml` mediante `npm run radar:v3`.

El PR que incorpora Radar V3 es la única revisión manual de esta política. El workflow no debe ejecutarse autónomamente hasta que esa implementación esté mergeada en `main`.

La decisión externa tiene una de estas formas:

```json
{
  "outcome": "NO_PUBLICATION",
  "engineRunId": "radar-2026-08-24-001",
  "timestamp": "2026-08-24T12:00:00.000Z",
  "title": "Actualización menor de una plataforma CRM",
  "topic": "Cambio de interfaz sin impacto operativo comprobable",
  "source": { "name": "Documentación oficial", "url": "https://example.com/update" },
  "scoreTotal": 61,
  "scoreBreakdown": [
    { "criterion": "relevance", "score": 72 },
    { "criterion": "novelty", "score": 41 },
    { "criterion": "editorial-fit", "score": 68 }
  ],
  "policyVersion": "radar-v3.1",
  "reason": "No hubo candidato que superara los gates editoriales externos.",
  "topicFingerprint": "crm:product-update:minor-ui",
  "editorialMetadata": { "contentType": "actualidad", "category": "crm" },
  "assetReference": null
}
```

```json
{
  "outcome": "PUBLICATION",
  "engineRunId": "radar-2026-08-24-002",
  "article": "./candidate.json",
  "coverAsset": "./cover.png",
  "gateReport": {
    "engineThreshold": 85,
    "sourceVerified": true,
    "rightsVerified": true,
    "coverSemantic": true,
    "coverResponsive": true,
    "clientClaimsAuthorizedOrAbsent": true,
    "noCriticalWarnings": true,
    "criticalWarnings": []
  }
}
```

Las rutas se resuelven desde el archivo de decisión. `NO_PUBLICATION` termina sin crear rama de contenido ni PR y sin mutar el corpus público; antes de cerrar debe persistir su proyección privada mediante el canal durable descripto abajo. `PUBLICATION` valida contrato, threshold, attestations editoriales y dedupe antes de escribir. Exige portada aprobada por el contrato visual, materializa artículo+asset con rollback ante fallos, ejecuta `news:validate`, `news:audit`, tests, lint, build/SEO y `git diff --cached --check`, y recién entonces crea el commit atómico.

`gateReport` es la constancia estructurada del Radar externo. Todos sus flags deben ser `true`, `criticalWarnings` debe estar vacío y `article.engineScore` debe alcanzar `engineThreshold`. La web sigue sin calcular el score: verifica que la decisión externa haya declarado y superado el threshold vigente.

## Historial durable de `NO_PUBLICATION`

El store primario es un **repositorio privado dedicado**, distinto de `webneoxps`. Su repo y rama se inyectan por configuración; cada corrida crea allí de forma atómica e inmutable:

```text
refs/heads/<RADAR_HISTORY_BRANCH>
└── no-publication/<engineRunId>.json
```

No se abre PR, no se escribe en `src/data/news` y ningún registro o artifact con datos rechazados queda en el repositorio público. La primera corrida crea la rama privada como root commit; las siguientes agregan commits con actualización optimista. Un retry idéntico es idempotente y un mismo `engineRunId` con contenido distinto falla sin sobrescribir el registro.

El core considera `NO_PUBLICATION` cerrado únicamente después de que `persistNoPublication()` confirma el store durable. Si falta el adapter o falla la escritura, el outcome final es `FAILED`, no un falso `NO_PUBLICATION` exitoso.

El Radar externo envía una `repository_dispatch` de tipo `radar_no_publication`. El workflow confiable `.github/workflows/radar-v3-no-publication.yml` valida y sanitiza `client_payload` antes de escribir en el store:

```json
{
  "event_type": "radar_no_publication",
  "client_payload": {
    "outcome": "NO_PUBLICATION",
    "engineRunId": "radar-2026-08-24-001",
    "timestamp": "2026-08-24T12:00:00.000Z",
    "title": "Actualización menor de una plataforma CRM",
    "topic": "Cambio de interfaz sin impacto operativo comprobable",
    "source": { "name": "Documentación oficial", "url": "https://example.com/update" },
    "scoreTotal": 61,
    "scoreBreakdown": [
      { "criterion": "relevance", "score": 72 },
      { "criterion": "novelty", "score": 41 },
      { "criterion": "editorial-fit", "score": 68 }
    ],
    "policyVersion": "radar-v3.1",
    "reason": "No supera el umbral editorial por baja novedad.",
    "topicFingerprint": "crm:product-update:minor-ui",
    "editorialMetadata": {
      "contentType": "actualidad",
      "contentPurpose": "actualidad",
      "territory": "crm-automatizacion-comercial",
      "category": "crm",
      "primaryEntity": "Plataforma CRM",
      "visualType": "product-interface"
    },
    "assetReference": {
      "kind": "official-product-reference",
      "reference": "https://example.com/update/cover.png",
      "source": "Documentación oficial",
      "credit": "Referencia evaluada; no publicada."
    }
  }
}
```

La identidad GitHub autorizada del Radar llama:

```bash
gh api repos/AlanTN13/webneoxps/dispatches --method POST --input no-publication-dispatch.json
```

La entrega HTTP `204` sólo confirma que GitHub aceptó el evento. La corrida externa debe comprobar que el workflow `Radar V3 NO_PUBLICATION History` terminó en `success`; recién entonces puede declarar persistido el outcome. El run público usa un nombre genérico y no imprime ni sube como artifact el candidato, fuente, scores, fingerprint o metadata.

### Consulta

La consulta requiere credenciales de lectura sobre el store privado:

```bash
export RADAR_HISTORY_REPOSITORY="<owner/repo-privado>"
export RADAR_HISTORY_BRANCH="<rama-historial>"
export GH_TOKEN="<token-read-only>"
```

Lista completa:

```bash
npm run radar:v3:history -- --list
```

Una corrida:

```bash
npm run radar:v3:history -- radar-2026-08-24-001
```

También puede consultarse directamente con la API Git de GitHub sobre el repo privado y `refs/heads/$RADAR_HISTORY_BRANCH`. La lectura falla si falta cualquiera de las tres variables.

### Proyección privada y protección de know-how

El store privado conserva: `engineRunId`, timestamp, outcome, título, tema, fuente, score total, breakdown por alias normalizado de criterio, versión de política, motivo de rechazo, `topicFingerprint`, metadata editorial permitida y referencia/crédito del asset cuando existió.

No se persiste el payload interno completo. El schema usa allowlists cerradas y rechaza campos desconocidos o sensibles: pesos, thresholds, fórmulas, prompts, razonamiento, notas de investigación, configuración de modelos e instrucciones. El breakdown admite sólo `{ criterion, score }`: no pesos ni reglas de cálculo. También se rechazan patrones de credenciales y URLs firmadas. `webneoxps` contiene únicamente el motor, el contrato y el workflow; los registros viven fuera del repo público.

## Handoff operativo del Radar externo

`NO_PUBLICATION` se persiste mediante `repository_dispatch` y termina antes de crear rama de contenido o PR. Sólo `PUBLICATION` usa una rama efímera creada desde el `main` vigente:

```text
radar/<engineRunId>
└── .radar/runs/<engineRunId>/
    ├── decision.json
    ├── candidate.json
    └── cover.png
```

La rama de entrada sólo puede contener ese bundle. El Radar externo abre inmediatamente un PR **no-draft** contra `main` usando su identidad GitHub autorizada. Ese PR es el sobre trazable de handoff, no una solicitud de aprobación humana: `pull_request_target` dispara Radar V3 desde el workflow confiable de `main`.

```bash
gh pr create \
  --base main \
  --head "radar/<engineRunId>" \
  --title "content: <título>" \
  --body "Radar V3 PUBLICATION · <engineRunId>"
```

El workflow nunca hace checkout ni ejecuta código del PR: usa exclusivamente el SHA confiable de `main`, inspecciona el diff remoto y descarga el bundle como datos desde el SHA inmutable del handoff. Rechaza forks, drafts, symlinks, archivos fuera de la corrida y bundles mayores a 4 archivos/20 MB. En `PUBLICATION`, el commit generado reemplaza la rama efímera mediante `force-with-lease` ligado al SHA original, elimina el bundle y deja como diff neto únicamente artículo + portada. Una rama atrasada respecto de `main`, otro PR Radar abierto, una modificación concurrente de la rama o un cambio de `main` durante la corrida hacen fallar cerrado y obligan a decidir nuevamente sobre el corpus vigente.

## Gates y merge autónomo

El PR de handoff debe existir **no-draft** contra `main`. Radar V3 lo actualiza con el commit materializado, espera su rollup real, requiere como mínimo `validate` y `Vercel`, y rechaza cualquier otro check informado en estado fallido. El propio workflow en curso se excluye para evitar un deadlock.

Antes de mergear vuelve a comprobar que `main` sea el mismo SHA usado en preflight. Sólo entonces ejecuta squash merge mediante GitHub; no usa push directo a `main`, comentario `aprobado`, review humana ni auto-merge anticipado. Si un gate local, editorial, de CI o preview falla, el PR no se mergea y la corrida queda `FAILED`.

## Gate post-producción

Después del merge se espera el status `Vercel` asociado al nuevo SHA de `main`. `success` se registra como deployment `target=production`, `state=READY`, junto con el deployment ID extraído del enlace de Vercel. Ese status por sí solo no alcanza: la corrida verifica además en `https://www.nexopstech.com` que:

- `/noticias/<slug>` responda `200`;
- `og:url` coincida con la URL canónica;
- `og:title` coincida con `seoTitle`;
- `og:image` coincida con la portada declarada;
- la portada pública responda como imagen.

Sólo después de esas verificaciones la corrida se registra como `SUCCESS`. Un status `failure/error`, un timeout o una inconsistencia de URL/OG se considera fallo de producción.

## Trazabilidad y rollback

Cada workflow de `PUBLICATION` escribe `radar-v3-result.json`, lo conserva 90 días como artifact y resume el resultado en GitHub Actions. El PR recibe un comentario final con `engineRunId`, commit, merge SHA, deployment ID/estado, URL pública y rollback. `NO_PUBLICATION` no genera artifacts públicos con datos editoriales.

Antes del merge se registra el deployment Vercel vigente. Si el merge ocurrió pero producción no supera el gate, Radar V3:

1. no declara éxito;
2. crea `radar/rollback-<engineRunId>-<sha>` desde el `main` fallido;
3. revierte el merge en un commit nuevo;
4. publica esa rama y deja un enlace de comparación listo para abrir el PR de rollback, que **no** se mergea automáticamente;
5. registra el deployment anterior y el comando `vercel rollback <deploymentId>` para intervención técnica.

El rollback es deliberadamente humano porque ocurre sólo cuando la automatización ya modificó `main` y el estado de producción es incierto.

## Configuración única del repositorio

Para que futuras notas funcionen sin aprobación manual:

- el Radar externo debe poder crear el PR de handoff con su identidad GitHub autorizada; GitHub Actions no necesita permiso global para crear o aprobar PRs;
- el workflow recibe sólo permisos explícitos para actualizar la rama, comentar y mergear el PR después de los gates;
- `main` no debe exigir una review humana para los PR del Radar; los gates obligatorios son técnicos/editoriales automáticos;
- la integración Git de Vercel debe mantener `main` como Production Branch y reportar el status `Vercel`;
- el dominio productivo esperado es `https://www.nexopstech.com` (`RADAR_PRODUCTION_ORIGIN` permite cambiarlo);
- nunca se agregan tokens de Vercel, OpenAI ni modelos al repo para este flujo.

Para el historial privado de rechazados, el repositorio público configura:

- secret `RADAR_HISTORY_TOKEN`: token fino o token de GitHub App limitado al repositorio privado, con `Contents: write`;
- secret `RADAR_HISTORY_REPOSITORY`: destino privado en formato `owner/repo`;
- variable `RADAR_HISTORY_BRANCH`: rama append-only del historial.

El repositorio privado debe inicializarse una vez —por ejemplo, con su rama default y un README— para que GitHub permita crear la referencia del historial. La rama configurada puede no existir: el adapter la crea con el primer root commit.

No hay valores por defecto para esos tres campos. Antes de cada lectura o escritura el adapter consulta metadata del destino y exige `private=true` y `visibility=private`. Si falta configuración, el destino no es privado o la API no confirma la escritura, el core termina `FAILED`. Para consultas humanas se recomienda otro token con sólo `Contents: read`.

`concurrency: radar-v3-production` serializa corridas: nunca hay dos publicaciones intentando llegar a producción a la vez.

Cada pieza publicada vive en `src/data/news/<slug>.json`. El frontend la incorpora en build y mantiene las URLs públicas `/noticias` y `/noticias/:slug`.

## Contrato JSON

### Campos requeridos

- `title`: título editorial.
- `slug`: minúsculas, números y guiones para contenido nuevo.
- `contentType`: `actualidad | guia | analisis | caso`.
- `contentPurpose`: `seo | actualidad | criterio | caso`. Es obligatorio para contenido nuevo.
- `category`: categoría editorial.
- `publishedAt`: fecha ISO.
- `excerpt`: bajada; máximo 280 caracteres.
- `seoTitle`: entre 20 y 70 caracteres.
- `metaDescription`: entre 70 y 180 caracteres.
- `content`: array no vacío de bloques simples.

### Metadata recomendada para contenido del Radar

- `territory`: `automatizacion-procesos | ia-aplicada-empresas | crm-automatizacion-comercial | data-analytics`.
- `topicFingerprint`: fingerprint estable del tema.
- `engineRunId`: ID de la corrida externa.
- `engineScore`: entero 0-100 calculado fuera de la web.
- `generatedByEngine`: booleano.
- `primaryKeyword`.
- `searchIntent`.

Cuando `generatedByEngine` es `true`, el Radar debe enviar `topicFingerprint`, `engineRunId` y `engineScore`. La web valida esos datos, pero no decide thresholds ni ejecuta scoring editorial.

### Fuentes

Puede usarse una fuente principal:

- `sourceName`
- `sourceUrl`

o múltiples fuentes:

- `sources: [{ "name": "...", "url": "https://..." }]`

`actualidad` requiere al menos una fuente verificable.

### Contrato editorial de portada

Toda publicación nueva debe declarar:

- `visualType`: tipo editorial admitido por `news-image-policy.mjs` (`product-interface`, `process-diagram`, `data-visualization`, `contextual-photo`, etc.).
- `primaryEntity`: entidad, producto, proceso o idea que protagoniza la imagen.
- `secondaryEntities`: entidades secundarias opcionales.
- `visualSubject`: descripción concreta de lo que la portada comunica sin depender del título.
- `assetSource`: procedencia controlada (`nexops-original`, `official-product-reference`, `licensed-photo`, `generated-original` o `hybrid-editorial`).
- `assetCredit`: crédito o trazabilidad editorial.
- `coverImage` y `ogImage`: ruta local bajo `/assets/insights/` o URL HTTPS.
- `coverAlt`: alternativa accesible.
- `coverWidth` y `coverHeight`: dimensiones reales; mínimo 1200×630 y relación landscape entre 1.5:1 y 2.1:1.
- `coverFocus.mobile` y `coverFocus.desktop`: foco responsive expresado con dos porcentajes.

La política verifica metadata, archivo local, dimensiones reales, orientación, unicidad y OG. El fallback branded existe sólo como resiliencia ante un error de carga; no vuelve opcional la portada del contrato editorial.

### Campos opcionales de presentación

- `relatedSlugs`: slugs sugeridos para contenido relacionado.
- `cta: { "label": "...", "href": "/servicios/..." }`.

No se declara `readingTime` en el JSON. La web lo calcula desde `content` a 220 palabras por minuto, redondea hacia arriba y aplica un mínimo de un minuto. Cuenta texto visible de párrafos, headings, listas, quotes, links y captions; no cuenta título, excerpt, SEO, fuentes, URLs, CTA ni fingerprints.

## Bloques de contenido

No se usa Portable Text ni HTML arbitrario.

- párrafo: `{ "type": "paragraph", "text": "..." }`
- heading: `{ "type": "heading", "level": 2, "text": "..." }` (`level` 2 o 3)
- lista: `{ "type": "list", "items": ["..."], "ordered": false }`
- quote: `{ "type": "quote", "text": "..." }`
- link: `{ "type": "link", "text": "...", "href": "/servicios/..." }`
- image: `{ "type": "image", "src": "/imagen.webp", "alt": "...", "caption": "..." }`

## Ejemplo válido

```json
{
  "title": "Cómo automatizar el seguimiento de leads sin perder trazabilidad",
  "slug": "automatizar-seguimiento-leads",
  "contentType": "guia",
  "contentPurpose": "seo",
  "territory": "crm-automatizacion-comercial",
  "category": "crm",
  "publishedAt": "2026-08-13",
  "excerpt": "Una guía práctica para ordenar el seguimiento comercial y reducir tareas manuales sin perder control del proceso.",
  "seoTitle": "Cómo automatizar el seguimiento de leads en tu empresa",
  "metaDescription": "Qué automatizar en el seguimiento de leads, qué señales mirar y cómo mantener trazabilidad comercial sin sumar tareas manuales al equipo.",
  "primaryKeyword": "automatizar seguimiento de leads",
  "searchIntent": "informacional-comercial",
  "topicFingerprint": "crm:seguimiento-leads:automatizacion",
  "engineScore": 91,
  "generatedByEngine": true,
  "engineRunId": "radar-2026-08-13-001",
  "visualType": "process-diagram",
  "primaryEntity": "Seguimiento automático de leads",
  "secondaryEntities": ["CRM", "Próxima acción"],
  "visualSubject": "Lead que entra al CRM y avanza por un circuito trazable de seguimiento.",
  "assetSource": "nexops-original",
  "assetCredit": "Diagrama editorial original NexOps.",
  "coverImage": "/assets/insights/automatizar-seguimiento-leads.png",
  "ogImage": "/assets/insights/automatizar-seguimiento-leads.png",
  "coverAlt": "CRM conectado con un flujo automático de seguimiento de leads.",
  "coverWidth": 1600,
  "coverHeight": 900,
  "coverFocus": { "mobile": "50% 50%", "desktop": "50% 50%" },
  "content": [
    {
      "type": "paragraph",
      "text": "Automatizar el seguimiento no significa perder control: significa definir qué evento dispara cada próximo paso y qué información debe quedar registrada."
    },
    {
      "type": "heading",
      "level": 2,
      "text": "Qué conviene automatizar primero"
    },
    {
      "type": "list",
      "items": [
        "Asignación inicial del lead.",
        "Recordatorios por falta de respuesta.",
        "Registro de actividad y próxima acción."
      ]
    },
    {
      "type": "link",
      "text": "Ver integraciones de sistemas",
      "href": "/servicios/software-integrations"
    }
  ],
  "cta": {
    "label": "Ver integraciones de sistemas",
    "href": "/servicios/software-integrations"
  }
}
```

## Alta segura e idempotencia

```bash
npm run news:add -- /ruta/candidate.json
npm run news:validate
npm run news:test
```

`news:add` valida antes de escribir y crea el archivo final con escritura exclusiva. Un reintento de la misma pieza se rechaza sin sobrescribir.

El dedupe compara como mínimo:

- `slug`
- `sourceUrl`
- `engineRunId`
- `topicFingerprint`

Los cuatro posts reconstruidos que provienen de Sanity conservan `legacySanityId` como trazabilidad, pero cumplen el contrato editorial actual completo. Una pieza nueva que repita una fuente existente se rechaza.

## Arquitectura editorial

`contentPurpose` es la clasificación principal y responde para qué se publica: `seo` (que nos encuentren), `actualidad` (traducir cambios), `criterio` (mostrar cómo pensamos) y `caso` (visualizar una solución). Los labels públicos son **Guías y problemas**, **Actualidad aplicada**, **Criterio NexOps** y **Casos y aplicaciones**.

`contentType` sigue describiendo la forma (`actualidad | guia | analisis | caso`) y `territory` el área de NexOps. No son dimensiones intercambiables.

Compatibilidad: el validador todavía admite ausencia de `contentPurpose` cuando existe `legacySanityId`, pero el corpus activo ya no depende de esa excepción. Todo contenido actual, manual o del Radar, debe declararlo.

## Contrato del Radar externo

- SEO: `keyword -> intención -> problema -> servicio`. Si no puede declarar los cuatro, no genera.
- Actualidad: `cambio externo -> impacto empresarial`. Si no responde “¿qué cambia para una empresa?”, no genera.
- Criterio: nace de una postura, aprendizaje o principio NexOps; no requiere noticia.
- Casos: `problema -> diseño/flujo -> automatización -> resultado`; puede ser patrón realista y nunca debe presentarse como cliente real sin autorización.

La web sólo valida el resultado. No busca, puntúa, genera ni agenda.

## SEO

El build genera:

- HTML estático para `/noticias`;
- HTML estático por `/noticias/<slug>`;
- title y meta description por pieza;
- canonical;
- Open Graph y Twitter metadata;
- `NewsArticle` o `BlogPosting` JSON-LD;
- Publisher NexOps;
- fecha y citations;
- tiempo estimado como `timeRequired`;
- breadcrumbs JSON-LD;
- `sitemap.xml`;
- `robots.txt`.

`vercel.json` entrega primero esos HTML estáticos para Noticias y mantiene el fallback SPA para el resto del sitio.

## Portadas

Todo el corpus activo usa portadas locales registradas en `docs/insights-cover-sources.md`. La aplicación no depende del CDN de Sanity ni usa Sanity como CMS, API, SDK o dependencia de runtime. Contenido futuro debe validar origen y licencia antes de incorporar un asset.

### Directiva visual obligatoria del Radar

La portada se selecciona en este orden: **entidad → producto/interfaz → diagrama/dato/flujo → fotografía contextual**. La fotografía es una alternativa editorial, no el formato obligatorio.

- Sin el título de la card debe poder inferirse el tema mirando la portada.
- No pasa el gate `foto genérica + logo/etiqueta`: la composición completa debe construirse alrededor del protagonista.
- Marcas y productos usan su universo reconocible sin alterar logos ni insinuar partnership.
- Operación, CRM, automatización y data se representan con interfaces, pipelines, dashboards o sistemas concretos.
- Los diagramas deben comunicar la idea central; no funcionar como decoración abstracta.
- Se mantiene un sistema común NexOps —navy/violeta, aire, proporción y escala— sin reemplazar el contenido específico.
- Cada asset es único, landscape desde origen y se revisa en destacado, card, detalle y OG, tanto desktop como mobile.
- La portada no incluye el título del artículo, fecha, propósito, territorio ni excerpt. El texto interno se limita a labels propios de la interfaz o diagrama.

Una publicación nueva no queda lista sólo porque el contenido y CI estén verdes: la portada también debe superar el gate semántico y responsive.
