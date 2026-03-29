import { useEffect } from "react";

interface TermsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
    // Lock body scroll while modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            <style>{`
        @keyframes termsSlideUp {
          from {
            opacity: 0;
            transform: translateY(32px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .terms-modal-enter {
          animation: termsSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .terms-scroll::-webkit-scrollbar {
          width: 3px;
        }
        .terms-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .terms-scroll::-webkit-scrollbar-thumb {
          background-color: #ea580c;
          border-radius: 9999px;
        }
        .terms-scroll {
          scrollbar-width: thin;
          scrollbar-color: #ea580c transparent;
        }
      `}</style>

            {/* Backdrop */}
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
                onClick={onClose}
                data-testid="modal-terms-backdrop"
            >
                {/* Modal Container */}
                <div
                    className="terms-modal-enter relative flex flex-col max-w-3xl w-[95%] max-h-[85vh] bg-[#0A0A0A] border border-orange-500/20 rounded-sm overflow-hidden shadow-[0_0_60px_rgba(249,115,22,0.08)]"
                    onClick={(e) => e.stopPropagation()}
                    data-testid="modal-terms"
                >
                    {/* Sticky Header */}
                    <div className="sticky top-0 z-10 flex items-center justify-between bg-[#0D0D0D] border-b border-orange-500/10 px-5 py-4">
                        <div>
                            <p className="text-[10px] font-mono text-orange-500 uppercase tracking-[0.2em]">
                                {"// TERMS_OF_SERVICE_v1.0"}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="font-mono text-[10px] tracking-widest text-zinc-500 hover:text-orange-500 border border-white/10 hover:border-orange-500/30 px-3 py-1.5 rounded-sm transition-all"
                            aria-label="Close terms modal"
                            data-testid="button-terms-modal-close"
                        >
                            [X] CLOSE_SESSION
                        </button>
                    </div>

                    {/* Scrollable Body */}
                    <div className="terms-scroll overflow-y-auto p-6 md:p-8 space-y-6 text-zinc-400 text-sm leading-relaxed">
                        {/* Title block */}
                        <div className="space-y-1">
                            <p className="font-mono text-orange-500 text-xs tracking-widest uppercase">
                                {"// TERMS_OF_SERVICE: THE_PARTNERSHIP_AGREEMENT"}
                            </p>
                            <p className="text-zinc-500 text-xs font-mono">
                                Last Updated: March 2026
                            </p>
                        </div>

                        <p>
                            By enrolling in an EverCapable protocol, you are entering into a performance-based partnership. This is not a passive subscription; it is a collaborative engineering project focused on your long-term biology.
                        </p>

                        {/* Section 01 */}
                        <div className="space-y-3">
                            <p className="font-mono text-orange-500 text-xs tracking-widest uppercase">
                                {"[01] THE_24_WEEK_COMMITMENT"}
                            </p>
                            <p>
                                Sustainable habit architecture cannot be built in 30 days. By starting Stage 01, you commit to a full 24-week (6-month) progression. This timeframe is required to establish a new biological baseline and ensure the "Rebound Effect" is neutralized.
                            </p>
                        </div>

                        {/* Section 02 */}
                        <div className="space-y-3">
                            <p className="font-mono text-orange-500 text-xs tracking-widest uppercase">
                                {"[02] THE_90-DAY_SYSTEM_GUARANTEE"}
                            </p>
                            <p>
                                If you maintain 90% protocol consistency and we don't hit your primary Stage 01 milestones within the first 90 days,{" "}
                                <span className="text-white font-bold">I coach you for FREE</span>{" "}
                                until we do. To validate this warranty, the following "Ground Truth" conditions must be met:
                            </p>
                            <ul className="space-y-2 pl-4 border-l border-orange-500/15">
                                <li>
                                    <span className="text-white font-medium">Hardware Sync:</span>{" "}
                                    Maintain consistent telemetry data (Whoop, Oura, or Apple).
                                </li>
                                <li>
                                    <span className="text-white font-medium">Protocol Execution:</span>{" "}
                                    Complete at least 90% of assigned habit layers and check-ins.
                                </li>
                                <li>
                                    <span className="text-white font-medium">Communication:</span>{" "}
                                    Respond to bi-weekly debriefs and recalibration prompts.
                                </li>
                            </ul>
                            <p className="text-white/60 border border-orange-500/10 rounded-sm p-3 bg-orange-500/[0.03] text-xs font-mono">
                                You risk the effort; I risk my time and reputation.
                            </p>
                        </div>

                        {/* Section 03 */}
                        <div className="space-y-3">
                            <p className="font-mono text-orange-500 text-xs tracking-widest uppercase">
                                {"[03] PAYMENT_LOGISTICS & CANCELLATIONS"}
                            </p>
                            <ul className="space-y-2 pl-4 border-l border-orange-500/15">
                                <li>
                                    <span className="text-white font-medium">Monthly Billing:</span>{" "}
                                    Fees are processed every 30 days.
                                </li>
                                <li>
                                    <span className="text-white font-medium">Commitment:</span>{" "}
                                    While I ask for a 6-month commitment to ensure your results, I understand that life changes. If you genuinely feel the partnership is no longer a fit, we require a 30-day notice period to offboard you from the system and open your slot to the waitlist.
                                </li>
                                <li>
                                    <span className="text-white font-medium">Refunds:</span>{" "}
                                    We do not offer refunds for "lack of motivation." We offer results through the Performance Warranty.
                                </li>
                            </ul>
                        </div>

                        {/* Section 04 */}
                        <div className="space-y-3">
                            <p className="font-mono text-orange-500 text-xs tracking-widest uppercase">
                                {"[04] BIOLOGICAL_LIABILITY"}
                            </p>
                            <p>
                                While our methodology is data-driven, you acknowledge that I am a Lead Engineer/Coach, not a medical doctor. Always consult with a physician before beginning any intensive physical protocol. You assume all risk for physical activity and nutritional changes.
                            </p>
                        </div>

                        {/* Section 05 */}
                        <div className="space-y-3">
                            <p className="font-mono text-orange-500 text-xs tracking-widest uppercase">
                                {"[05] SYSTEM_TERMINATION"}
                            </p>
                            <p>
                                EverCapable reserves the right to terminate the partnership if a client displays consistent "Signal Loss" (no communication/data for 30+ days) or behaves in a way that compromises the professional integrity of the coaching relationship.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="pt-2 pb-2 border-t border-orange-500/10">
                            <p className="font-mono text-xs text-zinc-500">
                                <span className="text-orange-500">{"CONTACT_ENGINEERING:"}</span>{" "}
                                <a
                                    href="mailto:hello@evercapable.com"
                                    className="hover:text-white transition-colors underline underline-offset-2"
                                >
                                    hello@evercapable.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
