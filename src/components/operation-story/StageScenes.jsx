import React from "react";
import OpportunityCard from "./OpportunityCard";

function Signal({ children, alert = false, detail, align = "left" }) {
  return (
    <div className={`min-w-0 ${align === "right" ? "text-right" : "text-left"}`}>
      <div
        className={`text-[13px] font-semibold leading-5 tracking-[-0.015em] sm:text-[14px] ${
          alert ? "text-[#a85761]" : "text-slate-500"
        }`}
      >
        {children}
      </div>
      {detail ? <div className="mt-1 text-[10px] font-semibold text-[#a85761]">{detail}</div> : null}
    </div>
  );
}

function ContextStack({ final = false }) {
  const items = final
    ? ["Ana · responsable", "Calificado", "Próximo paso · propuesta enviada"]
    : ["Responsable · Ana", "Etapa · Calificado", "Próximo paso · Enviar propuesta · 15:00"];

  return (
    <div className="grid gap-5 border-l border-[#7650ff]/25 pl-5 sm:pl-6">
      {items.map((item) => (
        <div key={item} className="grid grid-cols-[24px_1fr] items-center gap-3 text-[13px] font-semibold tracking-[-0.015em] text-slate-600 sm:text-[14px]">
          <span className="h-px w-6 bg-[#7650ff]/55" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function SecondaryOpportunity({ children }) {
  return (
    <div className="w-full rounded-[24px_24px_24px_9px] border border-slate-200/80 bg-white px-5 py-4 opacity-[0.28]">
      <div className="text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400">WhatsApp · desde campaña</div>
      <div className="mt-2 text-[15px] font-semibold leading-[1.2] tracking-[-0.025em] text-slate-500">{children}</div>
    </div>
  );
}

export function EntryScene() {
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center gap-8 py-6 text-center">
      <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-500">
        <span className="h-1.5 w-1.5 rounded-full bg-[#7650ff]" />
        Campaña activa
      </div>
      <OpportunityCard size="close" className="mx-auto" />
    </div>
  );
}

export function FrictionScene() {
  return (
    <div className="grid min-h-[500px] grid-cols-1 items-center gap-7 py-4 md:grid-cols-12 md:grid-rows-[auto_1fr_auto] md:gap-x-7 md:gap-y-9">
      <div className="md:col-span-5 md:col-start-1 md:row-start-1">
        <Signal alert detail="sin responsable">¿Quién responde?</Signal>
      </div>
      <div className="md:col-span-5 md:col-start-8 md:row-start-1 md:justify-self-end">
        <Signal align="right">Enviar cotización</Signal>
      </div>

      <div className="md:col-span-8 md:col-start-3 md:row-start-2">
        <OpportunityCard size="compact" className="mx-auto" />
      </div>

      <div className="md:col-span-5 md:col-start-1 md:row-start-3">
        <Signal>Hacer seguimiento</Signal>
      </div>
      <div className="md:col-span-5 md:col-start-8 md:row-start-3 md:justify-self-end">
        <Signal align="right">Recordar mañana</Signal>
      </div>
    </div>
  );
}

export function OrderScene() {
  return (
    <div className="grid min-h-[500px] items-center gap-10 py-5 md:grid-cols-12 md:gap-8 xl:gap-12">
      <div className="md:col-span-7">
        <OpportunityCard size="standard" className="mx-auto md:mx-0" />
      </div>
      <div className="md:col-span-5">
        <ContextStack />
      </div>
    </div>
  );
}

export function AutomationScene() {
  const tasks = ["clasificar ✓", "responder ✓", "recordar ✓", "actualizar ✓"];

  return (
    <div className="grid min-h-[500px] items-center gap-10 py-5 md:grid-cols-12 md:gap-8 xl:gap-12">
      <div className="grid gap-7 md:col-span-7">
        <OpportunityCard size="standard" />
        <div className="max-w-[520px]">
          <ContextStack />
        </div>
      </div>

      <div className="grid gap-8 md:col-span-5">
        <div>
          <div className="mb-4 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Trabajo absorbido</div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-4">
            {tasks.map((task) => (
              <div key={task} className="text-[13px] font-semibold tracking-[-0.015em] text-[#7650ff]">
                {task}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <div className="mb-3 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Sólo escala la excepción</div>
          <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <div className="text-[13px] font-semibold leading-5 tracking-[-0.015em] text-[#7650ff]">
              validar condición comercial
            </div>
            <span className="hidden h-px w-8 bg-[#7650ff]/35 sm:block" />
            <div className="flex items-center gap-2.5 text-[13px] font-semibold text-slate-600">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#7650ff]/25 text-[10px] font-bold text-[#7650ff]">S</span>
              Sofía · equipo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ResultScene() {
  return (
    <div className="rounded-[38px] bg-[radial-gradient(circle_at_center,rgba(118,80,255,0.08),rgba(118,80,255,0)_64%)] px-2 py-8 sm:px-5 md:px-7 md:py-10">
      <div className="grid items-end gap-5 md:grid-cols-[0.78fr_1.5fr_0.78fr] md:gap-4 xl:gap-6">
        <div className="order-2 md:order-1">
          <SecondaryOpportunity>Quiero conocer opciones para mi empresa.</SecondaryOpportunity>
        </div>

        <div className="order-1 grid gap-6 md:order-2">
          <OpportunityCard size="resolved" status="Seguimiento activo" className="mx-auto" />
          <div className="mx-auto w-full max-w-[500px]">
            <ContextStack final />
          </div>
        </div>

        <div className="order-3">
          <SecondaryOpportunity>Necesito una propuesta para este mes.</SecondaryOpportunity>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-[900px] text-center text-[clamp(1.8rem,3.4vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#0c1730]">
        Más ventas. Más control. Menos trabajo manual.
      </div>
    </div>
  );
}
