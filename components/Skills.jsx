import { memo } from 'react';
import { SKILLS } from '../config';

const Skills = memo(() => {
  return (
    <section id="skills" className="section">
      <div className="container">
        <header className="section-header">
          <h2>Skillset</h2>
        </header>

        <div className="skills-list">
          {SKILLS.map((skill, idx) => (
            <div key={idx} className="skill-row">
              <h3 className="skill-category">{skill.category}</h3>
              <div className="skill-items-row">
                {skill.items.map((item, i) => (
                  <span key={i} className="skill-tag">{item}</span>
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