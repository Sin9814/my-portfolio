// src/components/About.jsx - Remove stats section
import { memo, useState } from 'react';
import { Icon } from './common/Icon.jsx';
import { CONFIG } from '../config.js';

const About = memo(() => {
  const [hoveredTag, setHoveredTag] = useState(null);
  
  const tags = [
    { id: 'company', icon: 'Building', label: CONFIG.company },
    { id: 'role', icon: 'Code2', label: 'Java Developer' },
    { id: 'exp', icon: 'Briefcase', label: '2+ Years Experience' },
    { id: 'cert', icon: 'Cloud', label: 'Azure AZ-900 certified' }
  ];
  
  return (
    <section id="about" className="section">
      <div className="container">
        <header className="section-header">
          <h2>Current Status</h2>
        </header>

        <div className="about-content">
          <div className="about-highlights">
            {tags.map((tag, idx) => (
              <div 
                key={tag.id}
                className={`highlight-tag ${hoveredTag === tag.id ? 'active' : ''}`}
                style={{ 
                  animationDelay: `${idx * 100}ms`,
                  transform: hoveredTag === tag.id ? 'translateY(-4px) scale(1.02)' : 'translateY(0)'
                }}
                onMouseEnter={() => setHoveredTag(tag.id)}
                onMouseLeave={() => setHoveredTag(null)}
              >
                <Icon name={tag.icon} size={16} />
                <span>{tag.label}</span>
                <div className="tag-glow"></div>
              </div>
            ))}
          </div>

          <div className="about-text-reveal">
            <p className="about-description">
              Currently working as a <span className="highlight-text">Backend Developer</span> at{' '}
              <span className="highlight-text">Tata Consultancy Services</span>, contributing to backend systems for{' '}
              <span className="highlight-text">DGCA</span> (Directorate General of Civil Aviation) and{' '}
              <span className="highlight-text">BCAS</span> (Bureau of Civil Aviation Security), supporting national-level aviation regulatory and security operations.
            </p>
            <p className="about-description">
              I design, develop, and maintain <span className="highlight-text">REST APIs</span> using Java and Spring Boot, improve and refactor legacy services for better structure and maintainability, optimize high-usage <span className="highlight-text">SQL queries</span> for performance, and resolve production issues through structured debugging and log analysis. My work focuses on building <span className="highlight-text">reliable, maintainable</span> backend systems that support critical real-world operations.
            </p>
          </div>
          
          {/* Stats section removed as requested */}
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';
export default About;