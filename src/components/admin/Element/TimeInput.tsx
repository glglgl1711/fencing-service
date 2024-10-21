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

export default function AdminTimeInputBox ({label, name1, name2, value1 , value2, setData, disable
} : Props) {
    
    return(
        <>
        <tr>
            <th>{label} <span className="star"></span></th>
            <td>
                <div className="inputBox">
                    <input
                        style={{borderRadius : '5px' , width : '20%' , height : '40px', fontSize : '14px', 
                        border : '1px solid #E9E9E9', textAlign : 'center'}}
                        type="time"
                        name={name1}
                        value={value1}
                        disabled={disable}
                    /> ~ <input
                        style={{borderRadius : '5px' , width : '20%' , height : '40px', fontSize : '14px', 
                        border : '1px solid #E9E9E9', textAlign : 'center'}}
                        type="time"
                        name={name1}
                        value={value1}
                        disabled={disable}
                    />
                </div>
            </td>
        </tr>
        </>
    )
}