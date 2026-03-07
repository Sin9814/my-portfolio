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

// Elegant typewriter effect
const TypewriterText = ({ text, className, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, 60);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [text, delay]);
  
  return (
    <span className={`typewriter-text ${className} ${isComplete ? 'complete' : ''}`}>
      {displayText}
      {!isComplete && <span className="cursor">{showCursor ? '|' : ''}</span>}
    </span>
  );
};

// Magnifying glass text effect
const MagnifyText = ({ children, className }) => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);
  
  return (
    <span 
      ref={containerRef}
      className={`magnify-text ${className} ${isHovering ? 'hovering' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`
      }}
    >
      {children}
      {isHovering && (
        <span className="magnify-glass" style={{
          left: mousePos.x,
          top: mousePos.y
        }} />
      )}
    </span>
  );
};

const Hero = memo(({ scrollTo }) => {
  return (
    <div className="hero-wrapper">
      <div className="hero-content">
        <h1 className="hero-title">
          <MagnifyText className="line-1">
            <TypewriterText text="What you seek" delay={300} />
          </MagnifyText>
          <br />
          <MagnifyText className="line-2 accent">
            <TypewriterText text="is seeking you." delay={1200} />
          </MagnifyText>
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