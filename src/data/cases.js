export const realCases = [
  {
    id: "globaltrip-news",
    context: "GlobalTrip · comercio exterior",
    status: "Circuito activo",
    problem:
      "Publicar una noticia requería coordinar correo, contenido, web y despliegue sin perder el control del proceso.",
    work:
      "Diseñamos una automatización que recibe el contenido por email, valida datos y duplicados, genera la publicación y verifica la salida antes de cerrar el envío.",
    result:
      "El circuito está activo: publica con preview, control de producción y trazabilidad de cada correo procesado.",
  },
  {
    id: "materials-erp",
    context: "PyME de materiales · ERP a medida",
    status: "Vertical integrado",
    problem:
      "Actualizar costos y precios desde listas de proveedores combinaba archivos, reglas comerciales y decisiones difíciles de auditar.",
    work:
      "Construimos un flujo de importación con previsualización, rechazo visible de errores, costo de reposición, precio sugerido y publicación separada.",
    result:
      "El primer vertical quedó integrado y auditable. La validación operativa completa continúa antes del piloto.",
  },
  {
    id: "attendance-operation",
    context: "Operación presencial · control de fichadas",
    status: "Lista para validación",
    problem:
      "Las fichadas, jornadas e inconsistencias dependían de una planilla y dejaban demasiadas decisiones críticas en el navegador.",
    work:
      "Construimos un circuito con identidad por usuario, reglas en servidor, cola offline, evidencias privadas y tablero por sede.",
    result:
      "La V1 centraliza jornada, estado e incidencias en una fuente única; la puesta en marcha sigue un checklist controlado.",
  },
];
