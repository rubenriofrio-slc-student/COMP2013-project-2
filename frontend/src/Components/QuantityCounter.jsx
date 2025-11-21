import React from "react";

// This component only shows the + and - buttons
// and the current quantity number.
// It does not have its own state; it uses values passed down through props.

function QuantityCounter({ value, onIncrease, onDecrease }) {
  return (
    <div className="QuantityCounter">
      <button onClick={onDecrease}>-</button>
      <span>{value}</span>
      <button onClick={onIncrease}>+</button>
    </div>
  );
}

export default QuantityCounter;
