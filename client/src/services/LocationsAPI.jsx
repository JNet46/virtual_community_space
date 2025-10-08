// src/services/LocationsAPI.jsx

// This is the function to get ALL locations
// Corresponds to GET /api/locations on your backend
export const getAllLocations = async () => {
    try {
      // We use a relative path because of the Vite proxy we set up
      const response = await fetch('/api/locations');
  
      // If the server responds with an error (e.g., 404, 500), throw an error
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Otherwise, parse the JSON and return it
      const data = await response.json();
      return data;
  
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Failed to fetch all locations:", error);
      // Re-throw the error so the component that called this function can handle it
      throw error;
    }
  };
  
  // --- CREATE A NEW FUNCTION ---
export const getLocationBySlug = async (slug) => {
    try {
      const response = await fetch(`/api/locations/${slug}`); // Call the new slug-based endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch location with slug ${slug}:`, error);
      throw error;
    }
  };