import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { IconArrowRight, IconPlay, IconShoppingCart, IconX } from './Icons';
import { products } from '../data/products';
import './Hero.css';

export default function Hero() {
  const [videoModal, setVideoModal] = useState(false);
  const { addToCart } = useCart();

  const hairOil = products.find((p) => p.slug === 'herbal-hair-oil') || products[3];
  const aloeGel = products.find((p) => p.slug === 'aloe-vera-gel') || products[1];

  return (
    <section className="dh-hero-section">
      <div className="dh-home-hero-layout">
        {/* Left Copy Column */}
        <div className="dh-home-copy">
          <span className="dh-home-eyebrow">
            PURE • NATURAL • AYURVEDIC
          </span>

          <h1 className="dh-home-heading">
            Nature&apos;s Care <br />
            for Your <span className="dh-beauty-text">Beauty</span>
          </h1>

          <p className="dh-home-description">
            Discover the goodness of nature with our premium herbal products,
            crafted with time-honored Ayurvedic wisdom and 100% natural botanicals.
          </p>

          <div className="dh-home-actions">
            <Link className="dh-home-primary-cta" to="/shop">
              <span>Explore Collection</span>
              <IconArrowRight size={16} />
            </Link>

            <button
              type="button"
              className="dh-home-secondary-cta"
              onClick={() => setVideoModal(true)}
            >
              <span
                style={{
                  background: '#fff',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#e11d48'
                }}
              >
                <IconPlay size={10} fill="#e11d48" />
              </span>
              <span>Watch Video</span>
            </button>
          </div>
        </div>

        {/* Right 3D Visual Stage */}
        <div className="dh-stage-wrapper">
          {/* Glass Bubble / Dome */}
          <div className="dh-hero-bubble-dome"></div>

          {/* Floating Botanical Leaves */}
          <span className="dh-leaf-decor dh-leaf-pos-1">🌿</span>
          <span className="dh-leaf-decor dh-leaf-pos-2">🍃</span>
          <span className="dh-leaf-decor dh-leaf-pos-3">🌿</span>
          <span className="dh-leaf-decor dh-leaf-pos-4">🍃</span>

          {/* Floating Card Left: Herbal Hair Oil */}
          <div className="dh-float-card dh-float-left">
            <Link
              to="/products/herbal-hair-oil"
              className="dh-card-img-box"
              aria-label="View Herbal Hair Oil"
            >
              <img
                src="/images/mockup/item_oil.png"
                alt="Herbal Hair Oil"
              />
            </Link>
            <div className="dh-card-title">Herbal Hair Oil</div>
            <div className="dh-card-bottom">
              <span className="dh-card-price">₹399</span>
              <button
                type="button"
                className="dh-card-cart-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(hairOil, 1);
                }}
                aria-label="Add Herbal Hair Oil to cart"
              >
                <IconShoppingCart size={13} />
              </button>
            </div>
          </div>

          {/* Central Dome Product: Herbal Face Cream */}
          <Link
            to="/products/herbal-face-cream"
            className="dh-center-dome-product"
            aria-label="Explore Herbal Face Cream"
          >
            <img
              src="/images/mockup/hero_dome.png"
              alt="Dharani Herbals Face Cream"
              className="dh-center-dome-img"
            />
          </Link>

          {/* Floating Card Right: Aloe Vera Gel */}
          <div className="dh-float-card dh-float-right">
            <Link
              to="/products/aloe-vera-gel"
              className="dh-card-img-box"
              aria-label="View Aloe Vera Gel"
            >
              <img
                src="/images/mockup/item_aloe.png"
                alt="Aloe Vera Gel"
              />
            </Link>
            <div className="dh-card-title">Aloe Vera Gel</div>
            <div className="dh-card-bottom">
              <span className="dh-card-price">₹299</span>
              <button
                type="button"
                className="dh-card-cart-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(aloeGel, 1);
                }}
                aria-label="Add Aloe Vera Gel to cart"
              >
                <IconShoppingCart size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 25, 18, 0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setVideoModal(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '24px',
              padding: '24px',
              maxWidth: '680px',
              width: '100%',
              boxShadow: '0 25px 60px rgba(0,0,0,0.35)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
              }}
            >
              <h3 style={{ margin: 0, color: '#0c3323', fontSize: '20px', fontWeight: '800' }}>
                Dharani Herbals &mdash; Pure Botanical Care
              </h3>
              <button
                type="button"
                onClick={() => setVideoModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <IconX size={22} />
              </button>
            </div>
            <div style={{ borderRadius: '16px', overflow: 'hidden', position: 'relative', background: '#0a1912' }}>
              <img
                src="/images/mockup/hero_dome.png"
                alt="Product video preview"
                style={{ width: '100%', height: '360px', objectFit: 'contain' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0,0,0,0.25)'
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.95)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#059669',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                  }}
                >
                  <IconPlay size={24} fill="#059669" />
                </div>
              </div>
            </div>
            <p style={{ marginTop: '16px', color: '#475569', fontSize: '14px', lineHeight: '1.6' }}>
              Discover how Dharani Herbals harvests traditional herbs from certified Ayurvedic farms, blending cold-pressed botanicals into restorative, chemical-free personal care products.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
