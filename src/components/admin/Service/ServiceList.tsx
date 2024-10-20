'use client'

export default function ServiceList () {

    return(
        <>
        <tbody>
            <tr style={{cursor : 'pointer'}}>
                <td>
                    <span className="readOnly">{1}</span>
                </td>
                <td>
                    <span className="readOnly">{'aaaa'}</span>
                </td>
                <td>
                    <span className="readOnly">{'1111'}</span>
                </td>
                <td>
                    <span className="readOnly">{'1111'}</span>
                </td>
                <td>
                    <span className="readOnly">{'1111'}</span>
                </td>
                <td>
                    <span className="readOnly">{'1111'}</span>
                </td>
                <td style={{width : '10%'}}>
                    <div className="toggleSwitchBox">
                        <span className="toggleSwitch">
                            <input 
                            type="checkbox" 
                            // id={`commoncode_${list?.codeId}`}
                            className="toggleIpt"
                            // onChange={()=>statusChange(list?.codeId, list?.activeStatus)}
                            hidden
                            />
                            <label
                            // htmlFor={`commoncode_${list?.codeId}`} 
                            className="toggleSwitch"
                            >
                                <span className="toggleButton"></span>
                            </label>
                        </span>
                    </div>
                </td>
                <td>
                    <button>삭제</button>
                </td>
            </tr>
        </tbody>
        </>
    )
}