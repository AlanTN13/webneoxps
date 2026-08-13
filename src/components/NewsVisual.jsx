import { getNewsPurposeLabel, getTerritoryConfig } from "../data/news/contract";

export default function NewsVisual({ post, className = "aspect-video", eager = false }) {
  const territory = getTerritoryConfig(post?.territory);

  if (post?.coverImage) {
    return (
      <div className={`relative w-full overflow-hidden bg-slate-100 ${className}`}>
        <img
          src={post.coverImage}
          alt={post.title || ""}
          loading={eager ? "eager" : "lazy"}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
    );
  }

  return (
    <div className={`relative flex w-full items-end overflow-hidden bg-gradient-to-br ${territory.visualClassName} ${className}`}>
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-white/15" />
      <div className="absolute right-8 top-8 h-20 w-20 rounded-full border border-white/10" />
      <div className="relative p-6 text-white sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
          {getNewsPurposeLabel(post)}
        </p>
        <p className="mt-2 max-w-md text-lg font-semibold leading-snug sm:text-xl">
          {post?.territory ? territory.label : post?.category || "NexOps Insights"}
        </p>
      </div>
    </div>
  );
}
