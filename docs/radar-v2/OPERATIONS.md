# Radar Autónomo V2 — Operación weekday

## Estado

Fase operativa limitada. El Radar puede preparar como máximo una publicación por corrida y llegar hasta PR + preview, pero no puede mergear `main` ni desplegar producción por decisión propia.

## Agenda

- lunes a viernes;
- cron GitHub Actions: `15 12 * * 1-5` (~09:15 ART, UTC-3);
- también admite `workflow_dispatch` manual;
- `concurrency` evita corridas simultáneas.

## Backpressure

Sólo puede existir un PR Radar activo a la vez. Si encuentra un PR abierto cuyo head comienza con `radar/` o cuyo título comienza con `[Radar V2]`, la corrida termina en no-op.

## Alcance editorial de esta fase

Carriles habilitados:

- `seo`;
- `criterio`;
- `caso`.

`actualidad` queda deliberadamente cerrada hasta incorporar un recuperador verificable de fuentes primarias en tiempo real. El workflow no debe convertir conocimiento potencialmente desactualizado del modelo en noticia.

Umbral mínimo: `engineScore >= 85`.

El motor lee el corpus activo y el contexto editorial del repo, elige como máximo un candidato y puede decidir `skip` si no encuentra una oportunidad suficientemente buena.

## Guardrails

Antes de crear una rama o PR:

1. dedupe contractual mediante el mismo contrato del Content Engine;
2. heurística adicional de solapamiento semántico por título + keyword;
3. sin clientes, resultados, benchmarks ni hechos externos inventados;
4. `sources: []` mientras actualidad esté cerrada;
5. internal links sólo a slugs activos;
6. portada PNG determinística, 1600×900, 16:9 y <= 1,5 MB;
7. `news:validate`;
8. `news:test`;
9. `lint`;
10. `build` + generación SEO.

Sólo si todos esos gates pasan se crea una rama `radar/<fecha>-<run>-<slug>` y un PR listo para revisión humana.

## IA

La generación usa GitHub Models desde GitHub Actions con el `GITHUB_TOKEN` efímero del runner y permiso mínimo `models: read`. No requiere guardar una API key de IA adicional en el repo.

El workflow consulta el catálogo y prefiere un modelo OpenAI disponible; `RADAR_MODEL` puede fijar uno explícitamente si se necesita.

## Publicación

El workflow tiene prohibido por diseño:

- mergear PRs;
- habilitar auto-merge;
- escribir directamente en `main`;
- promover o desplegar producción.

Vercel puede generar preview mediante su integración Git. El PR incluye el resultado de los gates previos y el Content Engine se vuelve a despachar sobre la rama mediante `workflow_dispatch`.

## Política de crecimiento

Durante esta fase: máximo una pieza por corrida y máximo un PR Radar activo. Después de varias corridas limpias se puede evaluar, por separado, habilitar `actualidad` con fuentes primarias y recién más adelante discutir auto-merge.
