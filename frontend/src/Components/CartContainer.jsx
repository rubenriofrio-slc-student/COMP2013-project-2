import React from "react";
import CartCard from "./CartCard.jsx";

// This component represents the entire shopping cart.
// It receives the cart items as props and shows them in a list.
// It also calculates the total price and displays buttons to empty the cart.

function CartContainer({ cart, onChangeQty, onRemove, onEmptyCart }) {
  // Calculate total cart value
  const total = cart.reduce((sum, item) => {
    const priceValue = Number(
      item.product.price.toString().replace("$", "")
    );
    return sum + priceValue * item.qty;
  }, 0);

  return (
    <div className="CartContainer">
      <h3>Cart items: {cart.length}</h3>

      {cart.length === 0 && <p>No items in cart</p>}

      {cart.map((item) => (
        <CartCard
          key={item.product._id}
          item={item}
          onIncrease={() => onChangeQty(item.product._id, 1)}
          onDecrease={() => onChangeQty(item.product._id, -1)}
          onRemove={() => onRemove(item.product._id)}
        />
      ))}
      
      {/* Verify if the cart has items to show the total, empty and checkout buttons */}
      {cart.length > 0 && (
        <>
          <h4>Total: ${total.toFixed(2)}</h4>
          <button onClick={onEmptyCart}>Empty Cart</button>
          <button>Checkout: ${total.toFixed(2)}</button>
        </>
      )}
    </div>
  );
}

export default CartContainer;
