import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { IconSearch, IconX } from './Icons';
import { products } from '../data/products';

export default function SearchModal() {
  const { searchOpen, setSearchOpen } = useCart();
  const [query, setQuery] = useState('');

  if (!searchOpen) return null;

  const results = query.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="search-modal-backdrop" onClick={() => setSearchOpen(false)}>
      <div className="search-modal-box" onClick={e => e.stopPropagation()}>
        <div className="search-input-row">
          <span className="search-icon-inside">
            <IconSearch size={20} />
          </span>
          <input
            type="search"
            placeholder="Search herbal creams, oils, gels..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          <button
            type="button"
            className="search-close-btn"
            onClick={() => setSearchOpen(false)}
            aria-label="Close search"
          >
            <IconX size={20} />
          </button>
        </div>

        {query.trim() && (
          <div style={{ marginTop: '16px', maxHeight: '260px', overflowY: 'auto' }}>
            {results.length > 0 ? (
              results.map(prod => (
                <Link
                  key={prod.id}
                  to={`/products/${prod.slug}`}
                  onClick={() => setSearchOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    color: '#1e293b',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '700', fontSize: '14px' }}>{prod.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{prod.category} • ₹{prod.price}</div>
                  </div>
                  <span style={{ fontSize: '13px', color: '#059669', fontWeight: '700' }}>View →</span>
                </Link>
              ))
            ) : (
              <div style={{ padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
                No herbal products found matching &ldquo;{query}&rdquo;
              </div>
            )}
          </div>
        )}

        <div className="search-quick-links">
          <span>Popular:</span>
          <Link to="/products/herbal-face-cream" onClick={() => setSearchOpen(false)}>Herbal Face Cream</Link>
          <Link to="/products/herbal-hair-oil" onClick={() => setSearchOpen(false)}>Hair Oil</Link>
          <Link to="/products/aloe-vera-gel" onClick={() => setSearchOpen(false)}>Aloe Vera Gel</Link>
          <Link to="/shop?cat=Skin%20Care" onClick={() => setSearchOpen(false)}>Skin Care</Link>
        </div>
      </div>
    </div>
  );
}
