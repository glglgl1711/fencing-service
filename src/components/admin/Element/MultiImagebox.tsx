'use client'
interface Props {
    name : string
    setData : Function
    setPreview : Function
}
export default function AdminImageBox ({
    name , setData , setPreview
} : Props) {
    function handleChange (e:React.ChangeEvent<HTMLInputElement>) {
        const { name , files } : any = e.target;
        // file list 를 배열로 변환
        const fileArray = Array.from(files)
        const newFiles : File[] = [];
        const newPreview : string[] = [];

        fileArray.forEach((file : any) => {
            const reader : any = new FileReader()
            reader.readAsDataURL(file);
            reader.onload = () => {
                newFiles.push(file)
                newPreview.push(reader.result)

                if(newPreview.length === fileArray.length) {
                    setData((prev:any) => ({ ...prev,
                        [name] : [...prev[name] , ...newFiles],
                    }))
                    setPreview((prev : any) => [...prev, ...newPreview]);
                }
            }
        })
    }
    return(
        <>
        <tr className="top">
            <th>사진첩 이미지들 <span className="star">*</span></th>
            <td>
                <div className="flexBox">
                    <div>
                        <div className="imgUploadBox imgUploadBox_before">
                            <input 
                                type="file" 
                                name="image"  
                                id="image"
                                onChange={handleChange}
                                multiple
                            />
                            <label htmlFor="image" className="imgUploadBtn imgUploadBtn_before">
                                <i className="fa-light fa-upload"></i>
                                이미지 업로드
                            </label>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
        </>
    )
}