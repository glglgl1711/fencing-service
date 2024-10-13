import MemberDetail from "components/admin/Member/MemberDetail";
import { useState } from "react";
interface Paramstype {
    params : {
        id : string
    }
}
export default function MemberEdit ({params : {id}} : Paramstype) {
    
    return(
        <>
        <div className="contentBox add">
            <MemberDetail
                id={id}
            />
        </div>
        </>
    )
}