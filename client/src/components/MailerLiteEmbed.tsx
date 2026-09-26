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

function siteFormCss(id: string): string {
  const root = `#${CSS.escape(id)}.ml-form-embedContainer`;
  return `
    ${root} .ml-form-embedWrapper.embedForm {
      background-color: #111111 !important;
      border: 1px solid #3f3f46 !important;
      border-radius: 2px !important;
      box-shadow: none !important;
      display: block !important;
      width: 100% !important;
      max-width: 100% !important;
    }
    ${root} .ml-form-embedWrapper .ml-form-embedBody,
    ${root} .ml-form-embedWrapper .ml-form-successBody {
      padding: 28px 24px 8px !important;
    }
    ${root} .ml-form-embedContent h4,
    ${root} .ml-form-successContent h4 {
      color: #ffffff !important;
      font-family: Inter, sans-serif !important;
      font-size: 1.35rem !important;
      font-weight: 700 !important;
      letter-spacing: -0.02em !important;
      line-height: 1.25 !important;
      text-align: left !important;
      margin: 0 0 10px !important;
    }
    ${root} .ml-form-embedContent p,
    ${root} .ml-form-successContent p {
      color: #a1a1aa !important;
      font-family: Inter, sans-serif !important;
      font-size: 0.95rem !important;
      font-weight: 400 !important;
      line-height: 1.6 !important;
      text-align: left !important;
      margin: 0 0 18px !important;
    }
    ${root} .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input.form-control {
      background-color: #18181b !important;
      color: #ffffff !important;
      border: 1px solid #52525b !important;
      border-radius: 2px !important;
      font-family: Inter, sans-serif !important;
      font-size: 15px !important;
      line-height: 1.4 !important;
      padding: 12px 14px !important;
      height: auto !important;
      box-shadow: none !important;
    }
    ${root} .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input.form-control::placeholder {
      color: #71717a !important;
    }
    ${root} .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input.form-control:focus {
      outline: 2px solid #f97316 !important;
      border-color: #f97316 !important;
    }
    ${root} .ml-form-fieldRow {
      margin-bottom: 12px !important;
    }
    ${root} .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button.primary {
      background-color: #f97316 !important;
      border-color: #f97316 !important;
      color: #ffffff !important;
      border-radius: 2px !important;
      box-shadow: none !important;
      font-family: Inter, sans-serif !important;
      font-size: 12px !important;
      font-weight: 700 !important;
      letter-spacing: 0.14em !important;
      text-transform: uppercase !important;
      padding: 14px 16px !important;
      margin-top: 4px !important;
      cursor: pointer !important;
    }
    ${root} .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button.primary:hover {
      background-color: #fb923c !important;
      border-color: #fb923c !important;
    }
  `;
}

function applySiteFormTheme(root: HTMLElement) {
  const container = root.querySelector<HTMLElement>(".ml-form-embedContainer");
  if (!container?.id) return;
  const existing = root.querySelector<HTMLStyleElement>("style[data-kickstarter-theme]");
  const css = siteFormCss(container.id);
  if (existing) {
    if (existing.textContent !== css) existing.textContent = css;
    return;
  }
  const style = document.createElement("style");
  style.dataset.kickstarterTheme = "true";
  style.textContent = css;
  root.appendChild(style);
}

export function MailerLiteEmbed({
  className = "",
  appearance = "default",
}: {
  className?: string;
  appearance?: "default" | "site";
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    ensureUniversalScript();

    const themeObserver =
      appearance === "site"
        ? new MutationObserver(() => applySiteFormTheme(container))
        : null;
    if (themeObserver) {
      themeObserver.observe(container, { childList: true, subtree: true });
    }

    let requested = false;
    let retryTimer = 0;
    const started = Date.now();
    const timer = window.setInterval(() => {
      if (appearance === "site" && container.childElementCount > 0) {
        applySiteFormTheme(container);
      }
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
      themeObserver?.disconnect();
    };
  }, [appearance]);

  return (
    <div
      ref={containerRef}
      className={`ml-embedded mx-auto w-full max-w-[440px] min-h-[20rem] overflow-visible ${className}`.trim()}
      data-form={MAILERLITE_FORM}
    />
  );
}
