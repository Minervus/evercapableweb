import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import heroImage from "@assets/hero-poster.jpg";

const BACKGROUND_VIDEOS = [
  "https://evercapable-s3-bucket.s3.us-east-1.amazonaws.com/videos/6389831-uhd_3840_2160_25fps.mp4",
  "https://evercapable-s3-bucket.s3.us-east-1.amazonaws.com/videos/6390166-uhd_3840_2160_25fps.mp4",
  "https://evercapable-s3-bucket.s3.us-east-1.amazonaws.com/videos/5320001-uhd_3840_2160_25fps.mp4",
  "https://evercapable-s3-bucket.s3.us-east-1.amazonaws.com/videos/4069096-uhd_3840_2160_30fps.mp4",
];

export function Hero() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Lazy Load Videos via Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { rootMargin: "0px", threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !isHeroVisible) return;
    const interval = setInterval(() => {
      setActiveVideoIndex((prev) => (prev + 1) % BACKGROUND_VIDEOS.length);
    }, 6000); // 6 seconds per video
    return () => clearInterval(interval);
  }, [prefersReducedMotion, isHeroVisible]);

  return (
    <section ref={heroRef} className="relative min-h-[80vh] md:min-h-screen overflow-hidden flex flex-col justify-center items-center bg-black">
      <style>{`
        .hero-video-container {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          overflow: hidden;
          background: #000; /* Fallback */
          z-index: 0;
        }
        .hero-video-overlay {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          z-index: 2;
          background-image: 
            radial-gradient(rgba(255, 102, 0, 0.08) 1px, transparent 1px),
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.95) 100%);
          background-size: 40px 40px, 100% 4px, 100% 100%;
          pointer-events: none;
        }
      `}</style>

      {/* Background Video / Image Container */}
      <div className="hero-video-container">
        {!prefersReducedMotion && isHeroVisible ? (
          <AnimatePresence initial={false}>
            {BACKGROUND_VIDEOS.map((src, index) => (
              index === activeVideoIndex && (
                <motion.video
                  key={src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, ease: "easeInOut" }} // 2-second crossfade
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={index === 0 ? heroImage : undefined}
                >
                  <source src={src} type="video/mp4" />
                </motion.video>
              )
            ))}
          </AnimatePresence>
        ) : (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
        )}
      </div>

      {/* The Technical HUD Overlay */}
      <div className="hero-video-overlay" />

      {/* Ensure text container uses relative z-10 so it stays above the z-index: 2 overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full pt-28 pb-16 md:pb-24 px-6 md:px-0">
        <div className="w-full max-w-[800px] text-center mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4"
          >
            <span className="font-mono text-orange-500 uppercase tracking-wider text-sm md:text-base font-medium block">
              Customized Coaching for Busy Dads
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-[60px] font-bold text-white leading-tight tracking-tight mb-6 drop-shadow-lg"
            data-testid="text-hero-headline"
          >Build a Resilient Body and Habits That Last a Lifetime.</motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 drop-shadow-md"
            data-testid="text-hero-subheadline"
          >More importantly, learn how to maintain it. Get a customized plan that works with work, travel, and kids while helping lower your risk of diabetes and cardiovascular disease.</motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Link href="/initialize" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="gap-2 bg-[#FF9500] hover:bg-[#FF9500]/90 text-white border-none w-full sm:w-auto min-w-[250px] min-h-[56px] text-sm md:text-lg rounded-full shadow-[0_0_15px_rgba(255,149,0,0.3)] hover:shadow-[0_0_25px_rgba(255,149,0,0.6)] transition-all font-bold font-mono uppercase tracking-tight"
                  data-testid="button-hero-cta-primary"
                >
                  Apply for Coaching
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-col items-center gap-3 pt-4">
              <p className="text-xs uppercase text-white/60 tracking-widest font-medium">
                CERTIFIED AUTHORITY
              </p>
              <div className="flex items-center justify-center gap-6 opacity-70 grayscale">
                {/* Placeholders for logos */}
                <div className="text-white font-bold text-lg tracking-tight">ISSA</div>
                <div className="h-4 w-px bg-white/30"></div>
                <div className="text-white font-bold text-lg tracking-tight">Precision Nutrition</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
