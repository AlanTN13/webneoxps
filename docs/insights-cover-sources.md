# Fuentes de portadas de NexOps Insights

Registro interno de los assets editoriales incorporados para el corpus activo del modelo `contentPurpose`.

Todas las fotos de esta tanda fueron descargadas desde Unsplash y se sirven localmente. La [Unsplash License](https://unsplash.com/license) permite descargar, copiar, modificar y usar las imágenes de forma gratuita, incluso con fines comerciales; la atribución no es obligatoria, pero se conserva acá para trazabilidad.

| Archivo local | Artículo | Fuente original | Autor | Licencia |
| --- | --- | --- | --- | --- |
| `public/assets/insights/cover-reportes-ventas.jpg` | Cómo automatizar reportes de ventas y dejar de armarlos a mano | [Unsplash](https://unsplash.com/photos/hpjSkU2UYSU) | Carlos Muza | Unsplash License |
| `public/assets/insights/cover-whatsapp-crm-guia.jpg` | Cómo integrar WhatsApp con un CRM para no perder leads | [Unsplash](https://unsplash.com/photos/0QvTyp0gH3A) | LinkedIn Sales Solutions | Unsplash License |
| `public/assets/insights/cover-agentes-ia-produccion.jpg` | Los agentes de IA ya entraron en producción: el problema ahora es controlarlos bien | [Unsplash](https://unsplash.com/photos/qwtCeJ5cLYs) | Stephen Dawson | Unsplash License |
| `public/assets/insights/cover-meta-business-agent.jpg` | Meta Business Agent: qué cambia cuando WhatsApp empieza a calificar leads y cerrar ventas | [Unsplash](https://unsplash.com/photos/AT5vuPoi8vc) | charlesdeluvio | Unsplash License |
| `public/assets/insights/cover-agente-ia-limites.jpg` | Un agente de IA no es un empleado digital: dónde conviene ponerle límites | [Unsplash](https://unsplash.com/photos/hBuwVLcYTnA) | Christin Hume | Unsplash License |
| `public/assets/insights/cover-proceso-roto.jpg` | Automatizar un proceso roto sólo hace que falle más rápido | [Unsplash](https://unsplash.com/photos/1c-YonlQjUE) | Vitaly Gariev | Unsplash License |
| `public/assets/insights/cover-solicitud-flujo.jpg` | De una solicitud interna a un flujo automático de trabajo | [Unsplash](https://unsplash.com/photos/iPm-TvkAUXA) | Vitaly Gariev | Unsplash License |
| `public/assets/insights/cover-whatsapp-crm-caso.jpg` | De WhatsApp al CRM: cómo diseñar un circuito automático de seguimiento de leads | [Unsplash](https://unsplash.com/photos/QckxruozjRg) | Annie Spratt | Unsplash License |
| `public/assets/insights/cover-ai-overviews-seo.jpg` | Cómo cambia el SEO cuando Google responde con IA | [Unsplash](https://unsplash.com/photos/JKUTrJ4vK00) | Luke Chesser | Unsplash License |
| `public/assets/insights/cover-gobernanza-ia.jpg` | Qué debería preparar una empresa ante la regulación de IA | [Unsplash](https://unsplash.com/photos/5fNmWej4tAA) | Scott Graham | Unsplash License |
| `public/assets/insights/cover-datos-sensibles-ia.jpg` | Qué revisar antes de enviar datos sensibles a una IA | [Unsplash](https://unsplash.com/photos/M5tzZtFCOfs) | Taylor Vick | Unsplash License |
| `public/assets/insights/cover-infraestructura-ia.jpg` | La infraestructura de IA también es una decisión de negocio | [Unsplash](https://unsplash.com/photos/yETqkLnhsUI) | Matthew Henry | Unsplash License |
| `public/assets/insights/cover-contexto-negocio-ia.svg` | El prompt no es el problema: la IA necesita contexto del negocio | Imagen editorial fotorrealista original (raster embebido en SVG), 1600×900 | NexOps Radar V2 | Activo original NexOps |

## Regla para publicaciones futuras

1. La automatización editorial externa debe buscar o seleccionar una portada coherente con el tema de la nota.
2. Debe comprobar que el origen y la licencia permiten el uso previsto, registrar la fuente y guardar el asset optimizado dentro de `public/assets/insights/`.
3. El JSON de la nota debe apuntar al archivo local mediante `coverImage`.
4. Si no existe una opción segura y relevante, la nota puede publicarse sin `coverImage`: `NewsVisual` mostrará el fallback branded.

El flujo esperado es `nota → seleccionar cover apropiada → validar origen/licencia → guardar localmente → asignar coverImage`. El fallback es resiliencia, no la portada estándar de las publicaciones nuevas.

La portada no debe incluir propósito, territorio, fecha, título ni excerpt. Esa metadata vive en el cuerpo de la card y en el detalle editorial.
