import { escapeHtmlText } from "./articleSeo";

export const KICKSTARTER_TITLE =
  "Free 12-week Kickstarter emails | Tony Nguyen Fit";

export const KICKSTARTER_DESCRIPTION =
  "One short email a week for 12 weeks, with one food action each time. Free from Tony Nguyen Fit, for people who eat well and still aren't losing fat.";

export const KICKSTARTER_H1 =
  "You eat pretty well. The fat loss still stalls.";

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
    blocks,
    `<p><a href="/audit">Audit + Roadmap, $149</a></p>`,
    `</main>`,
  ].join("");
}
