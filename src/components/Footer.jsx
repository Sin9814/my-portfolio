// src/components/Footer.jsx
import { memo } from 'react';
import { CONFIG } from '../config.js';

const Footer = memo(() => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="footer">
      {/* Gradient transition from contact section */}
      <div className="footer-gradient" aria-hidden="true" />
      
      <div className="container">
        <p className="footer-main">© {year} {CONFIG.name}</p>
        <p className="footer-tagline">Software Developer</p>
        <div className="footer-line"></div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;