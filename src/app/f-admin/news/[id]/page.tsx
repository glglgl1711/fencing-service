import NewsDetail from "components/admin/News/NewsDetail"

interface ParamsType {
    params : {
        id : string
    }
}
export default function NewsEdit ({params : {id}} : ParamsType) {

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