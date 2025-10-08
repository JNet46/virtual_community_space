// src/services/Dates.jsx

// A simple function to format the time part of a date string
export const formatTime = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// --- ADD THIS NEW FUNCTION ---
// A function to format the date part of a date string
export const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Calculates the difference between a target date and now.
 * @param {string} targetDate The ISO date string.
 * @returns {object} An object with days, hours, minutes, seconds, and isPast boolean.
 */
export const calculateTimeDifference = (targetDate) => {
    const difference = new Date(targetDate) - new Date();
    
    if (difference <= 0) { // Event is in the past
        const absoluteDifference = Math.abs(difference);
        return {
            days: Math.floor(absoluteDifference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((absoluteDifference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((absoluteDifference / 1000 / 60) % 60),
            seconds: Math.floor((absoluteDifference / 1000) % 60),
            isPast: true,
        };
    }

    // Event is in the future
    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPast: false,
    };
};

/**
 * Takes a time difference object and formats it into a display string.
 * @param {object} timeDifference The object from calculateTimeDifference.
 * @returns {string} The formatted countdown string.
 */
export const formatCountdownString = (timeDifference) => {
    const { days, hours, minutes, seconds, isPast } = timeDifference;
    const suffix = isPast ? 'ago' : 'left';

    if (days > 0) return `${days}d ${hours}h ${suffix}`;
    if (hours > 0) return `${hours}h ${minutes}m ${suffix}`;
    if (minutes > 0) return `${minutes}m ${seconds}s ${suffix}`;
    if (!isPast && seconds >= 0) return `${seconds}s ${suffix}`;
    
    // For past events less than a minute ago
    return `Just now`;
};