import "dotenv/config";

import connectDB from "./db/connect.js";
import Product from "./models/product.js";

import jsonProducts from "./products.json";

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

start();
