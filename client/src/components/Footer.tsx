import { Instagram, Youtube, Globe, Mail } from "lucide-react";
import logoIconDark from "@assets/tn-logo-on-black-128.png";
import logoIconLight from "@assets/tn-logo-on-white-128.png";
import { Link } from "wouter";

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/refunds", label: "Refund policy" },
];

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/evercapable/", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/@evercapable", label: "YouTube" },
  { icon: Globe, href: "https://evercapable.com", label: "Website" },
  { icon: Mail, href: "mailto:tony@tonynguyenfit.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="bg-black py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 mb-16 md:mb-24">
          <Link
            href="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3"
            data-testid="link-footer-logo"
          >
            <img
              src={logoIconDark}
              alt="Tony Nguyen Fit"
              width={40}
              height={40}
              className="h-10 w-auto hidden dark:block"
            />
            <img
              src={logoIconLight}
              alt="Tony Nguyen Fit"
              width={40}
              height={40}
              className="h-10 w-auto block dark:hidden"
            />
            <span className="text-2xl font-bold text-zinc-400 tracking-tight">
              Tony Nguyen Fit
            </span>
          </Link>

          <div className="flex flex-col items-start md:items-end gap-4">
            <nav className="flex flex-wrap gap-6" aria-label="Legal" data-testid="nav-footer">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                  data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <p className="text-xs text-zinc-600 max-w-xs text-left md:text-right">
              Social and the coaching app run under EverCapable. Same coach, same programs.
            </p>

            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                  aria-label={social.label}
                  data-testid={`link-footer-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-4 h-4 text-zinc-400" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-8 border-t border-zinc-800">
          <p className="text-xs text-zinc-500 leading-relaxed max-w-3xl" data-testid="text-medical-note">
            <span className="text-orange-500 font-semibold">Not medical advice.</span>{" "}
            I'm a certified nutrition coach and personal trainer, not a dietitian or doctor, and nothing on this site diagnoses or treats a condition. Check with your doctor before changing how you eat or train.
          </p>

          <p className="text-sm text-zinc-500" data-testid="text-copyright">
            Copyright © {new Date().getFullYear()} Tony Nguyen Fit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
