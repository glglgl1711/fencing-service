'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import AdminInputBox from "../Element/Inputbox"
interface DataType {
    name : string, phone : string , birth : string , email : string , address : string
}
interface Props {
    id : string
}
export default function MemberDetail ({
    id
} : Props) {
    const router = useRouter()
    const [data, setData] = useState<DataType>({
        name : '', phone : '', birth : '', email : '', address : ''
    })

    useEffect(() => {
        async function getDetail () {
            if(id) {
                const response = await axios.get(`/api/user/getUserDetail?id=${id}`)
                if(response?.data?.result === true) {
                    setData(response?.data?.user)
                }else{
                    alert(response?.data?.msg);
                    router.push(`/f-admin/member`)
                }
            }
        }
        getDetail()
    }, [id])
    return(
        <>
        <h3>회원관리</h3>
        <div className="flexBox">
            <div>
                <h4>회원상세정보</h4>
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
                        label={'성명'}
                        name={'name'}
                        value={data?.name}
                        setData={setData}
                        placeholder=""
                        disable={true}
                    />
                    <AdminInputBox
                        label={'휴대전화'}
                        name={'name'}
                        value={data?.phone}
                        setData={setData}
                        placeholder=""
                        disable={true}
                    />
                    <AdminInputBox
                        label={'생년월일'}
                        name={'name'}
                        value={data?.birth}
                        setData={setData}
                        placeholder=""
                        disable={true}
                    />
                    <AdminInputBox
                        label={'이메일'}
                        name={'name'}
                        value={data?.email}
                        setData={setData}
                        placeholder=""
                        disable={true}
                    />
                    <AdminInputBox
                        label={'주소'}
                        name={'name'}
                        value={data?.address}
                        setData={setData}
                        placeholder=""
                        disable={true}
                    />
                </tbody>
            </table>
        </div>
        </>
    )
}