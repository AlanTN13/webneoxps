# De WhatsApp al CRM: cómo diseñar un circuito automático de seguimiento de leads

**Categoría:** Casos / Aplicaciones  
**Territorio:** CRM + automatización comercial

Imaginemos una empresa que recibe consultas por campañas de Meta, recomendaciones y tráfico orgánico. La mayoría termina en WhatsApp. El equipo comercial responde rápido, pero el proceso tiene una debilidad: cada conversación vive en el teléfono del vendedor hasta que alguien decide cargarla al CRM.

Eso genera tres problemas típicos: leads que nunca se registran, oportunidades sin próxima acción y poca visibilidad para saber qué está funcionando.

Este es un buen ejemplo de cómo una automatización puede transformar un canal informal en un circuito comercial trazable.

## Punto de partida

El proceso actual puede ser algo así:

1. Entra una consulta por WhatsApp.
2. Un vendedor responde.
3. Si parece interesante, crea manualmente el contacto en el CRM.
4. Completa algunos datos.
5. Se agenda mentalmente volver a escribir.
6. El gerente revisa el CRM, pero una parte de las conversaciones nunca llegó ahí.

El problema no está en la velocidad de respuesta. Está en que registrar y seguir la oportunidad es opcional.

## Objetivo del circuito

Queremos que toda consulta comercial relevante tenga:

- identidad;
- origen;
- responsable;
- estado;
- contexto;
- próxima acción;
- resultado final.

Sin obligar al vendedor a duplicar trabajo.

## Paso 1: identificar la conversación

Cuando entra un mensaje, el sistema consulta si el teléfono ya existe.

Si es un contacto conocido, recupera el contexto comercial. Si es nuevo, crea un registro preliminar.

No hace falta pedir veinte datos al inicio. Alcanzan los necesarios para no perder la oportunidad.

## Paso 2: clasificar el motivo

La clasificación puede ser por reglas o con IA, según el caso.

Por ejemplo:

- consulta de producto;
- soporte;
- presupuesto;
- proveedor;
- empleo;
- cliente existente.

Sólo las conversaciones comerciales siguen al pipeline de ventas.

Esta separación evita llenar el CRM de registros que nunca deberían haber sido oportunidades.

## Paso 3: crear o actualizar la oportunidad

Si corresponde, el sistema crea la oportunidad y guarda:

- canal de origen;
- campaña si está disponible;
- interés detectado;
- fecha de ingreso;
- responsable;
- etapa inicial.

La conversación puede seguir ocurriendo en WhatsApp, pero el estado comercial ya no depende del canal.

## Paso 4: asignar responsable

La lógica depende del negocio.

Puede asignarse por:

- zona;
- producto;
- sucursal;
- cartera existente;
- disponibilidad;
- round-robin.

Lo importante es que la regla esté definida y sea visible.

## Paso 5: asegurar la próxima acción

Este suele ser el punto de mayor impacto.

Si el vendedor respondió pero no dejó una próxima acción, el sistema puede generar una tarea o recordatorio.

Si la oportunidad queda sin movimiento durante determinado tiempo, puede alertar, reasignar o entrar en una secuencia de seguimiento.

Ya no dependemos de que alguien recuerde revisar conversaciones antiguas.

## Paso 6: resumir sin reemplazar el criterio

Una capa de IA puede ayudar a resumir la conversación, extraer intención o proponer el siguiente paso.

Pero no hace falta que decida todo.

En una primera versión, puede limitarse a reducir trabajo administrativo y dejar la decisión comercial al vendedor.

## Paso 7: cerrar el loop con métricas

Una vez que todas las oportunidades siguen el mismo circuito, recién aparecen métricas confiables:

- leads por canal;
- velocidad de respuesta;
- conversión;
- oportunidades sin seguimiento;
- tiempo por etapa;
- motivos de pérdida;
- performance por campaña.

Sin trazabilidad, estos indicadores suelen estar incompletos aunque exista un dashboard.

## Arquitectura conceptual

El flujo completo sería:

**WhatsApp → identificación → clasificación → CRM → asignación → seguimiento → cierre → métricas**

Cada empresa puede usar herramientas distintas. La arquitectura no depende de una marca específica.

## Qué automatizamos y qué dejamos humano

En este ejemplo automatizaríamos:

- creación/actualización de registros;
- clasificación inicial;
- asignación;
- tareas de seguimiento;
- alertas;
- resumen administrativo.

Y dejaríamos en manos del vendedor:

- negociación;
- excepciones;
- decisiones comerciales sensibles;
- conversaciones que requieren contexto especial.

## El resultado esperado

No es “tener WhatsApp integrado”.

Es lograr que ninguna oportunidad relevante desaparezca porque quedó encerrada en una conversación y que el gerente pueda ver el proceso comercial real sin pedirle a cada vendedor que reconstruya lo que pasó.

Ese es el tipo de resultado que buscamos en NexOps: menos trabajo manual, más trazabilidad y capacidad para manejar más volumen con el mismo proceso.

**Aplicación NexOps:** este patrón sirve para empresas que venden por WhatsApp, independientemente del CRM o proveedor de mensajería que utilicen.