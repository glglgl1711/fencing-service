import axios from "axios";
import ListFilterBox from "components/admin/ListFilterBox";
import ListSearchBox from "components/admin/ListSearchBox";
import ListSizeBox from "components/admin/ListSizeBox";
import PhotoList from "components/admin/Photo/PhotoList";
import RegistBtn from "components/admin/RegistBtn";

export default async function AdminPhotos ({searchParams : {
    page , size , keyword , column , order
}} : SearchParamsType) {
    
    return(
        <>
        <div className="contentBox content_management">
            {/* <h3>회원관리</h3> */}
            <div className="flexBox">
                <div>
                    <h4>사진첩관리</h4>
                </div>
            </div>
            <div className="toolBox">
                <div className="left">
                    <ListSizeBox
                        size={size}
                    />
                </div>

                <div className="right">
                    <div className="btnBox">
                    </div>
                    <ListSearchBox
                        keyword={keyword}
                    />
                    <div className="btnBox">
                        <RegistBtn url={'photos'}/>
                    </div>
                </div>
            </div>

            <div className="tableWrap">
                <div className="tableType_a thumb">
                    <table>
                        <ListFilterBox

                        />
                        <PhotoList
                            page={page || 1}
                            size={size || 25}
                            keyword={keyword || ''}
                            column={column || 'gallery_date'}
                            order={order || 'DESC'}
                        />
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}