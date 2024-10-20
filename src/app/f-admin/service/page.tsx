import ListFilterBox from "components/admin/ListFilterBox";
import ListSearchBox from "components/admin/ListSearchBox";
import ListSizeBox from "components/admin/ListSizeBox";
import ServiceList from "components/admin/Service/ServiceList";

export default function AdminService () {

    return(
        <>
        <div className="contentBox whistleBlow">
            {/* <h3>회원관리</h3> */}
            <div className="flexBox">
                <div>
                    <h4>봉사신청관리</h4>
                </div>
            </div>
            <div className="toolBox">
                <div className="left">
                    {/* <ListSizeBox
                        size={25}
                    /> */}
                </div>

                <div className="right">
                    <div className="btnBox">
                    </div>
                    {/* <ListSearchBox
                        keyword={''}
                    /> */}
                </div>
            </div>

            <div className="tableWrap">
                <div className="tableType_a">
                    <table>
                        <ListFilterBox

                        />

                        <ServiceList

                        />
                        
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}