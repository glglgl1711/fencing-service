'use client'

import { usePathname, useRouter } from "next/navigation"

export default function AdminSideBar () {
    const router = useRouter()
    const pathname = usePathname()
    const splitPath = pathname?.split('/');
    return(
        <>
        {/* members. product. content. pr_video. certificate. inquiry. settings */}
        <aside>
            <h2>
                <img src="/img/no-images.jpg" alt="fencing"/>
            </h2>
            <ul className="mainMenu">

                <li className={splitPath[2] === 'member' ? 'content active' : 'content'}>
                    <span onClick={()=>router.push(`/f-admin/member`)}>회원관리</span>
                    {/* <ul className="subMenu">
                        <li className={splitPath[3]==='common-code-list' || splitPath[3]==='common-code'? 'active' : ''} onClick={()=>router.push(`/admin/common-code-management/common-code-list/`)}>
                            <span>회원관리</span>
                        </li>
                    </ul> */}
                </li>

                <li className={splitPath[2] === 'news' ? 'content active' : 'content'}>
                    <span onClick={()=>router.push(`/f-admin/news`)}>공지사항 관리</span>
                    {/* <ul className="subMenu">
                        <li className={splitPath[3]==='contents-list' || splitPath[3]==='contents'? 'active' : ''} onClick={()=>router.push(`/admin/contents-management/contents-list/`)}>
                            <span>공지사항 관리</span>
                        </li>
                    </ul> */}
                </li>

                <li className={splitPath[2] === 'photos' ? 'inquiry active' : 'inquiry'}>
                    <span onClick={()=>router.push(`/f-admin/photos`)}>사진첩 관리</span>
                    {/* <ul className="subMenu">
                        <li className={splitPath[3]==='inquiry-list' || splitPath[3]==='inquiry'? 'active' : ''} onClick={()=>router.push(`/admin/inquiry-management/inquiry-list/`)}>
                            <span>사진첩 관리</span>
                        </li>
                    </ul> */}
                </li>

                <li className={splitPath[2] === 'admin-account-management' ? 'settings active' : 'settings'}>
                    <span onClick={()=>router.push(`/admin/admin-account-management/admin-account-list/`)}>봉사 관리</span>
                    {/* <ul className="subMenu">
                        <li className={splitPath[3]==='admin-account-list' || splitPath[3]==='admin-account'? 'active' : ''} onClick={()=>router.push(`/admin/admin-account-management/admin-account-list/`)}>
                            <span>봉사 관리</span>
                        </li>
                    </ul> */}
                </li>
                
            </ul>
        </aside>
        </>
    )
}