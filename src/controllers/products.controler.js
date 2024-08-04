import { pool } from "../db/connection.js";

export const fetchDatabaseData = async (req, res) => {
  try {
    const sql = "SELECT * FROM products";
    const connection = await pool.getConnection();
    const [results, fields] = await connection.execute(sql);
    connection.release();

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
