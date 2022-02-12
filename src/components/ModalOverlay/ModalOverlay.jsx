import './ModalOverlay.scss';
import CreateEventModal from '../CreateEventModal/CreateEventModal';
import CreateEvent from '../CreateEvent/CreateEvent';
import Calendar from '../Calendar/Calendar';
import ShowEventModal from '../ShowEventModal/ShowEventModal';

export default function ModalOverlay(props) {

    function handleCloseModal() {
        props.setShowMobileMenu(false);
    }

    if(props.eventDetails) {
        return (
            <div className="modal__overlay">
                <ShowEventModal {...props}/>
            </div>
        )
    }

    if(props.mobileModal)
    return (
        <div className='modal__overlay--mobile'>
            <div className="modal__overlay--content">
                <div className="modal__overlay--heading">
                    <span 
                        className="closeModal"
                        onClick={handleCloseModal}
                    >X</span>
                </div>
                <CreateEvent
                    mobileFriendly
                    isEventModalOpen={props.isEventModalOpen}
                    setIsEventModalOpen={props.setIsEventModalOpen}
                    handleParentCloseModal={handleCloseModal}
                />
                <Calendar
                    value={props.calendarValue}
                    mobileFriendly
                    onChange={(value) => {
                        handleCloseModal();
                        props.setCalendarValue(value)
                    }}
                />
            </div>
        </div>
    )

    return (
        <div className="modal__overlay">
            <CreateEventModal {...props} />
        </div>
    )
}