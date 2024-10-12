'use client'

import { SessionProvider } from "next-auth/react"
import { useEffect } from "react"
import { useAuth } from "./context/AuthContext"
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
    const {login} = useAuth()
    useEffect(() => {
        if(auth?.result === true) {
            login(auth)
        }
    }, [auth])
    return(
        <>
        <SessionProvider>
            {children}
        </SessionProvider>
        </>
    )
}