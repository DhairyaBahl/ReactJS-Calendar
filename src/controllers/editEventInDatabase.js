import createNewEvent from './createNewEvent';


export default function updateEvent(eventDetails) {
    return createNewEvent(eventDetails, eventDetails.id);
}