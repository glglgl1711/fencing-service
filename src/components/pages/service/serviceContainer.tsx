'use client'

import { useEffect } from "react"

interface Props {
    data : any
}
export default function ServiceContainer ({data} : Props) {
    useEffect(()=> {
        if(!data){location.href = '/service'}
    }, [data])
    return(<></>)
}