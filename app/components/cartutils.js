const CART_KEY = "cart";

export function getCart() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
  return cart;
}

export function addToCart(meal) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === meal.id);

  const updatedCart = existing
    ? cart.map((item) =>
        item.id === meal.id ? { ...item, qty: item.qty + 1 } : item
      )
    : [...cart, { ...meal, qty: 1 }];

  return saveCart(updatedCart);
}

export function removeFromCart(id) {
  return saveCart(getCart().filter((item) => item.id !== id));
}

export function updateQuantity(id, qty) {
  return saveCart(
    getCart().map((item) =>
      item.id === id ? { ...item, qty: Math.max(1, qty) } : item
    )
  );
}

export function clearCart() {
  return saveCart([]);
}