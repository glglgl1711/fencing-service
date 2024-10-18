'use client'

import { useRouter } from "next/navigation"
interface Props { url : string }
export default function RegistBtn ({ url } : Props) {
    const router = useRouter()
    return <><button className="blueBtn" onClick={()=>router.push(`/f-admin/${url}/regist`)}>신규작성</button></>
}