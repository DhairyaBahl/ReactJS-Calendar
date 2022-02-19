import './ShowEventModal.scss';
import { useState, useContext } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { CheckCircle } from '@mui/icons-material';
import { DataContext } from '../../context/DataContext.js';
import Calendar from '../Calendar/Calendar';
import deleteEventFromDatabase from '../../controllers/deleteEventFromDatabase.js';
import editEventInDatabase from '../../controllers/editEventInDatabase.js';

export default function ShowEventModal(props) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const dataContext = useContext(DataContext);

    const { currentEventDetails, setCurrentEventDetails } = props;
    console.log(currentEventDetails);

    function deleteEvent() {
        setIsDeleting(true);

        deleteEventFromDatabase({...currentEventDetails});
        dataContext?.updateDataFromLocalStorage();

        const timeoutId = setTimeout(()=>{
            setIsDeleting(false);
            setIsDeleted(true);

            const innerTimeoutId = setTimeout(() => {
                props.setCurrentEventDetails(null)
                clearTimeout(innerTimeoutId);
            }, 500)

            clearTimeout(timeoutId);
        }, 500);
    }

    function editEvent() {
        setIsEditing(true);

        editEventInDatabase({...currentEventDetails});
        dataContext?.updateDataFromLocalStorage();

        const timeoutId = setTimeout(()=>{
            setIsEditing(false);
            setIsEdited(true);

            const innerTimeoutId = setTimeout(() => {
                props.setCurrentEventDetails(null)
                clearTimeout(innerTimeoutId);
            }, 500)

            clearTimeout(timeoutId);
        }, 500);
    }

    function changeTitle(event) {
        setCurrentEventDetails({...currentEventDetails, title: event.target.value});
    }

    function changeDate(date) {
        setCurrentEventDetails({...currentEventDetails, date: date});
    }

    function changeTime(event) {
        setCurrentEventDetails({...currentEventDetails, time: event.target.value});
    }

    function changeDescription(event) {
        setCurrentEventDetails({...currentEventDetails, description: event.target.value});
    }

    return (
        <div className='createEvent__modal'>
            <div className="createEvent__modal--header">
                <span
                    className="modalClose"
                    onClick={() => props.setCurrentEventDetails(null)}
                >X</span>
            </div>
            <div className="createEvent__modal--content">
                <input
                    className='createEvent__modal--content--inputTitle'
                    placeholder='Add Title'
                    value = {currentEventDetails?.title}
                    onChange={changeTitle}
                />
                <Calendar 
                    className="createEvent__modal--content--inputDate"
                    value={currentEventDetails.date}
                    onChange={changeDate}
                />
                <input
                    className='createEvent__modal--content--inputTime'
                    type='time'
                    value={currentEventDetails.time}
                    onChange={changeTime}
                />
                <textarea
                    value = {currentEventDetails.description ? currentEventDetails.description : "No Description"}
                    className='createEvent__modal--content--inputDescription'
                    placeholder='Enter Description'
                    onChange={changeDescription}
                />
                <div className="createEvent__modal--content--buttons">
                    <button
                        className='createEvent__modal--content--edit'
                        onClick={editEvent}
                        disabled={isEditing}
                    >
                        {isEditing ? 
                            <CircularProgress
                                color='inherit'
                                style={{
                                    width: '20px',
                                    height: '20px',
                                }}
                            /> : isEdited ? <CheckCircle/> :'Save'
                        }
                    </button>
                    <button
                        className='createEvent__modal--content--delete'
                        onClick={deleteEvent}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 
                            <CircularProgress
                                color='inherit'
                                style={{
                                    width: '20px',
                                    height: '20px',
                                }}
                            /> : isDeleted ? <CheckCircle/> :'Delete'
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}