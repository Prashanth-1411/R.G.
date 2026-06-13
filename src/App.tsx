import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingCTA } from './components/FloatingCTA';
import { KeyboardShortcutsHelp } from './components/KeyboardShortcutsHelp';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { NavigationProvider, useAnimatedNavigation } from './components/NavigationContext';
import { PageTransitionLoader } from './components/PageTransitionLoader';
import { Home } from './pages/Home';
import { AmbulanceServices } from './pages/AmbulanceServices';
import { FuneralServices } from './pages/FuneralServices';
import { Testimonials } from './pages/Testimonials';
import { Blog } from './pages/Blog';
import { BlogPostDetail } from './pages/BlogPostDetail';
import { Contact } from './pages/Contact';
import { LocationPage } from './pages/LocationPage';


const MainLayout: React.FC = () => {
  const location = useLocation();
  const { showHelp, setShowHelp, shortcuts } = useKeyboardShortcuts();
  const { isNavigating } = useAnimatedNavigation();

  useEffect(() => {
    if (!isNavigating) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, isNavigating]);

  return (
    <div className="flex flex-col min-h-screen">
      <PageTransitionLoader isVisible={isNavigating} />
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ambulance-services" element={<AmbulanceServices />} />
          <Route path="/funeral-services" element={<FuneralServices />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ambulance-service-in-:locationSlug" element={<LocationPage />} />
        </Routes>
      </main>
      <Footer />
      <FloatingCTA />
      <KeyboardShortcutsHelp open={showHelp} onClose={() => setShowHelp(false)} shortcuts={shortcuts} />
    </div>
  );
};

const AppWithNavigation: React.FC = () => {
  return (
    <NavigationProvider>
      <MainLayout />
    </NavigationProvider>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <AppWithNavigation />
    </Router>
  );
};
