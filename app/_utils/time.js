import { fromZonedTime, toZonedTime } from 'date-fns-tz';
import { addHours, format, isSameDay } from 'date-fns';

const timeZone = 'Europe/Paris';

/**
 * Generates time slots for a day in 30-minute intervals.
 * @returns {string[]} Array of time slots (e.g., "08:00").
 */
export function generateTimeSlots() {
    const slots = [];
    for (let i = 8; i < 20; i++) { // From 8 AM to 7:30 PM
        slots.push(`${String(i).padStart(2, '0')}:00`);
        slots.push(`${String(i).padStart(2, '0')}:30`);
    }
    return slots;
}

/**
 * Filters start time slots to disable booking within the next 12 hours.
 * @param {Date} selectedDate - The date selected by the user.
 * @returns {string[]} Array of available time slots.
 */
export function getAvailableStartTimes(selectedDate) {
    if (!selectedDate) return [];

    const allSlots = generateTimeSlots();
    const nowInParis = toZonedTime(new Date(), timeZone);
    const bookingCutoff = addHours(nowInParis, 12);

    // If the selected date is not today (in Paris time), all slots are available
    if (!isSameDay(selectedDate, nowInParis)) {
        return allSlots;
    }

    // If it is today, filter slots that are before the cutoff time
    const cutoffTime = format(bookingCutoff, 'HH:mm');
    
    return allSlots.filter(slot => slot > cutoffTime);
}

/**
 * Filters end time slots to ensure end time is after start time on the same day.
 * @param {Date} endDate - The end date selected by the user.
 * @param {Date} startDate - The start date selected by the user.
 * @param {string} startTime - The selected start time.
 * @returns {string[]} Array of available time slots.
 */
export function getAvailableEndTimes(endDate, startDate, startTime) {
    if (!endDate || !startDate || !startTime) return [];

    const allSlots = generateTimeSlots();

    // If end date is after start date, all slots are available
    if (!isSameDay(endDate, startDate)) {
        return allSlots;
    }

    // If it's the same day, filter slots to be after the start time
    return allSlots.filter(slot => slot > startTime);
}
