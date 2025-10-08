// src/App.jsx

import React from 'react';
import { useRoutes, Link, Outlet } from 'react-router-dom';
import Locations from './pages/Locations';
import Events from './pages/Events';
import './App.css';
import LocationEvents from './pages/LocationEvents';

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <Locations />
    },
    // --- THIS IS THE KEY CHANGE ---
    // This single route handles any location ID passed in the URL.
    // e.g., /locations/1, /locations/2, etc.
    {
      path: '/locations/:slug', // Use :locationId to match your component
      element: <LocationEvents /> // Pass control to the EventsPage component
    },
    {
      path: '/events',
      element: <Events /> // This can be a page that lists ALL events from all locations
    }
  ]);

  return (
    <div className='app'>
      <header className='main-header'>
        <h1>UnityGrid Plaza</h1>
        <div className='header-buttons'>
          <Link to='/' role='button'>Home</Link>
          <Link to='/events' role='button'>Events</Link>
        </div>
      </header>
      <main>
        {element}
      </main>
    </div>
  );
};

export default App;