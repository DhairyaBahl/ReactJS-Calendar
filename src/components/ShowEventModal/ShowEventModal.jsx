import './ShowEventModal.scss';
import { useState, useContext } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { CheckCircle } from '@mui/icons-material';
import { DataContext } from '../../context/DataContext.js';
import Calendar from '../Calendar/Calendar';
import deleteEventFromDatabase from '../../controllers/deleteEventFromDatabase.js'

export default function ShowEventModal(props) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const dataContext = useContext(DataContext);

    const { currentEventDetails } = props;


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
                    disabled
                />
                <Calendar 
                    className="createEvent__modal--content--inputDate"
                    value={currentEventDetails.date}
                    disabled
                />
                <input
                    className='createEvent__modal--content--inputTime'
                    type='time'
                    value={currentEventDetails.time}
                    disabled
                />
                <textarea
                    value = {currentEventDetails.description ? currentEventDetails.description : "No Description"}
                    className='createEvent__modal--content--inputDescription'
                    placeholder='Enter Description'
                    disabled={true}
                />
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
    )
}