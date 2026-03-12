import express from "express";
import {
  getUsers,
  deleteUser,
  getCurrentUser,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, isAdmin, getUsers);
router.get("/me", protect, getCurrentUser);
router.delete("/:id", protect, isAdmin, deleteUser);

export default router;
