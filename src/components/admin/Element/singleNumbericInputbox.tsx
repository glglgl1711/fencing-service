'use client'
interface Props {
    label?:string
    name?:string
    value?:string
    setData?:any
    placeholder?:string
    disable?:boolean
}
export default function AdminNumbericInputBox ({
    label , name , value , setData , placeholder, disable
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
                        type="number"
                        name={name}
                        value={value}
                        disabled={disable}
                    />
                    명
                </div>
            </td>
        </tr>
        </>
    )
}