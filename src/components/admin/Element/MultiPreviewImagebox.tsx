'use client'
interface Props {
    preview : string[]
    setData : Function
    setPreview : Function
}
export default function PreviewImageBox ({ preview , setData , setPreview} : Props) {
    function removeImg (index:number) {
        // 미리보기 배열에서 제거
        setPreview((prev : any) => prev.filter((_ : any, i : any) => i !== index));
        // 파일 데이터 배열에서 제거
        setData((prev:any) => ({
            ...prev , image : prev.image.filter((_ : any, i : any) => i !== index)
        }));
    }
    return(
        <>
        <tr className="top">
            <th>업로드된 이미지<span className="star"></span></th>
            <td>
                <div className="flexBox" style={{display : 'flex', flexWrap : 'wrap', gap : '10px'}}>
                    {/* 업로드 된 이미지 박스 */}
                    {preview?.map((img : string, index:number) => (
                    <div key={index}>
                        <div className="imgUploadBox imgUploadBox_after">
                            <img src={img} alt="thumbnail img"/>
                            <button 
                                className="closeBtn"
                                onClick={()=>removeImg(index)}
                            >X</button>
                        </div>
                    </div>
                    ))}
                </div>
            </td>
        </tr>
        </>
    )
}