import React from "react";
import ProductCard from "./ProductCard.jsx";

// This component renders the full grid of product cards.
// It receives the product list as props and loops through it to display each item.

function ProductCardsContainer({
  products,
  onAddToCart,
  onEditProduct,
  onDeleteProduct,
}) {
  return (
    <div className="ProductsContainer">
      {/* loop to the product to generate a product cart to present in the UX  */}
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onAddToCart={onAddToCart}
          onEditProduct={onEditProduct}
          onDeleteProduct={onDeleteProduct}
        />
      ))}
    </div>
  );
}

export default ProductCardsContainer;
