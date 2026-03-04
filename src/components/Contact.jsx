// src/components/Contact.jsx - Remove email link
import { memo, useState, useCallback } from 'react';
import { Icon } from './common/Icon';
import { CONFIG } from '../config';

const InputField = ({ type, name, placeholder, value, onChange, required, isTextarea }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  
  const handleChange = (e) => {
    onChange(e);
    setHasValue(e.target.value.length > 0);
  };
  
  const Component = isTextarea ? 'textarea' : 'input';
  
  return (
    <div className={`input-wrapper ${isFocused ? 'focused' : ''} ${hasValue ? 'has-value' : ''}`}>
      <Component
        type={type}
        name={name}
        placeholder=" "
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        rows={isTextarea ? 6 : undefined}
      />
      <label className="input-label">{placeholder}</label>
      <div className="input-border"></div>
      <div className="input-glow"></div>
    </div>
  );
};

const Contact = memo(() => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const subject = `Portfolio Contact from ${formData.name}`;
      const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
      window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
      
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  }, [formData]);

  return (
    <section id="contact" className="section">
      <div className="container">
        <header className="section-header">
          <h2>Get in Touch</h2>
        </header>

        <div className="contact-grid">
          <div className="contact-text">
            <p className="contact-description">
              Let us explore opportunities together. I'm available for full-time roles 
              and open to discussing project ideas that can be brought to fruition.
            </p>
            <p className="contact-subtext">
              Suggestions and friendly greetings are also welcome. Let's connect.
            </p>
            
            {/* Email link removed - form is sufficient */}
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {showSuccess ? (
              <div className="form-success">
                <div className="success-icon">
                  <Icon name="CheckCircle" size={48} />
                </div>
                <h3>Message Ready!</h3>
                <p>Opening your email client...</p>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <InputField
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <InputField
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <InputField
                  isTextarea
                  name="message"
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <button 
                  type="submit" 
                  className={`btn-submit ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  <span className="btn-text">
                    <Icon name="Send" size={16} /> 
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                  <span className="btn-loader"></span>
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';
export default Contact;