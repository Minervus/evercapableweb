import { useEffect } from "react";
import { X } from "lucide-react";

interface PrivacyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
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
        @keyframes privacyFadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .privacy-modal-enter {
          animation: privacyFadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

            {/* Backdrop */}
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
                onClick={onClose}
                data-testid="modal-privacy-backdrop"
            >
                {/* Modal Container */}
                <div
                    className="privacy-modal-enter relative flex flex-col max-w-3xl w-[90%] max-h-[85vh] bg-[#0A0A0A] border border-white/10 rounded-sm overflow-hidden shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                    data-testid="modal-privacy"
                >
                    {/* Sticky Header */}
                    <div className="sticky top-0 z-10 flex items-center justify-between bg-[#0D0D0D] border-b border-white/5 p-4">
                        <div>
                            <p className="text-[10px] font-mono text-orange-500 uppercase tracking-[0.2em] mb-0.5">
                                {"// SYSTEM_DOC"}
                            </p>
                            <h2 className="text-white font-bold text-base tracking-tight">
                                Privacy Policy
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="flex items-center justify-center w-8 h-8 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all"
                            aria-label="Close privacy policy"
                            data-testid="button-modal-close"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Scrollable Body */}
                    <div className="overflow-y-auto p-6 md:p-8 space-y-6 text-zinc-400 text-sm leading-relaxed">
                        {/* Title block */}
                        <div className="space-y-1">
                            <p className="font-mono text-orange-500 text-xs tracking-widest uppercase">
                                {"// SYSTEM_PRIVACY_PROTOCOL v1.0"}
                            </p>
                            <p className="text-zinc-500 text-xs font-mono">
                                Last Updated: March 2026
                            </p>
                        </div>

                        <p>
                            At EverCapable, we treat your biological data with the same precision we use to build your protocols. We believe that your "Ground Truth"—your biometrics, habits, and health history—is your most valuable asset.
                        </p>

                        {/* Section 01 */}
                        <div className="space-y-3">
                            <p className="font-mono text-orange-500 text-xs tracking-widest uppercase">
                                {"[01] DATA_COLLECTION: WHAT WE MONITOR"}
                            </p>
                            <p>
                                To execute the EverCapable Methodology, we collect specific data points required for system calibration:
                            </p>
                            <ul className="space-y-2 pl-4 border-l border-white/5">
                                <li>
                                    <span className="text-white font-medium">Identity Data:</span>{" "}
                                    Name, email, and contact information.
                                </li>
                                <li>
                                    <span className="text-white font-medium">Biological Telemetry:</span>{" "}
                                    Heart Rate Variability (HRV), sleep cycles, activity levels, and recovery scores imported via your wearable hardware (Whoop, Oura, Apple Watch).
                                </li>
                                <li>
                                    <span className="text-white font-medium">Nutrition &amp; Habit Logs:</span>{" "}
                                    Information you provide regarding food intake, hydration, and daily routine execution.
                                </li>
                                <li>
                                    <span className="text-white font-medium">Performance Metrics:</span>{" "}
                                    Body composition, strength markers, and subjective energy ratings.
                                </li>
                            </ul>
                        </div>

                        {/* Section 02 */}
                        <div className="space-y-3">
                            <p className="font-mono text-orange-500 text-xs tracking-widest uppercase">
                                {"[02] SYSTEM_UTILIZATION: HOW WE USE YOUR DATA"}
                            </p>
                            <p>
                                Your data is used exclusively to refine your 6-Stage Protocol:
                            </p>
                            <ul className="space-y-2 pl-4 border-l border-white/5">
                                <li>
                                    <span className="text-white font-medium">Recalibration:</span>{" "}
                                    We audit your telemetry to adjust your nutrition and training targets every 14–30 days.
                                </li>
                                <li>
                                    <span className="text-white font-medium">Communication:</span>{" "}
                                    To provide 1-on-1 coaching, debriefs, and video briefings.
                                </li>
                                <li>
                                    <span className="text-white font-medium">System Integrity:</span>{" "}
                                    To validate progress against your 6-Month Guarantee.
                                </li>
                            </ul>
                            <p className="text-white/70 border border-white/5 rounded-sm p-3 bg-white/[0.02] font-medium">
                                We do not, and will never, sell your biological or personal data to third parties.
                            </p>
                        </div>

                        {/* Section 03 */}
                        <div className="space-y-3">
                            <p className="font-mono text-orange-500 text-xs tracking-widest uppercase">
                                {"[03] DATA_ARCHITECTURE: SECURITY MEASURES"}
                            </p>
                            <ul className="space-y-2 pl-4 border-l border-white/5">
                                <li>
                                    <span className="text-white font-medium">Encryption:</span>{" "}
                                    All data transmitted between your wearables and our platform is encrypted.
                                </li>
                                <li>
                                    <span className="text-white font-medium">Access Control:</span>{" "}
                                    Only the Lead Engineer and essential support staff have access to your specific biometric logs.
                                </li>
                                <li>
                                    <span className="text-white font-medium">Third-Party Integrations:</span>{" "}
                                    When you sync your devices, you are governed by their respective privacy architectures. You can revoke this access at any time.
                                </li>
                            </ul>
                        </div>

                        {/* Section 04 */}
                        <div className="space-y-3">
                            <p className="font-mono text-orange-500 text-xs tracking-widest uppercase">
                                {"[04] USER_CONTROL: YOUR RIGHTS"}
                            </p>
                            <p>You own your data. At any point, you may:</p>
                            <ul className="space-y-2 pl-4 border-l border-white/5">
                                <li>
                                    <span className="text-white font-medium">Request an Audit:</span>{" "}
                                    Ask to see exactly what data we have on file.
                                </li>
                                <li>
                                    <span className="text-white font-medium">Purge the System:</span>{" "}
                                    Request the permanent deletion of your coaching logs.
                                </li>
                                <li>
                                    <span className="text-white font-medium">Opt-Out:</span>{" "}
                                    Disconnect your telemetry devices from our system at any time.
                                </li>
                            </ul>
                        </div>

                        {/* Section 05 */}
                        <div className="space-y-3">
                            <p className="font-mono text-orange-500 text-xs tracking-widest uppercase">
                                {"[05] PROTOCOL_CHANGES"}
                            </p>
                            <p>
                                Any significant changes to how we handle your biological data will be communicated directly to your primary email.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="pt-2 pb-2 border-t border-white/5">
                            <p className="font-mono text-xs text-zinc-500">
                                <span className="text-orange-500">{"CONTACT_ENGINEERING:"}</span>{" "}
                                <a
                                    href="mailto:privacy@evercapable.com"
                                    className="hover:text-white transition-colors underline underline-offset-2"
                                >
                                    privacy@evercapable.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
