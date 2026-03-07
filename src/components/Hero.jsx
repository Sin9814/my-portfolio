// src/components/Hero.jsx - Restored smooth zoom character effect
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
    setPosition({ x: x * 0.2, y: y * 0.2 });
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

// Smooth zoom character effect - RESTORED from your original
const ZoomText = ({ text, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  // Split text into characters, preserving spaces
  const characters = text.split('').map((char, i) => ({
    char: char === ' ' ? '\u00A0' : char,
    key: `${char}-${i}`
  }));
  
  return (
    <span 
      className={`zoom-text-container ${className} ${isVisible ? 'visible' : ''} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {characters.map(({ char, key }, index) => (
        <span 
          key={key} 
          className="zoom-char"
          style={{ animationDelay: `${index * 30}ms` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

const Hero = memo(({ scrollTo }) => {
  return (
    <div className="hero-wrapper">
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="title-line line-1">
            <ZoomText text="What you seek" delay={300} />
          </span>
          <span className="title-line line-2">
            <ZoomText text="is seeking you." className="accent" delay={600} />
          </span>
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
    </div>
  );
});

Hero.displayName = 'Hero';
export default Hero;