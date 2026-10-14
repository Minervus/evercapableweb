/**
 * After a deploy, a tab that loaded the old build asks for code files
 * (assets/Section-[hash].js) that no longer exist. Reloading picks up the new
 * build. The sessionStorage stamp stops a reload loop if the files are
 * genuinely missing.
 */
const RELOAD_KEY = "chunk-reload-at";
const RELOAD_COOLDOWN_MS = 10_000;

const CHUNK_ERROR =
  /Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed|Loading chunk .* failed|Unable to preload CSS/i;

export function isChunkLoadError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error ?? "");
  return CHUNK_ERROR.test(message);
}

/** Reload once to fetch the new build. Returns false if we already tried recently. */
export function reloadForNewBuild(): boolean {
  try {
    const last = Number(sessionStorage.getItem(RELOAD_KEY) ?? 0);
    if (Date.now() - last < RELOAD_COOLDOWN_MS) return false;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    // Storage blocked: reload anyway. Worst case is one reload per failed load.
  }
  window.location.reload();
  return true;
}

/**
 * Vite fires this when a lazy chunk or its CSS fails to load. The event is not
 * cancelled: preventDefault() makes the import resolve to undefined, which then
 * crashes as an unrelated TypeError. Left alone, the import rejects with the real
 * error, and if the reload is skipped (cooldown) the ErrorBoundary shows its fallback.
 */
export function listenForStaleChunks() {
  window.addEventListener("vite:preloadError", () => {
    reloadForNewBuild();
  });
}
