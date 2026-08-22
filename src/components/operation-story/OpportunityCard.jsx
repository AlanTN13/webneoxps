import React from "react";

export default function OpportunityCard({ status, className = "" }) {
  return (
    <div
      className={`w-full max-w-[540px] rounded-[30px_30px_30px_11px] border border-slate-200/90 bg-white px-6 py-6 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.32)] sm:px-7 sm:py-7 ${className}`}
    >
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
        <span className="h-1.5 w-1.5 rounded-full bg-[#7650ff]" />
        <span>WhatsApp · desde campaña</span>
      </div>

      <p className="mt-4 text-[clamp(1.3rem,2vw,1.65rem)] font-semibold leading-[1.18] tracking-[-0.035em] text-[#10192f]">
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
