# Páginas internas NexOps — PR #76

## EXECUTION PREFLIGHT

- Rol y superficie: ejecución web de NexOps en `AlanTN13/webneoxps`, rama `codex/home-institucional-milbrands`, PR #76 en borrador. Producción queda fuera.
- Resultado y autorización: el usuario corrigió expresamente el alcance: las referencias de Milbrands son para hacer páginas, no sólo una landing. Solicitó una página pública de Formación en desarrollo.
- Fuentes y revisión: AlanOS `Alan/01_Architecture/Execution_Runtime_Contract.md`, blob `c74478a3d868c5f9dd4bdc91a5414073dc469624`; canon NexOps hasta `ba90b07d028b280118c4428470650de90e3b04eb`; estado de `webneoxps` en `6587344`. Referencias UX/composición: cinco URL de Milbrands aportadas por el usuario. Copia y diseño originales.
- Budget/riesgo: M/T2/R1. Trabajo acotado a páginas comerciales y navegación, con riesgo de afirmar ofertas o prueba social no aprobadas.
- Dentro: Implementación, Consultoría, Experiencia y Formación en desarrollo; navegación y enlaces desde Home; preview y verificación responsive.
- Fuera: Radar, motor editorial, automatizaciones, datos de clientes, cifras/testimonios/logos no validados, oferta de Talento, cursos o inscripciones activas, merge y producción.
- Aceptación: páginas propias accesibles desde menú/Home; valor y recorrido claros, experiencia real anonimizada con estado, Formación correctamente señalizada; links y CTAs funcionales; lint/build/tests y revisión visual desktop/mobile; evidencia en PR.
- Permisos/recuperación: cambios reversibles en rama y PR draft. Conservar rutas anteriores. Revertir commits si la dirección no aprueba.
- STOP/BUDGET_RISK: detener si el canon contradice contenido propuesto, si requiere presentar personas/clientes o resultados sin aval, o si pruebas esenciales fallan sin poder corregirlas.

## EXECUTION RECEIPT

- Código: se sumaron las rutas `/implementacion`, `/consultoria`, `/experiencia` y `/formacion`; navegación editorial y enlaces desde Home. Las rutas previas permanecen disponibles.
- Implementación explica capacidades, diseño, puesta en marcha y adopción; Consultoría empieza por diagnóstico de negocio, procesos y hoja de ruta; Experiencia presenta los diez casos anonimizados de `src/data/cases.js`, tres con mayor desarrollo; Formación se identifica explícitamente como propuesta en desarrollo, sin catálogo ni inscripción.
- Dos imágenes editoriales originales en Implementación y Consultoría, rotuladas como ilustrativas. No representan integrantes, clientes ni instalaciones de NexOps.
- Las referencias de Milbrands informaron patrones de composición, profundidad, segmentación y recorrido. No se reprodujeron textos, cifras, testimonios, identidad visual ni oferta de Talento.
- Verificación local: `npm run lint`, `npm run build`, `npm run site:test` y `npm test` OK (73 pruebas en total). Navegador: cuatro rutas cargan con título y contenido, sin errores de consola ni imágenes rotas; anchos 390, 423, 820 y 1440 px sin desborde horizontal. Menú móvil y navegación Home → Consultoría verificados.
- Capturas: `implementation-desktop.png`, `implementacion-mobile.png`, `consultoria-desktop.png`, `consultoria-mobile.png`, `experiencia-desktop.png`, `experiencia-mobile.png`, `formacion-desktop.png`, `formacion-mobile.png`.
- Alcance de archivos: Home, navegación/footer, rutas, páginas institucionales, imágenes y este receipt. Sin cambios a archivos de Radar, motor editorial ni automatizaciones.
- Preview remota del PR #76: rutas `/implementacion`, `/consultoria`, `/experiencia` y `/formacion` abiertas directamente y verificadas con H1 y contenido final. Las dos imágenes cargan; la página de Experiencia muestra diez casos; sin errores de consola. Check Netlify `SUCCESS` en el commit `945603f`. Capturas `preview-implementacion.png`, `preview-consultoria.png`, `preview-experiencia.png` y `preview-formacion.png`.
- El PR permanece en borrador y no hay merge ni cambio de producción. Gate pendiente: revisión visual/comercial de Alan.

