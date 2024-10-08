'use client'

import { SessionProvider } from "next-auth/react"

export default function Container ({children} : any) {

    return(
        <>
        <SessionProvider>
            {children}
        </SessionProvider>
        </>
    )
}