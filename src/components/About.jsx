import { memo } from 'react';
import { Icon } from './common/Icon.jsx';
import { CONFIG } from '../config.js';

const About = memo(() => {
  return (
    <section id="about" className="section">
      <div className="container">
        <header className="section-header">
          <h2>Current Status</h2>
        </header>

        <div className="about-content">
          {/* Highlights moved up - below heading, above text */}
          <div className="about-highlights">
            <div className="highlight-tag">
              <Icon name="Building" size={16} />
              <span>{CONFIG.company}</span>
            </div>
            <div className="highlight-tag">
              <Icon name="Code2" size={16} />
              <span>Java Developer</span>
            </div>
            <div className="highlight-tag">
              <Icon name="Briefcase" size={16} />
              <span>2+ Years Experience</span>
            </div>
            <div className="highlight-tag">
              <Icon name="Cloud" size={16} />
              <span>Azure AZ-900 certified</span>
            </div>
          </div>

          

          <p className="about-description">
            Currently working as a Backend Developer at Tata Consultancy Services, contributing to backend systems for DGCA (Directorate General of Civil Aviation) and BCAS (Bureau of Civil Aviation Security), supporting national-level aviation regulatory and security operations.
</p><p className="about-description">
I design, develop, and maintain REST APIs using Java and Spring Boot, improve and refactor legacy services for better structure and maintainability, optimize high-usage SQL queries for performance, and resolve production issues through structured debugging and log analysis. My work focuses on building reliable, maintainable backend systems that support critical real-world operations.
            </p>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';
export default About;