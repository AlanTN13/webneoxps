# Los agentes de IA ya entraron en producción: el problema ahora es controlarlos bien

**Categoría:** Actualidad aplicada  
**Territorio:** IA aplicada a empresas  
**Disparador:** OpenAI Presence, anunciado el 22 de julio de 2026

OpenAI presentó Presence como un producto empresarial para desplegar agentes de voz y chat capaces de responder preguntas, resolver casos, usar sistemas de la empresa, ejecutar acciones aprobadas y escalar a personas cuando corresponde. El mensaje de fondo es más importante que el lanzamiento: para muchas organizaciones, la discusión ya no es si un agente puede hacer algo, sino si puede hacerlo de manera suficientemente confiable como para operar en producción.

Ese cambio modifica el tipo de decisión que tiene que tomar una empresa.

## Del demo a la operación real

En una prueba controlada, un agente puede impresionar con una conversación correcta o una tarea resuelta. En producción aparecen preguntas menos vistosas pero mucho más importantes:

- ¿qué sistemas puede consultar?;
- ¿qué acciones puede ejecutar?;
- ¿qué pasa cuando no entiende?;
- ¿cómo se audita una decisión?;
- ¿qué información puede exponer?;
- ¿cuándo debe pedir ayuda?;
- ¿cómo sabemos si mejora o empeora con el tiempo?

La calidad del modelo sigue importando, pero deja de ser suficiente.

## El problema ahora es el sistema alrededor del agente

Un agente empresarial necesita contexto, permisos, herramientas, reglas y mecanismos de evaluación.

Por ejemplo, un agente de atención puede tener acceso a una base de conocimiento y a un CRM. Eso no significa que deba poder modificar cualquier campo o tomar cualquier decisión comercial.

La arquitectura debería separar claramente:

- información que sólo puede leer;
- información que puede actualizar;
- acciones que puede ejecutar automáticamente;
- acciones que requieren aprobación;
- situaciones que obligan a escalar a una persona.

Ese diseño es el equivalente a definir responsabilidades dentro de un proceso humano.

## Evaluar antes y después del lanzamiento

OpenAI pone mucho foco en evaluaciones y control continuo. Tiene sentido: un agente puede funcionar bien en una muestra pequeña y fallar cuando cambian productos, políticas, usuarios o datos.

Para una empresa, esto significa que no alcanza con probar veinte conversaciones y dar el proyecto por terminado.

Conviene medir cosas como:

- porcentaje de casos resueltos correctamente;
- tasa de escalamiento;
- acciones incorrectas o bloqueadas;
- cumplimiento de reglas;
- tiempos de resolución;
- satisfacción del usuario;
- costo por caso;
- errores por tipo de intención.

La operación del agente debería generar datos para mejorar el propio sistema.

## Un agente con acceso a sistemas cambia el riesgo

Cuando la IA sólo redacta texto, un error puede ser molesto. Cuando puede crear una orden, modificar un cliente, aprobar una condición o enviar información, el mismo error puede tener impacto operativo.

Por eso, cuanto mayor sea la capacidad de acción, mayor debería ser la disciplina alrededor de permisos y validaciones.

No todas las tareas necesitan el mismo nivel de autonomía.

Un buen enfoque puede ser empezar con lectura y recomendación, pasar luego a acciones reversibles y recién después evaluar automatizaciones con mayor impacto.

## Qué debería preguntarse una empresa hoy

Antes de pensar en proveedores o modelos, hay cinco preguntas más importantes:

1. ¿Qué proceso queremos mejorar?
2. ¿Qué decisiones del proceso son repetitivas y suficientemente claras?
3. ¿Qué datos necesita el agente para hacer su trabajo?
4. ¿Qué errores serían tolerables y cuáles no?
5. ¿Cómo vamos a medir si realmente genera valor?

Si estas respuestas no están claras, sumar autonomía probablemente aumente complejidad antes que capacidad.

## El criterio NexOps

En NexOps vemos a los agentes como una capa dentro de un sistema, no como un reemplazo mágico de un rol completo.

El objetivo es encontrar tareas o decisiones donde la IA pueda aumentar capacidad sin romper trazabilidad ni control.

Eso suele implicar integrar fuentes de datos, definir herramientas disponibles, diseñar reglas, crear puntos de escalamiento y medir resultados.

El modelo es una pieza importante, pero la solución empresarial es todo lo que lo rodea.

## Qué cambia con esta nueva etapa

La señal de 2026 es que los grandes proveedores están moviendo la conversación desde “qué puede hacer la IA” hacia “cómo poner agentes a trabajar de forma confiable”. Microsoft, Google y OpenAI están convergiendo en temas como contexto empresarial, herramientas, gobernanza y ejecución de workflows.

Para las empresas, esto es saludable: obliga a medir los proyectos por resultados operativos y no por demos llamativas.

La pregunta deja de ser “¿podemos tener un agente?” y pasa a ser “¿en qué proceso tiene sentido darle autonomía, con qué límites y cómo demostramos que funciona?”.

**Fuente principal:** OpenAI, “Introducing OpenAI Presence”, 22 de julio de 2026. Como contexto adicional, Microsoft Build 2026 y Google Cloud Next 2026 también pusieron foco en agentes conectados al conocimiento y procesos de la empresa.

**CTA natural:** Si ya estás probando agentes dentro de tu empresa, el siguiente paso no es sumar más prompts: es definir permisos, métricas, integraciones y límites operativos.