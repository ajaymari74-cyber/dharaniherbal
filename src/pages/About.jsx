import React from 'react';
import { Link } from 'react-router-dom';
import {
  IconLeaf,
  IconAward,
  IconArrowRight,
  IconDroplet,
  IconShield,
  IconSparkles
} from '../components/Icons';
import './About.css';

export default function About() {
  return (
    <div className="about-canvas">
      <div className="about-container">
        {/* Main Brand Story Grid */}
        <section className="screen5-about-grid">
          <div className="screen5-about-text">
            <span className="screen5-eyebrow">About Dharani Herbals</span>
            <h1 className="screen5-heading">
              Rooted in Tradition. <br />
              Made for Today.
            </h1>
            <p className="screen5-desc">
              We believe in the power of nature. Our journey begins with a simple idea &mdash;
              to bring the goodness of natural herbs into your everyday life with modern,
              safe and chemical-free botanical care.
            </p>

            <div className="screen5-cta-row">
              <Link className="our-story-gold-btn" to="/shop">
                <span>Our Story</span>
                <IconArrowRight size={15} />
              </Link>
            </div>

            <div className="screen5-trust-badges">
              <div className="about-pill-badge">
                <IconLeaf size={18} color="#059669" />
                <span>Trusted by 1M+</span>
              </div>
              <div className="about-pill-badge">
                <IconAward size={18} color="#f59e0b" />
                <span>Since 2010</span>
              </div>
            </div>
          </div>

          <div className="screen5-visual-box">
            <div className="mortar-img-wrapper">
              <img
                src="/images/theme/about_mortar.png"
                alt="Dharani Herbals Traditional Mortar & Botanicals"
                className="mortar-main-img"
              />
            </div>
          </div>
        </section>

        {/* 3 Botanical Heritage Pillars */}
        <section className="about-pillars-grid">
          <div className="about-pillar-card">
            <div className="pillar-icon-box">
              <IconLeaf size={24} />
            </div>
            <h3>100% Pure Botanical Extracts</h3>
            <p>
              Harvested fresh from sustainable Ayurvedic farms. No mineral oils,
              parabens, sulfates, or artificial fragrances.
            </p>
          </div>

          <div className="about-pillar-card">
            <div className="pillar-icon-box">
              <IconShield size={24} />
            </div>
            <h3>Dermatologically Tested</h3>
            <p>
              Every formula undergoes stringent clinical safety testing while
              preserving active natural phyto-compounds.
            </p>
          </div>

          <div className="about-pillar-card">
            <div className="pillar-icon-box">
              <IconSparkles size={24} />
            </div>
            <h3>Sustainable Cold-Pressed Craft</h3>
            <p>
              Slow-crafted at low temperatures so essential oils and natural vitamins
              remain potent, nourishing and deeply restorative.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
