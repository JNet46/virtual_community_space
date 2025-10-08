// src/components/Event.jsx

import React from 'react';
import '../css/Event.css'; // Make sure you have this CSS file

// 1. Import the necessary helper functions and the new Countdown component.
import { formatDate, formatTime } from '../services/Dates.jsx';
import Countdown from './Countdown.jsx'; // The .jsx is optional but good for clarity

/**
 * A presentational component that displays the details of a single event.
 * @param {object} props - The props object.
 * @param {object} props.event - The full event object from the database.
 */
const Event = ({ event }) => {
    
    // 2. This is a "guard clause". If for some reason no event data is passed,
    //    the component will render nothing instead of crashing.
    if (!event) {
        return null;
    }

    // 3. We call the formatting functions directly with the data from the prop.
    //    There's no need for state or useEffect in this component.
    const displayDate = formatDate(event.date);
    const displayTime = formatTime(event.date);

    return (
        <article className='event-information'>
            {/* Use a placeholder image if the event data doesn't include one */}
            <img src={event.image || 'https://via.placeholder.com/400x300'} alt={event.name} />

            <div className='event-information-overlay'>
                <div className='text'>
                    {/* Use properties directly from the 'event' prop */}
                    <h3>{event.name}</h3>
                    <p className="event-date-time">
                        <i className="fa-regular fa-calendar"></i> {displayDate} <br /> 
                        <i className="fa-regular fa-clock"></i> {displayTime}
                    </p>
                    
                    {/* 4. Here we render the live, ticking Countdown component,
                        passing it the event's date as the targetDate prop. */}
                    <p className="time-remaining">
                        <Countdown targetDate={event.date} />
                    </p>
                </div>
            </div>
        </article>
    );
};

export default Event;