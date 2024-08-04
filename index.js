import express from "express";
import cors from "cors";
import cookiesParser from "cookie-parser";
import { PORT } from "./config.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookiesParser());

app.get("/ping", (req, res) => {
  res.send("<h1>Pong</h1>");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
