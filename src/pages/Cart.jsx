import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  IconArrowRight,
  IconTrash2,
  IconPlus,
  IconMinus,
  IconShoppingCart,
  IconCheck,
  IconX
} from '../components/Icons';
import './Cart.css';

export default function Cart() {
  const {
    cartItems,
    cartTotal,
    removeFromCart,
    updateQuantity
  } = useCart();

  const [checkoutModal, setCheckoutModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shipping = 0;
  const finalTotal = cartTotal + shipping;

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  return (
    <div className="cart-canvas">
      <div className="cart-container">
        {/* Header Row */}
        <div className="cart-header-row">
          <div className="cart-title-block">
            <h1>Your Cart</h1>
            <p>Review your items before checkout</p>
          </div>
          <Link to="/shop" className="continue-shopping-pill">
            <span>Continue Shopping</span>
            <IconArrowRight size={14} />
          </Link>
        </div>

        {/* Layout */}
        <div className="screen4-cart-layout">
          {/* Left Bag Graphic */}
          <div className="cart-3d-bag-card">
            <div className="cart-bag-img-box">
              <img
                src="/images/theme/cart_bag.png"
                alt="Dharani Herbals Eco Shopping Bag"
                className="cart-bag-img"
              />
            </div>
            <div className="cart-bag-note">
              <h3>100% Herbal Goodness</h3>
              <p>Packed fresh in eco-friendly packaging with natural botanical extracts.</p>
            </div>
          </div>

          {/* Right Cart Items */}
          <div className="cart-items-card">
            {cartItems.length === 0 ? (
              <div className="empty-cart-box">
                <div style={{ color: '#94a3b8', display: 'flex', justifyContent: 'center' }}>
                  <IconShoppingCart size={54} />
                </div>
                <h2>Your Cart is Empty</h2>
                <p>Discover our nature-inspired products and add them to your cart.</p>
                <Link
                  to="/shop"
                  className="proceed-checkout-cta"
                  style={{ maxWidth: '240px', margin: '0 auto' }}
                >
                  Explore Products
                </Link>
              </div>
            ) : (
              <>
                <div className="cart-items-list">
                  {cartItems.map(({ product, quantity }) => (
                    <div key={product.id} className="cart-row-item">
                      <div className="cart-row-img-box">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="cart-row-img"
                        />
                      </div>

                      <div className="cart-row-details">
                        <h4>{product.name}</h4>
                        <span className="cart-row-unit-price">₹{product.price}</span>
                      </div>

                      <div className="cart-row-stepper">
                        <button
                          type="button"
                          className="cart-stepper-btn"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <IconMinus size={12} />
                        </button>
                        <span className="cart-stepper-qty">{quantity}</span>
                        <button
                          type="button"
                          className="cart-stepper-btn"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <IconPlus size={12} />
                        </button>
                      </div>

                      <div className="cart-row-total">
                        ₹{product.price * quantity}
                      </div>

                      <button
                        type="button"
                        className="cart-row-delete-btn"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`Remove ${product.name}`}
                      >
                        <IconTrash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="cart-summary-block">
                  <div className="summary-line">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>

                  <div className="summary-line">
                    <span>Shipping</span>
                    <span className="free-shipping-tag">₹0 (FREE)</span>
                  </div>

                  <div className="summary-total-line">
                    <span>Total</span>
                    <span>₹{finalTotal}</span>
                  </div>

                  <button
                    type="button"
                    className="proceed-checkout-cta"
                    onClick={() => {
                      setOrderPlaced(false);
                      setCheckoutModal(true);
                    }}
                    style={{ border: 'none', cursor: 'pointer' }}
                  >
                    <span>Proceed to Checkout</span>
                    <IconArrowRight size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {checkoutModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 25, 18, 0.7)',
            backdropFilter: 'blur(8px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setCheckoutModal(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '24px',
              padding: '24px 20px',
              maxWidth: '520px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setCheckoutModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#64748b'
              }}
            >
              <IconX size={22} />
            </button>

            {orderPlaced ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#10b981',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}
                >
                  <IconCheck size={32} />
                </div>
                <h2 style={{ color: '#0c3323', margin: '0 0 8px', fontSize: '24px', fontWeight: '900' }}>
                  Order Confirmed!
                </h2>
                <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', margin: '0 0 20px' }}>
                  Thank you for choosing Dharani Herbals! We have received your order of ₹{finalTotal}. Fresh herbal items will be dispatched within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setCheckoutModal(false)}
                  style={{
                    background: 'linear-gradient(105deg,#ff4d79,#ff6b4a)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '12px 28px',
                    fontWeight: '800',
                    cursor: 'pointer'
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div>
                <h3 style={{ color: '#0c3323', margin: '0 0 16px', fontSize: '20px', fontWeight: '900' }}>
                  Fast Checkout (COD &amp; UPI)
                </h3>
                <form onSubmit={handleCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    style={{
                      padding: '11px 14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px'
                    }}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number (+91)"
                    required
                    style={{
                      padding: '11px 14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Delivery Address (Street, City, Pincode)"
                    required
                    style={{
                      padding: '11px 14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px'
                    }}
                  />
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', marginTop: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '700' }}>
                      <span>Total Amount to Pay:</span>
                      <span style={{ color: '#e11d48' }}>₹{finalTotal}</span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    style={{
                      background: 'linear-gradient(105deg,#ff4d79,#ff6b4a,#ff8533)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50px',
                      padding: '13px 20px',
                      fontWeight: '800',
                      fontSize: '15px',
                      cursor: 'pointer',
                      marginTop: '8px',
                      boxShadow: '0 8px 24px rgba(255,77,121,0.4)'
                    }}
                  >
                    Place Order (Cash on Delivery)
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
