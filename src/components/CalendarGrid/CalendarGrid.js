import React from 'react'
import "./CalendarGrid.css"

const CalendarGrid = () => {

    const numOfDays = 42;
    const days = [...Array(numOfDays)].map((el, ind) => ind);

    return (
        <div className='gridWrapper'>
            {days.map((i) => 
                <div key={i.toString()} className='cellWrapper'>
                    {i}
                </div>
            )}
        </div>
    )
}

export default CalendarGrid
