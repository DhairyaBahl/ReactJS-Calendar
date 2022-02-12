import './CreateEventModal.scss';

import { useState, useContext } from 'react';
import Calendar from '../Calendar/Calendar';
import createNewEvent from '../../controllers/createNewEvent.js';
import CircularProgress from '@mui/material/CircularProgress';
import { CheckCircle } from '@mui/icons-material';
import { DataContext } from '../../context/DataContext.js';

export default function CreateEventModal(props) {

    const [error, setError] = useState("");
    const [title, setTitle] = useState('');
    const [calendarValue, setCalendarValue] = useState(new Date().toISOString().split('T')[0]);
    const [time, setTime] = useState([
        new Date().getHours() <= 9 ? '0' + new Date().getHours() : new Date().getHours(),
        new Date().getMinutes() <= 9 ? '0' + new Date().getMinutes() : new Date().getMinutes()
    ].join(':'));

    const [isLoading, setIsLoading] = useState(false);
    const [newEventCreated, setNewEventCreated] = useState(false);

    const dataContext = useContext(DataContext);
    console.log(dataContext)

    function validateAndCreateNewEvent() {
        if (title.length < 1) {
            return setError("Title is required");
        }

        setError("");
        setIsLoading(true);
        const newEvent = createNewEvent({title, date: calendarValue, time});
        dataContext?.updateDataFromLocalStorage();

        const timeoutId = setTimeout(() => {
            setIsLoading(false);
            setNewEventCreated(true);

            const innerTimeoutId = setTimeout(() => {
                props.setIsEventModalOpen(false)
                clearTimeout(innerTimeoutId);
            }, 500)

            clearTimeout(timeoutId);
        }, 500);
    }

    return (
        <div className='createEvent__modal'>
            <div className="createEvent__modal--header">
                <span
                    className="modalClose"
                    onClick={() => props.setIsEventModalOpen(false)}
                >X</span>
            </div>
            <div className="createEvent__modal--content">
                <div 
                    className={`createEvent__modal--error ${error ? "showError" : ""}`}
                >{error}</div>
                <input
                    className='createEvent__modal--content--inputTitle'
                    placeholder='Add Title'
                    value = {title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Calendar 
                    className="createEvent__modal--content--inputDate"
                    value={calendarValue}
                    onChange={(value) => setCalendarValue(value)}
                />
                <input
                    className='createEvent__modal--content--inputTime'
                    type='time'
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <button
                    className='createEvent__modal--content--save'
                    onClick={validateAndCreateNewEvent}
                    disabled={isLoading}
                >
                    {isLoading ? 
                        <CircularProgress
                            color='inherit'
                            style={{
                                width: '20px',
                                height: '20px',
                            }}
                        /> : newEventCreated ? <CheckCircle/> : 'Save'
                    }
                </button>
            </div>
        </div>
    )
}