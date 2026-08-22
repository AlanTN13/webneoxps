import React from "react";

export default function OperationStage({ number, label, title, children, centered = false, footer }) {
  return (
    <section className="bg-[#fdfdfc] px-5 py-[clamp(4.5rem,8vw,7.5rem)] sm:px-6 md:min-h-[78svh] lg:px-8">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-10 lg:gap-14 xl:gap-20">
        <div
          className={
            centered
              ? "md:col-span-12 md:mx-auto md:max-w-[760px] md:text-center"
              : "md:col-span-5 xl:col-span-4"
          }
        >
          <div className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 md:mb-5">
            <span className="text-[#7650ff]">{number}</span>
            <span>{label}</span>
          </div>
          <h2 className="max-w-[620px] text-[clamp(2.35rem,4.4vw,4.9rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-[#0c1730]">
            {title}
          </h2>
        </div>

        <div
          className={
            centered
              ? "md:col-span-12"
              : "md:col-span-7 xl:col-span-8"
          }
        >
          {children}
        </div>
      </div>

      {footer ? <div className="mx-auto mt-14 max-w-[1280px] md:mt-16">{footer}</div> : null}
    </section>
  );
}
