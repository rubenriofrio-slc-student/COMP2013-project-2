const express = require("express");
const Groceries = require("./models/products.js");

const router = express.Router();

//https://www.w3schools.com/nodejs/nodejs_express.asp
//https://nodejs.org/en/docs
//https://expressjs.com/en/guide/routing.html
//https://www.w3schools.com/nodejs/nodejs_middleware.asp
//https://www.w3schools.com/nodejs/nodejs_rest_api.asp
//https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/routes

// GET all products
router.get("/", async (request, respose) => {
  try {
    const products = await Groceries.find();
    respose.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error getting the products from the DB" });
  }
});

// CREATE product
router.post("/", async (requst, response) => {
  try {
    const newProduct = await Groceries.create(requst.body);
    res.json(newProduct);
  } catch (error) {
    response.status(400).json({ error: "Error adding a new product" });
  }
});

// UPDATE product
router.put("/:id", async (request, response) => {
  try {
    const updatedProduct = await Groceries.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );
    response.json(updatedProduct);
  } catch (error) {
    response.status(400).json({ error: "Error updating a product" });
  }
});

// DELETE product
router.delete("/:id", async (request, response) => {
  try {
    await Groceries.findByIdAndDelete(request.params.id);
    response.json({ success: true });
  } catch (error) {
    response.status(400).json({ error: "Error removing a product" });
  }
});

module.exports = router;
