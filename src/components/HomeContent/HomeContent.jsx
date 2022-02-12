import './HomeContent.scss'

import { useState } from 'react';
import Calendar from '../Calendar/Calendar';
import CreateEvent from '../CreateEvent/CreateEvent';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import CalendarEvents from '../CalendarEvents/CalendarEvents';

export default function HomeContent(props) {
    const [currentEventDetails, setCurrentEventDetails] = useState(null);

    return (
        <div className="home__content">
            <div className="home__content--left">
                <CreateEvent 
                    isEventModalOpen={props.isEventModalOpen}
                    setIsEventModalOpen={props.setIsEventModalOpen}
                />
                <Calendar
                    value={props.calendarValue}
                    onChange={(value) => {
                        props.setCalendarValue(value)
                    }}
                />
            </div>
            <div className="home__content--right">
                <CalendarEvents
                    currentDate = {props.calendarValue}
                    setCurrentEventDetails={setCurrentEventDetails}
                />
            </div>
            {props.isEventModalOpen && 
                <ModalOverlay
                    isEventModalOpen={props.isEventModalOpen}
                    setIsEventModalOpen={props.setIsEventModalOpen}
                />
            }
            {
                currentEventDetails &&
                <ModalOverlay
                    setCurrentEventDetails={setCurrentEventDetails}
                    currentEventDetails={currentEventDetails}
                    eventDetails
                />
            }
        </div>
    )
}