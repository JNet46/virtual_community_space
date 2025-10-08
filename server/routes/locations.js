// server/routes/locations.js
import express from 'express';
import { getAllLocations, getLocationBySlug } from '../controllers/locations.js'; // <-- Note the .js

const router = express.Router();

router.get('/', getAllLocations);
router.get('/:slug', getLocationBySlug);

export default router;