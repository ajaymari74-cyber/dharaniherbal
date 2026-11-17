import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { IconSearch, IconShoppingCart, IconChevronRight, IconStar } from '../components/Icons';
import './Shop.css';

const categories = [
  'All Products',
  'Skin Care',
  'Hair Care',
  'Body Care',
  'Wellness'
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();

  const currentCategory = searchParams.get('cat') || 'All Products';
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory !== 'All Products') {
      const catLower = selectedCategory.toLowerCase();
      list = list.filter((p) => {
        const pCat = p.category.toLowerCase();
        if (catLower === 'hair care') return pCat.includes('hair');
        if (catLower === 'skin care') return pCat.includes('skin');
        if (catLower === 'body care') return pCat.includes('body');
        if (catLower === 'wellness') return pCat.includes('wellness') || pCat.includes('care');
        return pCat.includes(catLower);
      });
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.shortDescription && p.shortDescription.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'low-high') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-low') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All Products') {
      setSearchParams({});
    } else {
      setSearchParams({ cat });
    }
  };

  return (
    <div className="shop-canvas">
      <div className="shop-container">
        {/* Header */}
        <div className="shop-heading">
          <span>DHARANI HERBALS</span>
          <h1>Our Collections</h1>
          <p>Explore our wide range of herbal care products crafted with pure botanicals.</p>
        </div>

        <div className="screen3-shop-layout">
          {/* Sidebar */}
          <aside className="screen3-sidebar">
            <div className="screen3-category-box">
              <h3>Categories</h3>
              <div className="screen3-category-list">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`screen3-category-button ${
                      selectedCategory === cat ? 'active' : ''
                    }`}
                    onClick={() => handleCategoryClick(cat)}
                  >
                    <span>{cat}</span>
                    <span style={{ marginLeft: 'auto' }}>
                      <IconChevronRight size={13} />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Promo Card from Mockup */}
            <div className="screen3-promo-card">
              <div style={{ fontSize: '26px', marginBottom: '8px' }}>🎁</div>
              <h3>Get 20% OFF</h3>
              <p>On your first order. Use code HERBAL20 at checkout for natural glow.</p>
              <button
                type="button"
                className="promo-shop-now-btn"
                onClick={() => handleCategoryClick('All Products')}
              >
                Shop Now →
              </button>
            </div>
          </aside>

          {/* Main Products Area */}
          <section className="screen3-shop-main">
            {/* Toolbar */}
            <div className="screen3-shop-toolbar">
              <div className="screen3-search-box">
                <IconSearch size={18} />
                <input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {/* Results Header */}
            <div className="screen3-results-heading">
              <h2>{selectedCategory}</h2>
              <span>{filteredProducts.length} products</span>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="screen3-products-grid">
                {filteredProducts.map((p) => {
                  const slug = p.slug || p.id;
                  const badgeText = p.badge || p.tag;
                  return (
                    <article key={p.id} className="screen3-product-card">
                      {badgeText && (
                        <span className={`screen3-card-badge ${badgeText.toLowerCase().includes('best') ? 'badge-bestseller' : badgeText.toLowerCase().includes('new') ? 'badge-new' : ''}`}>
                          {badgeText}
                        </span>
                      )}

                      <Link to={`/products/${slug}`} className="screen3-product-image">
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                        />
                      </Link>

                      <div className="screen3-product-info">
                        <span className="screen3-category-tag">{p.category}</span>
                        <h3>
                          <Link to={`/products/${slug}`}>{p.name}</Link>
                        </h3>

                        <div className="screen3-card-rating">
                          <IconStar size={12} fill="#f59e0b" color="#f59e0b" />
                          <span>{p.rating || '4.8'}</span>
                        </div>

                        <div className="screen3-product-price-row">
                          <div className="screen3-price-group">
                            <span className="screen3-price-now">₹{p.price}</span>
                            {p.oldPrice && <del className="screen3-price-old">₹{p.oldPrice}</del>}
                          </div>

                          <button
                            type="button"
                            className="screen3-card-cart-btn"
                            onClick={() => addToCart(p, 1)}
                            aria-label={`Add ${p.name} to cart`}
                            title="Add to Cart"
                          >
                            <IconShoppingCart size={15} />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="screen3-empty">
                <h3>No Products Found</h3>
                <p>Try resetting your search query or category filters.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('All Products');
                    setSearchQuery('');
                  }}
                >
                  View All Products
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
