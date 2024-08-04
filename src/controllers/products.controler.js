import { pool } from "../db/connection.js";

export const fetchDatabaseData = async (req, res) => {
  try {
    const sql = "SELECT * FROM products";
    const connection = await pool.getConnection();
    const [results, fields] = await connection.execute(sql);
    connection.release();
    // console.log(fields);
    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    console.error("Error fetching data from database:", error);
    res.status(500).json({ error: "Failed to fetch data from database" });
  }
};

export const createProduct = async (req, res) => {
  const { name, quantity, price, description, category, tags } = req.body;

  if (!name || quantity == null || price == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const sql = `
      INSERT INTO products (name, quantity, price, description, category, tags)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.query(sql, [
      name,
      quantity,
      price,
      description,
      category,
      tags,
    ]);

    res.status(201).json({
      id: result.insertId,
      name,
      quantity,
      price,
      description,
      category,
      tags,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const getOneProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Missing required field: 'id'" });
  }
  try {
    const [rows] = await pool.query(`SELECT * FROM products WHERE id=${id};`);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "No product found" });
    }
  } catch (error) {
    console.error("Error fetching data from database:", error);
    res.status(500).json({ error: "Failed to fetch data from database" });
  }
};
