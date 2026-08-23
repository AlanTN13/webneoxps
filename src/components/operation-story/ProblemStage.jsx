import React from "react";

export default function ProblemStage({ chapter, activeChapter, onSelect, children }) {
  return (
    <section className="bg-[#fdfdfc] px-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100svh-72px)] w-full max-w-[1380px] flex-col py-8 sm:py-10 lg:py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-5 border-b border-slate-200/80 pb-5 lg:mb-10">
          <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400">
            Fase A · tres problemas reales
          </div>

          <div className="flex items-center gap-5" aria-label="Revisión de capítulos">
            {["01", "02", "03"].map((number, index) => (
              <button
                key={number}
                type="button"
                onClick={() => onSelect(index)}
                aria-pressed={activeChapter === index}
                className={`border-b pb-1 text-[11px] font-semibold tracking-[0.08em] ${
                  activeChapter === index
                    ? "border-[#7650ff] text-[#7650ff]"
                    : "border-transparent text-slate-400"
                }`}
              >
                {number}
              </button>
            ))}
          </div>
        </div>

        <div className="grid flex-1 items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="lg:col-span-4">
            <div className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
              <span className="text-[#7650ff]">{chapter.number}</span>
              <span>{chapter.label}</span>
            </div>

            <h2 className="max-w-[560px] text-[clamp(2.5rem,4.2vw,5.1rem)] font-semibold leading-[0.97] tracking-[-0.065em] text-[#0c1730]">
              {chapter.title}
            </h2>

            <div className="mt-8 inline-flex items-center gap-2 border-t border-slate-200 pt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7650ff]" />
              {chapter.labelSecondary}
            </div>
          </div>

          <div className="min-w-0 lg:col-span-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
