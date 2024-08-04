import express from "express";
import {
  createProduct,
  deleteProduct,
  fetchDatabaseData,
  getOneProduct,
  updateProduct,
} from "../controllers/index.js";

const productsRouter = express.Router();

productsRouter.post("/products", createProduct);

productsRouter.get("/products", fetchDatabaseData);

productsRouter.get("/products/:id", getOneProduct);

productsRouter.put("/products/:id", updateProduct);

productsRouter.delete("/products/:id", deleteProduct);

export { productsRouter };
