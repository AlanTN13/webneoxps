import { useState } from "react";
import {
  BrainCircuit,
  ChartNoAxesCombined,
  GitBranch,
  Workflow,
} from "lucide-react";
import whatsappLogo from "../assets/whatsapp.svg";

const TERRITORY_VISUALS = {
  "automatizacion-procesos": {
    Icon: Workflow,
    background: "from-indigo-700 via-indigo-800 to-slate-950",
    glow: "bg-violet-300/25",
  },
  "ia-aplicada-empresas": {
    Icon: BrainCircuit,
    background: "from-violet-700 via-indigo-800 to-slate-950",
    glow: "bg-indigo-300/25",
  },
  "crm-automatizacion-comercial": {
    Icon: GitBranch,
    background: "from-sky-700 via-blue-800 to-slate-950",
    glow: "bg-cyan-300/25",
  },
  "data-analytics": {
    Icon: ChartNoAxesCombined,
    background: "from-cyan-700 via-blue-800 to-slate-950",
    glow: "bg-sky-300/25",
  },
};

const DEFAULT_VISUAL = TERRITORY_VISUALS["automatizacion-procesos"];

function FallbackArtwork({ post, className }) {
  const visual = TERRITORY_VISUALS[post?.territory] || DEFAULT_VISUAL;
  const Icon = visual.Icon;

  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden bg-gradient-to-br ${visual.background} ${className}`}
    >
      <div className={`absolute -right-16 -top-20 h-64 w-64 rounded-full blur-3xl ${visual.glow}`} />
      <div className="absolute inset-y-0 left-[18%] w-px bg-white/10" />
      <div className="absolute inset-y-0 right-[18%] w-px bg-white/10" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
      <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.04] sm:h-32 sm:w-32" />
      <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-sm sm:h-20 sm:w-20">
        <Icon className="h-8 w-8 text-white/85 sm:h-10 sm:w-10" strokeWidth={1.4} />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/35 to-transparent" />
    </div>
  );
}

const BRAND_LOGOS = {
  meta: "/meta.svg",
  whatsapp: whatsappLogo,
};

function CoverContext({ editorial }) {
  if (!editorial?.label) return null;
  const logo = BRAND_LOGOS[editorial.brandKey];

  if (editorial.kind === "analysis") {
    return (
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent px-4 pb-4 pt-16 sm:px-5 sm:pb-5">
        <p className="max-w-[18rem] text-sm font-semibold leading-tight tracking-[-0.01em] text-white sm:text-base">
          {editorial.label}
        </p>
        <span className="mt-2 block h-0.5 w-10 rounded-full" style={{ backgroundColor: editorial.accent }} aria-hidden="true" />
      </div>
    );
  }

  if (editorial.kind === "brand") {
    return (
      <div className="absolute left-3 top-3 flex max-w-[calc(100%-1.5rem)] items-center gap-2 rounded-full border border-white/60 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-slate-950/10 backdrop-blur sm:left-4 sm:top-4 sm:text-sm">
        {logo && <img src={logo} alt="" className="h-4 w-4 object-contain sm:h-5 sm:w-5" />}
        <span className="truncate">{editorial.label}</span>
        <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: editorial.accent }} aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent px-4 pb-4 pt-14 sm:px-5 sm:pb-5">
      <p className="border-l-2 pl-3 text-xs font-semibold uppercase tracking-[0.12em] text-white sm:text-sm" style={{ borderColor: editorial.accent }}>
        {editorial.label}
      </p>
    </div>
  );
}

export default function NewsVisual({ post, className = "aspect-video", eager = false, sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" }) {
  const [failedImage, setFailedImage] = useState(null);
  const hasUsableCover = post?.coverImage && failedImage !== post.coverImage;
  const editorial = post?.coverEditorial;

  if (hasUsableCover) {
    return (
      <div className={`relative w-full overflow-hidden bg-slate-100 ${className}`}>
        <img
          src={post.coverImage}
          alt={editorial?.alt || post.title || ""}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          decoding="async"
          sizes={sizes}
          onError={() => setFailedImage(post.coverImage)}
          style={{
            "--cover-position-mobile": editorial?.objectPositionMobile || "50% 50%",
            "--cover-position-desktop": editorial?.objectPositionDesktop || editorial?.objectPositionMobile || "50% 50%",
          }}
          className="insight-cover-image h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <CoverContext editorial={editorial} />
      </div>
    );
  }

  return <FallbackArtwork post={post} className={className} />;
}
