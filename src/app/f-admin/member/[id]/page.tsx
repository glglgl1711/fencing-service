
export default function MemberEdit () {
    return(
        <>
        <div className="contentBox add">
            <h3>Content</h3>
            <div className="flexBox">
                <div>
                    <h4>컨텐츠 등록</h4>
                </div>
                <div className="btnBox">
                    <button className="blackBtn">목록으로</button>
                    <button className="blueBtn">저장하기</button>
                </div>
            </div>

            <div className="input_tableWrap">

                <table>
                    <tbody>
                        <tr>
                            <th>우선 공지</th>
                            <td>
                                <div className="checkBox">
                                    <input type="checkbox"/>
                                    <label htmlFor="prirorityNews">우선공지</label>
                                </div>
                            </td>
                        </tr>
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
                        <tr>
                            <th>제목 <span className="star">*</span></th>
                            <td>
                                <div className="inputBox">
                                    <input type="text" name="subject" id=""/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>보도일자 <span className="star">*</span></th>
                            <td>
                                <div className="dateBox">
                                    <input type="date" name="date" id="date"/>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}