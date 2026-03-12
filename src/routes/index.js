import express from "express";
import authRoutes from "./authRoutes.js";
import productRoutes from "./productRoutes.js";
import orderRoutes from "./orderRoutes.js";
import userRoutes from "./userRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";
import { protect } from "../middleware/authMiddleware.js";
import { orderValidation } from "../middleware/validation.js";
import { placeOrder } from "../controllers/orderController.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.post("/", protect, orderValidation, placeOrder);
router.use("/dashboard", dashboardRoutes);
router.use("/users", userRoutes);

router.get("/health", (_, res) => {
  res.json({ status: "API running" });
});

export default router;
