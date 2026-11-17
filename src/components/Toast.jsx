import React from 'react';
import { useCart } from '../context/CartContext';
import { IconCheck } from './Icons';

export default function Toast() {
  const { toastMessage } = useCart();
  if (!toastMessage) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9999,
        background: 'linear-gradient(135deg, #0c3323, #134e4a)',
        color: '#fff',
        padding: '14px 22px',
        borderRadius: '50px',
        boxShadow: '0 12px 35px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '14px',
        fontWeight: '700',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        border: '1.5px solid rgba(255,255,255,0.2)'
      }}
    >
      <div style={{
        background: '#10b981',
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff'
      }}>
        <IconCheck size={14} />
      </div>
      <span>{toastMessage}</span>
    </div>
  );
}
