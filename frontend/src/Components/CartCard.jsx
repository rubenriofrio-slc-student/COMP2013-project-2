import React from "react";
import QuantityCounter from "./QuantityCounter.jsx";

// This component shows one item inside the cart.
// It displays the image, name, price, quantity, and total line price.
// It also lets the user increase, decrease, or remove the item.

function CartCard({ item, onIncrease, onDecrease, onRemove }) {
  // Convert price text into a number it allows to calculate totals
  const priceValue = Number(item.product.price.toString().replace("$", ""));
  const totalValue = priceValue * item.qty;

  return (
    <div className="CartCard">
      <img
        src={item.product.image}
        alt={item.product.productName}
        className="cart-image"
      />

      <div>
        <h4>{item.product.productName}</h4>
        <p>{item.product.price}</p>
        <p>Line total: ${totalValue.toFixed(2)}</p>
      </div>

      <div className="QuantityCounter">
        <button onClick={onDecrease}>-</button>
        <span>{item.qty}</span>
        <button onClick={onIncrease}>+</button>
      </div>

      <button className="remove-btn" onClick={onRemove}>
        Remove
      </button>
    </div>
  );
}

export default CartCard;