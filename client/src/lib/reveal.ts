/**
 * Scroll reveals, tuned so content is never left invisible.
 *
 * The old pattern was `initial={{ opacity: 0, y: 20 }}` +
 * `viewport={{ margin: "-100px" }}` + per-child delays that compounded to
 * ~0.8s. On a slow phone a whole screen could sit blank while you scrolled
 * past it, which reads as broken.
 *
 * Fixes: trigger slightly *before* the element enters view (positive margin),
 * cut the duration, drop the translate, and cap stagger.
 */

export const REVEAL_DURATION = 0.3;

/** Start the fade 120px before the element reaches the viewport. */
export const REVEAL_VIEWPORT = { once: true, margin: "120px 0px" } as const;

export const reveal = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: REVEAL_VIEWPORT,
  transition: { duration: REVEAL_DURATION, ease: "easeOut" },
} as const;

/** Same, with a small capped stagger for grids. */
export function revealAt(index: number) {
  return {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: REVEAL_VIEWPORT,
    transition: {
      duration: REVEAL_DURATION,
      delay: Math.min(index, 3) * 0.05,
      ease: "easeOut",
    },
  } as const;
}
