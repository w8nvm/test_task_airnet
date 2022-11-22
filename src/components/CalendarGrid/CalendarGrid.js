import React from 'react'
import "./CalendarGrid.css"
import { numOfDays, week } from '../../data/data';

const CalendarGrid = () => {
    //const date = new Date();
    //const firstDayCurrentMonth = getFirstDayOfMonth(date.getFullYear(), date.getMonth());
    //const firstDayCurrentView = new Date(firstDayCurrentMonth.setDate(firstDayCurrentMonth.getDate() - firstDayCurrentMonth.getDay() + 1));
    //let curr = firstDayCurrentView;
    //console.log(curr, curr.getDate());

    const days = [...Array(numOfDays)].map((el, ind) => {
        let day = new Date();
        day.setDate(ind);
        return day;
    });

    console.log(days);
    console.log(week);

    return (
        <>
        <div className='weekdaysWrapper'>
            {week.map(element => 
                <div className='weekday'>
                    {element}
                </div>
            )}
        </div>

        <div className='gridWrapper'>
            {days.map((i) =>
                <div key={i.toString()} className='cellWrapper'>
                    <div className='rowInCell'>
                        <div className='dayWrapper'>
                            {i.getDate()}
                        </div>

                    </div>
                </div>
            )}
        </div>
        </>
    )
}

export default CalendarGrid
