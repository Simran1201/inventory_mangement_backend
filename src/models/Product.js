import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    lowStockThreshold: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
