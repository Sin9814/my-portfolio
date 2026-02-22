import { memo } from 'react';
import { Icon } from './common/Icon';
import { CONFIG } from '../config';

const Contact = memo(() => {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-wrapper">
          <header className="section-header">
            <h2>Get in Touch</h2>
            <p>Ready when you are.</p>
          </header>
          
          <div className="contact-content" style={{ 
            textAlign: 'center', 
            padding: 'var(--space-xl) 0',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <div className="contact-item" style={{ marginBottom: 'var(--space-lg)' }}>
              <Icon name="Mail" size={32} style={{ color: 'var(--accent)', marginBottom: 'var(--space-sm)' }} />
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xs)' }}>Email me at</p>
              <a 
                href={`mailto:${CONFIG.email}`}
                style={{ 
                  fontSize: '1.25rem', 
                  color: 'var(--accent)',
                  textDecoration: 'none',
                  fontWeight: '600',
                  borderBottom: '1px solid var(--accent)',
                  paddingBottom: '2px'
                }}
              >
                {CONFIG.email}
              </a>
            </div>

            <div className="contact-item" style={{ marginBottom: 'var(--space-lg)' }}>
              <Icon name="Linkedin" size={32} style={{ color: 'var(--accent)', marginBottom: 'var(--space-sm)' }} />
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xs)' }}>Connect on LinkedIn</p>
              <a 
                href={CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ marginTop: 'var(--space-sm)' }}
              >
                <Icon name="ExternalLink" size={16} /> View Profile
              </a>
            </div>

            <div className="contact-item">
              <Icon name="Github" size={32} style={{ color: 'var(--accent)', marginBottom: 'var(--space-sm)' }} />
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xs)' }}>Check out my code</p>
              <a 
                href={CONFIG.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ marginTop: 'var(--space-sm)' }}
              >
                <Icon name="ExternalLink" size={16} /> GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';
export default Contact;
