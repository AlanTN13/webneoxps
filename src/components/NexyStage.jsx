import { Bot, Check, MessageCircleMore, Sparkles } from "lucide-react";

export default function NexyStage({ compact = false }) {
  return (
    <div className={`nexy-stage ${compact ? "nexy-stage--compact" : ""}`} aria-label="Una oportunidad avanza por el sistema NexOps">
      <div className="nexy-stage__ambient nexy-stage__ambient--one" />
      <div className="nexy-stage__ambient nexy-stage__ambient--two" />

      <div className="nexy-stage__topbar">
        <div className="nexy-stage__brand">
          <span className="nexy-stage__brand-dot" />
          Operación comercial
        </div>
        <span className="nexy-stage__live">En movimiento</span>
      </div>

      <div className="nexy-stage__scene">
        <div className="nexy-stage__message">
          <span className="nexy-stage__message-icon"><MessageCircleMore size={17} /></span>
          <span>
            <small>Nueva consulta</small>
            Necesito ordenar el seguimiento de ventas.
          </span>
        </div>

        <div className="nexy-stage__lead">
          <div className="nexy-stage__lead-head">
            <span className="nexy-stage__avatar">MC</span>
            <span><small>Oportunidad</small>María · Empresa Norte</span>
            <span className="nexy-stage__score">Alta</span>
          </div>
          <div className="nexy-stage__lead-grid">
            <span><small>Origen</small>Meta Ads</span>
            <span><small>Responsable</small>Equipo comercial</span>
            <span><small>Próxima acción</small>Llamar hoy</span>
          </div>
        </div>

        <div className="nexy-stage__agent">
          <span><Bot size={16} /> Agente IA</span>
          <p>Contexto organizado. Preparé resumen y próxima respuesta.</p>
          <span className="nexy-stage__agent-status"><Sparkles size={13} /> Listo para revisar</span>
        </div>

        <div className="nexy-stage__done">
          <span><Check size={15} /></span>
          Seguimiento creado
        </div>

        <img
          className="nexy-stage__character"
          src="/assets/nexis/nexisales.webp"
          alt="Nexy organizando una oportunidad comercial"
          width="720"
          height="900"
          fetchPriority={compact ? "auto" : "high"}
        />
      </div>
    </div>
  );
}
