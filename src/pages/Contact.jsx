import React, { useState } from 'react';
import {
  IconPhone,
  IconMail,
  IconMapPin,
  IconCheck,
  IconArrowRight
} from '../components/Icons';
import './Contact.css';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 6000);
    }
  };

  return (
    <div className="contact-canvas">
      <div className="contact-container">
        <div className="screen6-contact-grid">
          {/* Column 1: Info Card */}
          <div className="screen6-info-card">
            <span className="contact-eyebrow">Get in Touch</span>
            <h1>We&apos;re Here to Help</h1>
            <p className="screen6-subtitle">
              Have a question about our herbal products, formulations or your
              order? Reach out to us anytime. We&apos;d love to hear from you.
            </p>

            <div className="contact-details-list">
              <div className="contact-detail-row">
                <div className="contact-icon-pill">
                  <IconPhone size={17} />
                </div>
                <span>+91 96765 43210</span>
              </div>

              <div className="contact-detail-row">
                <div className="contact-icon-pill">
                  <IconMail size={17} />
                </div>
                <span>hello@dharaniherbals.com</span>
              </div>

              <div className="contact-detail-row">
                <div className="contact-icon-pill">
                  <IconMapPin size={17} />
                </div>
                <span>Chennai, Tamil Nadu</span>
              </div>
            </div>

            <div className="contact-social-row">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="contact-social-icon"
                title="Instagram"
              >
                IG
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="contact-social-icon"
                title="Facebook"
              >
                FB
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="contact-social-icon"
                title="WhatsApp"
              >
                WA
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="contact-social-icon"
                title="YouTube"
              >
                YT
              </a>
            </div>
          </div>

          {/* Column 2: Form Card */}
          <div className="screen6-form-card">
            {submitted ? (
              <div className="form-success-banner">
                <IconCheck size={20} color="#059669" />
                <span>
                  Thank you! Your message has been sent successfully. Our botanical
                  care team will reply within 24 hours.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="contact-input-field"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="contact-input-field"
                />
                <textarea
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="contact-input-field"
                />
                <button type="submit" className="send-message-cta-btn">
                  <span>Send Message</span>
                  <IconArrowRight size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Column 3: Visual Bottle */}
          <div className="screen6-bottle-box">
            <div className="contact-bottle-img-wrapper">
              <img
                src="/images/theme/contact_bottle.png"
                alt="Pure Botanical Herbal Extract"
                className="contact-bottle-img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
