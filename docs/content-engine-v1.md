# NexOps Content Engine V1

## Flujo

La arquitectura V1 es Git-first:

`radar/editor externo -> JSON -> validación -> commit -> build`

La web sólo valida, renderiza y genera SEO. La búsqueda, investigación, scoring, gates editoriales, backlog y digest pertenecen al orquestador externo.

## Criterio externo

El radar trabaja Actualidad + Evergreen sobre automatización de procesos, IA aplicada a empresas, CRM + automatización comercial y Data & Analytics. El resultado empresarial va antes que la herramienta.

Umbrales editoriales externos: 85–100 publicable si pasa gates, 70–84 oportunidad, menos de 70 descartado. Cero publicaciones es un resultado válido. El orquestador también aplica una publicación máxima por corrida y tres en siete días.

## JSON publicado

Cada insight vive en `src/data/news/<slug>.json`. El nombre debe coincidir con `slug`.

Campos principales: `title`, `slug`, `contentPurpose`, `contentType`, `category`, `publishedAt`, `excerpt`, `content`, `seoTitle`, `metaDescription`. Puede incluir `territory`, `primaryKeyword`, `searchIntent`, fuentes, CTA, relacionados e imagen.

`contentPurpose` (`seo | actualidad | criterio | caso`) explica para qué existe la pieza y organiza los filtros de Insights. `contentType` (`actualidad | guia | analisis | caso`) explica cómo está escrita. `territory` explica sobre qué capacidad de NexOps habla. El corpus activo completo declara las tres dimensiones; `legacySanityId` queda sólo como trazabilidad en cuatro URLs reconstruidas.

Las ocho piezas de definición editorial y las cuatro legacy reconstruidas se publican como JSON reales con `generatedByEngine: false`. Las piezas de actualidad citan fuentes confiables; ninguna inventa score ni run ID.

Metadata externa permitida para auditoría: `engineScore`, `engineRunId`, `topicFingerprint`, `generatedByEngine` y una identidad de origen estable. La web puede almacenar el score pero no lo recalcula.

`content` acepta bloques `paragraph`, `heading`, `list`, `quote`, `link` e `image`.

El tiempo de lectura no forma parte del payload: se calcula automáticamente desde el texto visible de `content` con `Math.ceil(words / 220)` y mínimo de un minuto.

## Operación segura

Dry-run no mutante:

`node scripts/news-check.mjs candidato.json`

Incorporación:

`npm run news:add -- candidato.json`

Validación del corpus:

`npm run news:validate`

Tests:

`npm run news:test`

Un retry no pisa archivos existentes. Slug, source URL, run ID y fingerprint participan del dedupe. Las colisiones históricas legacy de fuente quedan sólo como warning.

## SEO

El build crea HTML estático para `/noticias` y cada `/noticias/:slug`, metadata única, canonical, Open Graph, datos estructurados de artículo, publisher NexOps, fecha, breadcrumbs, sitemap y robots. React sigue siendo la UI y las URLs públicas no cambian.

## Scheduler

V1 no agenda corridas dentro de la web. La periodicidad diaria, cuando se active, vive en el radar externo y termina entregando un JSON validable/commiteable al repo.

## Orígenes del Radar externo

SEO exige keyword, intención, problema y servicio conectado. Actualidad exige un cambio verificable y una respuesta concreta a “qué cambia para una empresa”. Criterio parte de una postura NexOps. Casos parten de un problema operativo y muestran diseño, flujo y resultado. Estos gates están documentados, no implementados en la web.

## V2

Queda preparado el modelo para sumar más adelante el loop `crear -> medir -> aprender -> mejorar` con datos de Search Console, sin bloquear V1.
