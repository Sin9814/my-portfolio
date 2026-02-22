import { memo } from 'react';
import { CONFIG } from '../config.js';

const Footer = memo(() => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <p>© {year} {CONFIG.name}</p>
        <p className="footer-tagline"> Software Developer</p>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;