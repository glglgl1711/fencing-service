import ServiceDetail from "components/admin/Service/ServiceDetail";
interface ParamsType {
    params : {id : string}
}
export default function ServiceEdit ({
    params : {id}
} : ParamsType) {

    return(
        <>
        <div className="contentBox add">
            <ServiceDetail
                id={id}
            />
            
        </div>
        </>
    )
}