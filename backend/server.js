//Initialization
const express = require("express");
const server = express();
const mongoose = require("mongoose");
require("dotenv").config();
const port = 3000;
const { DB_URI } = process.env;
const cors = require("cors");
const routes = require("./routes.js");

//Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

//Database Connection
mongoose.connect(DB_URI).then(()=>server.listen(port, () => {
    console.log(`Connect to Database\nServer is listening on port ${port}`);
})).catch((error)=>console.log(error.message));

//Routes
server.use("/products", routes);