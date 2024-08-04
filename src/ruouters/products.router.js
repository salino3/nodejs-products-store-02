import express from "express";
import {
  createProduct,
  fetchDatabaseData,
  getOneProduct,
} from "../controllers/index.js";

const productsRouter = express.Router();

productsRouter.post("/products", createProduct);

productsRouter.get("/products", fetchDatabaseData);

productsRouter.get("/products/:id", getOneProduct);

export { productsRouter };
