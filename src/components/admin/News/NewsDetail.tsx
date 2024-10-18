'use client'

import { useRouter } from "next/navigation"
import AdminInputBox from "../Element/Inputbox"
import { useEffect, useLayoutEffect, useState } from "react"
import Summernote from "../Editor/summernote"
import axios from "axios"
interface DataType {
    title : string , contents : string | null
}
interface Props {
    id : string
}
export default function NewsDetail ({id} : Props) {
    const router = useRouter()
    const [data, setData] = useState<DataType>({
        title : '', contents : ''
    })
    async function Save () {
        if(id === 'regist') {
            // 등록 모듈
            try {   
                const response = await axios.post(`/api/news/regist` , {
                    title : data?.title,
                    contents : data?.contents
                })
                if(response?.data?.result === true) {
                    alert('등록이 완료되었습니다.');
                    router.back()
                }else {
                    alert(response?.data?.msg)
                }
            }catch {
                alert('Server Error')
            }
        }else{
            // 수정 모듈
            const response = await axios.post(`/api/news/modify` , {
                id : id , title : data?.title , contents : data?.contents
            })
            if(response?.data?.result === true) {alert("수정이 완료되었습니다."); router.back()}
            else {alert(response?.data?.msg)}
        }
    }

    useEffect(() => {
        async function Detail () {
            if(id !== 'regist') {
                const response = await axios.get(`/api/news/detail?id=${id}`)
                if(response?.data?.result === true) {
                    setData({title : response?.data?.news?.title , contents : response?.data?.news?.contents})
                }
            }
        }
        Detail()
    }, [id])

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
                        placeholder="공지사항 제목을 입력해 주세요."
                        disable={false}
                    />
                    <tr>
                        <th>본문</th>
                        <td>
                            {id !== 'regist' && data.contents ?
                            <Summernote 
                                initData={data?.contents} 
                                setData={setData} 
                                name={'contents'} 
                            /> : ''                        
                            }
                            {id === 'regist' && !data.contents ?
                            <Summernote 
                                initData={data?.contents} 
                                setData={setData} 
                                name={'contents'} 
                            /> : ''  
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}