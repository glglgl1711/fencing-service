'use client'
import { usePathname, useRouter } from "next/navigation"
import AdminSideBar from "./Sidebar"
import { useEffect } from "react"
interface Props {
    // isLogin : boolean
}
export default function AdminContainer ({children} : any) {
    const router = useRouter()
    const pathname = usePathname()
    const splitPath = pathname.split('/')

    // useEffect(() => {
    //     if(isLogin) {
    //         if(splitPath[1] === 'f-admin' && !splitPath[2]){
    //             router.push(`/f-admin/member`)
    //         }else { return; }
    //     }else{
    //         if(splitPath[1] === 'f-admin' && splitPath[2]) {
    //             alert('관리자 로그인이 필요합니다.');
    //             router.push('/f-admin');
    //         }else {
    //             return;
    //         }
    //     }
    // }, [isLogin])
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