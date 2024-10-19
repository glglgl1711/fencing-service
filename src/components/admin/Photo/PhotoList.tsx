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
    order:  string
}
interface DataType {
    id : number
    title : string
    date : string
    count : number
    thumnail : string
}
export default function PhotoList ({
    page , size , keyword , column , order
} : Props) {
    const router = useRouter()

    const [data, setData] = useState<DataType[]>([])

    const [totalCount , setTotalCount] = useState<number>(0)

    async function getList () {
        const response = await axios.get(`/api/photo/getPhotos?page=${page || 1}&size=${size || 25}&keyword=${keyword || ''}&column=gallery_date&order=desc`)
        if(response?.data?.result === true) {
            setData(response?.data?.photos); setTotalCount(response?.data?.totalCount)
        }
    }

    useEffect(() => {
        getList()
    }, [page, size , keyword])
    return (
        <tbody>
            {data?.map((list:DataType , index : number) => {
                return(
                <tr key={index} style={{cursor : 'pointer'}}>
                    <td onClick={()=>router.push(`/f-admin/photos/${list?.id}`)}>
                        <span className="readOnly">{1}</span>
                    </td>
                    <td onClick={()=>router.push(`/f-admin/photos/${list?.id}`)}>
                        <div className="imgBox">
                            <img src={list?.thumnail}alt="thumbmail"/>
                        </div>
                    </td>
                    <td onClick={()=>router.push(`/f-admin/photos/${list?.id}`)}>
                        <span className="readOnly">{list?.title}</span>
                    </td>
                    <td onClick={()=>router.push(`/f-admin/photos/${list?.id}`)} style={{width : '15%'}}>
                        <span className="readOnly">{list?.date}</span>
                    </td>
                    <td onClick={()=>router.push(`/f-admin/photos/${list?.id}`)} style={{width : '10%'}}>
                        <span className="readOnly">{list?.count}</span>
                    </td>
                    <td style={{width : '10%'}}>
                        <DeleteBtn
                            category={'photo'}
                            id={list?.id}
                            refetch={getList}
                        />
                    </td>
                </tr>
                )
            })}
        </tbody>
    )
}