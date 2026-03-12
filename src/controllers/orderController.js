import Order from "../models/Order.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";
import { MESSAGES } from "../constants/messages.js";

export const placeOrder = async (req, res) => {
  try {

    const { items } = req.body;

    let totalPrice = 0;

    const orderItems = [];

    for (const item of items) {

      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`
        });
      }

      product.stock -= item.quantity;

      await product.save();

      const itemTotal = product.price * item.quantity;

      totalPrice += itemTotal;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });
    }

    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      totalPrice
    });

    res.status(201).json({
      message: "Order placed successfully",
      data: order
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate(
      "items.product",
    );

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.product")
      .populate("user", "name email");

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
