'use client'

import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import DeleteBtn from "../Function/DeleteBtn"

interface Props {
    page : number
    size : number
    keyword : string
    column : string
    order : string
}

export default function ServiceList ({
    page , size , keyword , order , column
} : Props) {
    
    const router = useRouter()

    const [data, setData] = useState<ServiceListDataType[]>([])
    const [totalCount , setTotalCount] = useState<number>(0)

    async function getList () {
        try {
            const response = await axios.get(`/api/service/getService?page=${page}&size=${size}&keyword=${keyword}&column=${column}&order=${order}`)
            if(response?.data?.result === true) {
                setData(response?.data?.service); setTotalCount(response?.data?.totalCount)
            }
        }catch {
            alert('Server Error')
        }
    }

    async function ChangeStatus (id : number , status : string){
        const confirm = window.confirm(status === 'Y' ? '모집 마감으로 변경하시겠습니까?' : '모집 중으로 변경하시겠습니까?');
        if(confirm){
            try{
                const response = await axios.post('/api/service/status' , {id : id , status : status === 'Y' ? 'N' : 'Y'})
                if(response?.data?.result === true) {getList()}
                else {alert(response?.data?.msg)}
            }catch {alert('Server Error')}
        }
    }
    useEffect(() => {
        getList()
    }, [page, size, keyword])
    return(
        <>
        <tbody>
            {data?.map((list:ServiceListDataType, index:number) => {
                return(
                <tr key={index} style={{cursor : 'pointer'}}>
                    <td style={{width : '5%'}} onClick={()=>router.push(`/f-admin/service/${list?.id}`)}>
                        <span className="readOnly">{1}</span>
                    </td>
                    <td onClick={()=>router.push(`/f-admin/service/${list?.id}`)}>
                        <span className="readOnly">{list?.title}</span>
                    </td>
                    <td style={{width : '15%'}} onClick={()=>router.push(`/f-admin/service/${list?.id}`)}>
                        <span className="readOnly">{list?.agency}</span>
                    </td>
                    <td style={{width : '15%'}} onClick={()=>router.push(`/f-admin/service/${list?.id}`)}>
                        <span className="readOnly">{list?.registrar}</span>
                    </td>
                    <td style={{width : '10%'}} onClick={()=>router.push(`/f-admin/service/${list?.id}`)}>
                        <span className="readOnly">{list?.status === 'Y' ? '모집 중' : '마감'}</span>
                    </td>
                    <td style={{width : '10%'}} onClick={()=>router.push(`/f-admin/service/${list?.id}`)}>
                        <span className="readOnly">{list?.date}</span>
                    </td>
                    <td style={{width : '10%'}}>
                        <div className="toggleSwitchBox">
                            <span className="toggleSwitch">
                                <input 
                                type="checkbox" 
                                id={`service_${list?.id}`}
                                className="toggleIpt"
                                checked={list?.status==='Y'}
                                onChange={()=>ChangeStatus(list?.id , list?.status)}
                                hidden
                                />
                                <label
                                htmlFor={`service_${list?.id}`} 
                                className="toggleSwitch"
                                >
                                    <span className="toggleButton"></span>
                                </label>
                            </span>
                        </div>
                    </td>
                    {/* <td style={{width : '5%'}}>
                        <DeleteBtn id={list?.id} category={'service'} refetch={getList}/>
                    </td> */}
                </tr>
                )
            })}
        </tbody>
        </>
    )
}