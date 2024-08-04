import { pool } from "../db/connection.js";

export class Product {
  constructor({
    id,
    name,
    quantity,
    price,
    description,
    category,
    createdAt,
    updatedAt,
    deletedAt,
    tags,
  }) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.description = description;
    this.category = category;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
    this.deletedAt = deletedAt || null;
    this.tags = tags;
  }

  static async createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        category VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        tags VARCHAR(255)
      )
    `;
    await pool.query(sql);
  }
}
