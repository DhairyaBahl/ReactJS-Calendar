import { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import calendarLogo from '../../assets/images/calendarLogo.jpg';
import './Header.scss';

export default function Header(props) {
    return (
        <div className="header">
            <div className="header__content">
                <div className="header__content--left">
                    <MenuIcon
                        className='header__content--left__menuIcon'
                        onClick={() => props.setShowMobileMenu(true)}
                    />
                    <img
                        src = {calendarLogo}
                        className = 'header__content--left__logo'
                    />
                    <div className='header__content--left__heading'>Calendar</div>
                </div>
                <div className="header__content--right"/>
            </div>
        </div>
    )
}