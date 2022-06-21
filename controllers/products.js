import { createCustomError } from "../errors/custom-error.js";

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "products route" });
};

const getAllProductsStatic = async (req, res) => {
  res.status(200).json({ msg: "static products route" });
};

export { getAllProducts, getAllProductsStatic };
