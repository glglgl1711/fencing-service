'use client'

import { useRouter } from "next/navigation"
import AdminInputBox from "../Element/Inputbox"
import { useEffect, useState } from "react"
import AdminMultiDateBox from "../Element/MultiDatebox"
import AdminTimeInputBox from "../Element/TimeInput"
import AdminNumbericInputBox from "../Element/singleNumbericInputbox"
import axios from "axios"
import Summernote from "../Editor/summernote"
import ServiceUserList from "./ServiceUserList"
import Modal from 'react-modal';
interface Props {
    id : string
}
export default function ServiceDetail ({
    id
} : Props) {
    const router = useRouter()
    
    const [isModal , setModal] = useState<boolean>(false)
    function onClose () {setModal(false)}
    const [data, setData] = useState<any>({
        title : '', 
        applyDate1 : '', applyDate2 : '',
        serviceDate1 : '', serviceDate2 : '',
        serviceTime1 : '', serviceTime2 : '',
        registrar : '', agency : '', location : '', appliPeople : 0, recruitmentPeople : 0,
        managerName : '', managerPhone : '', managerEmail : '', contents : ''
    })
    
    async function Save () {
        const body = {
            id : parseInt(id),
            title : data?.title , 
            applyDate : `${data?.applyDate1} ~ ${data?.applyDate2}`,
            serviceDate : `${data?.serviceDate1} ~ ${data?.serviceDate2}`,
            serviceTime : `${data?.serviceTime1} ~ ${data?.serviceTime2}`,
            registrar : data?.registrar, agency : data?.agency , location : data?.location,
            appliPeople : parseInt(data?.appliPeople) , recruitmentPeople : parseInt(data?.recruitmentPeople),
            managerName : data?.managerName , managerPhone : data?.managerPhone , managerEmail : data?.managerEmail,
            contents : data?.contents
        }
        try {
            if(id === 'regist'){
                // 등록 모듈
                const response = await axios.post(`/api/service/regist`, body)
                if(response?.data?.result === true) {
                    alert('등록이 완료되었습니다.'); router.push('/f-admin/service')
                }else{ alert(response?.data?.msg) }
            }else{
                const response = await axios.post(`/api/service/edit`, body)
                if(response?.data?.result === true){
                    alert('수정이 완료되었습니다.'); router.back()
                }else{ alert(response?.data?.msg) }
            }
        }catch {
            alert('Server Error');
        }
    }
    
    useEffect(() => {
        async function Detail () {
            if(id) {
                const response = await axios.get(`/api/service/detail?id=${id}`)
                if(response?.data?.result === true) {
                    setData(response?.data?.service)
                }else{
                    alert('정보를 찾을 수 없습니다.'); router.push(`/f-admin/service`);
                }
            }
        }
        Detail()
    }, [id])
    return(
        <>
        <h3>봉사신청 관리</h3>
        <div className="flexBox">
            <div>
                <h4>{id === 'regist'? '봉사신청 신규등록' : '봉사신청 상세정보'}</h4>
            </div>
            <div className="btnBox">
                {id !== 'regist' && <button className="redBtn" onClick={()=>setModal(true)}>신청자 리스트</button>}
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
                        placeholder="제목을 입력해 주세요."
                        disable={false}
                    />
                    <AdminMultiDateBox
                        label={'모집기간'}
                        name1={'applyDate1'}
                        name2={'applyDate2'}
                        value1={data?.applyDate1}
                        value2={data?.applyDate2}
                        setData={setData}
                        disable={false}
                    />
                    <AdminMultiDateBox
                        label={'봉사기간'}
                        name1={'serviceDate1'}
                        name2={'serviceDate2'}
                        value1={data?.serviceDate1}
                        value2={data?.serviceDate2}
                        setData={setData}
                        disable={false}
                    />
                    <AdminInputBox
                        label={'등록기관'}
                        name={'registrar'}
                        value={data?.registrar}
                        setData={setData}
                        placeholder="등록기관을 입력해 주세요."
                        disable={false}
                    />
                    <AdminInputBox
                        label={'모집기관'}
                        name={'agency'}
                        value={data?.agency}
                        setData={setData}
                        placeholder="모집기관을 입력해 주세요."
                        disable={false}
                    />
                    <AdminInputBox
                        label={'활동지 주소'}
                        name={'location'}
                        value={data?.location}
                        setData={setData}
                        placeholder="주소를 입력해 주세요."
                        disable={false}
                    />
                    <AdminNumbericInputBox
                        label={'신청인원'}
                        name={'appliPeople'}
                        value={data?.appliPeople}
                        setData={setData}
                        placeholder="명 수를 입력해 주세요."
                        disable={true}
                    />
                    <AdminNumbericInputBox
                        label={'모집인원'}
                        name={'recruitmentPeople'}
                        value={data?.recruitmentPeople}
                        setData={setData}
                        placeholder="명 수를 입력해 주세요."
                        disable={false}
                    />
                    <AdminInputBox
                        label={'담당자 성명'}
                        name={'managerName'}
                        value={data?.managerName}
                        setData={setData}
                        placeholder="담담자명을 입력해 주세요."
                        disable={false}
                    />
                    <AdminInputBox
                        label={'담당자 연락처'}
                        name={'managerPhone'}
                        value={data?.managerPhone}
                        setData={setData}
                        placeholder="담당자 연락처를 입력해 주세요."
                        disable={false}
                    />
                    <AdminInputBox
                        label={'담당자 이메일'}
                        name={'managerEmail'}
                        value={data?.managerEmail}
                        setData={setData}
                        placeholder="담당자 이메일을 입력해 주세요."
                        disable={false}
                    />
                    <AdminTimeInputBox
                        label={'봉시시간'}
                        name1={'serviceTime1'}
                        name2={'serviceTime2'}
                        value1={data?.serviceTime1}
                        value2={data?.serviceTime2}
                        setData={setData}
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
                            {id === 'regist' ?
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
        {isModal && 

        <ServiceUserList
            serviceId={id}
            onRequestClose={onClose}
        />}

        </>
    )
}