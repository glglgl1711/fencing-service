'use client'

import DropdownToggleLink from "components/reuseable/links/DropdownToggleLink"
import { useRouter } from "next/navigation"
interface Props {
    title : string,
    url : string
}
export default function HeaderItem ({title , url} : Props) {
    const router = useRouter()
    return(
        <>
        <li 
            className="nav-item dropdown"
            onClick={()=>router.push(url)}
        >
            <DropdownToggleLink title={title} className="nav-link fs-16" />
        </li>
        </>
    )
}