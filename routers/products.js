const express = require("express");

const router = express.Router();
const Product = require("../models/product");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
});
router.post("/", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    inStock: req.body.inStock,
  });
  try {
    const prod = await product.save();
    res.json(prod);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
});

router.patch("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  product.inStock = req.body.inStock;

  try {
    const prod = await product.save();
    res.json(prod);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
});

router.delete("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  try {
    const delRes = await product.remove();
    res.json(delRes);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
});

module.exports = router;
