import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import MedSpa from "./pages/MedSpa.tsx";
import LawFirm from "./pages/LawFirm.tsx";
import Gym from "./pages/Gym.tsx";
import Dashboard from "./pages/Dashboard.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/med-spa" element={<MedSpa />} />
          <Route path="/legal-automation" element={<LawFirm />} />
          <Route path="/law-firm" element={<LawFirm />} />
          <Route path="/law" element={<LawFirm />} />
          <Route path="/gym-growth" element={<Gym />} />
          <Route path="/gym" element={<Gym />} />
          <Route path="/demo-dashboard" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
