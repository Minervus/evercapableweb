import { useState } from "react";
import { Menu, X, Instagram, Youtube, Globe, Mail } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { AnimatePresence, motion } from "framer-motion";
import logoIconDark from "@assets/icon-on-black_1768604893518.png";
import logoIconLight from "@assets/icon-on-white_1768604893518.png";

const navLinks = [
  { href: "#method", label: "The Method" },
  { href: "#programs", label: "Programs" },
  { href: "#faq", label: "FAQ" },
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

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-4 left-4 md:left-6 z-50">
      <div 
        className="bg-secondary/95 backdrop-blur-md overflow-hidden"
        style={{
          borderRadius: isMenuOpen ? '16px' : '9999px',
          padding: isMenuOpen ? '24px' : '8px 16px',
          minWidth: isMenuOpen ? '280px' : 'auto',
          transition: 'border-radius 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#");
            }}
            className="flex items-center gap-2"
            data-testid="link-logo"
          >
            <img 
              src={logoIconDark} 
              alt="EverCapable" 
              className="h-6 w-auto hidden dark:block" 
            />
            <img 
              src={logoIconLight} 
              alt="EverCapable" 
              className="h-6 w-auto block dark:hidden" 
            />
            <span className="text-lg font-bold text-foreground tracking-tight">
              EverCapable
            </span>
          </a>
          
          <div className="flex items-center gap-1">
            {!isMenuOpen && <ThemeToggle testId="button-theme-toggle" />}
            <button
              className={`p-2 transition-all ${isMenuOpen ? "rounded-md border border-border" : "rounded-full"} hover-elevate`}
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

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <nav className="mt-6 flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="text-2xl font-semibold text-foreground text-left hover:text-primary transition-colors"
                    data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={scrollToContact}
                  className="text-2xl font-semibold text-primary text-left hover:text-primary/80 transition-colors"
                  data-testid="link-nav-apply"
                >
                  Apply for Coaching
                </button>
              </nav>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <ThemeToggle testId="button-theme-toggle-menu" />
                  {socialLinks.map((social, index) => (
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

