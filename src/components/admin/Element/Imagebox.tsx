
export default function AdminImageBox () {

    return(
        <>
        <tr className="top">
            <th>썸네일 이미지 <span className="star">*</span></th>
            <td>
                <div className="flexBox">
                    <div>
                        {/* <div className="imgUploadBox imgUploadBox_after">
                            <img src="" alt="thumbnail img"/>
                            <input type="file" name="thumnailImage" id="imgUploadBtn1"/>
                            <label htmlFor="imgUploadBtn1" className="imgUploadBtn imgUploadBtn_after">
                                <i className="fa-light fa-upload"></i>
                                이미지 편집
                            </label>
                        </div> */}
                        <div className="imgUploadBox imgUploadBox_before">
                            <input type="file" name="thumnailImage"  id="imgUploadBtn2"/>
                            <label htmlFor="imgUploadBtn2" className="imgUploadBtn imgUploadBtn_before">
                                <i className="fa-light fa-upload"></i>
                                이미지 업로드
                            </label>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
        </>
    )
}