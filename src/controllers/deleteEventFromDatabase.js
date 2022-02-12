export default function deleteEvent(eventDetails) {
    const events = JSON.parse(localStorage.getItem('events'));

    if(events && events[eventDetails.date] && typeof events[eventDetails.date] === 'object' && !Array.isArray(eventDetails.date)) {
        if(events[eventDetails.date][eventDetails.time.split(':')[0]]) {
            const eventsForCurrentDay = events[eventDetails.date][eventDetails.time.split(':')[0]];
            
            events[eventDetails.date][eventDetails.time.split(':')[0]] = eventsForCurrentDay.filter(event => event.id !== eventDetails.id);
        }
    }

    localStorage.setItem('events', JSON.stringify(events));
    return true;
}