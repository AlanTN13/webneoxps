import { useState } from "react";
import {
  BrainCircuit,
  ChartNoAxesCombined,
  GitBranch,
  Workflow,
} from "lucide-react";

const TERRITORY_VISUALS = {
  "automatizacion-procesos": {
    Icon: Workflow,
    background: "from-indigo-500 via-violet-600 to-slate-950",
    glow: "bg-fuchsia-400/35",
    accent: "border-violet-200/45 bg-violet-300/10",
  },
  "ia-aplicada-empresas": {
    Icon: BrainCircuit,
    background: "from-violet-500 via-indigo-700 to-slate-950",
    glow: "bg-indigo-300/40",
    accent: "border-indigo-100/45 bg-indigo-200/10",
  },
  "crm-automatizacion-comercial": {
    Icon: GitBranch,
    background: "from-sky-500 via-blue-700 to-indigo-950",
    glow: "bg-cyan-300/40",
    accent: "border-sky-100/50 bg-cyan-200/10",
  },
  "data-analytics": {
    Icon: ChartNoAxesCombined,
    background: "from-cyan-500 via-blue-700 to-slate-950",
    glow: "bg-sky-300/40",
    accent: "border-cyan-100/50 bg-sky-200/10",
  },
};

const PURPOSE_VARIANTS = {
  seo: {
    orb: "-right-10 -top-16 h-48 w-48",
    rail: "left-[18%] top-0 -rotate-12",
    icon: "bottom-5 right-6 rotate-3",
  },
  actualidad: {
    orb: "-left-14 -top-20 h-52 w-52",
    rail: "right-[22%] top-0 rotate-12",
    icon: "bottom-5 left-6 -rotate-3",
  },
  criterio: {
    orb: "-right-16 bottom-[-5rem] h-56 w-56",
    rail: "left-[30%] top-0 rotate-6",
    icon: "right-6 top-5 -rotate-3",
  },
  caso: {
    orb: "-left-16 bottom-[-5rem] h-56 w-56",
    rail: "right-[30%] top-0 -rotate-6",
    icon: "left-6 top-5 rotate-3",
  },
};

const DEFAULT_VISUAL = TERRITORY_VISUALS["automatizacion-procesos"];
const DEFAULT_VARIANT = PURPOSE_VARIANTS.criterio;

function FallbackArtwork({ post, className }) {
  const visual = TERRITORY_VISUALS[post?.territory] || DEFAULT_VISUAL;
  const variant = PURPOSE_VARIANTS[post?.contentPurpose] || DEFAULT_VARIANT;
  const Icon = visual.Icon;

  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden bg-gradient-to-br ${visual.background} ${className}`}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.42) 1px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className={`absolute rounded-full blur-3xl ${visual.glow} ${variant.orb}`} />
      <div className={`absolute h-[150%] w-20 -translate-y-1/4 border-x border-white/15 bg-white/[0.04] ${variant.rail}`} />

      <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 sm:h-36 sm:w-36" />
      <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/[0.04] sm:h-20 sm:w-20" />
      <div className="absolute left-1/2 top-1/2 h-px w-[72%] -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-px w-[58%] -translate-x-1/2 -translate-y-1/2 rotate-[42deg] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className={`absolute flex h-16 w-16 items-center justify-center rounded-2xl border backdrop-blur-md shadow-2xl sm:h-20 sm:w-20 ${visual.accent} ${variant.icon}`}>
        <Icon className="h-8 w-8 text-white/90 sm:h-10 sm:w-10" strokeWidth={1.5} />
      </div>

      <div className="absolute bottom-5 right-5 grid grid-cols-3 gap-1.5 opacity-70">
        {Array.from({ length: 9 }, (_, index) => (
          <span key={index} className={`h-1.5 w-1.5 rounded-full ${index % 2 === 0 ? "bg-white/70" : "bg-white/25"}`} />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/45 to-transparent" />
    </div>
  );
}

export default function NewsVisual({ post, className = "aspect-video", eager = false }) {
  const [failedImage, setFailedImage] = useState(null);
  const hasUsableCover = post?.coverImage && failedImage !== post.coverImage;

  if (hasUsableCover) {
    return (
      <div className={`relative w-full overflow-hidden bg-slate-100 ${className}`}>
        <img
          src={post.coverImage}
          alt={post.title || ""}
          loading={eager ? "eager" : "lazy"}
          onError={() => setFailedImage(post.coverImage)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
    );
  }

  return <FallbackArtwork post={post} className={className} />;
}
