# NexOps Content Destination V1

## Arquitectura

La web no busca, puntúa, agenda ni genera contenido. El Radar/editor vive fuera de este repo.

Flujo aprobado:

`Radar externo -> JSON normalizado -> npm run news:add -- candidate.json -> npm run news:validate -> commit -> Vercel`

Para autonomía limitada, el punto de entrada operativo es `npm run news:run -- decision.json --commit`. La ejecución debe hacerse sobre una rama limpia y luego subir ese único commit para revisión/merge. No hace polling, no publica directamente y no requiere credenciales editoriales nuevas.

La decisión externa tiene una de estas formas:

```json
{ "outcome": "NO_PUBLICATION", "reason": "No hubo candidato que supere los gates editoriales externos." }
```

```json
{
  "outcome": "PUBLICATION",
  "article": "./candidate.json",
  "coverAsset": "./cover.png"
}
```

Las rutas se resuelven desde el archivo de decisión. `NO_PUBLICATION` termina exitosamente sin mutar el corpus. `PUBLICATION` valida el contrato y dedupe antes de escribir, exige que `coverImage` apunte a `/assets/insights/<archivo>`, materializa artículo+asset con rollback ante fallos, ejecuta `news:validate`, tests, lint, build y `git diff --check`, y recién entonces crea un commit atómico con ambos archivos. Un retry se rechaza antes de sobrescribir. Si un gate falla, elimina los dos destinos y deja el worktree recuperable.

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
