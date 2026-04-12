import { useState } from 'react';
import './ContactModal.css';

function ContactModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter a message';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', phone: '', message: '' });
        if (onSuccess) onSuccess();

        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setErrors({ submit: 'Failed to send message. Please try again.' });
        setIsSubmitting(false);
      }
    } catch {
      setErrors({ submit: 'Network error. Please check your connection.' });
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (isSuccess) {
    return (
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal-content">
          <div className="success-message">
            <div className="success-message-icon">✓</div>
            <h3>Message Sent!</h3>
            <p>Thank you for reaching out. We'll get back to you shortly.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close modal" disabled={isSubmitting}>
          ×
        </button>

        <h2>Get in Touch</h2>
        <p className="modal-subtitle">We'd love to hear from you. Send us a message!</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="modal-name">Name</label>
            <input
              type="text"
              id="modal-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              autoFocus
              autoComplete='name'
              disabled={isSubmitting}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="modal-phone">Phone</label>
            <input
              type="tel"
              id="modal-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Your phone number"
              autoComplete='tel'
              disabled={isSubmitting}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="modal-message">Message</label>
            <textarea
              id="modal-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="How can we help you?"
              autoComplete='off'
              disabled={isSubmitting}
            ></textarea>
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>

          {errors.submit && <span className="error-message" style={{ marginBottom: '1rem' }}>{errors.submit}</span>}

          <button
            type="submit"
            className="btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactModal;