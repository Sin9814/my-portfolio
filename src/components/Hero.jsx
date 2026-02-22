import { memo } from 'react';
import { Icon } from './common/Icon.jsx';

const Hero = memo(({ scrollTo }) => {
  return (
    <section id="hero" className="hero">
      <div className="hero-background" aria-hidden="true">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>
      
      <div className="hero-content">
        <h1 className="hero-title">What you seek<br />is seeking you.</h1>
        
        <div className="hero-actions">
          <button 
            onClick={() => scrollTo('work')} 
            className="btn btn-primary"
          >
            View My Work
            <Icon name="ArrowRight" size={18} />
          </button>
          
          <a 
            href="https://drive.google.com/file/d/1s4TZBF8jM6UAo2I1IiDfq6uLATdGdy-4/view"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <Icon name="Download" size={18} />
            Resume
          </a>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
export default Hero;