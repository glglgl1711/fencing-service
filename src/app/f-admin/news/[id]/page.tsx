import axios from "axios"
import NewsDetail from "components/admin/News/NewsDetail"

interface ParamsType {
    params : {
        id : string
    }
}
export default async function NewsEdit ({params : {id}} : ParamsType) {
    
    return(
        <>
        <div className="contentBox add">
            <NewsDetail
                id={id}
            />
        </div>
        </>
    )
}