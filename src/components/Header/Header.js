import React from 'react'
import "./Header.css"

const Header = () => {

    const month = ["January", "February",
        "March", "April", "May",
        "June", "July", "August",
        "September", "October", "November",
        "December"];

    let currentMonth = month[new Date().getMonth()];
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
