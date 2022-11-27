import React, { useRef, useState } from 'react'
import "./CalendarGrid.css"
import { numOfDays, week, months } from '../../data/data';
import Header from '../Header/Header';
import Popup from '../Popup/Popup';


const CalendarGrid = () => {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [pickedDate, setPickedDate] = useState(new Date());
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const firstDayOfTheMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const firstDayOfTheView = new Date(firstDayOfTheMonth);
    firstDayOfTheView.setDate(firstDayOfTheView.getDate() - (firstDayOfTheMonth.getDay() || 7) + 1);

    const cellBlock = useRef(null);

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

    return (
        <div
            className='calendarWrapper'
        >
            <Header
                currentDate={currentDate}
                prevHandler={() => {
                    prevHandler();
                }}
                todayHandler={() => {
                    todayHandler();
                }}
                nextHandler={() => {
                    nextHandler();
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
                        const dayWrapperClassname = `dayWrapper ${today ? 'today' : ''}`;
                        const cellWrapperClassname = `cellWrapper ${today ? 'today' : ''}${beforeToday ? 'beforeToday' : ''} ${weekend ? 'weekend' : ''}`;
                        return <div key={i.toString()}
                            ref={cellBlock}
                            className={cellWrapperClassname}
                            onClick={() => {
                                setPickedDate(i);
                            }}>
                            <button className='taskAddingButton' onClick={() => {setIsPopupOpen(true)}} style={{ display: beforeToday ? 'none' : '' }} >
                                <p className='addButtonText'> {} Add task </p>
                            </button>
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
            <Popup isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen}/>
        </div>
    )
}

export default CalendarGrid
