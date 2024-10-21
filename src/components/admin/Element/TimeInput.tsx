'use client'
interface Props {
    label : string
    name1 : string
    name2 : string
    value1 : string
    value2 : string
    setData : Function
    disable : boolean
}
import { useState } from 'react'

import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css'; // 필수 CSS
import 'react-clock/dist/Clock.css';  
export default function AdminTimeInputBox ({label, name1, name2, value1 , value2, setData, disable
} : Props) {
    function handleChange(newValue: string, name: string) {
        setData((prevData: any) => ({
            ...prevData,
            [name]: newValue,
        }));
    }
    console.log(value1)
    return(
        <>
        <tr>
            <th>{label} <span className="star"></span></th>
            <td>
            <TimePicker
                onChange={(value) => handleChange(value as string, name1)}
                value={value1}
                disableClock={true} 
                format="HH:mm"
                name={name1}
            /> ~ <TimePicker
                onChange={(value) => handleChange(value as string, name2)}
                value={value2}
                disableClock={true}
                format="HH:mm"
                name={name2}
            />
            </td>
        </tr>
        </>
    )
}