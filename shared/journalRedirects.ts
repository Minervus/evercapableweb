export function buildJournalRedirectRules(slugs: string[]): string {
  const rules = [
    "# Prerendered journal article routes (exact paths avoid :slug matching .html)",
  ];

  for (const slug of slugs) {
    const cleanSlug = slug.replace(/^\/+|\/+$/g, "");
    rules.push(
      `/journal/${cleanSlug}/ /journal/${cleanSlug} 301!`,
      `/journal/${cleanSlug} /journal/${cleanSlug}.html 200!`,
    );
  }

  return `${rules.join("\n")}\n`;
}
