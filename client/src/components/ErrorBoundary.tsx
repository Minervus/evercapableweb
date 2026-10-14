import { Component, type ErrorInfo, type ReactNode } from "react";
import { isChunkLoadError, reloadForNewBuild } from "@/lib/chunkReload";
import { CONTACT_EMAIL } from "@/components/LegalPage";

type State = { error: Error | null };

/**
 * Last line of defence: a render error anywhere shows this instead of a blank page.
 * A stale-build chunk error reloads once on its own before falling back here.
 */
export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Page failed to render:", error, info.componentStack);
    if (isChunkLoadError(error)) reloadForNewBuild();
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-orange-500 font-bold mb-4">
            Something went wrong
          </p>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            This page didn't load properly.
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-8">
            The site may have just been updated. Reloading usually fixes it.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-orange-500 hover:bg-orange-400 text-white font-bold tracking-widest text-sm uppercase px-8 py-4 rounded-sm transition-colors"
          >
            Reload the page
          </button>
          <p className="mt-6 text-sm text-muted-foreground">
            Still stuck? Email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4 hover:text-foreground">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
      </main>
    );
  }
}
