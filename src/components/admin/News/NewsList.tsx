'use client'

import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import DeleteBtn from "../Function/DeleteBtn"
import Paginate from "components/Pagination/pagination"
import ListFilterBox from "../ListFilterBox"

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
        <div className="tableWrap">
                <div className="tableType_a">
                    <table>
                    <ListFilterBox

                    />
                    <tbody>
                        {data?.map((list:DataType, index : number) => {
                            const lastIndex = totalCount - (page - 1) * size;
                            const indexNumber = lastIndex - index;
                            return(
                                <tr key={list?.id} style={trStyle}>
                                    <td width={'5%'} style={tdStyle} onClick={()=>router.push(`/f-admin/news/${list?.id}`)}>
                                        <span className="readOnly">{indexNumber}</span>
                                    </td>
                                    <td style={tdStyle} onClick={()=>router.push(`/f-admin/news/${list?.id}`)}>
                                        <span className="readOnly">{list?.title}</span>
                                    </td>
                                    <td width={'15%'} style={tdStyle} onClick={()=>router.push(`/f-admin/news/${list?.id}`)}>
                                        <span className="readOnly">{list?.date}</span>
                                    </td>
                                    <td width={'10%'} style={tdStyle} onClick={()=>router.push(`/f-admin/news/${list?.id}`)}>
                                        <span className="readOnly">{list?.count}</span>
                                    </td>
                                    <td width={'5%'} style={tdStyle}>
                                        <DeleteBtn
                                            category={'news'}
                                            id={list?.id}
                                            refetch={getList}
                                        />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        <div className="pagerBox">
            <Paginate
                page={page} size={size} totalCount={totalCount}
            />
        </div>
        </>
    )
}

// 테이블 데이터 셀 스타일
const tdStyle : any = {
    border: 'none', // 셀 경계선을 완전히 제거
    padding: '12px 15px',
    textAlign: 'center',
    cursor : 'pointer'
};

// 테이블 행 스타일
const trStyle : any = {
    borderBottom: '1px solid #ddd', // 각 행 사이에 얇은 경계선 추가 (필요할 경우)  
};