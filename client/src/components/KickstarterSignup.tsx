import { useEffect } from "react";

const MAILERLITE_ACCOUNT = "2511092";
const MAILERLITE_FORM = "50U4BI";
const MAILERLITE_SRC = "https://assets.mailerlite.com/js/universal.js";

type MailerLiteFn = ((...args: unknown[]) => unknown) & {
  q?: unknown[];
  fn?: {
    renderEmbeddedForm?: (payload: unknown) => void;
  };
};

type MailerLiteWindow = Window & {
  ml?: MailerLiteFn;
  __ml__initialized?: boolean;
};

function ensureUniversalScript() {
  if (document.querySelector(`script[src="${MAILERLITE_SRC}"]`)) return;

  const loader = document.createElement("script");
  loader.text =
    "(function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])" +
    ".push(arguments);},l=d.createElement(e),l.async=1,l.src=u," +
    "n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})" +
    `(window,document,'script','${MAILERLITE_SRC}','ml');` +
    `ml('account', '${MAILERLITE_ACCOUNT}');`;
  document.body.appendChild(loader);
}

/**
 * MailerLite scans `.ml-embedded` once, when universal.js boots. This section
 * mounts after that scan, so an empty container needs the same form payload.
 */
function requestEmbeddedForm() {
  const script = document.createElement("script");
  script.async = true;
  script.dataset.mlForm = MAILERLITE_FORM;
  script.src =
    `https://assets.mailerlite.com/jsonp/${MAILERLITE_ACCOUNT}/forms/${MAILERLITE_FORM}` +
    `?callback=ml.fn.renderEmbeddedForm&cache=${Date.now()}`;
  document.body.appendChild(script);
}

export function KickstarterSignup() {
  useEffect(() => {
    const container = document.querySelector<HTMLElement>(
      `.ml-embedded[data-form="${MAILERLITE_FORM}"]`,
    );
    if (!container) return;

    ensureUniversalScript();

    let requested = false;
    let retryTimer = 0;
    const started = Date.now();
    const timer = window.setInterval(() => {
      if (container.childElementCount > 0 || Date.now() - started > 8000) {
        window.clearInterval(timer);
        return;
      }

      const mlWindow = window as MailerLiteWindow;
      if (!mlWindow.__ml__initialized || !mlWindow.ml?.fn?.renderEmbeddedForm || requested) {
        return;
      }

      requested = true;
      window.clearInterval(timer);

      const alreadyRequested = Array.from(document.scripts).some((script) =>
        script.src.includes(`/jsonp/${MAILERLITE_ACCOUNT}/forms/${MAILERLITE_FORM}`),
      );

      if (!alreadyRequested) {
        requestEmbeddedForm();
        return;
      }

      // universal.js already asked for this form. If this node is a remount
      // (or the first scan missed it), fill the still-empty container once.
      retryTimer = window.setTimeout(() => {
        if (container.isConnected && container.childElementCount === 0) {
          requestEmbeddedForm();
        }
      }, 1200);
    }, 200);

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(retryTimer);
    };
  }, []);

  return (
    <section
      id="kickstarter"
      aria-label="Free 12-week kickstarter emails"
      className="py-16 md:py-24 bg-black border-t border-white/5 scroll-mt-20"
      data-testid="section-kickstarter"
    >
      <div className="max-w-[720px] mx-auto px-6 text-center">
        <p className="text-xs md:text-sm text-orange-500 mb-3 font-mono uppercase tracking-widest font-bold">
          Or start smaller
        </p>
        <p className="text-zinc-400 text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto mb-8">
          If the audit can wait, start with the free emails.
        </p>
        <div className="ml-embedded mx-auto w-full max-w-[400px]" data-form="50U4BI" />
      </div>
    </section>
  );
}
