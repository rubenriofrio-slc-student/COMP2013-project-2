import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuid } from 'uuid';
import NavBar from "./NavBar.jsx";
import ProductCardsContainer from "./ProductCardsContainer.jsx";
import CartContainer from "./CartContainer.jsx";

// This is the main component of the whole application.
// It loads the products from the backend, shows the product list,
// handles the Add Product form, and manages the shopping cart logic.

function GroceriesApp() {
  
  // State implementation to get products from the backend and manage the cart
  // https://react.dev/reference/react/useState
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Form state variables for adding/editing products
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  // State to track if we are editing an existing product
  const [editingId, setEditingId] = useState(null);

  // Backend API URL
  const API_URL = "http://localhost:3000/products";

  
  // Loading Products from the backend that uses the database
  const handleProductsDB = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.log("Error getting the product:", error.message);
    }
  };

  //https://react.dev/reference/react/useEffect
  // This is loading the products when the component first mounts, it was returning a problem with the setState that can't be synchronous
  // implemented as an async function inside the useEffect fix the problem
  //https://react.dev/reference/eslint-plugin-react-hooks/lints/set-state-in-effect

  useEffect(() => {
      const loadProducts = async () => await handleProductsDB();
      loadProducts();
    }, []);

  
  // Handler for adding a new product.
  const handleCreate = async (newProduct) => {
    try {
      await axios.post(API_URL, newProduct);
      handleProductsDB();
    } catch (error) {
      console.log("Error while creating a new product:", error.message);
    }
  };

  
  // Handler for updating an existing product.
  const handleUpdate = async (id, exProduct) => {
    try {
      await axios.put(`${API_URL}/${id}`, exProduct);
      handleProductsDB();
    } catch (error) {
      console.log("Error while updating an existing product:", error.message);
    }
  };

  // Handler for deleting an existing product.
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      handleProductsDB();
    } catch (error) {
      console.log("Error while deleting an existing product:", error.message);
    }
  };

  //Hander for the form submission
  //https://www.npmjs.com/package/uuid
  //https://www.uuidgenerator.net/dev-corner/javascript
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page refresh

    // Create an object with the form data
    const data = {
      id: uuid(),
      productName,
      brand,
      image,
      price,
    };

    // If editing → update, else create new product
    if (editingId) {
      handleUpdate(editingId, data);
    } else {
      handleCreate(data);
    }

    clearForm();
  };

  // Clear the form inputs
  const clearForm = () => {
    setProductName("");
    setBrand("");
    setImage("");
    setPrice("");
    setEditingId(null); // Keep track of which product is being edited
  };

  // Start editing a product by populating the form with its data
  const startEdit = (product) => {
    setProductName(product.productName);
    setBrand(product.brand);
    setImage(product.image);
    setPrice(product.price);
    setEditingId(product._id);
  };

  // Cart functionality
  const addToCart = (product, qty) => {
    // Do not allow zero quantity
    if (qty <= 0) {
      alert(`Please select at least one item for ${product.productName}`);
      return;
    }

    // Add or update item in the cart
    setCart((prev) => {
      // Check if this product already exists in cart
      const exists = prev.find((item) => item.product._id === product._id);

      if (exists) {
        // If exists → increase its quantity
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }

      // If not in the cart, add a new entry
      return [...prev, { product, qty }];
    });
  };

  // change quantity of an item in the cart
  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product._id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  // remove item from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.product._id !== id));
  };

  // empty the cart
  const emptyCart = () => setCart([]);

  
  // Rendering the app UX
  //https://react.dev/learn/writing-markup-with-jsx
  return (
    <>
      <NavBar />

      <div className="GroceriesApp-Container">

        {/* Adding product form */}
        <div className="FormColumn">
          <form className="AddProductForm" onSubmit={handleSubmit}>
            <input placeholder="Product Name" value={productName}
                  onChange={(e) => setProductName(e.target.value)} />

            <input placeholder="Brand" value={brand}
                  onChange={(e) => setBrand(e.target.value)} />

            <input placeholder="Image URL" value={image}
                  onChange={(e) => setImage(e.target.value)} />

            <input placeholder="Price" value={price}
                  onChange={(e) => setPrice(e.target.value)} />

            <button>{editingId ? "Update Product" : "Add Product"}</button>
          </form>
        </div>

        {/* List of products */}
        <div className="ProductsColumn">
          <ProductCardsContainer
            products={products}
            onAddToCart={addToCart}
            onEditProduct={startEdit}
            onDeleteProduct={handleDelete}
          />
        </div>

        {/* Cart information */}
        <div className="CartColumn">
          <CartContainer
            cart={cart}
            onChangeQty={changeQty}
            onRemove={removeFromCart}
            onEmptyCart={emptyCart}
          />
        </div>

      </div>
    </>
  );
}

export default GroceriesApp;