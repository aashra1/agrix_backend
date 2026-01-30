import express, { Application } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route";
import businessRoutes from "./routes/business.routes";
import productRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/category.routes";
import connectDB from "./database/db";
import path from "path";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

//database connection
connectDB();

// Middleware
app.use(bodyParser.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Register Routes
app.use("/api/user", userRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/product", productRoutes);
app.use("/api/categories", categoryRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
