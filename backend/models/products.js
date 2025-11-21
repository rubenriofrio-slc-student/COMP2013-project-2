const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

//https://mongoosejs.com/docs/guide.html

const ProductSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  productName: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
});

const Groceries = mongoose.model("Groceries", ProductSchema, "groceries");
module.exports = Groceries;