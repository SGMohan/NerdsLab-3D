import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ModalProvider } from './context/ModalContext';
import { IntroProvider } from './context/IntroContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { DemoModal } from './components/common/DemoModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { TrainingsPage } from './pages/TrainingsPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top on route transition helper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {

  return (
    <div className="flex flex-col min-h-screen bg-cyber-bg text-cyber-text antialiased selection:bg-cyber-neonGreen selection:text-black">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1 flex flex-col">
        <Routes>
          {/* Primary Public Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/trainings" element={<TrainingsPage />} />

          {/* Course Detail Route & Specific Course Slugs */}
          <Route path="/courses/:slug" element={<CourseDetailPage />} />

          {/* Compatibility redirect for training page shortcuts */}
          <Route
            path="/ethical-hacking-nerd"
            element={<Navigate to="/courses/ethical-hacking-nerd" replace />}
          />
          <Route
            path="/penetration-testing-nerd"
            element={<Navigate to="/courses/penetration-testing-nerd" replace />}
          />

          {/* General Pages */}
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* 404 Fallback */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Always render Footer across all pages including 404 */}
      <Footer />
      <DemoModal />
    </div>
  );
}

export default function App() {
  return (
    <ModalProvider>
      <IntroProvider>
        <AppContent />
      </IntroProvider>
    </ModalProvider>
  );
}
