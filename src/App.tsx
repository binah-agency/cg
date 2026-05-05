import { HashRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLenis } from '@/hooks/useLenis';
import '@/lib/gsap';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Investment from '@/pages/Investment';
import Development from '@/pages/Development';
import Management from '@/pages/Management';
import Properties from '@/pages/Properties';
import Contact from '@/pages/Contact';
import './App.css';

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

function AppContent() {
  useLenis();

  return (
    <>
      <ScrollToTop />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gold-primary focus:text-navy-base focus:text-sm focus:uppercase focus:tracking-wider"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/investment" element={<Investment />} />
          <Route path="/development" element={<Development />} />
          <Route path="/management" element={<Management />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export default App;
