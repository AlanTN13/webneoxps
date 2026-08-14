# ENG-PILOT-01 — Radar V2 autonomía limitada

Estado: DIRECTOR_READY
Delivery Budget: M
Origen: Director NexOps
Issue de contrato completo: #13

## Resultado
Cerrar el gap técnico mínimo entre el canary ya mergeado y `AUTONOMOUS_LIMITED_READY`, sin ampliar arquitectura.

## Estado de partida
- `main` contiene el canary aprobado de PR #12.
- Arquitectura vigente: Git-first.
- La web es destino; Radar/editor es externo.
- `NO_PUBLICATION` es resultado válido.
- El canary ya probó commit atómico artículo+asset, gates, validaciones e idempotencia de segunda corrida.

## Regla principal
No reconstruir lo que el canary ya resolvió. Inspeccionar sólo contexto técnico necesario y cerrar únicamente gaps reales.

## Puede resolver si falta
- hardening Git-first;
- gates necesarios;
- idempotencia/dedupe;
- protección contra mutaciones parciales;
- `NO_PUBLICATION` sin mutación;
- separación dry-run/canary/autonomous-limited;
- punto de entrada operativo claro;
- tests focalizados.

## Fuera de alcance
- rediseño de Insights/home;
- nueva pieza editorial por demostración;
- reescritura del Content Engine;
- Sanity/CMS/backend editorial;
- Vercel Cron por reflejo;
- OpenAI API dentro de la web;
- refactors generales;
- polling continuo de Git;
- varios agentes por defecto.

## Política de capacidad
Un agente por defecto. Paralelizar sólo con beneficio material y explicarlo. Frenar si no existe una ruta clara a entregable. Preservar capacidad para el resto de la semana.

## Escalar sólo por
- contradicción real de contrato;
- infraestructura/credencial nueva relevante;
- riesgo material de duplicación/corrupción;
- publicación real no controlada durante implementación;
- imposibilidad de autonomía limitada sin cambiar arquitectura.

## Done
`AUTONOMOUS_LIMITED_READY` con evidencia de que:
- `NO_PUBLICATION` no muta corpus;
- publicación válida es atómica e idempotente;
- retries no duplican;
- gates se ejecutan correctamente;
- fallos dejan estado recuperable;
- `news:validate`, tests relevantes, lint, build y diff-check verdes;
- existe punto de entrada exacto para ejecución externa;
- no se agregó infraestructura innecesaria.

Al cerrar, dejar `ENGINEERING UPDATE` en #13 con resultado, producto habilitado, cambios, validaciones, agentes usados, consumo relativo, desperdicio/retrabajo, bloqueos, necesidad de Alan y siguiente gate.

## Higiene
Este archivo existe sólo para disparar el task y darle contexto local a Codex. Eliminarlo de la rama antes de declarar el PR listo, para que no forme parte del producto final.
