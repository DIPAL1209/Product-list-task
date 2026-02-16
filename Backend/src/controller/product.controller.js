const Product = require("../models/product");

exports.createProduct = async (req, res) => {
  try {
    const { name, category, price } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const productexist = await Product.findOne({
      name: { $regex: name, $options: "i" },
    });

    if (productexist) {
      return res
        .status(400)
        .json({ message: "Product with this name already exists" });
    }

    const Products = await Product.create({
      name,
      category,
      price,
    });
    res.status(201).json({ message: "products are createdd", Products });
  } catch (error) {
    res.status(500).json({ message: "database error" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { search, category, sort, sortBy } = req.query;

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

    if (sortBy && sort)
      if (sort === "asc") {
        option[sortBy] = 1;
      } else if (sort === "desc") {
        option[sortBy] = -1;
      }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments(filter);
    const totalPage = Math.ceil(totalProducts / limit);

    const Products = await Product.find(filter)
      .sort(option)
      .collation({ locale: "en", strength: 2 })
      .skip(skip)
      .limit(Number(limit));
    res.status(200).json({
      message: "products are fetched succesfullyy",
      Products,
      totalProducts,
      totalPage,
    });
  } catch (error) {
    res.status(500).json({ message: "database eeror" });
  }
};
