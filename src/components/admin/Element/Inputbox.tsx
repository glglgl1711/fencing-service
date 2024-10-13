'use client'

interface Props {
    label?:string
    name?:string
    value?:string
    setData?:any
    placeholder?:string
    disable?:boolean
}
export default function AdminInputBox ({
    label , name , value , setData , placeholder, disable
} : Props) {
    function handleChange (e:React.ChangeEvent<HTMLInputElement>){
        const {name , value} = e.target;
        setData((prev : any) => ({...prev, [name] : value}))
    }
    return(
        <>
        <tr>
            <th>{label} <span className="star"></span></th>
            <td>
                <div className="inputBox">
                    <input 
                        type="text" 
                        name={name}
                        value={value} 
                        id={name}
                        onChange={handleChange}
                        placeholder={placeholder}
                        disabled={disable}
                    />
                </div>
            </td>
        </tr>
        </>
    )
}