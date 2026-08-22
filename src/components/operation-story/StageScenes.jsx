import React from "react";
import OpportunityCard from "./OpportunityCard";

function Signal({ children, tone = "default", detail }) {
  const toneClass = tone === "alert" ? "text-[#a85761]" : "text-slate-500";
  const lineClass = tone === "alert" ? "bg-[#a85761]/35" : "bg-slate-300";

  return (
    <div className={`min-w-0 ${toneClass}`}>
      <div className="flex items-center gap-2 text-[13px] font-semibold tracking-[-0.015em] sm:text-[14px]">
        <span className={`h-px w-5 shrink-0 ${lineClass}`} />
        <span>{children}</span>
      </div>
      {detail ? <div className="mt-1 pl-7 text-[10px] font-semibold">{detail}</div> : null}
    </div>
  );
}

function ContextList({ final = false }) {
  const items = final
    ? ["Ana · responsable", "Calificado", "Próximo paso · propuesta enviada"]
    : ["Responsable · Ana", "Etapa · Calificado", "Próximo paso · Enviar propuesta · 15:00"];

  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-2 text-[13px] font-semibold tracking-[-0.015em] text-slate-600 sm:text-[14px]">
          <span className="h-px w-5 shrink-0 bg-[#7650ff]/55" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

export function EntryScene() {
  return (
    <div className="mx-auto flex max-w-[820px] flex-col items-center gap-6 md:py-4">
      <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-500">
        <span className="h-1.5 w-1.5 rounded-full bg-[#7650ff]" />
        Campaña activa
      </div>
      <OpportunityCard />
    </div>
  );
}

export function FrictionScene() {
  return (
    <div className="mx-auto grid max-w-[820px] gap-6 sm:gap-7">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-8">
        <Signal tone="alert" detail="sin responsable">¿Quién responde?</Signal>
        <Signal>Enviar cotización</Signal>
      </div>

      <OpportunityCard className="mx-auto" />

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-8">
        <Signal>Hacer seguimiento</Signal>
        <Signal>Recordar mañana</Signal>
      </div>
    </div>
  );
}

export function OrderScene() {
  return (
    <div className="mx-auto grid max-w-[860px] items-center gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(220px,0.58fr)] xl:gap-10">
      <OpportunityCard className="mx-auto xl:mx-0" />
      <div className="border-l border-[#7650ff]/20 pl-5 sm:pl-6">
        <ContextList />
      </div>
    </div>
  );
}

export function AutomationScene() {
  const tasks = ["clasificar ✓", "responder ✓", "recordar ✓", "actualizar ✓"];

  return (
    <div className="mx-auto grid max-w-[900px] items-center gap-9 xl:grid-cols-[minmax(0,1fr)_minmax(250px,0.7fr)] xl:gap-12">
      <div className="grid gap-6">
        <OpportunityCard className="mx-auto xl:mx-0" />
        <div className="border-l border-[#7650ff]/20 pl-5 xl:max-w-[540px]">
          <ContextList />
        </div>
      </div>

      <div className="grid gap-7">
        <div>
          <div className="mb-3 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Automatizado</div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-3">
            {tasks.map((task) => (
              <div key={task} className="text-[13px] font-semibold tracking-[-0.015em] text-[#7650ff]">
                {task}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200 pt-5">
          <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Excepción</div>
          <div className="mt-2 text-[13px] font-semibold leading-5 tracking-[-0.015em] text-[#7650ff]">
            validar condición comercial → <span className="text-slate-600">Sofía · equipo</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecondaryOpportunity({ children }) {
  return (
    <div className="rounded-[22px_22px_22px_8px] border border-slate-200/80 bg-white px-5 py-4 opacity-[0.35]">
      <div className="text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400">WhatsApp · desde campaña</div>
      <div className="mt-2 text-[15px] font-semibold leading-[1.2] tracking-[-0.025em] text-slate-500">{children}</div>
    </div>
  );
}

export function ResultScene() {
  return (
    <div className="mx-auto grid max-w-[860px] gap-7">
      <OpportunityCard status="Seguimiento activo" className="mx-auto" />

      <div className="mx-auto w-full max-w-[540px] border-l border-[#7650ff]/20 pl-5 sm:pl-6">
        <ContextList final />
      </div>

      <div className="mx-auto grid w-full max-w-[700px] gap-4 sm:grid-cols-2 sm:gap-5">
        <SecondaryOpportunity>Quiero conocer opciones para mi empresa.</SecondaryOpportunity>
        <SecondaryOpportunity>Necesito una propuesta para este mes.</SecondaryOpportunity>
      </div>
    </div>
  );
}
