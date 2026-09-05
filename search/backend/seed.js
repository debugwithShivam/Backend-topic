import "dotenv/config";
import mongoose from "mongoose";
import Product from "./models/Product.js";

const makeProducts = (category, products) =>
  products.map(([name, price], index) => ({
    name,
    price,
    category,
    description: `Quality ${name.toLowerCase()} for everyday use.`,
    image: `https://picsum.photos/seed/${category.replace(/\W/g, "")}${index}/600/400`,
  }));

const products = [
  ...makeProducts("Electronics",
    [
      ["Wireless Headphones", 2999],
      ["Smart Watch", 4499],
      ["Bluetooth Speaker", 1999],
      ["Mechanical Keyboard", 3599],
      ["Gaming Mouse", 1499],
      ["USB-C Hub", 1299],
      ["Portable Charger", 1799],
      ["Webcam HD", 2499],
      ["LED Desk Lamp", 1099],
      ["Noise Cancelling Earbuds", 3299]
    ]
  ),
  ...makeProducts("Fashion",
    [
      ["Classic Cotton Shirt", 899],
      ["Denim Jacket", 2199],
      ["Running Sneakers", 2799],
      ["Leather Wallet", 999],
      ["Canvas Backpack", 1499],
      ["Summer Dress", 1899],
      ["Analog Watch", 2299],
      ["Polarized Sunglasses", 1299],
      ["Wool Scarf", 799],
      ["Everyday T-Shirt", 599]
    ]),
  ...makeProducts("Home & Living",
    [
      ["Ceramic Coffee Mug", 399],
      ["Cotton Bedsheet Set", 1699],
      ["Non-stick Frying Pan", 1399],
      ["Indoor Plant Pot", 599],
      ["Scented Candle", 499],
      ["Bamboo Cutting Board", 899],
      ["Wall Clock", 1199],
      ["Storage Basket", 699],
      ["Throw Pillow", 799],
      ["Glass Water Bottle", 549]
    ]),
];

try {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/search_ecommerce");
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("Seeded 30 products: 10 in each category.");
} finally {
  await mongoose.disconnect();
}
