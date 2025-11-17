import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import HospitalityCoach from "./pages/HospitalityCoach";
import InboundTest from "./pages/InboundTest";
import DeadLeadReactivationTest from "./pages/DeadLeadReactivationTest";
import MissingDocuments from "./pages/MissingDocuments";
import RagChatbotTest from "./pages/test/RagChatbotTest";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/test/hospitality-coach" element={<ProtectedRoute agentTitle="Hospitality Coach"><HospitalityCoach /></ProtectedRoute>} />
          <Route path="/test/inbound" element={<InboundTest />} />
          <Route path="/test/dead-lead-reactivation" element={<DeadLeadReactivationTest />} />
          <Route path="/test/missing-documents" element={<ProtectedRoute agentTitle="Missing Documents"><MissingDocuments /></ProtectedRoute>} />
          <Route path="/test/rag-chatbot" element={<ProtectedRoute agentTitle="RAG Chatbot"><RagChatbotTest /></ProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