## Knowledge Delta

El nuevo alcance y el estado de revisión quedaron registrados y verificados en [AlanOS `834b44e`](https://github.com/AlanTN13/Alanos/commit/834b44e05f984889f05e7ad3f5d6c01bde756dbf). No se marcó la propuesta como aceptada ni lista para producción.

## Ajuste de navegación pública — 2026-09-28

PATCH MODE / EXECUTION PREFLIGHT

- Rol y superficie: Web NexOps, mismo PR #76 en draft; checkout limpio en `2c96a0e`.
- Resultado y autorización: Alan pidió reemplazar el rótulo público «Radar» por uno más atractivo y dejar Formación desarrollada, pero apagada del frontend.
- Contexto: AlanOS `Execution_Runtime_Contract.md` blob `c74478a`; `NexOps_Decisiones.md` en `834b44e`; código y preview del PR #76 en `2c96a0e`.
- Tamaño/tipo/riesgo: S / T1 / R1. Corrección de navegación y disponibilidad pública reversible.
- Baseline a preservar: Home y tres páginas comerciales visibles; la página de Formación conserva su código; `/noticias` y Radar interno conservan funcionamiento.
- Delta y superficie permitida: rótulos públicos de la entrada editorial; enlaces de header/footer/Home, etiqueta visible de `/noticias`; desactivar la ruta y enlaces públicos de Formación.
- Congelado: contenido/catálogo de Formación, artículos y motor editorial, automatizaciones, rutas internas `/radar/*`, producción, diseño general y páginas comerciales.
- Aceptación/validación: ningún enlace público a Formación; `/formacion` no muestra la página y vuelve al inicio; nuevo rótulo conduce a `/noticias`; controles de sitio y smoke visual focalizado desktop/mobile; preview del PR.
- Permisos/rollback: sólo branch/preview, sin merge. Revertir el commit si la revisión comercial pide otro naming.
- STOP/BUDGET_RISK: si el cambio exige renombrar el producto Radar interno o tocar el motor editorial, detener la ampliación y conservar el límite.

EXECUTION RECEIPT

- Rótulo público elegido: «Ideas que impulsan». Lleva a la misma ruta `/noticias`; se ajustaron menú desktop/mobile, footer y sección de Home, más la etiqueta visual y los rótulos de navegación del índice y detalle de artículos. Radar conserva su nombre y funcionamiento internos.
- Formación sigue implementada en `InstitutionalPages.jsx`, pero fue retirada de la navegación y la ruta `/formacion` redirige a `/`. No se borró su contenido.
- `npm run lint`, `npm run site:test` (6 pruebas) y `npm run build`: PASS. Smoke en build local: menú y footer sin enlaces de Formación, `/formacion` vuelve a Home, el nuevo rótulo abre `/noticias` con contenido, sin errores de consola ni desborde a 390/1280 px. Captura: `navigation-mobile-menu.png`.
- Preview remota del PR: en `0972580`, `/formacion` redirige a Home, sin enlace visible a Formación; `/noticias` presenta «Ideas que impulsan» en menú, encabezado y footer, y «Todas las ideas» en el listado. Un detalle de artículo presenta «Volver a Ideas que impulsan» e «Ideas relacionadas». Captura de la navegación: `navigation-preview.png`. Check Netlify SUCCESS, deploy `6abaa46bfce6df0008ca72b2`. Sin merge ni producción.
- Knowledge Delta registrado y verificado en [AlanOS `b2e3e73`](https://github.com/AlanTN13/Alanos/commit/b2e3e73), con el límite de Radar y la corrección de la decisión anterior sobre Formación. El feedback comercial de páginas sigue pendiente.
