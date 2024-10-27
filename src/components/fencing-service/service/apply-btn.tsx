'use client'

import axios from "axios"
import { useAuth } from "components/context/AuthContext"
import { useRouter } from "next/navigation"
import Swal from 'sweetalert2';

interface Props {
    service : number
    isApply : string
    status : string
}
export default function ApplyBtn ({service , isApply , status} : Props) {
    const {authData} = useAuth()
    const router = useRouter()
    async function handleApply () {
        if(!authData?.result) {alert('로그인을 해주시기 바랍니다.'); router.back()}
        if(!service) {alert('잘못된 접근입니다.'); router.back()}
        Swal.fire({
            text : '신청하시겠습니까?',
            icon : 'question',
            confirmButtonText : '신청',
            showCancelButton : true,
            cancelButtonText : '닫기'
        }).then(async (result) => {
            if(result.isConfirmed){
                try {
                    const response = await axios.post(`/api/service/apply` , {
                        user : authData?.users?.u_idx,
                        service : service
                    })
                    if(response?.data?.result === true) {
                        Swal.fire({
                            text : '신청이 완료되었습니다.',
                            icon : 'success',
                            confirmButtonText : '확인'
                        }).then((result) => {
                            if(result.isConfirmed) {
                                location.href = '/my-service';
                            }
                        }); 
                    }else{ 
                        alert(response?.data?.msg)
                    }
                }catch {
                    alert('Server Error')
                } 
            }
        })
    }
    async function handleCancel () {
        Swal.fire({
            text : '신청 취소하시겠습니까??',
            icon : 'question',
            confirmButtonText : '신청취소',
            showCancelButton : true,
            cancelButtonText : '닫기'
        }).then(async (result) => {
            if(result?.isConfirmed){
                try {
                    const response = await axios.post(`/api/service/apply-cancel` , {
                        user : authData?.users?.u_idx , 
                        service : service
                    })
                    if(response?.data?.result === true) {
                        Swal.fire({
                            text : '신청이 취소되었습니다.',
                            icon : 'success',
                            confirmButtonText : '확인'
                        }).then((result) => {
                            if(result.isConfirmed){ location.href = '/service' }
                        })
                    }else{
                        alert(response?.data?.msg)
                    }
                }catch { alert('Server Error') }
            }
        })
    }
    return(
        <>
        {status === 'Y' ? 
        <>
        {isApply === 'Y' ? 
        <button 
            style={{
                position: 'absolute',
                right: '30px',
                bottom: '30px',
                backgroundColor: '#ff0707', 
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer'
            }}
            onClick={handleCancel}
        >
            신청취소하기
        </button>
        :
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
        }
        </>
        :
        <button 
            style={{
                position: 'absolute',
                right: '30px',
                bottom: '30px',
                backgroundColor: 'gray', 
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer'
            }}
            disabled
            onClick={handleApply}
        >
            신청 마감
        </button>
        }
        
        </>
    )
}