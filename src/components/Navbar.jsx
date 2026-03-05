// src/components/Navbar.jsx - Remove numbering
import { useEffect, memo, useState, useRef } from 'react';
import { Icon } from './common/Icon.jsx';
import { CONFIG, NAV_LINKS } from '../config.js';

const Navbar = memo(({ scrolled, mobileMenuOpen, setMobileMenuOpen, scrollTo, activeSection }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = useRef(null);
  const itemRefs = useRef({});
  
  useEffect(() => {
    const activeItem = itemRefs.current[activeSection];
    if (activeItem && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      setIndicatorStyle({
        top: itemRect.top - navRect.top,
        height: itemRect.height,
        opacity: 1
      });
    }
  }, [activeSection]);

  return (
    <>
      <aside className={`sidebar ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
        <div className="sidebar-content">
          <a 
            href="#hero" 
            className="logo" 
            onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
            aria-label="Go to home"
          >
            <span className="logo-text">
              {'Sakshi Kataria'.split('').map((char, i) => (
                <span key={i} className="logo-char" style={{ animationDelay: `${i * 30}ms` }}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          </a>

          <nav className="sidebar-nav" ref={navRef}>
            <div className="nav-indicator" style={indicatorStyle}></div>
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                ref={el => itemRefs.current[link.id] = el}
                className={`nav-item ${activeSection === link.id ? 'active' : ''} ${hoveredItem === link.id ? 'hovered' : ''}`}
                onClick={() => scrollTo(link.id)}
                onMouseEnter={() => setHoveredItem(link.id)}
                onMouseLeave={() => setHoveredItem(null)}
                aria-current={activeSection === link.id ? 'location' : undefined}
              >
                <span className="nav-dot" aria-hidden="true"></span>
                <span className="nav-label">{link.label}</span>
                <span className="nav-arrow">→</span>
              </button>
            ))}
          </nav>

          <div className="sidebar-bottom">
            <div className="sidebar-social">
              {[
                { icon: 'Linkedin', href: CONFIG.social.linkedin, label: 'LinkedIn' },
                { icon: 'Github', href: CONFIG.social.github, label: 'GitHub' },
                { icon: 'Mail', href: `mailto:${CONFIG.email}`, label: 'Email' }
              ].map((social, idx) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  aria-label={social.label}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <Icon name={social.icon} size={18} />
                </a>
              ))}
            </div>
            
            <a 
              href={CONFIG.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-btn"
            >
              <Icon name="ExternalLink" size={14} /> 
              <span className="resume-text">Resume</span>
            </a>
          </div>
        </div>
      </aside>

      <header className="mobile-header">
        <a href="#hero" 
           className="mobile-logo" 
           onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
        >
          <span className="ml-char">S</span>
          <span className="ml-char">K</span>
        </a>
        <button 
          className="mobile-menu-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </header>
      
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          {NAV_LINKS.map((link, idx) => (
            <button
              key={link.id}
              className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => scrollTo(link.id)}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Numbering removed - just the label */}
              <span className="m-link-text">{link.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
});

Navbar.displayName = 'Navbar';
export default Navbar;