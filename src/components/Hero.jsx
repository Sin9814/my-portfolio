// src/components/Hero.jsx
import { memo, useEffect, useRef, useState } from 'react';
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

// Elegant typewriter effect - professional, not glitchy
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
          // Blink cursor a few times then hide
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, 60); // Slower, more elegant
      
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

// Fish-eye hover effect on text
const FishEyeText = ({ children, className }) => {
  const [hoverPos, setHoverPos] = useState({ x: 0.5, y: 0.5 });
  const [isHovering, setIsHovering] = useState(false);
  const textRef = useRef(null);
  
  const handleMouseMove = (e) => {
    if (!textRef.current) return;
    const rect = textRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setHoverPos({ x, y });
  };
  
  return (
    <span 
      ref={textRef}
      className={`fish-eye-text ${className} ${isHovering ? 'hovering' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        '--hover-x': hoverPos.x,
        '--hover-y': hoverPos.y
      }}
    >
      {children}
    </span>
  );
};

const Hero = memo(({ scrollTo }) => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    };
    
    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    
    return () => {
      if (hero) {
        hero.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);
  
  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero-background" aria-hidden="true">
        {/* Animated mesh gradient background */}
        <div className="mesh-gradient">
          <div className="mesh-blob mesh-blob-1"></div>
          <div className="mesh-blob mesh-blob-2"></div>
          <div className="mesh-blob mesh-blob-3"></div>
        </div>
        
        {/* Subtle noise overlay */}
        <div className="noise-overlay"></div>
        
        {/* Floating particles */}
        <div className="particles" aria-hidden="true">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                '--delay': `${i * 0.5}s`,
                '--duration': `${10 + Math.random() * 20}s`,
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`,
                '--size': `${2 + Math.random() * 4}px`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="hero-content">
        <h1 className="hero-title">
          <FishEyeText className="line-1">
            <TypewriterText text="What you seek" delay={300} />
          </FishEyeText>
          <br />
          <FishEyeText className="line-2 accent">
            <TypewriterText text="is seeking you." delay={1200} />
          </FishEyeText>
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