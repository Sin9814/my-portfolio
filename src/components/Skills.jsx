// src/components/Skills.jsx
import { memo, useState, useRef, useEffect } from 'react';
import { SKILLS } from '../config.js';

const SkillTag = ({ item, index, categoryIndex }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const tagRef = useRef(null);
  
  const handleMouseMove = (e) => {
    if (!tagRef.current) return;
    const rect = tagRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  
  return (
    <span 
      ref={tagRef}
      className={`skill-tag ${isHovered ? 'hovered' : ''}`}
      style={{ 
        animationDelay: `${(categoryIndex * 100) + (index * 50)}ms`,
        '--x': `${coords.x}px`,
        '--y': `${coords.y}px`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <span className="tag-shine"></span>
      {item}
    </span>
  );
};

const Skills = memo(() => {
  const [visibleRows, setVisibleRows] = useState({});
  const rowRefs = useRef([]);
  
  useEffect(() => {
    const observers = rowRefs.current.map((ref, idx) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleRows(prev => ({ ...prev, [idx]: true }));
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(ref);
      return observer;
    });
    
    return () => observers.forEach(obs => obs?.disconnect());
  }, []);
  
  return (
    <section id="skills" className="section">
      <div className="container">
        <header className="section-header">
          <h2>Skillset</h2>
        </header>

        <div className="skills-list">
          {SKILLS.map((skill, idx) => (
            <div 
              key={idx} 
              ref={el => rowRefs.current[idx] = el}
              className={`skill-row ${visibleRows[idx] ? 'visible' : ''}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <h3 className="skill-category">
                <span className="category-line"></span>
                {skill.category}
              </h3>
              <div className="skill-items-row">
                {skill.items.map((item, i) => (
                  <SkillTag 
                    key={i} 
                    item={item} 
                    index={i} 
                    categoryIndex={idx}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Skills.displayName = 'Skills';
export default Skills;