import { useEffect, useRef } from "react";

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
 * MailerLite scans `.ml-embedded` once, when universal.js boots. A section
 * that mounts after that scan needs the same form payload if its container
 * is still empty.
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

export function MailerLiteEmbed({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
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
    <div
      ref={containerRef}
      className={`ml-embedded mx-auto w-full max-w-[400px] ${className}`.trim()}
      data-form={MAILERLITE_FORM}
    />
  );
}
