'use client'

import { useRouter } from "next/navigation"
import AdminInputBox from "../Element/Inputbox"
import { useState } from "react"
import AdminMultiDateBox from "../Element/MultiDatebox"
import AdminTimeInputBox from "../Element/TimeInput"
import AdminNumbericInputBox from "../Element/singleNumbericInputbox"
import axios from "axios"
import Summernote from "../Editor/summernote"

interface Props {
    id : string
}
export default function ServiceDetail ({
    id
} : Props) {
    const router = useRouter()
    const [splitData , setSplitData] = useState<any>({
        applyDate1 : '', applyDate2 : '',
        serviceDate1 : '', serviceDate2 : '',
        serviceTime1 : '', serviceTime2 : ''
    })
    const [data, setData] = useState<any>({
        title : '', 
        applyDate: `${splitData?.applyDate1} ~ ${splitData?.applyDate2}`, 
        serviceDate: `${splitData?.serviceDate1} ~ ${splitData?.serviceDate2}`,
        registar : '', agency : '', location : '', appliPeople : 0, recruitmentPeople : 0,
        serviceTime: `${splitData?.serviceTime1} ~ ${splitData?.serviceTime2}`, 
        managerName : '', managerPhone : '', managerEmail : '', contents : 'test'
    })
    async function Save () {
        try {
            // 등록 모듈
            const response = await axios.post(`/api/service/regist`, data)
        }catch {
            alert('Server Error');
        }
    }
    return(
        <>
        <h3>봉사신청 관리</h3>
        <div className="flexBox">
            <div>
                <h4>{id === 'regist'? '봉사신청 신규등록' : '봉사신청 상세정보'}</h4>
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
                        placeholder="제목을 입력해 주세요."
                        disable={false}
                    />
                    <AdminMultiDateBox
                        label={'모집기간'}
                        name1={'applyDate1'}
                        name2={'applyDate2'}
                        value1={splitData?.applyDate1}
                        value2={splitData?.applyDate2}
                        setData={setSplitData}
                        disable={false}
                    />
                    <AdminMultiDateBox
                        label={'봉사기간'}
                        name1={'serviceDate1'}
                        name2={'serviceDate2'}
                        value1={splitData?.serviceDate1}
                        value2={splitData?.serviceDate2}
                        setData={setSplitData}
                        disable={false}
                    />
                    <AdminInputBox
                        label={'등록기관'}
                        name={'registar'}
                        value={data?.registar}
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
                        value1={splitData?.serviceTime1}
                        value2={splitData?.serviceTime2}
                        setData={setSplitData}
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