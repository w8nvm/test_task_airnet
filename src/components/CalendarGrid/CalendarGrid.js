import React, { useState } from 'react'
import "./CalendarGrid.css"
import { numOfDays, week } from '../../data/data';
import Header from '../Header/Header';


const CalendarGrid = () => {

    const [currentDate, setCurrentDate] = useState(new Date());
    const firstDayOfTheMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const firstDayOfTheView = new Date(firstDayOfTheMonth);
    firstDayOfTheView.setDate(firstDayOfTheView.getDate() - (firstDayOfTheMonth.getDay() || 7) + 1);
    // console.log(firstDayOfTheMonth);
    

    const days = [...Array(numOfDays)].map((el, ind) => {
        let day = new Date(firstDayOfTheView);
        day.setDate(day.getDate() + ind); 
        return day
    });

    const prevHandler = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    };

    const todayHandler = () => {
        setCurrentDate(new Date());
    };

    const nextHandler = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    };

    // console.log(days);

    return (
        <div className='calendarWrapper'>
            <Header 
                currentDate={currentDate}
                prevHandler={prevHandler}
                todayHandler={todayHandler}
                nextHandler={nextHandler}/>
            <div className='weekdaysWrapper'>
                {week.map(element =>
                    <div className='weekday'>
                        {element}
                    </div>
                )}
            </div>

            <div className='gridWrapper'>
                {days.map((i) =>
                    <div key={i.toString()} className={i.getDay() === 6 || i.getDay() === 0 ? 'cellWrapper weekend' : 'cellWrapper'}>
                        <div className='rowInCell'>
                            <div className={i.getMonth() === new Date().getMonth() &&
                                            i.getDate() === new Date().getDate() &&
                                            i.getFullYear() === new Date().getFullYear() 
                                            ? 'dayWrapper today' : "dayWrapper"}>
                                {i.getDate()}
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CalendarGrid
