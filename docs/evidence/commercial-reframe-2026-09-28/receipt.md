# PR #76 — Arquitectura comercial Ecommerce / Consultoría

## EXECUTION PREFLIGHT

- Rol y superficie real: ejecución de la Web NexOps en `AlanTN13/webneoxps`, rama `codex/home-institucional-milbrands`, PR #76 draft. Sin producción.
- Resultado y autorización: Alan pidió un retrabajo de punta a punta de Home, Ecommerce, Consultoría y Experiencia para hablar desde cómo compra el cliente. El texto pegado en este pedido define aceptación; la preview actual no está aprobada.
- Contexto verificado: AlanOS `a421c03`, contrato `Alan/01_Architecture/Execution_Runtime_Contract.md` blob `c74478a`; decisiones NexOps hasta `a421c03`; `NexOps_Contexto.md`, `NexOps_Cartera_y_Ownership.md` y registros de clientes pertinentes. Repo Web en `06775cf`, checkout limpio y PR draft #76 en ese commit.
- Budget/tipo/riesgo: L/T2/R2 por cuatro páginas públicas y atribución de clientes. Un escritor; QA focalizada durante el cambio e integración final de rutas, responsive, build y preview.
- Dentro: dos puertas comerciales claras, página propia `/ecommerce`, reescritura de `/consultoria`, Home, Experiencia con clientes y trabajos comprobados, navegación y CTAs. `/implementacion` deja de ser entrada y conserva continuidad mediante redirección.
- Fuera: Radar backend/editorial, scoring, automatizaciones, producción, Talento, oferta ficticia de cursos, partnerships/certificaciones no comprobadas, resultados cuantificados o testimonios sin fuente. Formación sigue desarrollada pero oculta según decisión más reciente; el acceso editorial público sigue «Ideas que impulsan».
- Aceptación: el dueño identifica su situación en segundos, entiende Ecommerce/Consultoría, ve evidencia real, Experiencia sigue cliente → problema → trabajo → cambio y la composición evita repetición de plantillas. Enlaces/CTAs funcionales y preview desktop/mobile revisable.
- Permisos/recuperación: rama y PR draft, sin merge. Los cambios son reversibles por commit. No usar logos de terceros salvo material disponible y verificado.
- STOP/BUDGET_RISK: detener ampliación si una afirmación depende de resultados, propiedad de logos o mapeo de casos no corroborado; presentar sólo hechos sustentados. No abrir superficies Radar ni producción.

## TECHNICAL SNAPSHOT / DELIVERY DESIGN

- Home: `src/pages/HomePage.jsx` + módulo CSS. Páginas actuales y Formación interna: `InstitutionalPages.jsx` + CSS. Header/footer tienen variante `home`; rutas en `src/main.jsx`.
- Baseline: `/implementacion`, `/consultoria`, `/experiencia`, `/noticias`; `/formacion` redirige a `/`. Casos anonimizados en `src/data/cases.js`. Netlify crea preview automática del PR.
- Diseño: conservar paleta, tipografía, foto editorial ilustrativa y navegación encapsulada; reordenar Home con hero y dos puertas inmediatas; Ecommerce como recorrido por bloqueos reales (canal, conversión, pauta, catálogo, recompra, rentabilidad); Consultoría como recorrido por fricciones operativas; Experiencia con historias atribuidas y estados secundarios.
- Evidencia de cliente: sólo nombre y trabajo inequívoco de AlanOS. No atribuir resultados comerciales no medidos, no simular logos. Material `globaltrip_logo.svg` disponible en repo; los demás nombres se presentan tipográficamente hasta recibir activos.
- Checks: lint, site tests, build, inspección de rutas y CTAs, móvil/desktop, Netlify preview y recibo de PR. Si el diseño no carga o desborda, corregir antes de entregar.

## EXECUTION RECEIPT

