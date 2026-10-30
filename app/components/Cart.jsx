"use client";
import { useState, useEffect } from "react";
import { getCart, removeFromCart, updateQuantity } from "@/app/components/cartutils";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const refresh = (e) => {
  setCart(getCart());
  if (e?.detail?.type === "add") {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }
};

  useEffect(() => {
    setCart(getCart()); 
    window.addEventListener("cart-updated", refresh);
    return () => window.removeEventListener("cart-updated", refresh);
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="drawer drawer-end w-auto">
      <input
        id="cart-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={open}
        onChange={(e) => setOpen(e.target.checked)}
      />

      <div className="drawer-content">
        <label htmlFor="cart-drawer" className="btn btn-ghost relative">
          🛒
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5">
              {totalItems}
            </span>
          )}
        </label>

        {/* toast notification after user adds an item to the cart */}
        {showToast && (
          <div className="toast toast-end ! top-18 z-50">
            <div className="alert alert-success alert-soft">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Added to cart successfully!</span>
            </div>
          </div>
        )}
      </div>

      <div className="drawer-side z-50">
        <label
          htmlFor="cart-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="menu p-4 w-80 bg-base-100 text-base-content min-h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Your Cart</h2>
            <label htmlFor="cart-drawer" className="btn btn-sm btn-ghost">✕</label>
          </div>

          {cart.length === 0 ? (
          <p className="text-sm opacity-70">Your cart is empty</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex flex-row items-center gap-3 bg-base-200 p-2 rounded-lg"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded flex-shrink-0"
                />

                <p className="text-sm font-medium truncate flex-1">{item.name}</p>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    className="btn btn-xs"
                    onClick={() => updateQuantity(item.id, item.qty - 1)}
                  >
                    -
                  </button>
                  <span className="text-sm w-4 text-center">{item.qty}</span>
                  <button
                    className="btn btn-xs"
                    onClick={() => updateQuantity(item.id, item.qty + 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn btn-xs btn-error flex-shrink-0"
                  onClick={() => removeFromCart(item.id)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
        </div>
      </div>
    </div>
  );
}