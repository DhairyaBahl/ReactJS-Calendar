import TaskEvent from '../../models/taskEvent.js';
import './EventCard.scss';

import { useState } from 'react';

export default function EventCard({event}) {
    
    const colors = [
        '#FFD700', 'aqua', 'greenyellow', 'springgreen', 'salmon'
    ]

    const [color, setColor] = useState(colors[Math.floor(Math.random() * colors.length)]);

    return (
        <div className="event__card--container">
            <div className="event__card" style={{backgroundColor: color}}>
                <div className="event__card--heading">{event.time}</div>
                <div className="event__card--title">{event.title}</div>
            </div>
        </div>
    )
}