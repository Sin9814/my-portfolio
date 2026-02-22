import { memo } from 'react';
import { Icon } from './common/Icon';
import { CONFIG } from '../config';

const Contact = memo(() => {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-wrapper" style={{ maxWidth: '600px' }}>
          <header className="section-header">
            <h2>Get in Touch</h2>
          </header>

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 'var(--space-lg)',
            padding: 'var(--space-xl) 0'
          }}>
            <p style={{ 
              fontSize: '1.125rem', 
              lineHeight: '1.8', 
              color: 'var(--text-secondary)' 
            }}>
              Let us explore opportunities together. I'm available for full-time roles 
              and open to discussing project ideas that can be brought to fruition. 
              Suggestions and friendly greetings are also welcome.
            </p>

            <a 
              href={`mailto:${CONFIG.email}`}
              className="btn btn-primary"
              style={{ 
                alignSelf: 'flex-start',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-sm)'
              }}
            >
              <Icon name="Mail" size={18} />
              Say Hello
            </a>

            <p style={{ 
              fontSize: '0.875rem', 
              color: 'var(--text-muted)',
              marginTop: 'var(--space-md)'
            }}>
              Or find me on <a href={CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>LinkedIn</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';
export default Contact;