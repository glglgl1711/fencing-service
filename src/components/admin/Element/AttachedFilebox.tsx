
export default function AdminAttachedFileBox () {

    return(
        <>
        <tr>
            <th>첨부파일(KR)</th>
            <td>
                <div className="fileSelectBox">
                    <div>
                        <div>
                            <input type="file" name="fileKr" id="fileKr"/>
                            <label htmlFor="fileKr">파일선택</label>
                        </div>
                        
                            <div>
                                <span>asdfasdf</span>
                                <button className="redCloseBtn"><i className="fa-regular fa-xmark"></i></button>
                            </div>
                    </div>
                </div>
            </td>
        </tr>
        </>
    )
}