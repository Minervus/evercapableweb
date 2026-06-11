export function buildJournalRedirectRules(slugs: string[]): string {
  const rules = [
    "# Serve prerendered articles at clean and trailing-slash URLs (200 rewrite, not 301)",
    "# Netlify treats /path and /path/ as equivalent, so 301 trailing-slash rules loop.",
    "# Prerendered journal index (crawlable list of all articles)",
    "/journal /journal.html 200!",
    "/journal/ /journal.html 200!",
  ];

  for (const slug of slugs) {
    const cleanSlug = slug.replace(/^\/+|\/+$/g, "");
    rules.push(
      `/journal/${cleanSlug} /journal/${cleanSlug}.html 200!`,
      `/journal/${cleanSlug}/ /journal/${cleanSlug}.html 200!`,
    );
  }

  // SPA fallback must live in _redirects (after journal rules).
  rules.push("/* /index.html 200");

  return `${rules.join("\n")}\n`;
}
