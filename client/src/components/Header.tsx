import { useState } from "react";
import { Menu, X, Instagram, Youtube, Globe, Mail, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { AnimatePresence, motion } from "framer-motion";
import logoIconDark from "@assets/tn-logo-on-black.png";
import logoIconLight from "@assets/tn-logo-on-white.png";

import { useLocation } from "wouter";
import { scrollToSectionId, sectionIdForPath } from "@/lib/sectionRoutes";

type NavLink =
  | { href: string; label: string; submenu?: never }
  | { label: string; submenu: { href: string; label: string }[]; href?: never };

const navLinks: NavLink[] = [
  { href: "/#evercapable-method", label: "How it works" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/evercapable/", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/@evercapable", label: "YouTube" },
  { icon: Globe, href: "https://evercapable.com", label: "Website" },
  { icon: Mail, href: "mailto:tony@tonynguyenfit.com", label: "Email" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);
  const [location, setLocation] = useLocation();

  const closeMenu = () => {
    setIsMenuOpen(false);
    setExpandedSubmenu(null);
  };

  const followNav = (href: string) => {
    closeMenu();

    if (href === "/" || href === "#") {
      if (location === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.replaceState(null, "", "/");
      } else {
        setLocation("/");
        window.scrollTo({ top: 0, behavior: "auto" });
      }
      return;
    }

    const hash = href.includes("#") ? href.slice(href.indexOf("#") + 1) : "";
    if (hash) {
      if (location === "/") {
        scrollToSectionId(hash, "smooth");
        window.history.replaceState(null, "", `/#${hash}`);
      } else {
        window.location.assign(`/#${hash}`);
      }
      return;
    }

    const sectionId = sectionIdForPath(href);
    if (sectionId && sectionIdForPath(location) === sectionId) {
      scrollToSectionId(sectionId, "smooth");
      return;
    }

    setLocation(href);
  };

  return (
    <header className="fixed top-4 left-4 right-4 md:left-6 md:right-6 z-50 flex justify-start md:justify-center pointer-events-none">
      <div
        className="bg-white/95 dark:bg-black backdrop-blur-md overflow-hidden pointer-events-auto md:w-full md:max-w-5xl"
        style={{
          borderRadius: isMenuOpen ? '16px' : '9999px',
          padding: isMenuOpen ? '24px' : '8px 16px',
          minWidth: isMenuOpen ? '280px' : 'auto',
          transition: 'border-radius 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              followNav("/");
            }}
            className="flex items-center gap-2"
            data-testid="link-logo"
          >
            <img
              src={logoIconDark}
              alt="Tony Nguyen Fit"
              width={24}
              height={24}
              className="h-6 w-auto hidden dark:block"
            />
            <img
              src={logoIconLight}
              alt="Tony Nguyen Fit"
              width={24}
              height={24}
              className="h-6 w-auto block dark:hidden"
            />
            <span className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              Tony Nguyen Fit
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6" data-testid="nav-desktop">
            {navLinks.map((link) =>
              link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    followNav(link.href!);
                  }}
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-orange-600 dark:hover:text-orange-500 transition-colors whitespace-nowrap"
                  data-testid={`link-navdesktop-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.label}
                </a>
              ) : null,
            )}
            <a
              href="/initialize?plan=audit"
              onClick={(e) => {
                e.preventDefault();
                followNav("/initialize?plan=audit");
              }}
              className="bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold rounded-full px-5 py-2 transition-colors whitespace-nowrap"
              data-testid="link-navdesktop-cta"
            >
              Get your roadmap
            </a>
          </nav>

          <div className="flex items-center gap-1">
            {!isMenuOpen && <ThemeToggle testId="button-theme-toggle" />}
            <button
              className={`md:hidden p-2 transition-all ${isMenuOpen ? "rounded-md border border-border" : "rounded-full"} hover-elevate`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid={isMenuOpen ? "button-menu-close" : "button-menu-open"}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-zinc-900 dark:text-white" />
              ) : (
                <Menu className="w-5 h-5 text-zinc-900 dark:text-white" />
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
              className="overflow-hidden md:hidden"
            >
              <nav className="mt-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    {link.submenu ? (
                      <>
                        <button
                          onClick={() => setExpandedSubmenu(expandedSubmenu === link.label ? null : link.label)}
                          className="text-2xl font-semibold text-zinc-900 dark:text-white text-left hover:text-orange-600 dark:hover:text-orange-500 transition-colors flex items-center gap-2 w-full"
                          data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {link.label}
                          <ChevronDown className={`w-5 h-5 transition-transform ${expandedSubmenu === link.label ? 'rotate-180' : ''}`} />
                        </button>
                        {expandedSubmenu === link.label && (
                          <div className="ml-4 mt-3 flex flex-col gap-3">
                            {link.submenu.map((sublink) => (
                              <a
                                key={sublink.href}
                                href={sublink.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  followNav(sublink.href);
                                }}
                                className="text-lg font-medium text-zinc-700 dark:text-zinc-300 text-left hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                                data-testid={`link-nav-${sublink.label.toLowerCase().replace(/\s+/g, '-')}`}
                              >
                                {sublink.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </>
                    ) : link.href ? (
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          followNav(link.href);
                        }}
                        className="text-2xl font-semibold text-zinc-900 dark:text-white text-left hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                        data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {link.label}
                      </a>
                    ) : null}
                  </div>
                ))}
              </nav>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <ThemeToggle testId="button-theme-toggle-menu" />
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
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

