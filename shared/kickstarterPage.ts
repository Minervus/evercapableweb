import { escapeHtmlText } from "./articleSeo";

export const KICKSTARTER_TITLE =
  "Free 12-week Kickstarter emails | Tony Nguyen Fit";

export const KICKSTARTER_DESCRIPTION =
  "Free weekly emails for 12 weeks from Tony Nguyen Fit. One food action each time, for people with decent meals, stalled fat loss, and flat energy.";

export const KICKSTARTER_H1 =
  "Fat loss has stalled, and your energy is still flat.";

export const KICKSTARTER_WEEKS = [
  {
    range: "Weeks 1–6",
    title: "See clearly",
    topics: [
      "Tracking",
      "Calories & TDEE",
      "Protein",
      "Food quality / crowding out processed food",
      "Hydration",
      "Daily movement (NEAT)",
    ],
  },
  {
    range: "Weeks 7–12",
    title: "Make it stick",
    topics: [
      "Habits that stick",
      "Food environment",
      "Carbs without fear",
      "Fibre",
      "Sleep, stress & food",
      "The scale and what's next",
    ],
  },
] as const;

/** Crawlable shell for the prerendered /kickstarter document. */
export function renderKickstarterStaticHtml(): string {
  const blocks = KICKSTARTER_WEEKS.map((block) => {
    const items = block.topics
      .map((topic) => `<li>${escapeHtmlText(topic)}</li>`)
      .join("");
    return `<h2>${escapeHtmlText(`${block.range}: ${block.title}`)}</h2><ul>${items}</ul>`;
  }).join("");

  return [
    `<main>`,
    `<nav aria-label="Site"><a href="/">Home</a> <a href="/audit">Audit + Roadmap</a></nav>`,
    `<h1>${escapeHtmlText(KICKSTARTER_H1)}</h1>`,
    `<p>${escapeHtmlText(KICKSTARTER_DESCRIPTION)}</p>`,
    `<p>The 12-week emails cost nothing.</p>`,
    blocks,
    `<p><a href="https://tonynguyenfit.com/audit">Audit + Roadmap, $149</a></p>`,
    `</main>`,
  ].join("");
}
