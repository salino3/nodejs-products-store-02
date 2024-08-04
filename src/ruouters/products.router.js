import express from "express";
import { fetchDatabaseData } from "../controllers/index.js";

const productsRouter = express.Router();

productsRouter.get("/products", fetchDatabaseData);

export { productsRouter };
