// src/components/Footer.jsx - Minor enhancement
import { memo } from 'react';
import { CONFIG } from '../config.js';

const Footer = memo(() => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-main">© {year} {CONFIG.name}</p>
        <p className="footer-tagline">Software Developer</p>
        <div className="footer-line"></div>
      </div>
      
      <style>{`
        .footer-line {
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          margin: var(--space-md) auto 0;
          animation: expandLine 2s ease 1s forwards;
        }
        
        @keyframes expandLine {
          to { width: 100px; }
        }
        
        .footer-main {
          opacity: 0;
          animation: fadeIn 0.6s ease 0.5s forwards;
        }
        
        .footer-tagline {
          opacity: 0;
          animation: fadeIn 0.6s ease 0.7s forwards;
        }
        
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;