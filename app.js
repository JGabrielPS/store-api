import express from "express";
import "dotenv/config";
import "express-async-errors";

import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";
import connectDB from "./db/connect.js";
import productsRouter from "./routes/products.js";

const app = express();

app.use(express.json());
app.use(notFound);
app.use(errorHandler);

app.use("/api/v1/products", productsRouter);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
