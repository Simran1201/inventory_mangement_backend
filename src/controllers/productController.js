import Product from "../models/Product.js";
import { MESSAGES } from "../constants/messages.js";

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      message: MESSAGES.PRODUCT_CREATED,
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const result = products.map((p) => ({
      ...p.toObject(),
      lowStock: p.stock < p.lowStockThreshold,
    }));
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({
      message: MESSAGES.PRODUCT_UPDATED,
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: MESSAGES.PRODUCT_DELETED });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLowStockProducts = async (req, res) => {
  try {
    const products = await Product.find({
      $expr: { $lt: ["$stock", "$lowStockThreshold"] },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
