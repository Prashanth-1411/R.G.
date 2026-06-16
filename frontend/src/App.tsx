import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingCTA } from './components/FloatingCTA';
import { KeyboardShortcutsHelp } from './components/KeyboardShortcutsHelp';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { NavigationProvider, useAnimatedNavigation } from './components/NavigationContext';
import { PageTransitionLoader } from './components/PageTransitionLoader';
import { AdminLayout } from './components/admin/AdminLayout';
import { Home } from './pages/Home';
import { AmbulanceServices } from './pages/AmbulanceServices';
import { FuneralServices } from './pages/FuneralServices';
import { Testimonials } from './pages/Testimonials';
import { Blog } from './pages/Blog';
import { BlogPostDetail } from './pages/BlogPostDetail';
import { Contact } from './pages/Contact';
import { LocationPage } from './pages/LocationPage';

const AdminLogin = lazy(() => import('./pages/admin/Login').then(m => ({ default: m.AdminLogin })));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard').then(m => ({ default: m.AdminDashboard })));
const AdminSettings = lazy(() => import('./pages/admin/Settings').then(m => ({ default: m.AdminSettings })));
const AdminMedia = lazy(() => import('./pages/admin/Media').then(m => ({ default: m.AdminMedia })));
const AdminNavbar = lazy(() => import('./pages/admin/Navbar').then(m => ({ default: m.AdminNavbar })));
const AdminSliders = lazy(() => import('./pages/admin/Sliders').then(m => ({ default: m.AdminSliders })));
const AdminServices = lazy(() => import('./pages/admin/Services').then(m => ({ default: m.AdminServices })));
const AdminPages = lazy(() => import('./pages/admin/Pages').then(m => ({ default: m.AdminPages })));
const AdminSections = lazy(() => import('./pages/admin/Sections').then(m => ({ default: m.AdminSections })));
const AdminTestimonials = lazy(() => import('./pages/admin/Testimonials').then(m => ({ default: m.AdminTestimonials })));
const AdminBlog = lazy(() => import('./pages/admin/Blog').then(m => ({ default: m.AdminBlog })));
const AdminContactLeads = lazy(() => import('./pages/admin/ContactLeads').then(m => ({ default: m.AdminContactLeads })));
const AdminLocations = lazy(() => import('./pages/admin/Locations').then(m => ({ default: m.AdminLocations })));
const AdminUsers = lazy(() => import('./pages/admin/Users').then(m => ({ default: m.AdminUsers })));
const AdminActivityLogs = lazy(() => import('./pages/admin/ActivityLogs').then(m => ({ default: m.AdminActivityLogs })));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

function PublicLayout() {
  const location = useLocation();
  const { showHelp, setShowHelp, shortcuts } = useKeyboardShortcuts();
  const { isNavigating } = useAnimatedNavigation();

  useEffect(() => {
    if (!isNavigating) window.scrollTo(0, 0);
  }, [location.pathname, isNavigating]);

  return (
    <div className="flex flex-col min-h-screen">
      <PageTransitionLoader isVisible={isNavigating} />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <FloatingCTA />
      <KeyboardShortcutsHelp open={showHelp} onClose={() => setShowHelp(false)} shortcuts={shortcuts} />
    </div>
  );
}

const AdminFallback = () => (
  <div className="min-h-screen bg-navy-50 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
  </div>
);

export const App: React.FC = () => {
  return (
    <Router>
      <NavigationProvider>
        <Suspense fallback={<AdminFallback />}>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/ambulance-services" element={<AmbulanceServices />} />
              <Route path="/funeral-services" element={<FuneralServices />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPostDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/ambulance-service-in-:locationSlug" element={<LocationPage />} />
            </Route>

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="media" element={<AdminMedia />} />
              <Route path="navbar" element={<AdminNavbar />} />
              <Route path="sliders" element={<AdminSliders />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="pages" element={<AdminPages />} />
              <Route path="sections" element={<AdminSections />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="contact-leads" element={<AdminContactLeads />} />
              <Route path="locations" element={<AdminLocations />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="activity-logs" element={<AdminActivityLogs />} />
            </Route>
          </Routes>
        </Suspense>
      </NavigationProvider>
    </Router>
  );
};
