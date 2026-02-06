const Product = require("../models/product");

exports.createProduct = async (req, res) => {
  try {
    const { name, category, price } = req.body;

    const products = await products.create({
      name,
      category,
      price,
    });
    res.status(200).json({ message: "products are created" });
  } catch (error) {
    res.status(500).json({ message: "database error" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await products.find();
    res.status(200).json({ message: "products are fetched succesfully" });
  } catch (error) {
    res.status(500).json({ message: "database eeror" });
  }
};
