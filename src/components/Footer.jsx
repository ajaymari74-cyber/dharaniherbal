import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconArrowRight, IconCheck } from './Icons';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="master-site-footer">
      {/* Screen 7: Floral Botanical Banner */}
      <section className="footer-floral-banner">
        <div className="banner-inner">
          <div className="banner-content">
            <div className="banner-logo-badge">
              <img
                alt="Logo"
                width="28"
                height="22"
                src="/images/mockup/logo_leaf.png"
              />
              <span>Dharani Herbals</span>
            </div>
            <h2>Pure Herbal Care for Radiant Skin</h2>
            <p>
              Dharani Herbal Face Cream is crafted with the goodness of nature to
              nourish, protect and rejuvenate your skin with a healthy natural
              glow.
            </p>
            <div className="banner-categories-pills">
              <Link to="/shop?cat=Skin%20Care">Skin Care</Link>
              <Link to="/shop?cat=Hair%20Care">Hair Care</Link>
              <Link to="/shop?cat=Body%20Care">Body Care</Link>
              <Link to="/shop">View Full Range &rarr;</Link>
            </div>
          </div>
          <div className="banner-visual-box">
            <img
              alt="Dharani Botanical Collection"
              width="520"
              height="280"
              className="banner-visual-img"
              src="/images/theme/footer_banner.png"
            />
          </div>
        </div>
      </section>

      {/* Screen 8: Deep Emerald Luxury Glassmorphic Footer */}
      <div className="footer-deep-emerald">
        <div className="footer-grid-container">
          {/* Column 1: Brand Info */}
          <div className="footer-col-brand">
            <Link className="footer-brand-lockup" to="/">
              <img
                alt="Dharani Herbals"
                width="34"
                height="28"
                src="/images/mockup/logo_leaf.png"
              />
              <span>
                <strong>Dharani</strong>
                <small>Herbals</small>
              </span>
            </Link>
            <p className="footer-mission-quote">
              Nature is not a trend. It&apos;s a way of life.
            </p>
            <div className="footer-social-row">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="social-pill"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="social-pill"
              >
                Facebook
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="social-pill"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col-links">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shop">Collections</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/shop">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="footer-col-links">
            <h4>Customer Care</h4>
            <ul>
              <li>
                <Link to="/contact">FAQs</Link>
              </li>
              <li>
                <Link to="/contact">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/contact">Return Policy</Link>
              </li>
              <li>
                <Link to="/cart">Track Order</Link>
              </li>
              <li>
                <Link to="/contact">Support</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="footer-col-newsletter">
            <h4>Newsletter</h4>
            <p>Subscribe for natural beauty tips &amp; exclusive offers.</p>
            {subscribed ? (
              <div
                style={{
                  color: '#34d399',
                  fontSize: '13px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <IconCheck size={16} />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" aria-label="Subscribe">
                  <IconArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Sub-bar */}
        <div className="footer-sub-bar">
          <span>&copy; 2026 Dharani Herbals. All rights reserved.</span>
          <span className="footer-made-with">Made with ❤️ by Nature</span>
        </div>
      </div>
    </footer>
  );
}
