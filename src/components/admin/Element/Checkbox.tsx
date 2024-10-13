
export default function AdminChechBox () {

    return(
        <>
        <tr>
            <th>우선 공지</th>
            <td>
                <div className="checkBox">
                    <input type="checkbox"/>
                    <label htmlFor="prirorityNews">우선공지</label>
                </div>
            </td>
        </tr>
        </>
    )
}