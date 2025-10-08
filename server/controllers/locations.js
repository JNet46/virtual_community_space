// server/controllers/locations.js

// 1. Import 'pool' as a NAMED import using curly braces {}.
//    This now correctly matches the `export const pool` in your database.js file.
import { pool } from '../config/database.js';

/**
 * Controller to get all locations from the database.
 */
export const getAllLocations = async (req, res) => {
  try {
    // 2. Use the imported 'pool' object directly to run the query.
    const { rows } = await pool.query('SELECT * FROM locations ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching all locations:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// --- THIS FUNCTION IS UPDATED ---
export const getLocationBySlug = async (req, res) => {
    try {
      const { slug } = req.params; // Get 'slug' from the URL
      // Find the location WHERE the 'slug' column matches
      const sql = 'SELECT * FROM locations WHERE slug = $1';
      const { rows } = await pool.query(sql, [slug]);
  
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Location not found' });
      }
      res.json(rows[0]);
    } catch (err) {
      console.error(`Error fetching location with slug ${req.params.slug}:`, err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };