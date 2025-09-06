import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import Index from "./pages/Index";
import About from "./pages/About";
import History from "./pages/History";
import Leadership from "./pages/Leadership";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Resettlement from "./pages/Resettlement";
import PayamIndex from "./pages/PayamIndex";
import PayamDetail from "./pages/PayamDetail";
import Fundraising from "./pages/Fundraising";
import Ledger from "./pages/Ledger";
import Activities from "./pages/Activities";
import Volunteer from "./pages/Volunteer";
import Media from "./pages/Media";
import Contact from "./pages/Contact";
import Search from "./pages/Search";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminNews from "./pages/admin/News";
import AdminEvents from "./pages/admin/Events";
import AdminLeadership from "./pages/admin/Leadership";
import AdminPayams from "./pages/admin/Payams";
import AdminActivities from "./pages/admin/Activities";
import AdminDonations from "./pages/admin/Donations";
import AdminPledges from "./pages/admin/Pledges";
import AdminMedia from "./pages/admin/Media";
import AdminPages from "./pages/admin/Pages";
import AdminSettings from "./pages/admin/Settings";
import AdminUsers from "./pages/admin/Users";
import AdminAudit from "./pages/admin/Audit";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/history" element={<History />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<EventDetail />} />
          <Route path="/resettlement" element={<Resettlement />} />
          <Route path="/resettlement/payams" element={<PayamIndex />} />
          <Route path="/resettlement/payams/:slug" element={<PayamDetail />} />
          <Route path="/fundraising" element={<Fundraising />} />
          <Route path="/ledger" element={<Ledger />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/media" element={<Media />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<Search />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/news" element={<AdminNews />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/leadership" element={<AdminLeadership />} />
          <Route path="/admin/payams" element={<AdminPayams />} />
          <Route path="/admin/activities" element={<AdminActivities />} />
          <Route path="/admin/donations" element={<AdminDonations />} />
          <Route path="/admin/pledges" element={<AdminPledges />} />
          <Route path="/admin/media" element={<AdminMedia />} />
          <Route path="/admin/pages" element={<AdminPages />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/audit" element={<AdminAudit />} />

          {/* 404 - Must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;