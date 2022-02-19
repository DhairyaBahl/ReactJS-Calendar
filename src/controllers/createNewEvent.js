import TaskEvent from "../models/taskEvent";

function searchAndDeleteTarget(events, id) {

    if(!id) return;

    for(const date in events) {
        const times = events[date];

        for(const time in times) {
            const data = times[time];

            for(const item of data) {
                if(item.id === id) {
                    data.splice(data.indexOf(item), 1);
                    return true;
                }
            }
        }
    }

    return false;
}

export default function createNewEvent(eventDetails, deleteTarget) {
    const event = new TaskEvent(eventDetails);

    if(!localStorage.getItem("events")) localStorage.setItem("events", JSON.stringify({}));

    const events = JSON.parse(localStorage.getItem("events"));

    searchAndDeleteTarget(events, deleteTarget)

    if(events[event.date] && typeof events[event.date] === "object" && !Array.isArray(events[event.date])) {
        if(events[event.date][event.time.split(':')[0]]) {
            events[event.date][event.time.split(':')[0]].push(event);
            events[event.date][event.time.split(':')[0]].sort((a, b) => {
                return new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`);
            });
        }
        else {
            events[event.date][event.time.split(':')[0]] = [event]
        }
    }
    else {
        events[event.date] = {};
        events[event.date][event.time.split(":")[0]] = [event];
    }

    localStorage.setItem("events", JSON.stringify(events));

    return event;
}