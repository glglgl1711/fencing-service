'use client'

import { useAuth } from "components/context/AuthContext"
import { signOut } from "next-auth/react"
import Cookies from 'js-cookie'

export default function LogoutForms () {
    const {logout} = useAuth()
    async function Logout () {
        await signOut();
        logout(null);
        Cookies.remove('f_ssid', {path : '/'})
    }
    return(
        <>
        <button className="dropdown-item"
            onClick={()=>Logout()}
        >
            로그아웃
        </button>
        </>
    )
}