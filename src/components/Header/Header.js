import React from 'react'
import "./Header.css"
import { months } from '../../data/data';

const Header = () => {
    let currentMonth = months[new Date().getMonth()];
    let currentYear = new Date().getFullYear();

    return (
        <div className='headerWrapper'>
            <h1>
                {currentMonth} {currentYear}
            </h1>
        </div>
    )
}

export default Header
