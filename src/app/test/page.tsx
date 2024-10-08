'use client'
import Summernote from "components/admin/Editor/summernote";
import { useState } from "react";

export default function Test () {
    const [data, setData] = useState<any>(null)
    function handleChanage () {

    }
    return(
        <>
        <Summernote
            initData={'ㅎㅎ'}
            setData={setData}
            onChange={handleChanage}
            name={'gg'}
        />
        </>
    )
}