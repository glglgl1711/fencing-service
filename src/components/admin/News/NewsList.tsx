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
interface DataType {
    id : number
    title : string
    date : string
    count : number
}
export default function NewsList ({
    page , size , keyword , column , order
} : Props) {
    const router = useRouter()
    const [data , setData] = useState<DataType[]>([])
    const [totalCount , setTotalCount] = useState<number>(0);
    async function getList () {
        try{
            const response = await axios.get(`/api/news/getNews?page=${page}&size=${size}&keyword=${keyword}&column=${column}&order=${order}`)
            if(response?.data?.result === true) {
                setData(response?.data?.news);
                setTotalCount(response?.data?.totalCount)
            }
        }catch{alert('Server Error')}
    }
    
    useEffect(()=> {
        getList()
    }, [page, keyword, size])
    return(
        <>
        <tbody>
            {data?.map((list:DataType, index : number) => {
                return(
                    <>
                    <tr key={index} style={{cursor : 'pointer'}}>
                        <td>
                            <span className="readOnly">{1}</span>
                        </td>
                        <td>
                            <span className="readOnly">{list?.title}</span>
                        </td>
                        <td>
                            <span className="readOnly">{list?.date}</span>
                        </td>
                        <td>
                            <span className="readOnly">{list?.count}</span>
                        </td>
                        <td>
                            <DeleteBtn
                                category={'news'}
                                id={list?.id}
                                refetch={getList}
                            />
                        </td>
                    </tr>
                    </>
                )
            })}
        </tbody>
        </>
    )
}