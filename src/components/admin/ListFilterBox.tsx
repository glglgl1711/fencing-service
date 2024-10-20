'use client'

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface Props {
    order?:string
    column?:string
}

export default function ListFilterBox ({
    order , column
} : Props) {
    const pathname = usePathname()
    const splitPath = pathname?.split('/')[2];
    const [filter , setFilter] = useState<ListFilterType[]>([])
    useEffect(() => {
        switch (splitPath){
            case 'member' : setFilter(MemberFilter); break;
            case 'news' : setFilter(NewsFilter); break;
            case 'photos' : setFilter(PhotoFilter); break;
            case 'service' : setFilter(ServiceFilter); break;
        }
    }, [pathname])
    return(
        <>
        <thead>
            <tr>
                <th>No.</th>
                {filter?.map((filter : ListFilterType, index:number) => (
                <th key={index}>
                    <span className="sortWrap">
                        {filter?.title}
                        {/* <spanclassName={'sort'}></span> */}
                        <span className=""></span>
                    </span>
                </th>
                ))}
            </tr>
        </thead>
        </>
    )
}

export const MemberFilter = [
    {idx : 1, title : '회원명' , column : 'name'},
    {idx : 2, title : '성별' , column : 'gender'},
    {idx : 3, title : '생년월일' , column : 'birth'},
    {idx : 4, title : '전화번호' , column : 'phone'},
    {idx : 5, title : '활성/비활성' , column : ''},
]

export const NewsFilter = [
    {idx : 1, title : '제목', column : 'title'},
    {idx : 2, title : '등록일자', column : 'date'},
    {idx : 3, title : '조회수', column : 'count'},
    {idx : 4, title : '', column : ''}
]

export const PhotoFilter = [
    {idx : 1, title : '대표이미지', column : 'image'},
    {idx : 2, title : '제목', column : 'title'},
    {idx : 3, title : '등록일자', column : 'date'},
    {idx : 4, title : '조회수', column : 'count'},
    {idx : 5, title : '', column : ''}
]

export const ServiceFilter = [
    {idx : 1, title : '제목', column : 'title'},
    {idx : 1, title : '모집기관', column : ''},
    {idx : 1, title : '등록기관', column : ''},
    {idx : 1, title : '모집구분', column : ''},
    {idx : 1, title : '등록일자', column : 'date'},
    {idx : 1, title : '모집수정', column : ''},
    {idx : 1, title : '', column : ''},
]