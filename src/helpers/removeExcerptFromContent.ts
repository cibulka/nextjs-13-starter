export function removeExcerptFromContent(content: string) {
  const lines = content.split('\n---\n');
  return lines.length === 2 ? lines.slice(1).join('\n---\n') : content;
}
