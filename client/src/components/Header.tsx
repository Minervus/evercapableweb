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
    <header className="fixed top-4 left-4 md:left-6 z-50">
      <div 
        className="bg-secondary/95 backdrop-blur-md nav-pill"
        data-open={isMenuOpen}
      >
        <div className="flex items-center justify-between gap-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#");
            }}
            className="text-lg font-bold text-foreground tracking-tight pl-1"
            data-testid="link-logo"
          >
            Rachel
          </a>
          
          <div className="flex items-center gap-1">
            <div className={`transition-opacity duration-300 ${isMenuOpen ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
              <ThemeToggle testId="button-theme-toggle" />
            </div>
            <button
              className={`p-2 transition-all duration-300 ${isMenuOpen ? "rounded-md border border-border" : "rounded-full"} hover-elevate`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid={isMenuOpen ? "button-menu-close" : "button-menu-open"}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        <div 
          className="nav-content"
          data-open={isMenuOpen}
        >
          <nav className="flex flex-col gap-4 pt-6">
            {navLinks.map((link, index) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`text-2xl font-semibold text-foreground text-left hover:text-primary transition-all duration-300 ${
                  isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'
                }`}
                style={{ 
                  transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms'
                }}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div 
            className={`pt-4 mt-4 border-t border-border transition-all duration-300 ${
              isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'
            }`}
            style={{ transitionDelay: isMenuOpen ? `${navLinks.length * 50 + 50}ms` : '0ms' }}
          >
            <div className="flex items-center gap-3">
              <ThemeToggle testId="button-theme-toggle-menu" />
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover-elevate"
                  aria-label={social.label}
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-4 h-4 text-foreground" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
