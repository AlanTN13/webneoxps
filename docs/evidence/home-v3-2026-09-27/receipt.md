# Home NexOps — revisión visual V3 (2026-09-27)

## Preflight

- Alcance: solo Home del PR #76, sobre `codex/home-institucional-milbrands` (`8358ab5`).
- Canon: contrato de ejecución de AlanOS consultado; aclaración visual verificada en commit `9a7b31a`.
- Estado inicial: checkout limpio; preview de Netlify del PR #76 vigente.
- Corrección aprobada: adaptar patrones de UX/composición de Milbrands con identidad, contenido y sistema visual propios.
- Dirección: hero editorial dividido con presencia humana ilustrativa, navegación más clara para Home, prueba basada en implementaciones verificadas y ritmo visual más variado.
- Límites: sin cifras, retratos, testimonios ni logos inventados; sin cambios a Radar, páginas internas, producción o motor editorial.

## Resultado y verificación

Pendiente de implementación y revisión visual.

### Implementación

- Hero dividido: propuesta de valor a la izquierda, imagen editorial propia a la derecha, CTA único dominante y banda de objetivos debajo.
- Imagen generada para esta pieza y rotulada como ilustrativa. No representa personas ni instalaciones de NexOps.
- Navegación encapsulada y menú de Home orientado al recorrido comercial; las rutas internas mantienen su navegación existente.
- Prueba temprana con tres implementaciones anonimizadas y estado tomado de `src/data/cases.js`. Sin cifras ni resultados comerciales no verificados.
- Footer de Home más claro y ordenado.

### Verificación local

- `npm run lint`: OK.
- `npm run build`: OK.
- `npm test`: 73 pruebas OK.
- Navegador local: carga sin overlay ni errores de consola; ancho 390, 820 y 1440 px sin desborde horizontal.
- Menú mobile: abre, enlaza a `#casos`, cierra y restaura el scroll.
- Capturas: `desktop-hero.png`, `desktop-empresa.png`, `mobile-hero.png`, `mobile-imagen.png`, `mobile-casos.png`, `mobile-footer.png`.

Preview remota del PR #76: verificada tras el push del commit `94d7cf1`. El hero nuevo, la imagen y las tarjetas de experiencia están presentes; la imagen cargó y no hubo errores de consola. Captura: `preview-desktop.png`. El PR sigue draft y no se hizo merge.
