import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import './config/dotenv.js'

// import the router from your routes file
import locationRoutes from './routes/locations.js'
import eventRoutes from './routes/events.js'



const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use('/api/locations', locationRoutes)
app.use('/api/events', eventRoutes)
app.disable('etag')

if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'party.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'party.png')))
    app.use(express.static('public'))
}

// specify the api path for the server to use


if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

// Get all locations
app.get('/api/locations', (req, res) => {
    res.json(locations);
});

// Get details for a single location by ID
app.get('/api/locations/:id', (req, res) => {
    const locationId = parseInt(req.params.id, 10);
    const location = locations.find(loc => loc.id === locationId);
    if (location) {
        res.json(location);
    } else {
        res.status(404).json({ message: 'Location not found' });
    }
});

// Get all events for a specific location
app.get('/api/events/location/:locationId', (req, res) => {
    const locationId = parseInt(req.params.locationId, 10);
    const filteredEvents = events.filter(event => event.locationId === locationId);
    filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    res.json(filteredEvents);
});

// GET A SINGLE EVENT BY ITS ID
app.get('/api/events/:id', (req, res) => {
    const eventId = parseInt(req.params.id, 10);
    const event = events.find(e => e.id === eventId);
    if (event) {
        res.json(event);
    } else {
        res.status(404).json({ message: 'Event not found' });
    }
});


app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})