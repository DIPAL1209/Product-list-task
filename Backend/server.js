const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/products", require("./src/routes/product.routes"));


app.listen(process.env.PORT, () =>{
  console.log("Server is running on the port", process.env.PORT);
});