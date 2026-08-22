import React from "react";

const SIZE_CLASSES = {
  close: "max-w-[640px] px-7 py-7 sm:px-9 sm:py-9",
  standard: "max-w-[520px] px-6 py-6 sm:px-7 sm:py-7",
  compact: "max-w-[410px] px-5 py-5 sm:px-6 sm:py-6",
  resolved: "max-w-[500px] px-6 py-6 sm:px-7 sm:py-7",
};

const MESSAGE_CLASSES = {
  close: "text-[clamp(1.6rem,2.5vw,2.3rem)]",
  standard: "text-[clamp(1.35rem,2vw,1.75rem)]",
  compact: "text-[clamp(1.15rem,1.6vw,1.45rem)]",
  resolved: "text-[clamp(1.25rem,1.8vw,1.6rem)]",
};

export default function OpportunityCard({ size = "standard", status, className = "" }) {
  const sizeClass = SIZE_CLASSES[size] ?? SIZE_CLASSES.standard;
  const messageClass = MESSAGE_CLASSES[size] ?? MESSAGE_CLASSES.standard;

  return (
    <div
      className={`w-full rounded-[30px_30px_30px_11px] border border-slate-200/90 bg-white shadow-[0_24px_70px_-50px_rgba(15,23,42,0.32)] ${sizeClass} ${className}`}
    >
      <div className="flex items-center justify-between gap-4 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:text-[10px]">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7650ff]" />
          <span>WhatsApp · desde campaña</span>
        </span>
        <span className="font-semibold tracking-[0.08em]">11:42</span>
      </div>

      <p className={`mt-4 font-semibold leading-[1.16] tracking-[-0.04em] text-[#10192f] ${messageClass}`}>
        Hola, vi el anuncio. Quiero más información.
      </p>

      {status ? (
        <div className="mt-5 border-t border-slate-100 pt-4 text-[11px] font-semibold tracking-[-0.01em] text-[#7650ff]">
          {status}
        </div>
      ) : null}
    </div>
  );
}
