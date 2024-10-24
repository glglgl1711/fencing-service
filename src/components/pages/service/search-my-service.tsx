'use client'
interface Props { data : MyServiceListType[] }
export default function SearchMyService ({data} : Props) {

    return(
        <>
        <table className="table table-bordered" style={{marginBottom : '70px'}}>
            <thead>
                <tr>
                <th scope="col" style={{ width: "10%" }}>No.</th>
                <th scope="col" style={{ width: "55%" }}>봉 사 활 동 명</th>
                <th scope="col" style={{ width: "20%" }}>신 청 일 자</th>
                <th scope="col" style={{ width: "15%" }}>상 태</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((list:MyServiceListType, index:number) => {
                    return(
                    <tr key={index} style={{cursor : 'pointer'}}>
                        <td>1</td>
                        <td>{list?.title}</td>
                        <td>{list?.date}</td>
                        {list?.status === 'N' && <td style={{color : 'gray'}}>참여(전)</td>}
                        {list?.status === 'Y' && <td style={{color : 'blue'}}><strong>참여(완)</strong></td>}
                        {list?.status === 'F' && <td style={{color : 'red'}}><strong>불참</strong></td>}
                    </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}