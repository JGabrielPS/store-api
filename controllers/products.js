import { createCustomError } from "../errors/custom-error.js";
import Product from "../models/product.json";

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ nbHits: products.length });
};

const getAllProductsStatic = async (req, res) => {
  const { featured, company, name, sort } = req.query;
  let objectQuery = {};
  if (featured) objectQuery.featured = featured || false;
  if (company) objectQuery.company = company;
  if (name) objectQuery.name = { $regex: name, $options: "i" };
  let result = Product.find(objectQuery);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = products.sort(sortList);
  } else result = result.sort("createAt");
  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

export { getAllProducts, getAllProductsStatic };
