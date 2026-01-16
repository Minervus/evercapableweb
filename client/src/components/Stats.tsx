import { useEffect, useState, useRef } from "react";

const stats = [
  {
    value: 500,
    suffix: "+",
    label: "Women Coached",
    description: "From postpartum recovery to full transformations",
  },
  {
    value: 94,
    suffix: "%",
    label: "Consistency Rate",
    description: "Clients report staying on track week after week",
  },
  {
    value: 4.9,
    suffix: "",
    label: "Average Feedback",
    description: "Based on client satisfaction and progress surveys",
  },
  {
    value: 3,
    suffix: "x",
    label: "Faster Progress",
    description: "Compared to traditional training methods",
  },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const startTime = performance.now();
          const isDecimal = value % 1 !== 0;

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = value * easeOutQuart;
            setDisplayValue(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center relative"
              data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2" data-testid={`text-stat-value-${index}`}>
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-base md:text-lg font-semibold text-foreground mb-1" data-testid={`text-stat-label-${index}`}>
                {stat.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
              {index < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-px bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
