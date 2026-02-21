import { memo, useRef, useCallback } from 'react';
import { PROJECTS } from '../config';

const Work = memo(() => {
  const scrollRef = useRef(null);

  const scroll = useCallback((direction) => {
    if (!scrollRef.current) return;
    const cardWidth = 470; // 450 + 20px gap
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
          <div 
            className="carousel-container" 
            ref={scrollRef}
          >
            {PROJECTS.map((project) => (
              <article key={project.title} className="project-card">
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <ul className="project-highlights">
                  {project.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Work.displayName = 'Work';
export default Work;