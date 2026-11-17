import React from 'react';
import './TrustBar.css';

const items = [
  { icon: '🌿', title: '100% Natural Ingredients' },
  { icon: '🛡️', title: 'Safe & Trusted' },
  { icon: '🚚', title: 'Fast Delivery' },
  { icon: '🎧', title: '24/7 Support' },
];

export default function TrustBar() {
  return (
    <div className="dh-trust-bar-wrapper">
      <div className="dh-trust-bar">
        {items.map((it) => (
          <div className="dh-trust-item" key={it.title}>
            <span className="trust-icon" role="img" aria-label={it.title}>{it.icon}</span>
            <strong>{it.title}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
