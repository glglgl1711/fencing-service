'use client'
interface Props {
    preview : string
    setData : Function
    setPreview : Function
}
export default function SingleImageBox ({preview , setData , setPreview} : Props) {
    function handleChange (e:React.ChangeEvent<HTMLInputElement>) {
        const {files} :any = e.target;
        const reader = new FileReader()
        if(files[0]) {reader.readAsDataURL(files[0])}
        reader.onload = () => {
            setData((prev:any) => ({...prev, thumnail : files[0]}))
            setPreview(reader.result);
        }
    }
    return(
        <>
        <tr className="top">
            <th>썸네일 이미지 <span className="star">*</span></th>
            <td>
                {preview ? 
                <div className="imgUploadBox imgUploadBox_after">
                    <img src={preview} alt="thumbnail img"/>
                    <input type="file" onChange={handleChange} name='thumnail' id={`thumnail_1`}/>
                    <label htmlFor={`thumnail_1`} className="imgUploadBtn imgUploadBtn_after">
                        <i className="fa-light fa-upload"></i>
                        이미지 편집
                    </label>
                </div>
                :
                <div className="imgUploadBox imgUploadBox_before">
                    <input type="file" onChange={handleChange} name={'thumnail'} id={`thumnail_2`}/>
                    <label htmlFor={`thumnail_2`} className="imgUploadBtn imgUploadBtn_before">
                        <i className="fa-light fa-upload"></i>
                        이미지 업로드
                    </label>
                </div>
                }
            </td>
        </tr>
        </>
    )
}