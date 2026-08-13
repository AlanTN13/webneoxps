# NexOps Content Destination V1

## Arquitectura

La web no busca, puntúa, agenda ni genera contenido. El Radar/editor vive fuera de este repo.

Flujo aprobado:

`Radar externo -> JSON normalizado -> npm run news:add -- candidate.json -> npm run news:validate -> commit -> Vercel`

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

### Campos opcionales de presentación

- `coverImage`: ruta local o URL autorizada. Si falta, la UI usa fallback branded.
- `relatedSlugs`: slugs sugeridos para contenido relacionado.
- `cta: { "label": "...", "href": "/servicios/..." }`.

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

Los 13 posts históricos migrados desde Sanity conservan sus slugs y fuentes existentes. Una colisión histórica de `sourceUrl` entre dos piezas legacy se mantiene como compatibilidad; una pieza nueva que repita una fuente existente se rechaza.

## Arquitectura editorial

`contentPurpose` es la clasificación principal y responde para qué se publica: `seo` (que nos encuentren), `actualidad` (traducir cambios), `criterio` (mostrar cómo pensamos) y `caso` (visualizar una solución). Los labels públicos son **Guías y problemas**, **Actualidad aplicada**, **Criterio NexOps** y **Casos y aplicaciones**.

`contentType` sigue describiendo la forma (`actualidad | guia | analisis | caso`) y `territory` el área de NexOps. No son dimensiones intercambiables.

Compatibilidad: `contentPurpose` puede faltar sólo cuando existe `legacySanityId`. Los 13 migrados no se clasifican por inferencia porque hacerlo sin revisión editorial sería dudoso. Todo contenido nuevo, manual o del Radar, debe declararlo.

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
- breadcrumbs JSON-LD;
- `sitemap.xml`;
- `robots.txt`.

`vercel.json` entrega primero esos HTML estáticos para Noticias y mantiene el fallback SPA para el resto del sitio.

## Imágenes legacy

Las noticias migradas conservan las URLs históricas de imágenes que estaban alojadas en el CDN de Sanity para evitar pérdida de contenido. La aplicación ya no usa Sanity como CMS, API, SDK ni dependencia de runtime. Contenido nuevo no debe reutilizar automáticamente imágenes de medios externos.
