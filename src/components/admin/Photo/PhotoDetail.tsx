'use client'

import { useRouter } from "next/navigation"
import AdminInputBox from "../Element/Inputbox"
import { useEffect, useState } from "react"
import AdminImageBox from "../Element/MultiImagebox"
import PreviewImageBox from "../Element/MultiPreviewImagebox"
import SavedImagebox from "../Element/SaveImagebox"
import axios from "axios"
import SingleImageBox from "../Element/SingleImagebox"
import { headers } from "next/headers"
interface DataType {
    title : string
    thumnail : any
    image : File[] | any
    url : string[]
}
interface Props {
    id : string
}
export default function PhotoDetail ({
    id
} : Props) {
    const router = useRouter()
    const [data, setData] = useState<DataType>({
        title : '' , thumnail : null , image : [] , url : []
        // 제목 , 이미지 데이터 , 이미지 url
    })
    const [thumnailPreview , setThumnailPreview] = useState<string>('')
    const [preview , setPreview] = useState<string[]>([])
    async function getDetail () {
        const response = await axios.get(`/api/photo/detail?id=${id}`)
        if(response?.data?.result === true) {
            setData((prev) => ({...prev,
                title : response?.data?.title , url : response?.data?.photo
            }));
            setThumnailPreview(response?.data?.thumnail)
        }
    }
    async function Save() {
        const formData = new FormData()
        if(id !== 'regist') {formData.append('id' , id)}
        formData.append('title' , data?.title)
        if(data?.thumnail){ formData.append('thumnail' , data?.thumnail) }
        if(data?.image?.length > 0) {
            data?.image?.forEach((file : any , index:number) => {
                formData.append('file' , file)
            })
        }
        if(id === 'regist') {
            const response = await axios.post('/api/photo/regist' , formData , {
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            if(response?.data?.result === true) {
                alert('등록이 완료되었습니다.');
                router.push('/f-admin/photos')
            }else{
                alert(response?.data?.msg)
            }
        }else{
            const response = await axios.post('/api/photo/edit' , formData , {
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            if(response?.data.result === true) {
                alert('수정이 완료되었습니다.')
                router.back()
            }
        }
    }

    useEffect(() => {
        if(id !== 'regist') {
            getDetail()
        }
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
                        placeholder="사진첩 제목을 입력해 주세요."
                        disable={false}
                    />

                    {/* 썸네일 이미지 (싱글) */}
                    <SingleImageBox
                        preview={thumnailPreview}
                        setData={setData}
                        setPreview={setThumnailPreview}
                    />

                    {/* 사진첩 이미지 (다중) */}
                    <AdminImageBox
                        name={'image'}
                        setData={setData}
                        setPreview={setPreview}
                    />
                    
                    <PreviewImageBox
                        preview={preview}
                        setData={setData}
                        setPreview={setPreview}
                    />

                    <SavedImagebox
                        photo={data?.url}
                        refetch={getDetail}
                    />
                </tbody>
            </table>
        </div>
        </>
    )
}