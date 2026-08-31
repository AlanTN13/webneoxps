import { Check, MessageCircleMore } from "lucide-react";

export default function NexyStage() {
  return (
    <div className="nexy-stage" aria-label="Una oportunidad avanza por el sistema NexOps">
      <div className="nexy-stage__ambient nexy-stage__ambient--one" />
      <div className="nexy-stage__ambient nexy-stage__ambient--two" />

      <div className="nexy-stage__topbar">
        <div className="nexy-stage__brand">
          <span className="nexy-stage__brand-dot" />
          Recorrido de una consulta
        </div>
        <span className="nexy-stage__live">3 pasos</span>
      </div>

      <div className="nexy-stage__scene">
        <div className="nexy-stage__steps">
          <div className="nexy-stage__step">
            <span className="nexy-stage__step-number">1</span>
            <div>
              <small>Entró una consulta</small>
              <strong>“Necesito ordenar el seguimiento de ventas.”</strong>
              <p><MessageCircleMore size={13} /> WhatsApp, web o campaña</p>
            </div>
          </div>
          <div className="nexy-stage__step">
            <span className="nexy-stage__step-number">2</span>
            <div>
              <small>Se registró y asignó</small>
              <strong>María · Empresa Norte</strong>
              <p>Responsable: equipo comercial</p>
            </div>
          </div>
          <div className="nexy-stage__step">
            <span className="nexy-stage__step-number">3</span>
            <div>
              <small>Quedó una próxima acción</small>
              <strong>Llamar hoy</strong>
              <p>Con historial y seguimiento</p>
            </div>
          </div>
        </div>

        <div className="nexy-stage__done">
          <span><Check size={15} /></span>
          El dueño puede ver qué pasó
        </div>

        <img
          className="nexy-stage__character"
          src="/assets/nexis/nexi-sales.webp"
          alt="Nexy acompañando el seguimiento de una consulta"
          width="1200"
          height="800"
          fetchPriority="high"
        />
      </div>
    </div>
  );
}
