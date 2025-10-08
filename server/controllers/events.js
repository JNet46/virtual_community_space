// server/controllers/events.js

import { pool } from '../config/database.js';

/**
 * Controller to get all events from ALL locations.
 * Corresponds to the route: GET /api/events/
 */
export const getAllEvents = async (req, res) => {
  try {
    // A simple query to get all events, ordered by the most recent date first.
    const sql = 'SELECT * FROM events ORDER BY date DESC';
    const { rows } = await pool.query(sql);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching all events:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Controller to get all events for a SPECIFIC location.
 * Corresponds to the route: GET /api/events/location/:locationId
 */
export const getEventsByLocationId = async (req, res) => {
  try {
    const { locationId } = req.params;
    const sql = 'SELECT * FROM events WHERE location_id = $1 ORDER BY date ASC';
    const { rows } = await pool.query(sql, [locationId]);
    res.json(rows);
  } catch (err) {
    console.error(`Error fetching events for location ${req.params.locationId}:`, err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Controller to get a SINGLE event by its unique ID.
 * Corresponds to the route: GET /api/events/:id
 */
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM events WHERE id = $1';
    const { rows } = await pool.query(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(rows[0]);
  } catch (err) {
    console.error(`Error fetching event by ID ${req.params.id}:`, err);
    res.status(500).json({ error: 'Internal server error' });
  }
};