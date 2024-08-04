import express from "express";
import cors from "cors";
import cookiesParser from "cookie-parser";
import { PORT } from "./config.js";
import { Product } from "./src/models/product.model.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookiesParser());

async function initializeDatabase() {
  await Product.createTable();
}

async function startApp() {
  try {
    // await initializeDatabase();
    console.log("Database initialized and table created");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

startApp();

app.get("/ping", (req, res) => {
  res.send("<h1>Pong</h1>");
});
