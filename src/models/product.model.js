import { pool } from "../db/connection";

const Product = pool.getConnection("Product", {
  id: { type: String, primaryKey: true, allowNull: false, unique: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: false },
  category: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
  tags: { type: String, required: false },
});
