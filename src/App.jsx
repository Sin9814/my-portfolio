import React from 'react';
import { useState, useEffect, useCallback, memo } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Work from './components/Work.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import { NAV_LINKS } from './config.js';
import './styles/global.css';

const ScrollToTop = memo(({ show, onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className={`scroll-top-btn ${show ? 'visible' : ''}`}
      aria-label="Scroll to top"
    >
      <span>↑</span>
    </button>
  );
});

ScrollToTop.displayName = 'ScrollToTop';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

// Change scroll offset for narrower sidebar
const scrollTo = useCallback((id) => {
  const element = document.getElementById(id);
  if (element) {
    const headerOffset = 40; // Reduced for narrower sidebar
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({ 
      top: Math.max(0, offsetPosition), 
      behavior: 'smooth' 
    });
    
    window.history.pushState(null, null, `#${id}`);
  }
  setMobileMenuOpen(false);
}, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setShowScrollTop(y > 500);

      const scrollPosition = y + 200;
      const sections = NAV_LINKS.map(link => link.id);
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
  }, [mobileMenuOpen]);

  return (
    <div className="app">
      <Navbar 
        scrolled={scrolled} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
        scrollTo={scrollTo} 
        activeSection={activeSection}
      />
      
      <main className="main-content">
        <Hero scrollTo={scrollTo} />
        <About />
        <Skills />
        <Work />
        <Contact />
        <Footer />
      </main>
      
      <ScrollToTop 
        show={showScrollTop} 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
      <Analytics />
    </div>
  );
}

export default memo(App);