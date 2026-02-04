import { Instagram, Youtube, Globe, Mail } from "lucide-react";
import { SiX } from "react-icons/si";
import logoIconDark from "@assets/icon-on-black_1768604893518.png";
import logoIconLight from "@assets/icon-on-white_1768604893518.png";

const navLinks = [
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
  { href: "#", label: "App Login" },
];

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: SiX, href: "#", label: "X" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Globe, href: "#", label: "Website" },
  { icon: Mail, href: "#", label: "Email" },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-black py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 mb-16 md:mb-24">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#");
            }}
            className="flex items-center gap-3"
            data-testid="link-footer-logo"
          >
            <img
              src={logoIconDark}
              alt="EverCapable"
              className="h-10 w-auto hidden dark:block"
            />
            <img
              src={logoIconLight}
              alt="EverCapable"
              className="h-10 w-auto block dark:hidden"
            />
            <span className="text-2xl font-bold text-zinc-400 tracking-tight">
              EverCapable
            </span>
          </a>

          <div className="flex flex-col items-start md:items-end gap-4">
            <nav className="flex flex-wrap gap-6" data-testid="nav-footer">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                  data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
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

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pt-6 border-t border-zinc-800">
          <p className="text-sm text-zinc-500" data-testid="text-copyright">
            Copyright © 2025 EverCapable – All Rights Reserved
          </p>
          <p className="text-sm text-zinc-500">
            Built with care
          </p>
        </div>
      </div>
    </footer>
  );
}
