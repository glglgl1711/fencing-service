import axios from "axios"
import NewsDetail from "components/admin/News/NewsDetail"
import { decodeId } from "components/Buffer"

interface ParamsType {
    params : {
        id : string
    }
}
export default async function NewsEdit ({params : {id}} : ParamsType) {
    const response = await axios.get(`http://localhost:3000/api/news/detail?id=${decodeId(id)}`)
    const data = response?.data?.result === true ? response?.data?.news : [];
    return(
        <>
        <div className="contentBox add">
            <NewsDetail
                id={id}
                initData={data}
            />
        </div>
        </>
    )
}