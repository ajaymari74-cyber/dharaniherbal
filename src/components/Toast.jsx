import React from 'react';
import { useCart } from '../context/CartContext';
import { IconCheck } from './Icons';

export default function Toast() {
  const { toastMessage } = useCart();
  if (!toastMessage) return null;

  return (
    <div className="dh-toast" role="status" aria-live="polite">
      <div
        style={{
          background: '#10b981',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff'
        }}
      >
        <IconCheck size={14} />
      </div>
      <span>{toastMessage}</span>
    </div>
  );
}
