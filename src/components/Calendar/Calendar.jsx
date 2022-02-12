import React from 'react';
import './Calendar.scss'

export default function Calendar(props) {
    return (
        <div className='calendar'>
            <input
                type = 'date'
                className={`calendar--input ${props.className}`}
                value={props.value}
                onChange={(event) => props.onChange(event.target.value)}
                onKeyDown={(event) => event.preventDefault()}
            />
        </div>
    )
}