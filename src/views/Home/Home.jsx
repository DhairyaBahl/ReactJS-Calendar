import './Home.scss';

import Header from '../../components/Header/Header';
import HomeContent from '../../components/HomeContent/HomeContent';
import { useState } from 'react';
import ModalOverlay from '../../components/ModalOverlay/ModalOverlay';

export default function Home() {

    const [showMobileMenu, setShowMobileMenu] = useState(true);
    const [calendarValue, setCalendarValue] = useState(new Date().toISOString().split('T')[0]);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);

    return (
        <div className="home">
            <Header
                setShowMobileMenu={setShowMobileMenu} 
            />
            <HomeContent
                calendarValue={calendarValue}
                setCalendarValue={setCalendarValue}
                isEventModalOpen={isEventModalOpen}
                setIsEventModalOpen={setIsEventModalOpen}
            />
            {showMobileMenu && 
                <ModalOverlay 
                    mobileModal
                    calendarValue={calendarValue}
                    setCalendarValue={setCalendarValue}
                    setShowMobileMenu={setShowMobileMenu}
                    isEventModalOpen={isEventModalOpen}
                    setIsEventModalOpen={setIsEventModalOpen}
                />
            }
        </div>
    )
}