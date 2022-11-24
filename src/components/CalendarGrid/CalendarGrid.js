import React, { useState } from 'react'
import "./CalendarGrid.css"
import { numOfDays, week } from '../../data/data';
import Header from '../Header/Header';
import { months } from '../../data/data';


const CalendarGrid = () => {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [pickedDate, setPickedDate] = useState(new Date());
    const [animation, setAnimation] = useState(0);
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
        <div
            className='calendarWrapper'
            onAnimationEnd={() => setAnimation(0)}
            animation={animation}
        >
            <Header
                currentDate={currentDate}
                prevHandler={() => {
                    prevHandler();
                    setAnimation(0);
                }}
                todayHandler={() => {
                    todayHandler();
                    setAnimation(0);
                }}
                nextHandler={() => {
                    nextHandler();
                    setAnimation(0);
                }}
            />
            <div className='verticalLineWrapper'>
                <div className='verticalLine' />
                <div key={currentDate} className='gridWrapper'>
                    {week.map(element =>
                        <div className='weekday'>
                            {element}
                        </div>
                    )}
                    {days.map((i) => {
                        const today =
                            i.getMonth() === new Date().getMonth() &&
                            i.getDate() === new Date().getDate() &&
                            i.getFullYear() === new Date().getFullYear();
                        const beforeToday = i < new Date() && !today;
                        const weekend = i.getDay() === 6 || i.getDay() === 0;
                        const dayWrapperClassname = `dayWrapper`;
                        const cellWrapperClassname = `cellWrapper ${today ? 'today' : ''}${beforeToday ? 'beforeToday' : ''} ${weekend ? 'weekend' : ''}`;
                        return <div key={i.toString()}
                            className={cellWrapperClassname}
                            onClick={() => {
                                setPickedDate(i);
                            }}>
                            <div className='rowInCell'>
                                <div className={dayWrapperClassname}>
                                    {i.getDate()}
                                </div>

                            </div>
                        </div>
                    }
                    )}
                </div>
                <div className='pickedDate'>
                    <h1> {pickedDate?.getDate()} {months[pickedDate?.getMonth()]} </h1>
                </div>
            </div>

        </div>
    )
}

export default CalendarGrid
