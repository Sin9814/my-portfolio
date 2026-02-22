import { useEffect, memo } from 'react';
import { Icon } from './common/Icon.jsx';
import { CONFIG, NAV_LINKS } from '../config.js';

const Navbar = memo(({ scrolled, mobileMenuOpen, setMobileMenuOpen, scrollTo, activeSection }) => {
  useEffect(() => {
    // Sync with active section
  }, [activeSection]);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`sidebar ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
        <div className="sidebar-content">
          <a 
  href="#hero" 
  className="logo" 
  onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
  aria-label="Go to home"
>
  <span className="logo-text">Sakshi Kataria</span>
</a>

          <nav className="sidebar-nav">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                className={`nav-item ${activeSection === link.id ? 'active' : ''}`}
                onClick={() => scrollTo(link.id)}
                aria-current={activeSection === link.id ? 'location' : undefined}
              >
                <span className="nav-dot" aria-hidden="true"></span>
                <span>{link.label}</span>
              </button>
            ))}
          </nav>

          <div className="sidebar-bottom">
            <div className="sidebar-social">
              <a href={CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Icon name="Linkedin" size={18} />
              </a>
              <a href={CONFIG.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Icon name="Github" size={18} />
              </a>
              <a href={`mailto:${CONFIG.email}`} aria-label="Email">
                <Icon name="Mail" size={18} />
              </a>
            </div>
            
            <a 
              href={CONFIG.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-btn"
            >
              <Icon name="ExternalLink" size={14} /> Resume
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile Header - Shows "SK" abbreviation */}
      <header className="mobile-header">
        <a href="#hero" 
           className="mobile-logo" 
           onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
        >
          SK
        </a>
        <button 
          className="mobile-menu-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
        </button>
      </header>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => scrollTo(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
});

Navbar.displayName = 'Navbar';
export default Navbar;