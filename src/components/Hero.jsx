// src/components/Hero.jsx
import { memo, useEffect, useRef, useState, useCallback } from 'react';
import { Icon } from './common/Icon.jsx';

const MagneticButton = ({ children, className, onClick, ...props }) => {
  const btnRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };
  
  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };
  
  return (
    <button
      ref={btnRef}
      className={`magnetic-btn ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      {...props}
    >
      <span className="btn-content">{children}</span>
    </button>
  );
};

// DRAMATIC ZOOM TEXT EFFECT - No cursor change, pure scale transform
const ZoomText = ({ text, className, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  // Split text into characters for individual animation
  const characters = text.split('');
  
  return (
    <span 
      ref={containerRef}
      className={`zoom-text-container ${className} ${isHovered ? 'hovered' : ''} ${isVisible ? 'visible' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {characters.map((char, index) => (
        <span 
          key={index} 
          className="zoom-char"
          style={{ 
            animationDelay: `${delay + (index * 30)}ms`,
            transitionDelay: `${index * 15}ms`
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

const Hero = memo(({ scrollTo }) => {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          <div className="title-line">
            <ZoomText text="What you seek" className="line-1" delay={300} />
          </div>
          <div className="title-line">
            <ZoomText text="is seeking you." className="line-2 accent" delay={800} />
          </div>
        </h1>
        
        <div className="hero-actions">
          <MagneticButton 
            onClick={() => scrollTo('work')} 
            className="btn btn-primary"
          >
            View My Work
            <Icon name="ArrowRight" size={18} />
          </MagneticButton>
          
          <MagneticButton
            className="btn btn-secondary"
            onClick={() => window.open('https://drive.google.com/file/d/1voYYu3-i2AxD4egr7p-IbUJDNPhsPvrR/view?usp=sharing', '_blank')}
          >
            <Icon name="Download" size={18} />
            Resume
          </MagneticButton>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
export default Hero;