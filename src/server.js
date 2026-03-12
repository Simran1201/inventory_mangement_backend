import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import connectDB from "./config/db.js";
import routes from "./routes/index.js";
import { ENV } from "./constants/env.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());
app.use(errorHandler);

// CORS
app.use(cors());

// Logger
app.use(morgan("dev"));

// Body parser
app.use(express.json());

// Routes
app.use("/api", routes);

// DB Connection
connectDB();

const PORT = ENV.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
