import { useState } from "react";
import { Menu, X, Instagram, Youtube, Globe, Mail } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "#", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#programs", label: "Programs" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Globe, href: "#", label: "Website" },
  { icon: Mail, href: "#", label: "Email" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-secondary/95 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-lg font-bold text-foreground tracking-tight pl-2"
            data-testid="link-logo"
          >
            Rachel
          </a>
          
          <div className="flex items-center gap-1">
            <ThemeToggle testId="button-theme-toggle" />
            <button
              className="p-2 rounded-full hover-elevate"
              onClick={() => setIsMenuOpen(true)}
              data-testid="button-menu-open"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-lg">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-6 py-4">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#");
                }}
                className="text-xl font-bold text-foreground tracking-tight"
                data-testid="link-logo-menu"
              >
                Rachel
              </a>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-md border border-border hover-elevate"
                data-testid="button-menu-close"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-8 gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-3xl md:text-4xl font-semibold text-foreground text-left hover:text-primary transition-colors"
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="px-8 pb-8">
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover-elevate"
                    aria-label={social.label}
                    data-testid={`link-social-${social.label.toLowerCase()}`}
                  >
                    <social.icon className="w-5 h-5 text-foreground" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
