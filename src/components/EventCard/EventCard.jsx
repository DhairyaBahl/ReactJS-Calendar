import './EventCard.scss';

export default function EventCard({event, setCurrentEventDetails}) {

    console.log('Event', event)
    const bgColor = event.bgColor || '#fff';

    return (
        <div className="event__card--container" onClick={()=>setCurrentEventDetails(event)}>
            <div className="event__card" style={{backgroundColor: bgColor}}>
                <div className="event__card--heading">{event.time}</div>
                <div className="event__card--title">{event.title}</div>
            </div>
        </div>
    )
}