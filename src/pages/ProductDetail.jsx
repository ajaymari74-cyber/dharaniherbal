import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import {
  IconHome,
  IconChevronUp,
  IconChevronDown,
  IconPlay,
  IconStar,
  IconDroplet,
  IconSparkles,
  IconLeaf,
  IconShield,
  IconTruck,
  IconRotateCcw,
  IconShoppingCart,
  IconArrowRight,
  IconHeart,
  IconPlus,
  IconMinus,
  IconX
} from '../components/Icons';
import './ProductDetail.css';

const thumbnails = [
  { id: 0, src: '/images/mockup/thumb1.png', alt: 'Herbal Face Cream View 1' },
  { id: 1, src: '/images/mockup/thumb2.png', alt: 'Herbal Face Cream Texture' },
  { id: 2, src: '/images/mockup/thumb3.png', alt: 'Herbal Face Cream Packaging' },
  { id: 3, src: '/images/mockup/thumb4.png', alt: 'Herbal Face Cream Botanicals' }
];

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isWishlisted } = useCart();

  const product =
    products.find((p) => p.slug === id || String(p.id) === id) ||
    products[0];

  const [activeThumb, setActiveThumb] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Description');
  const [videoModal, setVideoModal] = useState(false);

  const slug = product.slug || product.id;
  const isLiked = isWishlisted(slug);

  const related = products.filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <div className="product-screen2-canvas">
      <div className="product-screen2-container">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb">
          <Link to="/" aria-label="Home">
            <IconHome size={14} />
          </Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/shop">Collections</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to={`/shop?cat=${encodeURIComponent(product.category)}`}>
            {product.category}
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-active">{product.name}</span>
        </nav>

        {/* Product Hero Showcase */}
        <section className="product-hero-showcase">
          {/* Left Visual Stage */}
          <div className="hero-visual-stage">
            {/* Vertical Thumbnail Strip */}
            <div className="vertical-thumbnail-strip">
              <button
                type="button"
                className="thumb-arrow-btn"
                aria-label="Previous image"
                onClick={() =>
                  setActiveThumb((prev) =>
                    prev === 0 ? thumbnails.length - 1 : prev - 1
                  )
                }
              >
                <IconChevronUp size={18} />
              </button>

              <div className="vertical-thumbnails-list">
                {thumbnails.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`thumbnail-item ${
                      activeThumb === t.id ? 'active' : ''
                    }`}
                    onClick={() => setActiveThumb(t.id)}
                    aria-label={t.alt}
                  >
                    <img src={t.src} alt={t.alt} />
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="thumb-arrow-btn"
                aria-label="Next image"
                onClick={() =>
                  setActiveThumb((prev) =>
                    prev === thumbnails.length - 1 ? 0 : prev + 1
                  )
                }
              >
                <IconChevronDown size={18} />
              </button>
            </div>

            {/* Central Dome Display */}
            <div className="product-dome-stage">
              <div className="floating-discount-badge">
                <span className="discount-number">25%</span>
                <span className="discount-text">OFF</span>
              </div>

              <div className="dome-image-wrapper">
                <img
                  src={
                    activeThumb === 0
                      ? '/images/mockup/hero_dome.png'
                      : thumbnails[activeThumb].src
                  }
                  alt={product.name}
                  className="dome-main-img"
                />
              </div>

              <button
                type="button"
                className="watch-product-btn"
                onClick={() => setVideoModal(true)}
              >
                <span className="play-circle">
                  <IconPlay size={10} fill="#173b2a" />
                </span>
                <span>Watch Product</span>
              </button>
            </div>
          </div>

          {/* Right Product Details */}
          <div className="hero-product-details">
            <div className="best-seller-tag">
              <IconStar size={13} className="star-icon-filled" />
              <span>BEST SELLER</span>
            </div>

            <h1 className="product-title">{product.name}</h1>
            <p className="product-subtitle">Natural Glow, Naturally You</p>

            {/* Rating */}
            <div className="rating-row">
              <div className="stars-list">
                {[1, 2, 3, 4, 5].map((s) => (
                  <IconStar
                    key={s}
                    size={16}
                    fill="#f59e0b"
                    color="#f59e0b"
                    className="star-icon-filled"
                  />
                ))}
              </div>
              <span className="rating-score">{product.rating || '4.8'}</span>
              <span className="review-count">(12,560 reviews)</span>
            </div>

            {/* Price */}
            <div className="pricing-row">
              <span className="price-current">₹{product.price}</span>
              <span className="price-old">₹{product.oldPrice || 399}</span>
              <span className="price-discount-pill">25% OFF</span>
            </div>

            <p className="product-description-snippet">
              {product.description ||
                'Enriched with pure herbal extracts, this face cream nourishes your skin, keeps it hydrated and gives a natural, healthy glow.'}
            </p>

            {/* 4 Feature Pills */}
            <div className="feature-cards-grid">
              <div className="feature-pill-card">
                <div className="feature-icon-wrapper">
                  <IconLeaf size={20} color="#059669" />
                </div>
                <span>100% Natural</span>
              </div>
              <div className="feature-pill-card">
                <div className="feature-icon-wrapper">
                  <IconDroplet size={20} />
                </div>
                <span>Deep Hydration</span>
              </div>
              <div className="feature-pill-card">
                <div className="feature-icon-wrapper">
                  <IconShield size={20} color="#059669" />
                </div>
                <span>Skin Safe</span>
              </div>
              <div className="feature-pill-card">
                <div className="feature-icon-wrapper">
                  <IconSparkles size={20} />
                </div>
                <span>Natural Glow</span>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="purchase-action-row">
              <div className="quantity-stepper">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <IconMinus size={14} />
                </button>
                <span className="qty-number">{quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  <IconPlus size={14} />
                </button>
              </div>

              <button
                type="button"
                className="add-to-cart-cta-btn"
                onClick={() => addToCart(product, quantity)}
              >
                <IconShoppingCart size={18} />
                <span>Add to Cart</span>
                <IconArrowRight size={16} />
              </button>

              <button
                type="button"
                className={`wishlist-toggle-btn ${isLiked ? 'liked' : ''}`}
                aria-label="Add to wishlist"
                onClick={() => toggleWishlist(slug)}
              >
                <IconHeart
                  size={20}
                  fill={isLiked ? '#e11d48' : 'none'}
                  color={isLiked ? '#e11d48' : '#1e3a2b'}
                />
              </button>
            </div>

            {/* Trust Perks Bar */}
            <div className="trust-perks-bar">
              <div className="trust-perk-item">
                <IconTruck size={20} className="trust-perk-icon" />
                <div>
                  <strong>Free Shipping</strong>
                  <span>Above ₹499</span>
                </div>
              </div>
              <div className="trust-perk-item">
                <IconShield size={20} className="trust-perk-icon" />
                <div>
                  <strong>Secure Payments</strong>
                  <span>100% Secure</span>
                </div>
              </div>
              <div className="trust-perk-item">
                <IconRotateCcw size={20} className="trust-perk-icon" />
                <div>
                  <strong>Easy Returns</strong>
                  <span>7 Days</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Split Section: Tabs & You May Also Like */}
        <section className="bottom-split-section">
          {/* Tabs Info Card */}
          <div className="tabs-info-card">
            <div className="pill-tabs-header">
              {['Description', 'Benefits', 'Ingredients', 'How to Use', 'Reviews (12)'].map(
                (tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={`pill-tab-btn ${
                      activeTab === tab ? 'active' : ''
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>

            <div className="tab-content-area">
              {activeTab === 'Description' && (
                <div>
                  <h3>Pure Herbal Care for Radiant Skin</h3>
                  <p>
                    Dharani Herbal Face Cream is crafted with the goodness of
                    nature to nourish, protect and rejuvenate your skin with a
                    healthy natural glow. Infused with pure saffron, turmeric,
                    and sandalwood extracts.
                  </p>
                  <ul className="tab-bullets-list">
                    <li>
                      <span className="bullet-dot"></span>
                      100% plant-based organic formulation
                    </li>
                    <li>
                      <span className="bullet-dot"></span>
                      Locks in moisture for up to 24 hours
                    </li>
                    <li>
                      <span className="bullet-dot"></span>
                      Free from parabens, mineral oils and synthetic perfumes
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === 'Benefits' && (
                <div>
                  <h3>Proven Ayurvedic Benefits</h3>
                  <ul className="tab-bullets-list">
                    {(product.benefits || [
                      'Restores skin elasticity and natural radiance',
                      'Deeply hydrates dry and tired skin',
                      'Soothes blemishes, redness and skin irritation',
                      'Non-greasy, absorbs instantly'
                    ]).map((b, i) => (
                      <li key={i}>
                        <span className="bullet-dot"></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'Ingredients' && (
                <div>
                  <h3>Active Botanicals</h3>
                  <ul className="tab-bullets-list">
                    {(product.ingredients || [
                      'Organic Kumkumadi Tailam & Saffron Stigmas',
                      'Kashmiri Wild Turmeric Extract',
                      'Pure Mysore Sandalwood Oil',
                      'Cold-Pressed Almond & Jojoba Oil'
                    ]).map((ing, i) => (
                      <li key={i}>
                        <span className="bullet-dot"></span>
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'How to Use' && (
                <div>
                  <h3>How to Apply</h3>
                  <ul className="tab-bullets-list">
                    {(product.howToUse || [
                      'Cleanse your face thoroughly with fresh water or herbal face wash.',
                      'Take a small pea-sized amount onto clean fingertips.',
                      'Gently massage into face and neck in upward circular motions.',
                      'Use daily morning and night for best radiant results.'
                    ]).map((step, i) => (
                      <li key={i}>
                        <span className="bullet-dot"></span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'Reviews (12)' && (
                <div>
                  <h3>Verified Customer Reviews</h3>
                  <p style={{ fontStyle: 'italic', marginBottom: '10px' }}>
                    &ldquo;My skin feels so refreshed and soft! The fragrance is so subtle and purely herbal.&rdquo; &mdash; Priya S. (Chennai)
                  </p>
                  <p style={{ fontStyle: 'italic' }}>
                    &ldquo;Best herbal cream I have used. Within 2 weeks my skin has a visible natural glow.&rdquo; &mdash; Kavitha M. (Bengaluru)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Related Products Card */}
          <div className="related-products-card">
            <div className="related-header-row">
              <h2 className="related-title">You May Also Like</h2>
              <Link to="/shop" className="view-all-link">
                <span>View All</span>
                <IconArrowRight size={13} />
              </Link>
            </div>

            <div className="related-items-grid">
              {related.map((item) => (
                <div key={item.id} className="related-item-card">
                  <Link
                    to={`/products/${item.slug}`}
                    className="related-item-img-wrapper"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="related-item-img"
                    />
                  </Link>

                  <div className="related-item-info">
                    <span className="related-item-name">{item.name}</span>
                    <div className="related-item-bottom">
                      <span className="related-item-price">₹{item.price}</span>
                      <button
                        type="button"
                        className="related-item-cart-btn"
                        onClick={() => addToCart(item, 1)}
                        aria-label={`Add ${item.name} to cart`}
                      >
                        <IconShoppingCart size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Video Modal */}
      {videoModal && (
        <div
          className="video-modal-backdrop"
          onClick={() => setVideoModal(false)}
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
        >
          <div
            className="video-modal-box"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: '24px',
              padding: '24px',
              maxWidth: '680px',
              width: '100%',
              boxShadow: '0 25px 60px rgba(0,0,0,0.35)'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
              }}
            >
              <h4 style={{ margin: 0, color: '#0c3323', fontSize: '20px', fontWeight: '800' }}>
                Dharani Herbals - {product.name}
              </h4>
              <button
                type="button"
                className="video-modal-close-btn"
                onClick={() => setVideoModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <IconX size={20} />
              </button>
            </div>
            <div style={{ borderRadius: '16px', overflow: 'hidden', background: '#000', position: 'relative' }}>
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
                  background: 'rgba(0,0,0,0.3)'
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#059669',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                  }}
                >
                  <IconPlay size={24} fill="#059669" />
                </div>
              </div>
            </div>
            <p
              style={{
                color: '#334155',
                fontSize: '14px',
                lineHeight: '1.6',
                marginTop: '14px'
              }}
            >
              Watch how our herbal artisans blend rare Himalayan herbs and pure
              botanical oils to create this transformative face cream.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
