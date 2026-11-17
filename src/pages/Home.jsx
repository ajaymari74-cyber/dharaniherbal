import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { IconArrowRight, IconLeaf, IconAward } from '../components/Icons';
import './Home.css';

export default function Home() {
  const featured = products.slice(0, 4);

  return (
    <div className="home-canvas">
      <div className="home-container container">
        {/* Screen 1: Hero */}
        <Hero />

        {/* Screen 1: TrustBar */}
        <TrustBar />

        {/* Featured Masterpieces Showcase */}
        <section className="home-featured-showcase">
          <div className="featured-header-row">
            <div className="featured-header-titles">
              <span className="section-eyebrow">AYURVEDIC FORMULATIONS</span>
              <h2>Featured Masterpieces</h2>
              <p>Handpicked botanical essentials crafted with nature&apos;s finest herbs</p>
            </div>
            <Link className="featured-view-all-cta" to="/shop">
              <span>Browse All</span>
              <IconArrowRight size={14} />
            </Link>
          </div>
          <div className="home-featured-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Screen 5: Brand Story / About Highlight */}
        <section className="home-story-section">
          <div className="screen5-about-grid">
            <div className="screen5-about-text">
              <span className="screen5-eyebrow">About Dharani Herbals</span>
              <h2 className="screen5-heading">
                Rooted in Tradition. <br />
                Made for Today.
              </h2>
              <p className="screen5-desc">
                We believe in the power of nature. Our journey begins with a simple idea —
                to bring the goodness of natural herbs into your everyday life with modern,
                safe and chemical-free botanical care.
              </p>
              <div className="screen5-cta-row">
                <Link className="our-story-gold-btn" to="/about">
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
                  alt="Traditional Mortar & Botanicals"
                  className="mortar-main-img"
                  width="600"
                  height="460"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
