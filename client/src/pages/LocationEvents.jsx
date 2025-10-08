
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import useParams and Link
import Event from '../components/Event';
import { getLocationBySlug } from '../services/LocationsAPI.jsx'; // Import your API functions
import { getEventsByLocationId } from '../services/EventsAPI.jsx'; // Import your API functions
import '../css/LocationEvents.css';

const LocationEvents = () => {
    // 2. Get the 'slug' from the URL. This will be a string like "cyber-stage".
    const { slug } = useParams();

    const [location, setLocation] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // This effect now depends on the 'slug' from the URL.
    useEffect(() => {
        const fetchPageData = async () => {
            setLoading(true);
            setError(null);
            setEvents([]); // Clear previous events when loading a new location

            try {
                // 3. First, fetch the location's details using its slug.
                const locationData = await getLocationBySlug(slug);
                setLocation(locationData);

                // 4. IMPORTANT: If the location was found, use its 'id' to fetch its events.
                //    This ensures we don't try to fetch events for a location that doesn't exist.
                if (locationData && locationData.id) {
                    const eventsData = await getEventsByLocationId(locationData.id);
                    setEvents(eventsData);
                } else {
                    // This case handles if getLocationBySlug returns null or an empty object.
                    throw new Error('Location not found.');
                }

            } catch (err) {
                console.error("Failed to fetch page data:", err);
                setError("Sorry, the requested location could not be found.");
            } finally {
                setLoading(false);
            }
        };

        // Only run the fetch logic if a slug is present in the URL.
        if (slug) {
            fetchPageData();
        }
    }, [slug]); // The dependency array ensures this effect re-runs if the URL slug changes.

    // --- Render Logic (remains mostly the same) ---

    if (loading) {
        return <div className="loading-message">Loading location...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className='location-events'>
            <Link to="/" className="back-link">&larr; Back to Map</Link>
            
            <header>
                <div className='location-info'>
                    {/* Use optional chaining as a safeguard while data loads */}
                    <h2>{location?.name}</h2>
                    <p>{location?.description}</p>
                </div>
            </header>

            <main>
                <h3>Events Schedule</h3>
                <div className='events-grid'>
                    {events.length > 0 ? (
                        events.map((eventItem) => (
                            <Event
                                key={eventItem.id}
                                event={eventItem}
                            />
                        ))
                    ) : (
                        <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet.'}</h2>
                    )}
                </div>
            </main>
        </div>
    );
};

export default LocationEvents;