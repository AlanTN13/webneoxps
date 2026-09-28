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

Pendiente: registrar en AlanOS el estado material del PR, sin convertir la propuesta en decisión aprobada.
