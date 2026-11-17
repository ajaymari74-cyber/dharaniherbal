import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  IconHome,
  IconChevronDown,
  IconSearch,
  IconHeart,
  IconShoppingCart,
  IconArrowRight
} from './Icons';
import './Header.css';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { cartCount, wishlistCount, setSearchOpen } = useCart();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="site-header">
      <div className="header-inner container">
        {/* Brand Logo */}
        <Link className="brand-logo" to="/" aria-label="Dharani Herbals Home">
          <div className="brand-logo-leaf">
            <img
              alt="Dharani Herbals Leaf"
              width="44"
              height="35"
              className="brand-leaf-img"
              src="/images/mockup/logo_leaf.png"
            />
          </div>
          <div className="brand-text">
            <span className="brand-name-main">Dharani</span>
            <span className="brand-name-sub">Herbals</span>
          </div>
        </Link>

        {/* Desktop Navigation Capsule */}
        <nav className="desktop-navigation" aria-label="Main navigation">
          <div className="nav-capsule">
            <Link
              className={`nav-capsule-item ${isActive('/') ? 'active' : ''}`}
              to="/"
            >
              <IconHome size={16} className="nav-home-icon" />
              <span>Home</span>
            </Link>

            <div
              className="nav-dropdown-wrapper"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                className={`nav-capsule-item dropdown-toggle ${
                  location.pathname.startsWith('/shop') || location.pathname.startsWith('/products')
                    ? 'active'
                    : ''
                }`}
                to="/shop"
              >
                <span>Collections</span>
                <IconChevronDown size={14} className="dropdown-arrow" />
              </Link>
              {dropdownOpen && (
                <div className="nav-dropdown-menu">
                  <Link to="/shop" onClick={() => setDropdownOpen(false)}>All Products</Link>
                  <Link to="/shop?cat=Skin%20Care" onClick={() => setDropdownOpen(false)}>Skin Care</Link>
                  <Link to="/shop?cat=Hair%20Care" onClick={() => setDropdownOpen(false)}>Hair Care</Link>
                  <Link to="/shop?cat=Body%20Care" onClick={() => setDropdownOpen(false)}>Body Care</Link>
                  <Link to="/shop?cat=Wellness" onClick={() => setDropdownOpen(false)}>Wellness</Link>
                </div>
              )}
            </div>

            <Link
              className={`nav-capsule-item ${isActive('/about') ? 'active' : ''}`}
              to="/about"
            >
              About Us
            </Link>

            <Link
              className={`nav-capsule-item ${isActive('/contact') ? 'active' : ''}`}
              to="/contact"
            >
              Contact
            </Link>

            <Link
              className={`nav-capsule-item ${isActive('/blog') ? 'active' : ''}`}
              to="/shop"
            >
              Blog
            </Link>
          </div>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          <button
            type="button"
            className="header-icon-btn"
            aria-label="Search products"
            onClick={() => setSearchOpen(true)}
          >
            <IconSearch size={18} />
          </button>

          <Link className="header-icon-btn with-badge" aria-label="Wishlist" to="/cart">
            <IconHeart size={19} />
            <span className="badge-count">{wishlistCount}</span>
          </Link>

          <Link className="header-icon-btn with-badge" aria-label="Shopping cart" to="/cart">
            <IconShoppingCart size={19} />
            <span className="badge-count">{cartCount}</span>
          </Link>

          <Link className="header-shop-btn" to="/shop">
            <span>Shop Now</span>
            <IconArrowRight size={14} />
          </Link>

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label="Open menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-nav-drawer">
          <Link
            className="mobile-nav-link"
            to="/"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            className="mobile-nav-link"
            to="/shop"
            onClick={() => setMobileOpen(false)}
          >
            Collections
          </Link>
          <Link
            className="mobile-nav-link"
            to="/about"
            onClick={() => setMobileOpen(false)}
          >
            About Us
          </Link>
          <Link
            className="mobile-nav-link"
            to="/contact"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>
          <Link
            className="mobile-nav-link"
            to="/cart"
            onClick={() => setMobileOpen(false)}
          >
            My Cart ({cartCount})
          </Link>
        </div>
      )}
    </header>
  );
}
