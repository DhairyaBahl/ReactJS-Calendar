import './CalendarEvents.scss';
import { useState, useContext } from 'react';

import EventCard from '../EventCard/EventCard';
import { DataContext } from '../../context/DataContext';
import getAllTimings from '../../controllers/getAllTimings';

export default function CalendarEvents (props) {
    const dataForCurrentDate = useContext(DataContext).data[new Date(props.currentDate).toISOString().split('T')[0]];
    const showDate = new Date(props.currentDate).toDateString();

    const times = getAllTimings();

    return (
        <div className='calendar__events'>
            <div className='calendar__events--heading'>{showDate}</div>
            <div className='calendar__events--list'>
            {
                times.map((time) => {
                    const dataTime = time.split(':')[0];
                    return (
                        <div className='calendar__events--list--item' key={time}>
                            <div className='calendar__events--list--item__time'>{time}</div>
                            <div className="calendar__events--list--item__events">
                                {dataForCurrentDate && dataForCurrentDate[dataTime] && dataForCurrentDate[dataTime].map((event) => {
                                    return <EventCard 
                                                event={event} 
                                                key={event.id}
                                                setCurrentEventDetails={props.setCurrentEventDetails}
                                            />
                                })}
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}