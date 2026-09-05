import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import Product from "./models/Product.js";

const app = express();
const port = process.env.PORT || 5000;
const categories = ["Electronics", "Fashion", "Home & Living"];

app.use(cors());
app.use(express.json());

app.get("/api/categories", async (_request, response) => {
  const recentProduct = await Product.findOne()
  response.json(categories)
}
);

app.get("/api/products", async (request, response, next) => {
  try {
    const { category, search = "" } = request.query;

    const filter = {};

    if (category && categories.includes(category)) {
      filter.category = category;
    }

    if (search.trim()) {
      const pattern = new RegExp(
        search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );

      filter.$or = [
        { name: pattern },
        { description: pattern },
      ];
    }

    const products = await Product
      .find(filter)
      .sort({ createdAt: -1 });

    response.json(products);
  } catch (error) {
    next(error);
  }
});

app.post("/api/products", async (request, response, next) => {
  try {
    const {
      name,
      description,
      price,
      category,
      image,
    } = request.body;

    if (!name || !description || price === undefined || !category) {
      return response.status(400).json({
        message: "Name, description, price, and category are required.",
      });
    }

    if (!categories.includes(category)) {
      return response.status(400).json({
        message: "Choose a valid category.",
      });
    }

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      image: image || "",
    });

    response.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ message: error.message || "Something went wrong." });
});

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/search_ecommerce")
  .then(() => app.listen(port, () => console.log(`API running at http://localhost:${port}`)))
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
