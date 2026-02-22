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
    const subject = `Portfolio Contact from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
  }, [formData]);

  return (
    <section id="contact" className="section">
      <div className="container">
        <header className="section-header">
          <h2>Get in Touch</h2>
        </header>

        <div className="contact-grid">
          {/* Left side - Text */}
          <div className="contact-text">
            <p className="contact-description">
              Let us explore opportunities together. I'm available for full-time roles 
              and open to discussing project ideas that can be brought to fruition.
            </p>
            <p className="contact-subtext">
              Suggestions and friendly greetings are also welcome. Let's connect.
            </p>
          </div>

          {/* Right side - Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <textarea
              name="message"
              rows="6"
              placeholder="Your message..."
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn-submit">
              <Icon name="Send" size={16} /> Send Message
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-3xl);
          align-items: start;
        }
        
        .contact-text {
          max-width: 500px;
        }
        
        .contact-description {
          font-size: 1.25rem;
          line-height: 1.8;
          color: var(--text-secondary);
          margin-bottom: var(--space-lg);
        }
        
        .contact-subtext {
          font-size: 1.125rem;
          line-height: 1.8;
          color: var(--text-muted);
        }
        
        .contact-form {
          max-width: none;
        }
        
        /* Mobile: Stack vertically */
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: var(--space-xl);
          }
          
          .contact-description {
            font-size: 1.1rem;
          }
          
          .contact-subtext {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
});

Contact.displayName = 'Contact';
export default Contact;