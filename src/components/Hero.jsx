// src/components/Hero.jsx
import { memo, useEffect, useRef, useState } from 'react';
import { Icon } from './common/Icon.jsx';

const TextScramble = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  const frameRef = useRef();
  const queueRef = useRef([]);
  
  useEffect(() => {
    let frame = 0;
    const animate = () => {
      let output = '';
      let complete = 0;
      
      for (let i = 0; i < text.length; i++) {
        if (queueRef.current[i] && queueRef.current[i] > 0) {
          queueRef.current[i]--;
          output += chars[Math.floor(Math.random() * chars.length)];
        } else {
          output += text[i];
          complete++;
        }
      }
      
      setDisplayText(output);
      
      if (complete < text.length) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
      }
    };
    
    if (isHovering) {
      queueRef.current = text.split('').map(() => Math.floor(Math.random() * 10) + 5);
      animate();
    }
    
    return () => cancelAnimationFrame(frameRef.current);
  }, [isHovering, text]);
  
  return (
    <span 
      className={className}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setDisplayText(text);
      }}
      style={{ cursor: 'default' }}
    >
      {displayText}
    </span>
  );
};

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

const Hero = memo(({ scrollTo }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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
        <div 
          className="orb orb-1"
          style={{
            transform: `translate(${(mousePos.x - 0.5) * -30}px, ${(mousePos.y - 0.5) * -30}px)`
          }}
        ></div>
        <div 
          className="orb orb-2"
          style={{
            transform: `translate(${(mousePos.x - 0.5) * 20}px, ${(mousePos.y - 0.5) * 20}px)`
          }}
        ></div>
        <div className="grid-overlay"></div>
      </div>
      
      <div className="hero-content">
        <h1 className="hero-title">
          <TextScramble text="What you seek" className="scramble-line" />
          <br />
          <TextScramble text="is seeking you." className="scramble-line accent" />
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
      
      <div className="scroll-indicator" aria-hidden="true">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
export default Hero;