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
                <tr key={index} style={trStyle}>
                    <td width={'5%'} style={tdStyle} onClick={()=>router.push(`/f-admin/photos/${list?.id}`)}>
                        <span className="readOnly">{1}</span>
                    </td>
                    <td width={'20%'} style={tdStyle} onClick={()=>router.push(`/f-admin/photos/${list?.id}`)}>
                        <div className="imgBox"  >
                            <img style={{alignContent : 'center'}} src={list?.thumnail}alt="thumbmail"/>
                        </div>
                    </td>
                    <td style={tdStyle} onClick={()=>router.push(`/f-admin/photos/${list?.id}`)}>
                        <span className="readOnly">{list?.title}</span>
                    </td>
                    <td  width={'15%'} style={tdStyle} onClick={()=>router.push(`/f-admin/photos/${list?.id}`)}>
                        <span className="readOnly">{list?.date}</span>
                    </td>
                    <td width={'10%'} style={tdStyle} onClick={()=>router.push(`/f-admin/photos/${list?.id}`)}>
                        <span className="readOnly">{list?.count}</span>
                    </td>
                    <td width={'5%'} style={tdStyle}>
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

// 이미지 박스 스타일
const x: any = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px', // 이미지 박스의 높이 설정 (필요에 따라 조정)
};

// 이미지 스타일
const imgStyle: any = {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain' // 이미지가 박스 크기에 맞게 조정되도록 함
};