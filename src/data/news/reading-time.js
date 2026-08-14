export const WORDS_PER_MINUTE = 220;

function visibleTextFromBlock(block) {
  if (!block || typeof block !== "object") return [];

  if (block.type === "list") {
    return Array.isArray(block.items) ? block.items.filter((item) => typeof item === "string") : [];
  }

  if (block.type === "image") {
    return typeof block.caption === "string" ? [block.caption] : [];
  }

  return typeof block.text === "string" ? [block.text] : [];
}

export function getContentWordCount(content = []) {
  if (!Array.isArray(content)) return 0;

  return content
    .flatMap(visibleTextFromBlock)
    .join(" ")
    .trim()
    .split(/\s+/u)
    .filter(Boolean).length;
}

export function getReadingTimeMinutes(post) {
  const totalWords = getContentWordCount(post?.content);
  return Math.max(1, Math.ceil(totalWords / WORDS_PER_MINUTE));
}

export function formatReadingTime(post) {
  return `${getReadingTimeMinutes(post)} min de lectura`;
}
