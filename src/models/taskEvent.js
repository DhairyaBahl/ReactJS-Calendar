function TaskEvent (eventDetails) {
    function generateUniqueEventId () {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    for(const key in eventDetails) {
        this[key] = eventDetails[key];
    }

    this.id = generateUniqueEventId();
}

export default TaskEvent;