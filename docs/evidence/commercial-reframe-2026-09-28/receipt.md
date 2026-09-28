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
