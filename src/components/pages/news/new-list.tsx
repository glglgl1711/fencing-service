'use client'

import axios from "axios"
import CalculateIndexNumber from "components/calculateIndex"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Props {
    data : NewsListType[]
    page : number
    keyword : string
    totalCount : number
}
export default function NewsListItem ({
    data , page , keyword , totalCount
} : Props) {
    const router = useRouter()

    const [list , setList] = useState<NewsListType[]>(data)

    useEffect(() => {
        async function List () {
            const response = await axios.get(`/api/news/getNews?page=${page || 1}&size=10&keyword=${keyword || ''}&column=news_date&order=desc`)
            if(response?.data?.result === true) {
                setList(response?.data?.news);
            }
        }
        List()
    }, [page , keyword])

    return(
        <>
        {list?.map((list:NewsListType , index : number) => {
            
            return(
            <tr 
                key={index} 
                style={{cursor : 'pointer'}} 
                onClick={()=>location.href = `/news/${list?.id}`}
            >
                <td>{CalculateIndexNumber(page , 10 , totalCount , index)}</td>
                <td>{list?.title}</td>
                <td>{list?.date}</td>
                <td>{list?.count}</td>
            </tr>
            )
        })}
        </>
    )
}