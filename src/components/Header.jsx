import { useState, useEffect } from 'react';
import { Menu, X, Download, Linkedin, Instagram, Mail } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Work', href: '#work' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <a href="#" className="logo">[SK]</a>
          
          <nav className="desktop-nav">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="nav-link">
                {link.name}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <a 
              href="https://drive.google.com/file/d/1s4TZBF8jM6UAo2I1IiDfq6uLATdGdy-4/view" 
              target="_blank"
              rel="noreferrer"
              className="btn-resume"
            >
              <Download size={16} />
              <span>Resume</span>
            </a>
            
            {/* Mobile menu button - hidden on desktop */}
            <button 
              className="menu-btn mobile-only" 
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <span className="logo">[SK]</span>
          <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>
        
        <nav className="mobile-nav">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="mobile-menu-footer">
          <div className="mobile-social">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="mailto:sakshi@example.com" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
          
          <a 
            href="https://drive.google.com/file/d/1s4TZBF8jM6UAo2I1IiDfq6uLATdGdy-4/view" 
            target="_blank"
            rel="noreferrer"
            className="mobile-resume-link"
          >
            <Download size={16} />
            Download Resume
          </a>
        </div>
      </div>
    </>
  );
}