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

export default function NewsVisual({ post, className = "aspect-video", eager = false }) {
  const [failedImage, setFailedImage] = useState(null);
  const hasUsableCover = post?.coverImage && failedImage !== post.coverImage;
  const coverStyle = {
    "--news-cover-position-mobile": post?.coverFocus?.mobile || "50% 50%",
    "--news-cover-position-desktop": post?.coverFocus?.desktop || "50% 50%",
  };

  if (hasUsableCover) {
    return (
      <div className={`relative w-full overflow-hidden bg-slate-100 ${className}`}>
        <img
          src={post.coverImage}
          alt={post.coverAlt || post.title || ""}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          width={post.coverWidth || 1600}
          height={post.coverHeight || 900}
          style={coverStyle}
          onError={() => setFailedImage(post.coverImage)}
          className="news-cover-image h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
    );
  }

  return <FallbackArtwork post={post} className={className} />;
}
