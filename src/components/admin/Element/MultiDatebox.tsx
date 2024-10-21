interface Props {
    label : string
    name1 : string
    name2 : string
    value1 : string
    value2 : string
    setData : Function
    disable : boolean
}
export default function AdminMultiDateBox ({
    label, name1, name2, value1 , value2, setData, disable
} : Props) {
    function handleChange (e:React.ChangeEvent<HTMLInputElement>) {
        const {name , value} = e.target;
        setData((prev: any) => ({...prev , [name] : value}))
    }
    console.log(value1)
    return(
        <>
        <tr>
            <th>{label} <span className="star">*</span></th>
            <td>
                <div className="dateBox">
                    <input 
                    type="date" 
                    name={name1}
                    value={value1}
                    onChange={handleChange}
                    /> ~ <input 
                    type="date" 
                    name={name2}
                    value={value2}
                    onChange={handleChange}
                    disabled={disable}
                    />
                </div>
            </td>
        </tr>
        </>
    )
}