import { body } from "express-validator";

export const orderValidation = [
  body("items").isArray({ min: 1 }),
  body("items.*.product").notEmpty(),
  body("items.*.quantity").isInt({ min: 1 }),
];
