function TaskEvent (eventDetails) {
    function generateUniqueEventId () {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    for(const key in eventDetails) {
        this[key] = eventDetails[key];
    }

    const colors = [
        '#FFD700', 'aqua', 'greenyellow', 'springgreen', 'salmon'
    ]

    this.id = generateUniqueEventId();
    this.bgColor = colors[Math.floor(Math.random() * colors.length)]
}

export default TaskEvent;