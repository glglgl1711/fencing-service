import ListFilterBox from "components/admin/ListFilterBox";
import ListSearchBox from "components/admin/ListSearchBox";
import ListSizeBox from "components/admin/ListSizeBox";

export default function AdminNews () {

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
                        <button className="blueBtn">신규작성</button>
                    </div>
                </div>
            </div>

            <div className="tableWrap">
                <div className="tableType_a">
                    <table>
                        <ListFilterBox

                        />
                        <tbody>
                            <tr style={{cursor : 'pointer'}}>
                                <td>
                                    <span className="readOnly">{1}</span>
                                </td>
                                <td>
                                    <span className="readOnly">{'aaaa'}</span>
                                </td>
                                <td>
                                    <span className="readOnly">{'1111'}</span>
                                </td>
                                <td>
                                    <span className="readOnly">{'1111'}</span>
                                </td>
                                <td>
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