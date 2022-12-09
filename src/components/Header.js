import React, { useState } from 'react'
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import { ChangeToCelsius, ChangeToFahrenheit } from '../actions'
import { useSelector, useDispatch } from 'react-redux'

function Header() {
    const dispatch = useDispatch();


    const [celsius, setCelsius] = useState(true)
    const handletempChange = (event) => {
        setCelsius(event.target.checked);
        if (event.target.checked)
            dispatch(ChangeToCelsius())
        else
            dispatch(ChangeToFahrenheit())
    }

    return (
        <div className='header shadow-sm p-3 row p-2'>
            <div className='col-6 text-left'>
                <h1>Weather</h1>
            </div>
            <div className='col-6 text-right'>
                <div className='toggle-container'>
                    <Toggle
                        className={celsius ? 'celsius-thumb' : 'fahrenheit-thumb'}
                        icons={false}
                        defaultChecked={celsius}
                        onChange={handletempChange} />
                </div>
            </div>
        </div>
    )
}

export default Header