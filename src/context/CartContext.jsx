import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Initialize with the 2 items shown in the user's Cart Screen mockup:
  // Herbal Face Cream (₹299) and Herbal Hair Oil (₹349) -> Subtotal: ₹648
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('dharani_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) return parsed;
      }
    } catch (e) {
      // ignore
    }
    const faceCream = products.find(p => p.slug === 'herbal-face-cream') || products[0];
    const hairOil = products.find(p => p.slug === 'herbal-hair-oil') || products[3];
    return [
      { product: faceCream, quantity: 1 },
      { product: hairOil, quantity: 1 }
    ];
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('dharani_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ['herbal-face-cream', 'herbal-hair-oil'];
  });

  const [toastMessage, setToastMessage] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('dharani_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('dharani_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3200);
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity > 1 ? quantity + 'x ' : ''}${product.name} to Cart!`);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const toggleWishlist = (productSlug) => {
    setWishlist(prev => {
      const exists = prev.includes(productSlug);
      if (exists) {
        showToast('Removed from Wishlist');
        return prev.filter(s => s !== productSlug);
      } else {
        showToast('Added to Wishlist!');
        return [...prev, productSlug];
      }
    });
  };

  const isWishlisted = (productSlug) => wishlist.includes(productSlug);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        wishlist,
        wishlistCount,
        toggleWishlist,
        isWishlisted,
        toastMessage,
        showToast,
        searchOpen,
        setSearchOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
