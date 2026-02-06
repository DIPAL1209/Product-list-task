const mongoose = require("mongoose");

const productschema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
module.exports = mongoose.model("product", productschema);
