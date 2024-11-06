import ListFilterBox from "components/admin/ListFilterBox";
import ListSearchBox from "components/admin/ListSearchBox";
import ListSizeBox from "components/admin/ListSizeBox";
import MemberList from "components/admin/Member/MemberList";

export default function AdminMember ({ searchParams : {
    page , size , keyword , column , order
}} : SearchParamsType) {

    return(
        <>
        <div className="contentBox whistleBlow">
            {/* <h3>회원관리</h3> */}
            <div className="flexBox">
                <div>
                    <h4>회원관리</h4>
                </div>
            </div>
            <div className="toolBox">
                <div className="left">
                    <ListSizeBox
                        size={size || 25}
                    />
                </div>

                <div className="right">
                    <div className="btnBox">
                    </div>
                    <ListSearchBox
                        keyword={keyword || ''}
                    />
                </div>
            </div>

            
            <MemberList
                page={page || 1}
                size={size || 25}
                keyword={keyword || ''}
                column={column || 'u_date'}
                order={order || 'desc'}
            />
                        
        </div>
        </>
    )
}