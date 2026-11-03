// frontend/src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('it_shop_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // บันทึกตะกร้าลง LocalStorage เมื่อมีการเปลี่ยนแปลง
  useEffect(() => {
    localStorage.setItem('it_shop_cart', JSON.stringify(cart));
  }, [cart]);

  // เพิ่มสินค้าลงตะกร้า
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  // นำสินค้าออกจากตะกร้า
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // ปรับจำนวนสินค้า
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  // ล้างตะกร้า (ใช้หลังสั่งซื้อสำเร็จ)
  const clearCart = () => setCart([]);

  // คำนวณราคารวมและจำนวนรวม
  const cartTotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);