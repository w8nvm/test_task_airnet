import React, { useState, useEffect } from 'react'
import './Popup.css'

const Popup = ({ isPopupOpen, setIsPopupOpen }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(isPopupOpen);
    }, [isPopupOpen])

    return (
        <>
            {isOpen && (<div className='popupOuter'>
                <div className='popup'>
                    <h4 className='taskCreationHeader'>
                        Create task
                    </h4>
                    <div className='formWrapper'>
                        <form>
                            <ul className="wrapper">
                                <li className="field">
                                    <label htmlFor="title">Title: </label>
                                    <input type="text" id="title" />
                                </li>
                                <li className="field">
                                    <label htmlFor="description">Description: </label>
                                    <textarea rows="8" type="text" id="description" />
                                </li>
                                <li className="field">
                                    <label htmlFor="time">Time: </label>
                                    <input type="date" id="time" />
                                </li>

                                <div className='buttonWrappers'>
                                    <button type='submit' className='saveButton' onClick={() => { setIsOpen(false); setIsPopupOpen(false) }}>
                                        Save
                                    </button>
                                    <button className='cancelButton' onClick={() => { setIsOpen(false); setIsPopupOpen(false) }}>
                                        Cancel
                                    </button>
                                </div>
                            </ul>
                        </form>

                    </div>
                </div>
            </div>
            )}
        </>
    )
}

export default Popup


