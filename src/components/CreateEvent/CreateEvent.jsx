import './CreateEvent.scss';
import AddIcon from '@mui/icons-material/Add';

export default function CreateEvent(props) {

    function handleButtonClick () {
        props.setIsEventModalOpen(true);

        if(props.handleParentCloseModal)
            props?.handleParentCloseModal();
    }

    return (
        <button 
            className='createEvent__btn' 
            onClick={handleButtonClick}
        >
            <AddIcon className="createEvent__btn--icon"/>
            <span className="createEvent__btn--text">Create Event</span>
        </button>
    )
}