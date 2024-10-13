'use client'

import { useRouter } from "next/navigation"
import AdminInputBox from "../\bElement/Inputbox"
import { useState } from "react"
import Summernote from "../Editor/summernote"
interface Props {
    id : string
}
export default function NewsDetail ({id} : Props) {
    const router = useRouter()
    const [data, setData] = useState<any>({
        title : '', contents : null
    })
    function handleChange () {

    }
    return(
        <>
        <h3>공지사항관리</h3>
        <div className="flexBox">
            <div>
                <h4>{id === 'regist'? '공지사항 신규등록' : '공지사항 상세정보'}</h4>
            </div>
            <div className="btnBox">
                <button className="blackBtn" onClick={()=>router.back()}>목록으로</button>
                {/* <button className="blueBtn">저장하기</button> */}
            </div>
        </div>

        <div className="input_tableWrap">

            <table>
                <tbody>
                    <AdminInputBox
                        label={'제목'}
                        name={'title'}
                        value={data?.title}
                        setData={setData}
                        placeholder="공지사항 제목을 입력해 주세요."
                        disable={false}
                    />
                    <tr>
                        <th>본문</th>
                        <td>
                            <Summernote 
                                initData={data?.contents} 
                                setData={setData} 
                                name={'contents'} 
                                onChange={handleChange}
                            />                        
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}