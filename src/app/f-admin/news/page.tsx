import ListFilterBox from "components/admin/ListFilterBox";
import ListSearchBox from "components/admin/ListSearchBox";
import ListSizeBox from "components/admin/ListSizeBox";
import NewsList from "components/admin/News/NewsList";
import RegistBtn from "components/admin/RegistBtn";

export default function AdminNews ({searchParams : {
    page , size , keyword , column , order
}} : SearchParamsType) {

    return(
        <>
        <div className="contentBox whistleBlow">
            <div className="flexBox">
                <div>
                    <h4>공지사항관리</h4>
                </div>
            </div>
            <div className="toolBox">
                <div className="left">
                    <ListSizeBox
                        size={25}
                    />
                </div>

                <div className="right">
                    <ListSearchBox
                        keyword={''}
                    />
                    <div className="btnBox">
                        <RegistBtn url={'news'}/>
                    </div>
                </div>
            </div>

            <div className="tableWrap">
                <div className="tableType_a">
                    <table>
                        <ListFilterBox

                        />
                        <NewsList
                            page={page || 1}
                            size={size || 25}
                            keyword={keyword || ''}
                            column={column || 'news_date'}
                            order={order || 'desc'}
                        />
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}