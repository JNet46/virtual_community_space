// src/components/Countdown.jsx

import React, { useState, useEffect } from 'react';
// 1. Import the calculation logic from your service file
import { calculateTimeDifference, formatCountdownString } from '../services/Dates.jsx';

const Countdown = ({ targetDate }) => {
    const [timeDifference, setTimeDifference] = useState(calculateTimeDifference(targetDate));

    useEffect(() => {
        // The timer logic MUST live inside the component
        const timer = setInterval(() => {
            setTimeDifference(calculateTimeDifference(targetDate));
        }, 1000);

        // The cleanup function is crucial
        return () => clearInterval(timer);
    }, [targetDate]);

    // 2. The component now just calls the formatting function on its current state
    const countdownText = formatCountdownString(timeDifference);

    return (
        <span className={timeDifference.isPast ? 'countdown-past' : 'countdown-future'}>
            {countdownText}
        </span>
    );
};

export default Countdown;