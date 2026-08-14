# Radar Autónomo V2 — Dry Run #2

**Fecha:** 2026-08-14  
**Repo:** `AlanTN13/webneoxps`  
**Rama:** `test/radar-v2-dry-run-2`  
**Base de DR2:** `5c1d5113daaeb96c444bc8b54ccad8c74c36b4f3` (HEAD de Dry Run #1)  
**Modo:** dry-run; sin publicación, PR, merge ni cambios en `main`.

## Objetivo

Dry Run #2 no repitió la evaluación editorial de DR1. Tomó el mismo candidato de 96/100 para aislar y probar los dos gaps operativos detectados en la corrida anterior:

1. ejecutar el `news-check` real en un checkout real del repositorio;
2. demostrar escritura, checkout y validación de una portada binaria real.

Candidato reutilizado:

- **Título:** `Qué procesos automatizar primero en una PyME: una matriz para decidir`
- **Slug:** `que-procesos-automatizar-primero-pyme`
- **Purpose:** `seo`
- **Territorio:** `automatizacion-procesos`
- **Score editorial de DR1:** `96/100`

El candidato sigue fuera de `src/data/news`; por lo tanto DR2 no publica contenido.

## Resultado ejecutivo

**DR2: PASS**

Se cerraron los dos gaps operativos de DR1:

- `news-check` ejecutable: **PASS**;
- transporte y validación de binario JPEG en Git/GitHub Actions: **PASS**.

Además, el workflow estándar completo del Content Engine volvió a pasar: contrato, fixture de dry-run, tests, lint, build y assertions SEO.

## 1. Validación ejecutable real

La corrida se ejecutó en GitHub Actions sobre Node 24 y un checkout real de la rama.

Comando probado contra el candidato de DR2:

```bash
node scripts/news-check.mjs docs/radar-v2/dry-run-2/candidate.json
```

**Resultado: PASS.**

El runner confirmó que el candidato puede incorporarse como `add` sin mutar el corpus. Esto prueba en ejecución real los gates de contrato y dedupe que DR1 sólo había podido validar estructuralmente.

Para probar también el estado futuro con portada, el workflow generó una copia temporal del mismo candidato con:

```json
"coverImage": "/assets/insights/cover-priorizar-automatizaciones-pyme.jpg"
```

y volvió a ejecutar `news-check` contra esa variante.

**Resultado con `coverImage`: PASS.**

Por lo tanto, agregar una referencia de portada válida no introduce conflicto de contrato, slug, `engineRunId`, `topicFingerprint`, fuentes, enlaces ni relacionados.

## 2. Portada binaria real

Se escribió un JPEG binario real mediante la API Git de GitHub y se incorporó a la rama en:

`public/assets/insights/cover-priorizar-automatizaciones-pyme.jpg`

Blob Git:

`6754ad72f80c69fee26b53d4bb005469f88d063f`

El checkout de GitHub Actions validó que:

- el archivo existe y no está vacío;
- GitHub lo preserva como binario, no como texto/base64 accidental;
- `file` lo reconoce como `JPEG image data`;
- tiene tamaño no trivial;
- comienza con la firma JPEG `FF D8`;
- el candidato sigue siendo `add-safe` cuando referencia ese path.

**Resultado: BINARY_COVER_WRITE_PASS.**

### Alcance de esta portada

El JPEG de DR2 es un **fixture técnico de transporte**, no una portada editorial aprobada para producción. Su función es demostrar que el runtime puede crear bytes reales, escribirlos a Git, recuperarlos en checkout y validarlos antes de publicar.

Para autopublicación de producción conviene agregar un gate de calidad de asset —por ejemplo dimensiones mínimas, relación de aspecto y peso máximo— además del gate binario que DR2 acaba de cerrar.

## 3. Primer intento y corrección

El primer workflow específico de DR2 (`31812429715`) terminó en failure, pero el fallo estuvo aislado en una comprobación adicional de portada demasiado frágil.

En ese mismo intento ya habían pasado:

- instalación exacta de dependencias;
- `Executable candidate news-check`.

En paralelo, el workflow estándar `Content Engine Validation` (`31812429657`) terminó **success** con contrato, tests, lint, build y output SEO completos.

No había una regresión del repositorio ni un conflicto editorial.

La comprobación extra de portada se reemplazó por una validación más robusta y observable:

- archivo no vacío;
- identificación real por `file` como JPEG;
- firma JPEG;
- `news-check` explícito con `coverImage`.

No se relajó el criterio de aceptación; se eliminó una aserción incidental que no agregaba señal útil.

## 4. Corrida final específica de DR2

Workflow: `Radar V2 DR2 Validation`  
Run: `31812760051`  
Commit validado: `021049634f92d4123b1631f98f13fe1f64300033`

Pasos:

| Paso | Resultado |
| --- | --- |
| checkout | PASS |
| Node 24 | PASS |
| `npm ci` | PASS |
| executable candidate `news-check` | PASS |
| construir variante temporal con `coverImage` | PASS |
| executable `news-check` con `coverImage` | PASS |
| validar JPEG binario real | PASS |
| `npm run news:validate` | PASS |
| `npm run news:test` | PASS |
| `npm run lint` | PASS |
| `npm run build` | PASS |
| assertions de artefactos SEO | PASS |

**Conclusión del job: SUCCESS.**

## 5. Workflow estándar independiente

Workflow: `Content Engine Validation`  
Run: `31812760035`  
Commit validado: `021049634f92d4123b1631f98f13fe1f64300033`

Todos sus pasos terminaron en success:

- `npm ci`;
- `npm run news:validate`;
- fixture de dry-run con `news-check`;
- `npm run news:test`;
- `npm run lint`;
- `npm run build`;
- assertions de páginas SEO, sitemap, robots y conteo dinámico source/generated.

Esto da una segunda validación independiente del estado de la rama.

## 6. Estado de seguridad de publicación

DR2 no ejecutó `news:add`, no copió el candidato a `src/data/news`, no abrió PR y no modificó `main`.

El objetivo fue probar que una corrida futura puede llegar hasta el borde de publicación con validaciones ejecutables y assets binarios reales sin mutar producción.

## Decisión del Director

**DR2 queda aprobado.**

Los dos blockers técnicos detectados en DR1 están cerrados:

1. existe un runner ejecutable real para validar el candidato;
2. existe un camino comprobado para escribir y validar un asset binario real en GitHub.

El siguiente nivel no debería ser activar publicación irrestricta de una vez. La recomendación es pasar a un **canary de publicación controlada** con una única pieza, manteniendo gates previos y agregando como mínimo:

- gate de calidad/dimensiones de portada;
- mutación atómica artículo + portada;
- validación post-add;
- build verde antes de merge;
- rollback claro;
- límite de una publicación por corrida.

DR2 demuestra que el Radar puede llegar de forma segura hasta ese punto.