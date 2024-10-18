import ListFilterBox from "components/admin/ListFilterBox";
import ListSearchBox from "components/admin/ListSearchBox";
import ListSizeBox from "components/admin/ListSizeBox";
import RegistBtn from "components/admin/RegistBtn";

export default function AdminPhotos () {

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
                        size={25}
                    />
                </div>

                <div className="right">
                    <div className="btnBox">
                    </div>
                    <ListSearchBox
                        keyword={''}
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
                        <tbody>
                            <tr style={{cursor : 'pointer'}}>
                                <td>
                                    <span className="readOnly">{1}</span>
                                </td>
                                <td>
                                    <div className="imgBox">
                                        <img src={'/img/no-images.jpg'}alt="thumbmail"/>
                                    </div>
                                </td>
                                <td>
                                    <span className="readOnly">{'1111'}</span>
                                </td>
                                <td style={{width : '15%'}}>
                                    <span className="readOnly">{'1111'}</span>
                                </td>
                                <td style={{width : '10%'}}>
                                    <span className="readOnly">{'1111'}</span>
                                </td>
                                <td style={{width : '10%'}}>
                                    <button>삭제</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}