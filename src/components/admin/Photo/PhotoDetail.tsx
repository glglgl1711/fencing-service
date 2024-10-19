'use client'

import { useRouter } from "next/navigation"
import AdminInputBox from "../Element/Inputbox"
import { useState } from "react"
interface Props {
    id : string
}
export default function PhotoDetail ({
    id
} : Props) {
    const router = useRouter()
    const [data, setData] = useState<any>({
        title : ''
    })
    async function Save() {
        
    }
    function handleFileAccepted () {}
    return(
        <>
        <h3>공지사항관리</h3>
        <div className="flexBox">
            <div>
                <h4>{id === 'regist'? '공지사항 신규등록' : '공지사항 상세정보'}</h4>
            </div>
            <div className="btnBox">
                <button className="blackBtn" onClick={()=>router.back()}>목록으로</button>
                <button className="blueBtn" onClick={()=>Save()}>저장하기</button>
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
                        placeholder="사진첩 제목을 입력해 주세요."
                        disable={false}
                    />
                    
                </tbody>
            </table>
        </div>
        </>
    )
}