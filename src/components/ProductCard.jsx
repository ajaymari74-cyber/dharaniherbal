import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { IconShoppingCart, IconStar, IconHeart } from './Icons';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const slug = product.slug || product.id;
  const isLiked = isWishlisted(slug);
  const badgeText = product.badge || product.tag;

  return (
    <div className="home-product-card">
      {badgeText && (
        <span className={`card-badge-pill ${badgeText.toLowerCase().includes('best') ? 'badge-bestseller' : badgeText.toLowerCase().includes('new') ? 'badge-new' : ''}`}>
          {badgeText}
        </span>
      )}

      <button
        type="button"
        className={`card-wishlist-btn ${isLiked ? 'liked' : ''}`}
        aria-label="Wishlist"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(slug);
        }}
      >
        <IconHeart size={16} fill={isLiked ? '#e11d48' : 'none'} color={isLiked ? '#e11d48' : '#64748b'} />
      </button>

      <Link className="card-img-wrapper" to={`/products/${slug}`}>
        <img
          alt={product.name}
          loading="lazy"
          className="card-img-main"
          src={product.image}
        />
      </Link>

      <div className="card-content-block">
        <span className="card-category-label">{product.category}</span>
        <h3 className="card-title">
          <Link to={`/products/${slug}`}>{product.name}</Link>
        </h3>
        <div className="card-rating-line">
          <div className="card-stars">
            {[1, 2, 3, 4, 5].map((s) => (
              <IconStar key={s} size={13} fill="#f59e0b" color="#f59e0b" />
            ))}
          </div>
          <span className="card-rating-number">{product.rating || '4.8'}</span>
        </div>
      </div>

      <div className="card-bottom-row">
        <div className="card-price-block">
          <span className="card-price-now">₹{product.price}</span>
          {product.oldPrice && <span className="card-price-old">₹{product.oldPrice}</span>}
        </div>
        <button
          type="button"
          className="card-quick-cart-btn"
          aria-label={`Add ${product.name} to cart`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product, 1);
          }}
          title="Add to cart"
        >
          <IconShoppingCart size={16} />
        </button>
      </div>
    </div>
  );
}
