import express from "express";

import {
  placeOrder,
  getUserOrders,
  getOrderDetails,
  getAllOrders,
} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, placeOrder);

router.get("/my-orders", protect, getUserOrders);

router.get("/:id", protect, getOrderDetails);

router.get("/", protect, isAdmin, getAllOrders);

export default router;
