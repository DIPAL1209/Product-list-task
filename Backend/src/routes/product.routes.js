const express = require("express");
const router = express.Router();

const controller = require("../controller/product.controller");
const validate = require("../middleware/joi.validation");
const {createProductSchema } = require("../validation/product.validate")

router.post("/create-product",validate(createProductSchema), controller.createProduct);

router.get("/get-all", controller.getProducts);

module.exports = router;