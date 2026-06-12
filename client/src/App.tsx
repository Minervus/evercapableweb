import { Switch, Route, Redirect } from "wouter";
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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/initialize" component={Initialize} />
      {/* Legacy alias — keeps old /calibrate links working */}
      <Route path="/calibrate">{() => <Redirect to="/initialize" />}</Route>
      <Route path="/journal" component={Journal} />
      <Route path="/journal/:slug" component={Article} />
      <Route path="/audit" component={Audit} />
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
