// server/config/database.js

import 'dotenv/config'; // Loads variables from your .env file
import pg from 'pg';

// --- Base Configuration ---
// This part reads the variables from your local .env file.
const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: {
        rejectUnauthorized: false
    }
};


// Check that the configuration is valid
if (!config.host || !config.database) {
    throw new Error("Database configuration is incomplete. Check your .env file for PGHOST and PGDATABASE.");
}

// Create and export the pool with the final, environment-aware config
export const pool = new pg.Pool(config);