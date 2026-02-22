import { memo, useState, useCallback } from 'react';
import { Icon } from './common/Icon';
import { CONFIG } from '../config';

const Contact = memo(() => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    // Create email body from form data
    const subject = `Portfolio Contact from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    
    // Open email client
    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
  }, [formData]);

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-wrapper">
          <header className="section-header">
            <h2>Get in Touch</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-sm)' }}>
              Let us explore opportunities together. I'm available for full-time roles and open to discussing project ideas that can be brought to fruition.
            </p>
          </header>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <textarea
              name="message"
              rows="5"
              placeholder="Your message..."
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn-submit">
              <Icon name="Send" size={16} /> Send Message
            </button>
          </form>

          <div style={{ 
            textAlign: 'center', 
            marginTop: 'var(--space-lg)',
            paddingTop: 'var(--space-lg)',
            borderTop: '1px solid var(--border)'
          }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Or reach out directly at{' '}
              <a href={`mailto:${CONFIG.email}`} style={{ color: 'var(--accent)' }}>
                {CONFIG.email}
              </a>
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-sm)', marginTop: 'var(--space-sm)' }}>
              <a href={CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }}>
                <Icon name="Linkedin" size={20} />
              </a>
              <a href={CONFIG.social.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }}>
                <Icon name="Github" size={20} />
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