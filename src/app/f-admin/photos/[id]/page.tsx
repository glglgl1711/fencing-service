import PhotoDetail from "components/admin/Photo/PhotoDetail";
interface ParamsType {
    params : {id : string}
}
export default function PhotoEdit ({params : {id}} : ParamsType) {
    
    return(
        <>
            <div className="contentBox add">
                <PhotoDetail
                    id={id}
                />
            </div>
        </>
    )
}