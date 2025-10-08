// src/services/EventsAPI.js

/**
 * Fetches all events for a specific location ID.
 * Corresponds to the backend route: GET /api/events/location/:locationId
 * @param {string | number} locationId The ID of the location.
 * @returns {Promise<Array>} A promise that resolves to an array of event objects.
 */
export const getEventsByLocationId = async (locationId) => {
    try {
      // We use a relative path, which will be handled by the Vite proxy in development.
      const response = await fetch(`/api/events/location/${locationId}`);
  
      // This is crucial for error handling. If the server returns a 404 or 500,
      // this check will catch it and prevent the code from trying to parse a non-JSON response.
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      // Log the error for debugging and re-throw it so the calling component
      // can handle it (e.g., by setting an error state).
      console.error(`Failed to fetch events for location ${locationId}:`, error);
      throw error;
    }
  };
  
  /**
   * Fetches the details for a single event by its unique ID.
   * Corresponds to the backend route: GET /api/events/:id
   * @param {string | number} eventId The ID of the event.
   * @returns {Promise<Object>} A promise that resolves to a single event object.
   */
  export const getEventById = async (eventId) => {
    try {
      const response = await fetch(`/api/events/${eventId}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch event with ID ${eventId}:`, error);
      throw error;
    }
  };
  
  /**
   * Fetches ALL events from all locations.
   * Corresponds to the backend route: GET /api/events
   * @returns {Promise<Array>} A promise that resolves to an array of all event objects.
   */
  export const getAllEvents = async () => {
    try {
      const response = await fetch(`/api/events`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch all events:", error);
      throw error;
    }
  };