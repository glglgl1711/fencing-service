'use client'

import axios from "axios"
import { useAuth } from "components/context/AuthContext"
import { useRouter } from "next/navigation"

interface Props {
    service : number
}
export default function ApplyBtn ({service} : Props) {
    const {authData} = useAuth()
    const router = useRouter()
    console.log(authData)
    async function handleApply () {
        const confirm = window.confirm('신청하시겠습니까?');
        if(!authData?.result) {alert('로그인을 해주시기 바랍니다.'); router.back()}
        if(!service) {alert('잘못된 접근입니다.'); router.back()}
        if(confirm) {
            // 신청 로직
            try {
                const response = await axios.post(`/api/service/apply` , {
                    user : authData?.users?.u_idx,
                    service : service
                })
                if(response?.data?.result === true) {
                    alert('신청이 완료되었습니다.');  router.push(`/search-service`)
                }
            }catch {
                alert('Server Error')
            }
        }else { return; }
    }
    return(
        <>
        <button 
            style={{
                position: 'absolute',
                right: '30px',
                bottom: '30px',
                backgroundColor: '#007bff', 
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer'
            }}
            onClick={handleApply}
        >
            신청하기
        </button>
        </>
    )
}