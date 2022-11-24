import React from 'react'
import "./Header.css"
import { months } from '../../data/data';

const Header = (props) => {
    const currentDate = props.currentDate;
    const headerMonth = months[currentDate.getMonth()];
    const headerYear = currentDate.getFullYear();

    return (
        <div className='headerWrapper'>
            <h1 className='header'> <b className='headerMonth'> {headerMonth} </b> {headerYear} </h1>
            <div className='buttonsWrapper'>
                <button className='button' onClick={props.prevHandler}> {'<'} </button>
                <button className='button todayButton' onClick={props.todayHandler}> today </button>
                <button className='button' onClick={props.nextHandler}> {'>'} </button>
            </div>
        </div>

    )
}

export default Header
