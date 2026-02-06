const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const product = require("./src/routes/product.routes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use("/api/products", require("./src/routes/product.routes"));


app.listen(process.env.PORT, () =>{
  console.log("Server is running on port", process.env.PORT);
});