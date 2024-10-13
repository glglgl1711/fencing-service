'use client'

import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
interface DataType {
    id : number , name : string , birth : string,
    phone : string , status : string, gender : string
}
interface Props {
    page : number
    size : number
    keyword : string
    column : string
    order : string
}
export default function MemberList ({
    page , size , keyword , column , order
} : Props) {
    const router = useRouter()
    const [data , setData] = useState<DataType[]>([])
    const [totalCount , setTotalCount] = useState<number>(0)
    async function getList () {
        const response = await axios.get(`/api/user/getUserList?page=${page}&size=${size}&keyword=${keyword}&column=u_date&order=desc`)
        if(response?.data?.result === true){
            setData(response?.data?.users);
            setTotalCount(response?.data?.totalCount)
        }
    }
    function handlePage (id : number) {
        router.push(`/f-admin/member/${id}`)
    }
    useEffect(()=>{ getList() }, [size , keyword])

    return(
        <>
        {data?.map((list:DataType, index:number) => {
            return(
            <tr 
                key={index}
                style={{cursor : 'pointer'}}
            >
                <td onClick={()=>handlePage(list?.id)}>
                    <span className="readOnly">{1}</span>
                </td>
                <td onClick={()=>handlePage(list?.id)}>
                    <span className="readOnly">{list?.name}</span>
                </td>
                <td onClick={()=>handlePage(list?.id)}>
                    <span className="readOnly">{list?.gender ? list?.gender : '-'}</span>
                </td>
                <td onClick={()=>handlePage(list?.id)}>
                    <span className="readOnly">{list?.birth}</span>
                </td>
                <td onClick={()=>handlePage(list?.id)}>
                    <span className="readOnly">{list?.phone}</span>
                </td>
                <td style={{width : '10%'}}>
                    <div className="toggleSwitchBox">
                        <span className="toggleSwitch">
                            <input 
                            type="checkbox" 
                            // id={`commoncode_${list?.codeId}`}
                            className="toggleIpt"
                            checked={list?.status === 'Y'}
                            // onChange={()=>statusChange(list?.codeId, list?.activeStatus)}
                            hidden
                            />
                            <label
                            // htmlFor={`commoncode_${list?.codeId}`} 
                            className="toggleSwitch"
                            >
                                <span className="toggleButton"></span>
                            </label>
                        </span>
                    </div>
                </td>
            </tr>
            )
        })}
        </>
    )
}