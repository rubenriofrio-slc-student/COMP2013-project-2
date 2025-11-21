import React, { useState } from "react";
import QuantityCounter from "./QuantityCounter.jsx";

// This component represents ONE product box.
// It shows the image, brand, price, and quantity controls.
// It also has buttons to add to cart, edit, and delete.

function ProductCard({ product, onAddToCart, onEditProduct, onDeleteProduct }) {
  // Local quantity state, only for an individual product in the card
  const [quantity, setQuantity] = useState(0);

  // Handler for adding the product to the cart
  const handleAddToCart = () => {
    if (quantity <= 0) {
      alert(`Please select quantity for ${product.productName}`);
      return;
    }
    onAddToCart(product, quantity);
    setQuantity(0);
  };

  return (
    <div className="ProductCard">
      <img src={product.image} alt={product.productName} />

      <h3>{product.productName}</h3>
      <p>{product.brand}</p>
      <p>${product.price}</p>

      <div className="qty-controls">
        <button onClick={() => setQuantity((q) => Math.max(0, q - 1))}>-</button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity((q) => q + 1)}>+</button>
      </div>

      <button className="add-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>

      <button onClick={() => onEditProduct(product)}>Edit</button>
      <button onClick={() => onDeleteProduct(product._id)}>Delete</button>
    </div>
  );
}

export default ProductCard;