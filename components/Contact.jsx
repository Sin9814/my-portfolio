import { memo, useState, useCallback } from 'react';
import { PROJECTS } from '../config';

const Contact = memo(() => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => {
      setIsSubmitted(false);
      setIsSubmitting(false);
    }, 4000);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-wrapper">
          <header className="section-header">
            <h2>Get in Touch</h2>
            <p>Ready when you are.</p>
          </header>

          {isSubmitted ? (
            <div className="form-success">
              <h3>Message Sent!</h3>
              <p>I'll respond within 24 hours.</p>
            </div>
          ) : (
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
                rows="3"
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                required
              />
              <button type="submit" className="btn-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';
export default Contact;