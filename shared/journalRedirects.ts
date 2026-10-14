export function buildJournalRedirectRules(slugs: string[]): string {
  const rules = [
    "# Serve prerendered articles at clean and trailing-slash URLs (200 rewrite, not 301)",
    "# Netlify treats /path and /path/ as equivalent, so 301 trailing-slash rules loop.",
    "# Prerendered journal index (crawlable list of all articles)",
    "/journal /journal.html 200!",
    "/journal/ /journal.html 200!",
    "# Prerendered audit landing page",
    "/audit /audit.html 200!",
    "/audit/ /audit.html 200!",
    "# Prerendered Kickstarter landing page",
    "/kickstarter /kickstarter.html 200!",
    "/kickstarter/ /kickstarter.html 200!",
  ];

  for (const slug of slugs) {
    const cleanSlug = slug.replace(/^\/+|\/+$/g, "");
    rules.push(
      `/journal/${cleanSlug} /journal/${cleanSlug}.html 200!`,
      `/journal/${cleanSlug}/ /journal/${cleanSlug}.html 200!`,
    );
  }

  // /protocol is an alias of the audit page. Serve that document (canonical stays /audit).
  // Do not list it in the sitemap. Homepage section aliases (/about, /pricing, …)
  // are client routes on index.html and are not redirects or sitemap URLs.
  rules.push(
    "/protocol /audit.html 200!",
    "/protocol/ /audit.html 200!",
  );

  // A missing build file (an old tab asking for last deploy's assets/*.js) must 404.
  // Without this the SPA fallback answers with index.html and a 200, the script
  // fails to parse, and the page renders blank. Not forced, so files that exist
  // are still served as normal.
  rules.push("/assets/* /404.html 404");

  // SPA fallback must live in _redirects (after journal rules).
  rules.push("/* /index.html 200");

  return `${rules.join("\n")}\n`;
}
