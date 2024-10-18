'use client'
import { usePathname } from "next/navigation"
import AdminSideBar from "./Sidebar"

export default function AdminContainer ({children} : any) {
    const pathname = usePathname()
    const splitPath = pathname.split('/')
    return (
        <>
        <div className="admin_wrap">
            {splitPath[2] && <AdminSideBar/>}
            <div className="dotsContentWrap">
                {children}
            </div>
        </div>
        </>
    )
}