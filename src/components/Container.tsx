'use client'

import { SessionProvider } from "next-auth/react"
import { useEffect } from "react"
import { useAuth } from "./context/AuthContext"
import { ToastContainer } from "react-toastify"
import { motion, AnimatePresence } from "framer-motion"
import 'react-toastify/dist/ReactToastify.css';
import { usePathname } from "next/navigation"
interface AuthType {
    result : boolean,
    users : {
      u_idx : number, name : string, phone : string,
      address : string, birth : string, email : string
    }
  }
interface Props {
    auth : AuthType
}
export default function Container ({children, auth} : any) {
    const pathname = usePathname()
    const {login} = useAuth()
    useEffect(() => {
        if(auth?.result === true) {
            login(auth)
        }
    }, [auth])
    return(
        <>
        <SessionProvider>
            
                <ToastContainer
                    stacked
                />
                    {children}
            
        </SessionProvider>
        </>
    )
}