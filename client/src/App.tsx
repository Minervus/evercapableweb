import { Switch, Route, Redirect, useLocation } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import Home from "@/pages/home";
import Initialize from "@/pages/Initialize";
import NotFound from "@/pages/not-found";
import Journal from "@/pages/Journal";
import Article from "@/pages/Article";
import Audit from "@/pages/Audit";
import Kickstarter from "@/pages/Kickstarter";
import { sectionIdForPath } from "@/lib/sectionRoutes";

import TDEE from "@/pages/TDEE";

function HomeSectionAlias() {
  const [location] = useLocation();
  const sectionId = sectionIdForPath(location);
  if (!sectionId) return <NotFound />;
  return <Home scrollToId={sectionId} />;
}

function Router() {
  return (
    <Switch>
      <Route path="/">{() => <Home />}</Route>
      <Route path="/initialize" component={Initialize} />
      {/* Legacy alias — keeps old /calibrate links working */}
      <Route path="/calibrate">{() => <Redirect to="/initialize" />}</Route>
      <Route path="/journal" component={Journal} />
      <Route path="/journal/:slug" component={Article} />
      <Route path="/audit" component={Audit} />
      <Route path="/protocol" component={Audit} />
      <Route path="/kickstarter" component={Kickstarter} />
      <Route path="/tdee" component={TDEE} />
      <Route path="/:alias" component={HomeSectionAlias} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
