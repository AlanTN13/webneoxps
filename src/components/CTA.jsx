export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/60 py-16 sm:py-24">
      {/* Glow de fondo */}
      <div className="pointer-events-none absolute inset-x-0 top-1/4 h-64 bg-gradient-to-r from-[#4F46E5]/10 via-sky-200/20 to-[#4F46E5]/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-5xl flex-col gap-10 px-4 lg:flex-row lg:items-center">
        {/* Texto izquierdo */}
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            ¿Listo para empezar?
          </p>

          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Agendá una llamada de 30 minutos y veamos qué podemos automatizar
            en tu negocio.
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl">
            En una conversación corta revisamos tu contexto, detectamos
            oportunidades rápidas de automatización y te proponemos un plan
            concreto para las próximas semanas.
          </p>

          {/* Pasos */}
          <div className="mt-6 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
            <div className="flex gap-3">
              <span className="mt-1 h-6 w-6 rounded-full bg-violet-100 text-xs font-semibold text-violet-700 flex items-center justify-center">
                1
              </span>
              <div>
                <p className="font-semibold text-slate-900">
                  Entendemos tu operación
                </p>
                <p className="text-slate-600">
                  Canales, volúmenes, herramientas actuales y principales
                  dolores.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="mt-1 h-6 w-6 rounded-full bg-violet-100 text-xs font-semibold text-violet-700 flex items-center justify-center">
                2
              </span>
              <div>
                <p className="font-semibold text-slate-900">
                  Detectamos quick wins
                </p>
                <p className="text-slate-600">
                  Casos automatizables en 3–6 semanas con impacto claro.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="mt-1 h-6 w-6 rounded-full bg-violet-100 text-xs font-semibold text-violet-700 flex items-center justify-center">
                3
              </span>
              <div>
                <p className="font-semibold text-slate-900">Propuesta express</p>
                <p className="text-slate-600">
                  Te dejamos un esquema inicial para avanzar o evaluar
                  internamente.
                </p>
              </div>
            </div>
          </div>

          {/* Mini quote */}
          <p className="mt-6 text-xs italic text-slate-500">
            “En 30 minutos nos llevamos 3 ideas concretas para reducir tareas
            manuales.” — Cliente de e-commerce
          </p>
        </div>

        {/* Tarjeta derecha */}
        <div className="flex-1">
          <div className="relative rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur">
            {/* Badge flotante */}
            <div className="absolute -top-3 right-4">
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 shadow-sm border border-emerald-100">
                Sin costo · 30 min
              </span>
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Agenda tu reunión
            </p>

            <p className="mt-3 text-sm text-slate-700">
              Al hacer clic vas a abrir nuestra agenda en Calendly. Elegís
              horario y recibís la invitación automáticamente en tu calendario.
            </p>

            {/* Chips de confianza */}
            <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-medium text-slate-600">
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1 border border-slate-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                +20 empresas activas
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1 border border-slate-200">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                Implementación promedio 3–6 semanas
              </span>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>• Duración: 30 minutos</li>
              <li>• Modalidad: videollamada</li>
              <li>• Costo: sin cargo, 100% consultiva</li>
            </ul>

            <a
              href="https://calendly.com/nexopstech-info/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#4F46E5] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#4338CA] transition-colors"
            >
              Agendar una conversación →
            </a>

            <p className="mt-3 text-[11px] text-slate-500 text-center">
              ¿Preferís coordinar por otro canal? Escribinos por WhatsApp y
              encontramos un horario que te quede cómodo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
