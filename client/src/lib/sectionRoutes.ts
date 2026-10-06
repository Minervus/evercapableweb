import { SITE_BASE_URL } from "@shared/articleSeo";

/** Homepage URL. Alias routes must canonicalize here, never to themselves. */
export const HOME_CANONICAL = `${SITE_BASE_URL}/`;

export const HOME_TITLE = "Tony Nguyen Fit — Nutrition-led coaching";

/**
 * Single-segment paths that render the homepage and scroll to a section.
 * These are not real pages: keep them out of the sitemap.
 */
export const SECTION_ALIASES: Record<string, string> = {
  about: "coach",
  contact: "contact",
  pricing: "pricing",
  faq: "faq",
  coaching: "pricing",
  programs: "pricing",
};

export function aliasFromPath(path: string): string {
  const [pathname] = path.split(/[?#]/);
  return pathname.replace(/^\/+|\/+$/g, "");
}

export function sectionIdForPath(path: string): string | undefined {
  return SECTION_ALIASES[aliasFromPath(path)];
}

let applyingHead = false;

/** Collapse canonical/og:url to one URL so aliases cannot rank as the homepage. */
export function ensureCanonical(href: string) {
  if (applyingHead) return;
  applyingHead = true;
  try {
    const links = Array.from(document.querySelectorAll('link[rel="canonical"]'));
    const primary = (links[0] as HTMLLinkElement | undefined) ?? document.createElement("link");
    if (!primary.isConnected) {
      primary.rel = "canonical";
      document.head.appendChild(primary);
    }
    if (primary.href !== href) primary.href = href;
    for (const extra of links.slice(1)) extra.remove();

    const ogTags = Array.from(document.querySelectorAll('meta[property="og:url"]'));
    const og = (ogTags[0] as HTMLMetaElement | undefined) ?? document.createElement("meta");
    if (!og.isConnected) {
      og.setAttribute("property", "og:url");
      document.head.appendChild(og);
    }
    if (og.getAttribute("content") !== href) og.setAttribute("content", href);
    for (const extra of ogTags.slice(1)) extra.remove();
  } finally {
    applyingHead = false;
  }
}

/** Keep a single canonical while Helmet or prerender tags settle. */
export function watchCanonical(href: string) {
  const apply = () => ensureCanonical(href);
  apply();
  const observer = new MutationObserver(apply);
  observer.observe(document.head, { childList: true });
  return () => observer.disconnect();
}

export function watchNoIndex() {
  const apply = () => {
    document.querySelectorAll('link[rel="canonical"]').forEach((node) => node.remove());
    document.querySelectorAll('meta[property="og:url"]').forEach((node) => node.remove());
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex");
  };
  apply();
  const observer = new MutationObserver(apply);
  observer.observe(document.head, { childList: true });
  return () => {
    observer.disconnect();
    document.querySelector('meta[name="robots"][content="noindex"]')?.remove();
  };
}

export function scrollToSectionId(id: string, behavior: ScrollBehavior = "auto") {
  const headerOffset = 100;
  let attempts = 0;
  let followUp = 0;
  let attemptTimer = 0;
  let cancelled = false;

  const align = () => {
    const el = document.getElementById(id);
    if (!el) return false;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: Math.max(0, top), behavior });
    return true;
  };

  const tick = () => {
    if (cancelled) return;
    if (align()) {
      followUp = window.setTimeout(() => {
        if (!cancelled) align();
      }, 400);
      return;
    }
    attempts += 1;
    if (attempts < 40) {
      attemptTimer = window.setTimeout(tick, 100);
    }
  };

  tick();
  return () => {
    cancelled = true;
    window.clearTimeout(followUp);
    window.clearTimeout(attemptTimer);
  };
}
