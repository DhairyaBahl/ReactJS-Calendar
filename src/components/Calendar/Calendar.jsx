import React from 'react';
import './Calendar.scss'

export default function Calendar(props) {

    const disabled = props.disabled;

    return (
        <div className='calendar'>
            <input
                type = 'date'
                className={`calendar--input ${props.className}`}
                value={props.value}
                disabled={disabled}
                onChange={(event) => !disabled && props.onChange(event.target.value)}
                onKeyDown={(event) => !disabled && event.preventDefault()}
            />
        </div>
    )
}