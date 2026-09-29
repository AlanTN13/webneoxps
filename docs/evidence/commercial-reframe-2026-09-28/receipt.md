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
