// src/components/Work.jsx
import { memo, useRef, useCallback, useState, useEffect } from 'react';
import { PROJECTS } from '../config.js';

const ProjectCard = ({ project, index }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setTilt({
      x: (y - 0.5) * 10,
      y: (x - 0.5) * -10
    });
  }, []);
  
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // NEW: Handle card click
  const handleClick = () => {
    if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };
  
  return (
    <article 
      ref={cardRef}
      className={`project-card ${isHovered ? 'hovered' : ''}`}
      onClick={handleClick}
      style={{
        cursor: project.link ? 'pointer' : 'default',
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered ? 'translateY(-8px)' : ''}`,
        transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-shine" style={{
        background: `radial-gradient(circle at ${((tilt.y + 10) / 20) * 100}% ${((tilt.x + 10) / 20) * 100}%, rgba(74, 222, 128, 0.15) 0%, transparent 60%)`
      }}></div>
      
      <div className="card-content">
        <h3>
          {project.title}
          {project.link && <span style={{ fontSize: '0.7em', marginLeft: '8px', opacity: 0.7 }}>↗</span>}
        </h3>
        <p className="project-description">{project.description}</p>
        <ul className="project-highlights">
          {project.highlights.map((highlight, i) => (
            <li key={i} style={{ animationDelay: `${i * 50}ms` }}>
              <span className="highlight-dot"></span>
              {highlight}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="card-border"></div>
    </article>
  );
};

const Work = memo(() => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      checkScroll();
    }
    return () => el?.removeEventListener('scroll', checkScroll);
  }, [checkScroll]);

  const scroll = useCallback((direction) => {
    if (!scrollRef.current) return;
    const cardWidth = 470;
    scrollRef.current.scrollBy({ 
      left: direction === 'left' ? -cardWidth : cardWidth, 
      behavior: 'smooth' 
    });
  }, []);

  return (
    <section id="work" className="section">
      <div className="container">
        <header className="section-header">
          <h2>Projects</h2>
        </header>

        <div className="work-carousel">
          <button 
            className={`carousel-btn prev ${canScrollLeft ? 'visible' : ''}`}
            onClick={() => scroll('left')}
            aria-label="Previous project"
          >
            <span>←</span>
          </button>
          
          <div 
            className="carousel-container" 
            ref={scrollRef}
          >
            {PROJECTS.map((project, idx) => (
              <ProjectCard key={project.title} project={project} index={idx} />
            ))}
          </div>
          
          <button 
            className={`carousel-btn next ${canScrollRight ? 'visible' : ''}`}
            onClick={() => scroll('right')}
            aria-label="Next project"
          >
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
});

Work.displayName = 'Work';
export default Work;