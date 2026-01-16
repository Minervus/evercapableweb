export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="font-semibold text-foreground">Rachel Stone</p>
            <p className="text-sm text-muted-foreground">
              Personal Trainer & Fitness Coach
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            &copy; {currentYear} Rachel Stone. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
