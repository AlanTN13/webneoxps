import { Link } from "react-router-dom";

function ExternalOrInternalLink({ href, children, className }) {
  if (href?.startsWith("/")) {
    return <Link to={href} className={className}>{children}</Link>;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
}

export default function NewsContent({ content = [] }) {
  return (
    <div>
      {content.map((block, index) => {
        const key = `${block.type}-${index}`;
        if (block.type === "heading") {
          return block.level === 3 ? (
            <h3 key={key} className="mb-3 mt-8 text-xl font-semibold text-slate-900 md:text-2xl">{block.text}</h3>
          ) : (
            <h2 key={key} className="mb-4 mt-10 text-2xl font-bold text-slate-900 md:text-3xl">{block.text}</h2>
          );
        }
        if (block.type === "list") {
          const Tag = block.ordered ? "ol" : "ul";
          return (
            <Tag key={key} className={`my-5 ml-6 space-y-2 text-slate-700 ${block.ordered ? "list-decimal" : "list-disc"}`}>
              {block.items.map((item, itemIndex) => <li key={`${key}-${itemIndex}`}>{item}</li>)}
            </Tag>
          );
        }
        if (block.type === "quote") {
          return <blockquote key={key} className="my-6 border-l-4 border-indigo-300 pl-5 text-lg italic text-slate-700">{block.text}</blockquote>;
        }
        if (block.type === "link") {
          return (
            <p key={key} className="my-4 text-base leading-8 md:text-lg">
              <ExternalOrInternalLink href={block.href} className="font-medium text-indigo-600 underline decoration-indigo-300 underline-offset-4 hover:text-indigo-700">{block.text}</ExternalOrInternalLink>
            </p>
          );
        }
        if (block.type === "image") {
          return (
            <figure key={key} className="my-10">
              <img src={block.src} alt={block.alt || ""} loading="lazy" className="mx-auto max-h-[480px] w-full rounded-2xl object-cover shadow-sm" />
              {block.caption && <figcaption className="mt-3 text-center text-sm text-slate-500">{block.caption}</figcaption>}
            </figure>
          );
        }
        return <p key={key} className="my-4 text-base leading-8 text-slate-700 md:text-lg">{block.text}</p>;
      })}
    </div>
  );
}
