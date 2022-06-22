import { createCustomError } from "../errors/custom-error.js";
import Product from "../models/product.json";

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ nbHits: products.length });
};

const getAllProductsStatic = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  let objectQuery = {};

  if (featured) objectQuery.featured = featured || false;
  if (company) objectQuery.company = company;
  if (name) objectQuery.name = { $regex: name, $options: "i" };

  let result = Product.find(objectQuery);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = products.sort(sortList);
  } else result = result.sort("createAt");

  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = products.select(fieldList);
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field))
        objectQuery[field] = { [operator]: Number(value) };
    });
  }

  const page = Number(req.query.page) || 1,
    limit = Number(req.query.limit) || 10,
    skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

export { getAllProducts, getAllProductsStatic };
