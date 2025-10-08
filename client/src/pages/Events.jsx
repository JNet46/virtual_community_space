// src/pages/Events.jsx

import React, { useState, useEffect } from 'react';
import Event from '../components/Event.jsx'; // The reusable event card component
import { getAllEvents } from '../services/EventsAPI.jsx'; // API function for all events
import { getAllLocations } from '../services/LocationsAPI.jsx'; // API function for all locations (for the filter)
import '../css/Event.css'; // A dedicated CSS file for this page

const Events = () => {
    // State to hold the original, complete list of events from the API
    const [allEvents, setAllEvents] = useState([]);
    // State to hold the events that are currently being displayed (after filtering)
    const [filteredEvents, setFilteredEvents] = useState([]);
    // State to hold the list of locations for the dropdown menu
    const [locations, setLocations] = useState([]);
    // State to track the currently selected filter option
    const [selectedLocationId, setSelectedLocationId] = useState('all');
    // Standard loading and error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // This effect runs ONCE when the component first mounts to fetch all data
    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch both events and locations concurrently for better performance
                const [eventsData, locationsData] = await Promise.all([
                    getAllEvents(),
                    getAllLocations()
                ]);

                // Store the complete, original lists in state
                setAllEvents(eventsData);
                setFilteredEvents(eventsData); // Initially, the filtered list is the same as the full list
                setLocations(locationsData);
            } catch (err) {
                console.error("Failed to fetch initial page data:", err);
                setError("Could not load data. Please refresh the page and try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []); // The empty array [] ensures this effect runs only once

    // This second effect runs whenever the user changes the filter OR when the initial data arrives
    useEffect(() => {
        // If "All Locations" is selected, show the original full list
        if (selectedLocationId === 'all') {
            setFilteredEvents(allEvents);
        } else {
            // Otherwise, filter the original list based on the selected ID
            const filtered = allEvents.filter(
                (event) => event.location_id === parseInt(selectedLocationId, 10)
            );
            setFilteredEvents(filtered);
        }
    }, [selectedLocationId, allEvents]); // Re-run this logic when these values change

    // --- Render Logic ---
    if (loading) {
        return <div className="loading-message">Loading all events...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className='all-events-page'>
            <header className='all-events-header'>
                <h2>All Events Schedule</h2>
                <p>A complete schedule from all locations in the virtual space.</p>
                <div className="filter-container">
                    <label htmlFor="location-filter">Filter by Location:</label>
                    <select
                        id="location-filter"
                        value={selectedLocationId}
                        onChange={(e) => setSelectedLocationId(e.target.value)}
                    >
                        <option value="all">All Locations</option>
                        {locations.map((location) => (
                            <option key={location.id} value={location.id}>
                                {location.name}
                            </option>
                        ))}
                    </select>
                </div>
            </header>

            <main>
                <div className="events-grid">
                    {filteredEvents.length > 0 ? (
                        // We map over the FILTERED list to render the event cards
                        filteredEvents.map((eventItem) => (
                            <Event key={eventItem.id} event={eventItem} />
                        ))
                    ) : (
                        <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events match your filter.'}</h2>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Events;