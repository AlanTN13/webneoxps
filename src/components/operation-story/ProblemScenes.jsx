import React from "react";

function QueryCard({ muted = false }) {
  return (
    <div
      className={`rounded-[28px_28px_28px_10px] border bg-white px-6 py-5 sm:px-7 sm:py-6 ${
        muted ? "border-slate-200/70 opacity-55" : "border-slate-200/90"
      }`}
    >
      <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
        WhatsApp · desde campaña
      </div>
      <div className="mt-3 text-[clamp(1.25rem,2vw,1.6rem)] font-semibold leading-[1.18] tracking-[-0.035em] text-[#10192f]">
        Hola, vi el anuncio. Quiero más información.
      </div>
    </div>
  );
}

function ResultLine({ children }) {
  return (
    <div className="flex items-center gap-2 text-[13px] font-semibold tracking-[-0.015em] text-slate-600 sm:text-[14px]">
      <span className="h-px w-5 shrink-0 bg-[#7650ff]/55" />
      <span>{children}</span>
    </div>
  );
}

export function CoolingLeadScene() {
  const timeline = [
    { time: "09:04", text: "Entró una consulta nueva", active: true },
    { time: "09:27", text: "Sigue sin respuesta" },
    { time: "11:10", text: "Nadie sabe quién la está siguiendo" },
  ];

  return (
    <div className="mx-auto max-w-[860px]">
      <div className="grid items-center gap-8 xl:grid-cols-[0.72fr_1.15fr] xl:gap-12">
        <div className="grid gap-5">
          {timeline.map((item, index) => (
            <div key={item.time} className="grid grid-cols-[62px_1fr] gap-4">
              <div className={`text-[13px] font-semibold ${item.active ? "text-[#7650ff]" : "text-slate-400"}`}>
                {item.time}
              </div>
              <div className="relative pb-5 text-[14px] font-medium leading-5 text-slate-600">
                {index < timeline.length - 1 ? (
                  <span className="absolute -left-[22px] top-4 h-[calc(100%+4px)] w-px bg-slate-200" />
                ) : null}
                <span className={`absolute -left-[25px] top-1.5 h-1.5 w-1.5 rounded-full ${item.active ? "bg-[#7650ff]" : "bg-slate-300"}`} />
                {item.text}
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-7">
          <div className="opacity-70">
            <QueryCard />
          </div>
          <div className="grid gap-3 border-l border-[#7650ff]/20 pl-5 sm:pl-6">
            <ResultLine>Responsable · Ana</ResultLine>
            <ResultLine>Seguimiento activo</ResultLine>
            <ResultLine>Próximo paso · responder ahora</ResultLine>
          </div>
        </div>
      </div>

      <div className="mt-10 text-[clamp(1.7rem,2.7vw,2.7rem)] font-semibold tracking-[-0.045em] text-[#0c1730]">
        Más oportunidades aprovechadas.
      </div>
    </div>
  );
}

function ActivityPiece({ title, detail }) {
  return (
    <div className="min-w-0 border-b border-slate-200 pb-4 last:border-b-0">
      <div className="text-[13px] font-semibold tracking-[-0.015em] text-[#26324a]">{title}</div>
      <div className="mt-1 text-[12px] leading-5 text-slate-500">{detail}</div>
    </div>
  );
}

export function VisibilityScene() {
  return (
    <div className="mx-auto max-w-[900px]">
      <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr] xl:gap-12">
        <div className="rounded-[30px] border border-slate-200/80 bg-white px-6 py-6 sm:px-7">
          <div className="mb-5 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Mucho movimiento</div>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-x-7">
            <ActivityPiece title="Consulta de Lucía" detail="Esperando respuesta" />
            <ActivityPiece title="Nota de Martín" detail="Volver a llamar" />
            <ActivityPiece title="Oportunidad nueva" detail="Sin responsable" />
            <ActivityPiece title="Seguimiento" detail="Pendiente desde ayer" />
            <ActivityPiece title="Ana" detail="Hablando con un cliente" />
            <ActivityPiece title="Leo" detail="Armando una propuesta" />
          </div>
        </div>

        <div className="flex flex-col justify-center border-l border-[#7650ff]/20 pl-6 sm:pl-8">
          <div className="mb-6 text-[9px] font-bold uppercase tracking-[0.2em] text-[#7650ff]">Ahora se ve claro</div>
          <div className="grid gap-5">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.17em] text-slate-400">Responsable</div>
              <div className="mt-1 text-[19px] font-semibold tracking-[-0.03em] text-[#10192f]">Ana</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.17em] text-slate-400">Estado</div>
              <div className="mt-1 text-[19px] font-semibold tracking-[-0.03em] text-[#10192f]">Propuesta enviada</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.17em] text-slate-400">Próximo paso</div>
              <div className="mt-1 text-[19px] font-semibold tracking-[-0.03em] text-[#10192f]">Seguimiento · mañana 10:00</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 text-[clamp(1.7rem,2.7vw,2.7rem)] font-semibold tracking-[-0.045em] text-[#0c1730]">
        Control real de la operación comercial.
      </div>
    </div>
  );
}

function WorkItem({ children, resolved = false }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 border-b py-3 text-[14px] font-semibold tracking-[-0.015em] last:border-b-0 ${
        resolved ? "border-slate-100 text-slate-300 line-through" : "border-slate-200 text-slate-600"
      }`}
    >
      <span>{children}</span>
      {resolved ? <span className="text-[12px] text-[#7650ff]/45">✓</span> : null}
    </div>
  );
}

export function RepetitiveWorkScene() {
  return (
    <div className="mx-auto max-w-[900px]">
      <div className="grid items-center gap-8 xl:grid-cols-[0.92fr_1.08fr] xl:gap-12">
        <div className="rounded-[30px] border border-slate-200/80 bg-white px-6 py-5 sm:px-7">
          <div className="mb-3 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Trabajo que se repite</div>
          <WorkItem resolved>clasificar consulta</WorkItem>
          <WorkItem resolved>responder pregunta frecuente</WorkItem>
          <WorkItem resolved>recordar seguimiento</WorkItem>
          <WorkItem resolved>actualizar estado</WorkItem>
          <WorkItem resolved>derivar información</WorkItem>
        </div>

        <div className="grid gap-7">
          <div className="border-l border-[#7650ff]/25 pl-6 sm:pl-8">
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#7650ff]">Sólo queda lo que necesita criterio</div>
            <div className="mt-4 text-[20px] font-semibold leading-[1.18] tracking-[-0.035em] text-[#10192f]">
              validar condición comercial
            </div>
          </div>

          <div className="flex items-center gap-3 pl-6 sm:pl-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#7650ff]/20 bg-white text-[11px] font-bold text-[#7650ff]">S</div>
            <div>
              <div className="text-[13px] font-semibold text-slate-600">Sofía · equipo</div>
              <div className="mt-0.5 text-[11px] text-slate-400">requiere criterio humano</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 text-[clamp(1.7rem,2.7vw,2.7rem)] font-semibold tracking-[-0.045em] text-[#0c1730]">
        Menos trabajo manual.
      </div>
    </div>
  );
}
