"use client";
import { useState, useEffect } from "react";
import { getCart, addToCart, updateQuantity, removeFromCart } from "@/app/components/cartutils";
import { getMealPrice } from "@/app/components/priceutils";

export default function MealCard({ meal }) {
  const [qty, setQty] = useState(0);
  const price = getMealPrice(meal.idMeal);

  const syncQty = () => {
    const cart = getCart();
    const existing = cart.find((item) => item.id === meal.idMeal);
    setQty(existing ? existing.qty : 0);
  };

  useEffect(() => {
    syncQty();
    window.addEventListener("cart-updated", syncQty);
    return () => window.removeEventListener("cart-updated", syncQty);
  }, []);

  const handleIncrease = () => {
    if (qty === 0) {
      addToCart({
        id: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb,
        price, // now stored on the cart item too
      });
    } else {
      updateQuantity(meal.idMeal, qty + 1);
    }
  };

  const handleDecrease = () => {
    if (qty <= 1) {
      removeFromCart(meal.idMeal);
    } else {
      updateQuantity(meal.idMeal, qty - 1);
    }
  };

  return (
    <div className="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <a href={`/meals/${meal.idMeal}`}>
        <figure className="overflow-hidden">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
          />
        </figure>
      </a>

      <div className="card-body">
        <a href={`/meals/${meal.idMeal}`}>
          <h2 className="card-title">{meal.strMeal}</h2>
        </a>

        <div className="flex items-center justify-between mt-1">
          <span className="text-lg font-semibold">${price.toFixed(2)}</span>

          <div className="flex items-center gap-1 flex-shrink-0">
            <button className="btn btn-xs" onClick={handleDecrease} disabled={qty === 0}>
              -
            </button>
            <span className="text-sm w-4 text-center">{qty}</span>
            <button className="btn btn-xs" onClick={handleIncrease}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}