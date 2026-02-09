const Product = require("../models/product");

exports.createProduct = async (req, res) => {
  try {
    const { name, category, price } = req.body;

    const Products = await Product.create({
      name,
      category,
      price,
    });
    res.status(200).json({ message: "products are createdd", Products });
  } catch (error) {
    res.status(500).json({ message: "database error" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { search, category, sort } = req.query;

    let filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      filter.category = category;
    }

    let option = {};

    if (sort === "asc"){
      option.price = 1;
    } else if (sort === "desc") {
      option.price = -1;
    }

    const Products = await Product.find(filter).sort(option);
    res
      .status(200)
      .json({ message: "products are fetched succesfullyy", Products });
  } catch (error) {
    res.status(500).json({ message: "database eeror" });
  }
};
