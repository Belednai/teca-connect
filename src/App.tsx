import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/components/AdminLayout";

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
import AdminLogin from "./pages/admin/Login";
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
    <AuthProvider>
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

            {/* Admin Login Route */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/news" element={
              <ProtectedRoute permission="write:news">
                <AdminLayout>
                  <AdminNews />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/events" element={
              <ProtectedRoute permission="write:events">
                <AdminLayout>
                  <AdminEvents />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/leadership" element={
              <ProtectedRoute permission="write:leadership">
                <AdminLayout>
                  <AdminLeadership />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/payams" element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminPayams />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/activities" element={
              <ProtectedRoute permission="write:activities">
                <AdminLayout>
                  <AdminActivities />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/donations" element={
              <ProtectedRoute permission="write:donations">
                <AdminLayout>
                  <AdminDonations />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/pledges" element={
              <ProtectedRoute permission="write:pledges">
                <AdminLayout>
                  <AdminPledges />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/media" element={
              <ProtectedRoute permission="write:media">
                <AdminLayout>
                  <AdminMedia />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/pages" element={
              <ProtectedRoute permission="write:pages">
                <AdminLayout>
                  <AdminPages />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminSettings />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminUsers />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/audit" element={
              <ProtectedRoute permission="read:audit">
                <AdminLayout>
                  <AdminAudit />
                </AdminLayout>
              </ProtectedRoute>
            } />

            {/* 404 - Must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;