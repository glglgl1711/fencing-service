export default function AdminMember () {

    return(
        <>
        <div className="contentBox whistleBlow">
            <h3>Common Code</h3>
            <div className="flexBox">
                <div>
                    <h4>공용코드 관리</h4>
                </div>
            </div>
            <div className="toolBox">
                <div className="left">
                    <div className="selectBox">
                        {/* <ListSizeBox

                        /> */}
                    </div>
                </div>

                <div className="right">
                    <div className="btnBox">
                        {/* <button className="blueBtn" onClick={()=>router.push(`/dotsAdmin/common-code-management/common-code`)}>신규등록</button> */}
                    </div>
                    {/* <ListSearchBox

                    /> */}
                </div>
            </div>

            <div className="tableWrap">
                <div className="tableType_a">
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>
                                    <span className="sortWrap">
                                        {'1234'}
                                        {/* <spanclassName={'sort'}></span> */}
                                        <span className=""></span>
                                    </span>
                                </th>
                                <th>
                                    <span className="sortWrap">
                                        {'1234'}
                                        {/* <spanclassName={'sort'}></span> */}
                                        <span className=""></span>
                                    </span>
                                </th>
                                <th>
                                    <span className="sortWrap">
                                        {'1234'}
                                        {/* <spanclassName={'sort'}></span> */}
                                        <span className=""></span>
                                    </span>
                                </th>
                                <th>
                                    <span className="sortWrap">
                                        {'1234'}
                                        {/* <spanclassName={'sort'}></span> */}
                                        <span className=""></span>
                                    </span>
                                </th>
                            </tr>
                        </thead>
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
                                    <span className="readOnly">{'1234'}</span>
                                </td>
                                <td>
                                    <div className="toggleSwitchBox">
                                        <span className="toggleSwitch">
                                            <input 
                                            type="checkbox" 
                                            // id={`commoncode_${list?.codeId}`}
                                            className="toggleIpt"
                                            // checked={list?.activeStatus === 'Y'}
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
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}