// server/seed.js

// 1. Import 'dotenv/config' to load environment variables. This is the ESM way.
import 'dotenv/config';

// 2. Import the Pool class from the 'pg' library.
import pg from 'pg';
const { Pool } = pg;

// 3. Import your data from reset.js (we'll make sure this file uses ESM exports next).
import { locations, events } from './config/reset.js';

import slugify from 'slugify';
// Check if the PGDATABASE is loaded
if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE is not set. Make sure you have a .env file.");
}

const pool = new Pool({
  connectionString: process.env.PGDATABASE,
  ssl: {
    rejectUnauthorized: false
  }
});

async function seedDatabase() {
  const client = await pool.connect();
  console.log('✅ Successfully connected to the remote Render database!');

  try {
    // ... (The rest of your seeding logic remains exactly the same)
    console.log('Starting transaction...');
    await client.query('BEGIN');

    console.log('Creating tables if they do not exist...');
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        slug VARCHAR(255) UNIQUE NOT NULL
      );
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        date TIMESTAMPTZ NOT NULL,
        image VARCHAR(255)
      );
    `);

    console.log('Tables are ready.');

    console.log('Clearing existing data...');
    await client.query('TRUNCATE TABLE locations, events RESTART IDENTITY CASCADE;');

    // --- Insert new data for locations ---
    console.log('Inserting locations with generated slugs...');
    for (const location of locations) {
      // 3. Generate a URL-friendly slug from the location name.
      //    Example: "Cyber Stage" becomes "cyber-stage"
      const slug = slugify(location.name, {
        lower: true,      // convert to lower case
        strict: true,     // remove special characters like '!' or '.'
        remove: /[*+~.()'"!:@]/g // further remove any rogue characters
      });

      // 4. Insert the new slug into the database along with the other data.
      await client.query(
        'INSERT INTO locations (id, name, description, slug) VALUES ($1, $2, $3, $4)',
        [location.id, location.name, location.description, slug]
      );
    }
    console.log('Locations inserted successfully.');

    // --- Insert new data for events (this part remains the same) ---
    console.log('Inserting events...');
    for (const event of events) {
      await client.query(
        'INSERT INTO events (id, location_id, name, date, image) VALUES ($1, $2, $3, $4, $5)',
        [event.id, event.locationId, event.name, event.date, event.image]
      );
    }
    console.log('Events inserted successfully.');

    await client.query('COMMIT');
    console.log('🚀 Database seeded successfully with data from reset.js!');
  
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error seeding database:', error);
  } finally {
    client.release();
    pool.end();
  }
}

seedDatabase();