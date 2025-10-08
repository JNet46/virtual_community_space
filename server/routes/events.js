// server/routes/events.js

import express from 'express';

// 1. Import all necessary controller functions as NAMED imports.
//    Note the curly braces {} and the crucial .js extension.
import {
    getAllEvents,
    getEventsByLocationId,
    getEventById
} from '../controllers/events.js';

// 2. Create a new router instance from Express.
const router = express.Router();

// --- DEFINE THE ROUTES ---

// NOTE: The base path '/api/events' is defined in server.js.
// These routes are relative to that base path.

/**
 * @route   GET /api/events/
 * @desc    Get all events from all locations
 * @access  Public
 */
router.get('/', getAllEvents);

/**
 * @route   GET /api/events/location/:locationId
 * @desc    Get all events for a specific location
 * @access  Public
 */
router.get('/location/:locationId', getEventsByLocationId);

/**
 * @route   GET /api/events/:id
 * @desc    Get a single event by its unique ID
 * @access  Public
 * @note    This route should be placed after more specific routes like '/location/...'
 *          to avoid Express mistaking 'location' for an ID.
 */
router.get('/:id', getEventById);

// 3. Export the configured router as the default export for this file.
export default router;