- Home reescrita para presentar Ecommerce y Consultoría en hero y bloque de dos puertas inmediatamente posterior, cada una con su CTA. Se sumaron situaciones de compra, experiencia de clientes con nombre, método breve e invitación a contacto.
- `/ecommerce` es una página propia de venta online: problemas reconocibles, decisiones conectadas sobre producto, tienda, marketplaces, pauta, contenido, email, datos, rentabilidad y operación. `/implementacion` redirige a esa página para conservar enlaces anteriores.
- `/consultoria` se reconstruyó desde fricciones comerciales, operativas, de sistemas, datos e IA, con escenarios y entregables condicionados al alcance. `/experiencia` cuenta trabajos de Sommier Magno, OnlySellers, Casa Italia y GlobalTrip como problema → trabajo → cambio; el estado figura en segundo plano. Nombres tipográficos, sin logos o cifras inventados.
- Navegación y pie de página alineados con las dos puertas. Formación permanece desarrollada en código, oculta de la navegación y sin ruta pública; `/formacion` redirige a Home. La entrada editorial pública conserva «Ideas que impulsan». Sin cambios en Radar editorial, scoring o automatizaciones.
- Se ajustó el desplazamiento a anclas para que los enlaces a casos funcionen aun cuando la página de Experiencia carga de forma diferida.
- Validación local: `npm run lint`, `npm run site:test` (6/6) y `npm run build` pasaron. Navegador a 1440 px y 390 px: Home, Ecommerce, Consultoría y Experiencia cargan con H1 correcto y sin desborde horizontal; el menú móvil abre, permite ir a Consultoría y se cierra; el enlace de Home a Sommier Magno llega a `/experiencia#sommier-magno` y desplaza al caso.
- Capturas de revisión en esta carpeta: `home-desktop.png`, `home-mobile.png`, `ecommerce-desktop.png`, `ecommerce-mobile.png`, `consultoria-desktop.png`, `consultoria-mobile.png`, `experiencia-desktop.png`, `experiencia-mobile.png`, `menu-mobile.png`.
- Estado de entrega: implementación `15df41a` publicada en la rama del [PR #76](https://github.com/AlanTN13/webneoxps/pull/76). CI `validate`, Vercel y deploy-preview de Netlify terminaron en PASS. La [preview remota](https://deploy-preview-76--webnexops.netlify.app/) se abrió y se comprobaron Home, `/ecommerce`, `/consultoria` y `/experiencia` con H1 correctos; `/implementacion` redirige a `/ecommerce`, `/formacion` a Home y no hay enlaces visibles a Formación. Consola remota sin errores. PR draft, pendiente de revisión comercial de Alan. Sin merge ni publicación en producción.

## ITERACIÓN DE FUERZA COMERCIAL — EXECUTION PREFLIGHT / PATCH MODE

- Rol/superficie y autorización: entrega en el PR draft #76 existente. Alan pidió explícitamente una pasada focalizada de fuerza comercial, claridad y prueba social sobre Home, Ecommerce, Consultoría y Experiencia, sin rediseño completo.
- Fuente vigente: AlanOS `37195ac`, contrato `Alan/01_Architecture/Execution_Runtime_Contract.md` verificado contra `origin/main` el 2026-09-28; `README_NexOps.md` y última decisión de arquitectura comercial; web `cd75ed9` limpia y PR #76 draft en ese commit.
- Budget/tipo/riesgo: M/T2/R2 por copy comercial público y atribución de clientes. Un escritor; mantener los componentes, layout, header, paleta y rutas actuales.
- Delta permitido: hero y dos puertas de Home, autoridad temprana, problemas/acciones de Ecommerce y Consultoría, relato de casos en Experiencia y ajustes CSS mínimos para legibilidad.
- Congelado: Radar backend/editorial, scoring, automatizaciones, producción, Talento, Formación pública, partnerships/certificaciones, arquitectura visual y rutas ajenas a estas cuatro páginas.
- Aceptación/validación: dos ofertas inequívocas con síntomas y CTA; autoridad sustentada; problemas seguidos de trabajo concreto; casos cliente → problema → trabajo → qué quedó en marcha; lint, tests de sitio, build y un smoke desktop/mobile de las cuatro rutas. Preview Netlify para Alan.
- Permisos/recuperación: sólo commits en la rama draft existente, reversibles por Git. No merge ni producción.
- STOP/BUDGET_RISK: si un logo, métrica o afirmación carece de fuente, usar nombre tipográfico u omitirla. Si la aceptación exige alterar una superficie congelada, detener la expansión.

## ITERACIÓN DE FUERZA COMERCIAL — EXECUTION RECEIPT

- Home: hero más directo; las dos puertas bajo el hero muestran título de comprador, cuatro síntomas y CTA propio. La autoridad sigue inmediatamente después, ahora con tres trabajos verificables y ocho clientes autorizados. Se eliminó el bloque posterior que repetía los mismos síntomas para adelantar los casos.
- Ecommerce: cinco fricciones de venta online, cada una seguida de «Qué hacemos» con una acción concreta. Se mantuvo la oferta de producto, tienda, Mercado Libre, pauta, contenido, email, rentabilidad e integraciones, sin convertirla en inventario técnico.
- Consultoría: seis situaciones reconocibles con respuesta operativa; metodología y posibles entregables siguen después del dolor. Se conservó su hero y la dirección visual.
- Experiencia: hero y casos anclados en trabajos específicos. Cada historia distingue problema, trabajo y qué quedó funcionando o en marcha; el estado sigue secundario. El componente admite una métrica opcional, pero no muestra ninguna hasta contar con evidencia publicable.
- Prueba social: nombres autorizados; el único logo incorporado es el SVG de GlobalTrip ya presente en `public/globaltrip_logo.svg`. No se inventaron cifras, resultados cuantificados, testimonios, premios ni certificaciones.
- Checks locales: `git diff --check`, `npm run lint`, `npm run site:test` (6/6) y `npm run build` PASS. Navegador local a 1440 y 423 px: Home, Ecommerce, Consultoría y Experiencia cargan con H1 correcto y sin desborde horizontal; GlobalTrip SVG carga; cinco fricciones de Ecommerce, seis de Consultoría y cuatro casos de Experiencia visibles. Capturas `commercial-pass-*.png` en esta carpeta muestran las cuatro páginas y los bloques principales desktop/mobile.
- Hallazgo diferido: la prueba social podría ampliarse con otros logos o métricas sólo cuando exista material autorizado y verificable; no es requisito para esta preview.
- Knowledge Delta: esta iteración ajusta lenguaje, prioridad visual y prueba de la arquitectura Ecommerce/Consultoría ya aprobada. No crea una tercera oferta ni cambia Radar, Formación, Talento o el principio de marca.
- Estado de entrega: cambio comercial y capturas publicados en [`e0fa46c`](https://github.com/AlanTN13/webneoxps/commit/e0fa46c8c1482d5cb7fd9aa7ef930642ab6ca2d9) del [PR draft #76](https://github.com/AlanTN13/webneoxps/pull/76). `validate`, Vercel y deploy-preview de Netlify terminaron en PASS. La [preview remota](https://deploy-preview-76--webnexops.netlify.app/) mostró las cuatro rutas con H1 correctos y sin desborde horizontal; el SVG de GlobalTrip cargó, no aparecieron enlaces a Formación y la consola no mostró errores. Pendiente de revisión y aceptación comercial de Alan; sin merge ni producción.

## AJUSTE DEL TEXTO PRINCIPAL DE HOME — PATCH MODE / RECEIPT

- Baseline: PR draft #76 en `fc95e9b`; AlanOS `8c5f3fd` y contrato de ejecución verificados contra `origin/main` el 2026-09-28. El resto de la Home, páginas internas, Radar, Formación y producción quedan congelados.
- Delta autorizado: reemplazar sólo título, subtítulo, línea de respaldo y CTA del hero de Home por el texto entregado por Alan. CTA «Contanos tu caso» enlazado a la sección de contacto existente; las dos puertas y sus CTAs permanecen debajo.
- Validación focalizada: `git diff --check`, `npm run lint` y `npm run build` PASS. Revisión local desktop/mobile: H1, subtítulo, respaldo y CTA visibles, sin desborde horizontal; el CTA llega a `#contacto`. Capturas: `home-header-copy-desktop.jpg` y `home-header-copy-mobile.jpg`.
- Rollback: revertir el commit de este parche. Gate: PR draft y preview para revisión de Alan; no merge ni producción.

## AJUSTE DE LAS DOS PUERTAS DE HOME — PATCH MODE / RECEIPT

- Baseline: PR draft #76 en `cbedc06`; AlanOS `27c179a` verificado contra `origin/main` el 2026-09-28. Se conserva diseño, estructura, rutas y CTA de las dos tarjetas.
- Delta autorizado: usar el texto de la segunda imagen enviada por Alan en Ecommerce y Consultoría. Ecommerce conserva título, síntomas y CTA; cambia el párrafo para vincular crecimiento con margen. Consultoría se enfoca en ecommerce que creció sin operación acorde y reemplaza los cuatro síntomas por pedidos, dependencia manual, sistemas desconectados y rentabilidad por producto/canal.
- Fuera de alcance: hero de Home, páginas internas, Radar, Formación y producción. Reversión: revertir este commit.
- Validación: `git diff --check`, `npm run lint` y `npm run build` PASS. Revisión responsive a 1280 y 390 px: ambas tarjetas contienen el texto y los CTAs sin desborde horizontal ni interno. Captura desktop: `home-doors-copy-desktop.jpg`.
- Gate: preview del PR draft para revisión comercial de Alan; sin merge ni producción.

## COPY «POR QUÉ NEXOPS» — PATCH MODE / PREFLIGHT

- Rol/superficie: actualización puntual del bloque de autoridad de Home en el PR draft #76. Alan autorizó sustituir título y dos párrafos con el texto que entregó.
- Contexto: web `e48d4e0` limpia; AlanOS `41e29ca` y contrato de ejecución verificados contra `origin/main` el 2026-09-28.
- Tamaño/tipo/riesgo: S/T1/R1. Sólo `src/pages/HomePage.jsx` y evidencia del cambio; diseño, clientes, rutas, otras páginas, Radar, automatizaciones y producción congelados.
- Aceptación: texto exacto, lectura correcta en escritorio/móvil, sin desbordes; lint/build y preview de Netlify. Rollback por revert del commit; STOP antes de merge o producción.

## COPY «POR QUÉ NEXOPS» — EXECUTION RECEIPT

- Se sustituyeron sólo el H2 y los dos párrafos de `#nosotros` por el copy entregado por Alan: más de 10 años escalando negocios, equipo multidisciplinario con presencia latinoamericana y pilares de procesos, tecnología y datos aplicados a canales digitales. Se corrigió únicamente la tilde de «Más».
- Los ejemplos y nombres de clientes, la composición, los enlaces y el resto de la Home quedaron intactos.
- `git diff --check`, `npm run lint` y `npm run build` PASS. Inspección en navegador a 1280 y 390 px: texto correcto y sin desborde horizontal. Captura: `home-authority-copy-desktop.jpg`.
- Estado: listo para preview del PR draft #76 y revisión de Alan; sin merge ni producción.

## RETIRO DE «TRABAJO REAL» EN HOME — PATCH MODE / RECEIPT

- Baseline: PR draft #76 en `a4b89c5`; AlanOS `257bd6a` verificado contra `origin/main` el 2026-09-28. Alan pidió retirar de Home el bloque de tres casos y guardar el contenido mientras se decide dónde ubicarlo.
- Delta: se retiraron de `HomePage.jsx` la sección `#casos` y sus datos locales; se eliminaron sólo sus estilos ya sin uso. El texto original quedó preservado en `home-cases-removed.md` para una decisión futura. La página `/experiencia` y sus cuatro historias permanecen intactas; no se eligió una nueva ubicación.
- Fuera de alcance: otros bloques de Home, páginas internas, Radar, automatizaciones y producción. Rollback: revertir este commit.
- Validación local: `git diff --check`, `npm run lint` y `npm run build` PASS. En navegador a 1280 y 390 px, Home pasa directamente de autoridad a método, no contiene «Trabajo real» ni `#casos` y no desborda; `/experiencia` conserva sus cuatro historias. PR draft; sin merge ni producción.

## BLOQUE EDITORIAL DE HOME — PATCH MODE / PREFLIGHT Y RECEIPT

- Rol/superficie: ajuste visual focalizado de Home en el PR draft #76. Alan pidió una sección profesional inspirada en la composición de la referencia de Milbrands. Baseline web `a8c0fb4` y AlanOS `d463b59` verificados el 2026-09-28; contrato de ejecución consultado en `Alan/01_Architecture/Execution_Runtime_Contract.md`.
- Budget/tipo/riesgo: S/T1/R1. Delta permitido: bloque «Ideas que impulsan» en `HomePage.jsx` y su CSS. Resto de Home, páginas internas, Radar, Formación, automatizaciones y producción congelados. Rollback por revert del commit.
- Aceptación: sección con jerarquía editorial propia de NexOps, composición texto/imagen, CTA funcional a `/noticias`, responsive y sin prometer eventos o cursos no definidos. No se implementa una captura de emails sin lista conectada.
- Se reemplazó la franja breve de texto por una sección de mayor presencia visual: título, descripción, CTA, imagen editorial ilustrativa ya existente y sello gráfico de marca. La referencia inspira la composición, sin reutilizar su texto, foto, colores ni formulario.
- Validación: `git diff --check`, `npm run lint` y `npm run build` PASS. Inspección visual local en móvil: texto, CTA, imagen y sello se muestran sin desborde. El código llegó al PR draft #76 en `5a920f8`; checks `validate`, Vercel y Netlify PASS. Se abrió la preview remota y se comprobó que el bloque editorial nuevo aparece con imagen y CTA a `/noticias`. Pendiente de revisión comercial de Alan; sin merge ni producción.

## MOVIMIENTO DEL SELLO EDITORIAL — PATCH MODE / PREFLIGHT Y RECEIPT

- Rol y resultado: ajuste visual del sello «Ideas en acción» en la Home del PR draft #76, pedido por Alan sobre una captura de la preview. Baseline `ae26963`; AlanOS `4d816a5` y contrato de ejecución consultados.
- S/T1/R1. Superficie permitida: markup y estilos del sello dentro de Home. Congelados: resto de Home, páginas internas, Radar, Formación, automatizaciones y producción. Reversión por revert del commit.
- Aceptación: movimiento sutil y continuo, flecha legible, sin desborde y sin animación cuando el usuario prefiere reducir movimiento.
- El texto del sello gira en 16 segundos alrededor de la flecha fija. `prefers-reduced-motion: reduce` lo deja estático. `git diff --check`, lint y build PASS; comprobación visual local en escritorio con el sello dentro de la sección.

## CORRECCIÓN DEL MOVIMIENTO DEL SELLO — PATCH MODE / RECEIPT

- Alan rechazó el giro de las letras al ver la preview: reduce la legibilidad y no da el acabado buscado. Baseline `a8ace65`; se corrige exclusivamente el sello de Home. El resto del PR, Radar, Formación, automatizaciones y producción quedan fuera de alcance.
- Se restauró la orientación fija de «IDEAS / EN ACCIÓN» y la flecha. El movimiento pasa a un aro fino exterior que rota lentamente; `prefers-reduced-motion: reduce` detiene el aro. S/T1/R1, reversible por commit.
- Aceptación: texto siempre legible, giro perceptible pero discreto, sin cambios de posición ni desborde del bloque editorial. Validar lint, build y preview desktop/mobile antes de cerrar.

## PRECISIÓN DE COPY EN EL HERO — PATCH MODE / RECEIPT

- Baseline `10a2376` del PR draft #76 y AlanOS `a524e9f`; contrato de ejecución consultado. Alan pidió cambiar sólo «redes» por «redes sociales» en el subtítulo del hero de Home. S/T1/R0; el resto de Home, páginas internas, Radar, automatizaciones y producción quedan congelados. Reversible por commit.
- Aceptación: frase exacta en preview, sin cambio de composición ni desborde; validar diff, lint y build.

## COPY DEL CIERRE DE HOME — PATCH MODE / RECEIPT

- Baseline `95bea4b` del PR draft #76 y AlanOS `fc3b06c`; contrato de ejecución consultado. Alan pidió reemplazar sólo el rótulo y título del bloque de contacto por «Cómo podemos ayudar a tu negocio» y «¿Dónde está hoy el freno?». S/T1/R0; se conserva párrafo, CTA, estructura y demás páginas. Radar, automatizaciones y producción fuera de alcance; reversible por commit.
- Aceptación: textos pedidos visibles en preview, sin desborde y con CTA intacto; diff, lint y build focalizados.

## EFECTO EN «CÓMO TRABAJAMOS» — PATCH MODE / RECEIPT

- Baseline `137e828` del PR draft #76 y AlanOS `6415814`; contrato de ejecución consultado. Alan pidió un efecto visual llamativo en las cuatro etapas de «Cómo trabajamos». S/T1/R1. Sólo `HomePage.jsx`, su módulo CSS y esta evidencia; congelados los textos, otras secciones, páginas internas, Radar, automatizaciones y producción. Reversible por commit.
- Un observador activa una sola entrada escalonada al llegar la sección a la pantalla: aparecen las etapas y se completan las líneas superiores. Los números ganan un fondo suave; al pasar el cursor la etapa se eleva levemente. Con movimiento reducido, el contenido se presenta sin animación.
- Aceptación y verificación local: cuatro etapas legibles al finalizar el efecto, sin saltos de layout; `git diff --check`, lint y build PASS. Inspección visual en escritorio durante y después de la secuencia. Pendiente de preview remota y revisión de Alan; sin merge ni producción.

## RETIRO DE ETIQUETA EN FOTO DEL HERO — PATCH MODE / RECEIPT

- Baseline `3bb8484` del PR draft #76 y AlanOS `276d11c`; contrato de ejecución consultado. Alan pidió quitar la pastilla visible «Imagen editorial ilustrativa» de la foto principal. S/T1/R0; sólo se retiran ese elemento y su regla CSS. Resto del hero, otras secciones, Radar y producción congelados. Reversible por commit.
- La imagen conserva su texto alternativo descriptivo para accesibilidad. Aceptación: foto sin pastilla, composición y contenido restantes iguales; diff, lint, build y preview.

## RETIRO DE TRES FICHAS EN «POR QUÉ NEXOPS» — PATCH MODE / RECEIPT

- Baseline `110cc9e` del PR draft #76 y AlanOS `f53700c`; contrato de ejecución consultado. Alan señaló las tres fichas de Sommier Magno, Casa Italia y OnlySellers y pidió quitarlas de Home. S/T1/R0. Se elimina sólo ese bloque y sus estilos; permanece la franja «Empresas con las que trabajamos» y la página Experiencia. Radar, automatizaciones y producción fuera de alcance. Reversible por commit.
- Aceptación: el bloque de autoridad pasa de los párrafos a la franja de empresas sin hueco ni fichas; lint, build y preview desktop/mobile.

## LOGOS EN HOME — PATCH MODE / RECEIPT

- Baseline: PR draft #76 en `6482273`; se conserva el bloque «Por qué NexOps», navegación, páginas internas, Radar y producción.
- Delta autorizado: reemplazar nombres tipográficos de la franja de Home por los logos entregados de Kenta, Garnet, OnlySellers, Erway/Sommier Magno y DEXA; conservar GlobalTrip y Punky. Incorporar logos oficiales de Edelvives y Personal; reutilizar el SVG de Newsan ya presente. Erway representa a Sommier Magno, no un cliente adicional. Garnet fue confirmado como cliente por Alan.
- Atribución: Personal y Newsan figuran bajo «Experiencia previa del equipo», separados de los clientes directos de NexOps. No se atribuyen resultados, proyectos o servicios nuevos.
- Validación: `npm run lint` y `npm run build` PASS; inspección visual local de la Home en escritorio: logos completos y filas diferenciadas sin desborde en el bloque oscuro. PR draft y preview siguen como gate comercial, sin merge ni producción.
- Rollback: revertir el commit de este parche.

## WHATSAPP FLOTANTE EN HOME — PATCH MODE / PREFLIGHT Y RECEIPT

- Baseline: PR draft #76 en `2bb2654`; Home desactivaba explícitamente el componente `FloatingWhatsApp` que `Layout` muestra por defecto. Alan pidió restaurarlo.
- Delta: eliminar sólo esa desactivación en Home. Se conserva el componente existente, su número y mensaje configurados, el resto del diseño y las páginas internas.
- Preservado: Radar, motor editorial, automatizaciones y producción. Reversión: revertir este commit.
- Validación focalizada: inspección local y remota de Home en escritorio/móvil; enlace de WhatsApp, posición flotante y ausencia de desborde. Lint y build del PR; preview como gate de revisión, sin merge.

## FRANJA DE TECNOLOGÍAS EN HOME — PATCH MODE / RECEIPT

- Baseline: PR draft #76 en `38fac50`; Alan pidió un bloque visual como la referencia de tarjetas de plataformas.
- Delta: nueva franja oscura entre «Cómo trabajamos» e «Ideas que impulsan», con Meta, Mercado Libre, Tiendanube, Kommo y n8n. El título describe tecnologías de trabajo; no atribuye partnerships ni certificaciones. Las cinco plataformas tienen uso respaldado por los frentes de NexOps en AlanOS.
- Superficies congeladas: páginas internas, Radar, motor editorial, automatizaciones y producción. Rollback: revertir el commit de este parche.
- Validación focalizada: lint y build PASS; inspección visual local de escritorio: tarjetas y títulos legibles, sin desborde. Preview del PR draft como gate comercial, sin merge.

## LIMPIEZA DE RESPALDO EN HERO — PATCH MODE / RECEIPT

- Baseline: PR draft #76 en `2b5ce82`; Alan señaló que la insignia «N ↗» junto a los +10 años no funciona visualmente.
- Delta: retirar únicamente la insignia y su CSS; conservar íntegra la frase de respaldo y el separador del hero. Páginas internas, Radar, automatizaciones y producción congelados.
- Validación focalizada: lint, build, `git diff --check` y revisión visual de Home. Rollback: revertir este commit; preview del PR como gate, sin merge.

## FRANJA ÚNICA DE EMPRESAS — PATCH MODE / RECEIPT

- Baseline: PR draft #76 en `0fd63fb`; Alan pidió una sola franja «Empresas con las que trabajamos» y la eliminación del rótulo «Experiencia previa del equipo».
- Delta: Personal y Newsan se integran a la grilla principal; una nota breve bajo el rótulo conserva la distinción real entre clientes de NexOps y experiencia del equipo. Erway y DEXA conservan sus archivos originales y se desaturan visualmente para integrarse a la tonalidad clara, sin redibujar sus logos.
- Superficies congeladas: páginas internas, Radar, editorial, automatizaciones y producción. Reversión: revertir el commit de este parche.
- Validación focalizada: lint, build, revisión local del bloque oscuro y `git diff --check`; preview del PR como gate, sin merge.

## ECOSISTEMA DIGITAL — PATCH MODE / RECEIPT

- Baseline: PR draft #76 en `2c8b3f1`; Alan pidió sumar VTEX, E3, Shopify, Tiendanube y TikTok al bloque de plataformas y cambiar el fondo negro al lila del resto de la Home. Tiendanube ya figuraba y se mantiene una sola vez.
- Precisión: Alan aclaró que las nuevas marcas se muestran como parte del ecosistema digital, sin afirmar experiencia directa, partnership ni certificación. Por eso el bloque se titula «Plataformas que impulsan negocios» y el rótulo es «Ecosistema digital».
- Delta visual: fondo `#2e273f` igual a «Por qué NexOps», tarjetas lila translúcido y segunda fila centrada. Se conservan las páginas internas, Radar, editorial, automatizaciones y producción.
- Validación focalizada: lint, build, `git diff --check` y revisión visual local de escritorio; nueve tarjetas legibles, sin duplicado de Tiendanube ni desborde. Preview del PR como gate, sin merge; rollback por reversión del commit.

## ORDEN Y RÓTULO DE EMPRESAS — PATCH MODE / RECEIPT

- Baseline: PR draft #76 en `1885a48`; Alan pidió «Algunas empresas con las que trabajamos» y que Personal y Newsan sean las primeras marcas de la grilla.
- Delta: sólo cambia el texto del rótulo y el orden de dos logos. Se conserva la aclaración sobre experiencia del equipo y el resto de Home. Radar, páginas internas y producción congelados.
- Validación focalizada: lint, build, `git diff --check` y revisión de la preview. Reversión por commit; sin merge.

## ESLOGAN DEL PIE — PATCH MODE / RECEIPT

- Baseline: PR draft #76 en `71c7712`; Alan definió «Tecnología para vender mejor» como eslogan de NexOps.
- Delta: se reemplaza únicamente la descripción bajo la marca en el pie de página por el eslogan aprobado. Sin cambios de oferta, metadatos, Radar, editorial ni producción.
- Validación focalizada: lint, build, `git diff --check` y preview del PR; sin merge.

## LOGOS DEL ECOSISTEMA DIGITAL — PATCH MODE / RECEIPT

- Baseline: PR draft #76 en `bd282d4`; sólo Meta tenía una imagen de marca en la franja. Las otras ocho tarjetas mostraban texto estilizado.
- Delta: las nueve tarjetas usan archivos gráficos locales con el logo/wordmark de cada plataforma. Se conserva la composición lila y el tratamiento monocromo; no se declara partnership ni experiencia directa nueva.
- Fuentes de assets: logo existente de Meta; wordmark de Tiendanube extraído de su sitio; Kommo y e.tres de sus sitios oficiales; Mercado Libre, n8n, VTEX, Shopify y TikTok de Wikimedia Commons. Los SVG se revisaron para descartar scripts y recursos remotos.
- Validación focalizada: vista local de escritorio y móvil, lint, build, `git diff --check` y preview del PR; sin merge.

## JULERIAQUE Y ALCANCE DE EMPRESAS — PATCH MODE / RECEIPT

- Baseline: PR draft #76 en `7f453f2`; Alan pidió incorporar Juleriaque a la franja de empresas y añadir «+30 empresas más» debajo de Edelvives.
- Delta: se agrega el logo de Juleriaque, obtenido de su tienda oficial en Mercado Libre y adaptado visualmente al fondo lila mediante CSS. El dato «+30 empresas más», provisto por Alan, aparece como segunda línea de la tarjeta Edelvives. Se mantiene la aclaración de clientes de NexOps y experiencia del equipo.
- Validación focalizada: revisión local de escritorio y móvil, lint, build, `git diff --check` y preview del PR. Sin cambios a Radar, editorial, automatizaciones, páginas internas ni producción.
