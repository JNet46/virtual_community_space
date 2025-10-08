
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Use React Router's Link for navigation
import { getAllLocations } from '../services/LocationsAPI.jsx'; // Ensure the .js extension is present
import unitygrid from '../assets/unitygrid.jpg';
import '../css/Locations.css';

// It's cleaner to store large, static data like SVG paths outside the component.
// The keys here ('venue1', 'venue2') should correspond to the order of your locations.
const venuePaths = {
  venue1: { points: "2.97,234.52 17.94,198.9 34.45,188.58 52.52,191.68 56.65,196.32 69.03,162.26 84,137.48 103.61,121.48 126.32,109.61 154.71,125.61 175.87,149.87 189.81,176.71 199.61,206.13 205.81,229.35 210.45,243.81 206.84,272.19 214.58,285.1 214.58,302.13 203.74,334.13 194.45,351.68 205.29,366.65 132.52,366.65 159.35,391.42 155.74,399.68 119.61,399.68 86.06,399.68 62.84,399.68 25.16,399.68 0,397.61" },
  venue2: { points: "358.58,353.74 376.65,322.77 389.55,314.52 384.39,280.45 407.61,272.19 422.06,220.58 438.58,126.65 449.42,38.39 457.68,16.71 468,35.81 474.19,103.42 491.74,203.03 508.26,261.87 517.03,281.48 517.03,214.9 529.42,194.26 540.77,197.35 540.77,169.48 552.13,167.94 556.77,149.87 566.06,156.06 566.06,193.74 577.42,211.81 577.42,238.65 601.16,254.65 594.45,302.13 575.87,335.68 587.23,353.74 601.16,363.55 358.58,363.55" },
  venue3: { points: "998.06,83.81 952.65,31.16 914.45,16.71 877.29,43.55 833.94,102.39 811.74,161.23 796.77,241.23 802.97,303.16 833.94,353.23 871.61,385.23 954.71,385.23 1000.32,387.81" },
  venue4: { points: "625,291 615,305 608,318 625,338 637,354 622.5,358 673,363.5 751,363.5 793,363.5 769,352 772,347 793,340 806,321 796.8,291 784,269 757,261 730,272 707,281 672,283" }
};

const Locations = () => {
    const [locations, setLocations] = useState([]);
    // This state will track the ID of the venue being hovered, e.g., 'venue1'
    const [hoveredLocation, setHoveredLocation] = useState(null);

    useEffect(() => {
        const fetchAndSetLocations = async () => {
            try {
                // Correctly call the API function
                const locationsData = await getAllLocations();
                setLocations(locationsData);
            } catch (error) {
                console.error("Failed to fetch locations:", error);
            }
        };

        fetchAndSetLocations();
    }, []);

    // Show a loading state for a better user experience
    if (locations.length === 0) {
        return <div>Loading interactive map...</div>;
    }

    return (
        <div className='available-locations'>
            {/* --- NEW ELEMENT FOR THE HOVER NAME --- */}
            {/* This div will only render if a location is being hovered */}
            {hoveredLocation && (
                <div className="location-hover-name">
                    {hoveredLocation.name}
                </div>
            )}

            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1000.32 500" xmlSpace="preserve">
                <image id="background" xlinkHref={unitygrid} transform="matrix(0.48 0 0 0.48 0 0)"></image>
                
                {locations.map((location, index) => {
                    const venueId = `venue${index + 1}`;
                    return (
                        <Link key={location.id} to={`/locations/${location.slug}`}>
                            <polygon
                                id={venueId}
                                points={venuePaths[venueId]?.points || ""}
                                // --- LOGIC CHANGE ---
                                // onMouseEnter, we set the entire location object to state.
                                onMouseEnter={() => setHoveredLocation(location)}
                                onMouseLeave={() => setHoveredLocation(null)}
                                className="venue-polygon"
                            />
                        </Link>
                    );
                })}
            </svg>
        </div>
    );
};

export default Locations;