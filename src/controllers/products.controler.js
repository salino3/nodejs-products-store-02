import { pool } from "../db/connection.js";

export const fetchDatabaseData = async (req, res) => {
  try {
    const sql = "SELECT * FROM products";
    const connection = await pool.getConnection();
    const [results, fields] = await connection.execute(sql);
    connection.release();
    // console.log("Results:", results);
    // console.log("Fields:", fields);

    // Convert price to number
    const formattedResults = results.map((row) => ({
      ...row,
      price: parseFloat(row.price),
    }));

    if (formattedResults.length > 0) {
      res.json(formattedResults);
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

  const priceNumber = parseFloat(price);
  if (isNaN(priceNumber) || priceNumber <= 0 || typeof price === "string") {
    return res.status(400).json({ error: "Invalid price value" });
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

    // Convert price to number
    const formattedResults = rows.map((row) => ({
      ...row,
      price: parseFloat(row.price),
    }));

    if (formattedResults.length > 0) {
      res.json(formattedResults);
    } else {
      res.status(404).json({ message: "No product found" });
    }
  } catch (error) {
    console.error("Error fetching data from database:", error);
    res.status(500).json({ error: "Failed to fetch data from database" });
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { price } = req.body;

  if (price != null) {
    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber) || priceNumber <= 0 || typeof price === "string") {
      return res.status(400).json({ error: "Invalid price value" });
    }
  }

  // Ensure there are fields to update
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "No fields provided for update" });
  }

  //   if (name !== undefined) {
  //     updates.push("name = ?");
  //     params.push(name);
  //   }

  // Build the SQL query and parameters dynamically
  let sql = "UPDATE products SET ";
  const updates = [];
  const params = [];

  // Iterate over the fields to construct the SQL query and parameter array
  for (const [field, value] of Object.entries(req.body)) {
    // Add the field to the SQL query and parameters
    updates.push(`${field} = ?`);
    params.push(value);
  }

  // Add the WHERE clause to the SQL query
  sql += updates.join(", ") + " WHERE id = ?";
  params.push(productId);

  try {
    const [result] = await pool.query(sql, params);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Product updated successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const sql = "DELETE FROM products WHERE id =?";
    const [result] = await pool.query(sql, [productId]);

    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ message: `Product with '${productId}' deleted successfully` });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};
