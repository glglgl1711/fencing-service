'use client'

import axios from "axios";

interface Props {
    photo : string[]
    refetch : Function
}
export default function SavedImagebox ({
    photo , refetch
} : Props) {
    async function DeletePhoto (id : number) {
        try {
            const confirm = window.confirm('해당 사진을 정말 삭제하시겠습니까?');
            if(confirm) {
                const response = await axios.post('/api/photo/delete-photo', {
                    id : id
                })
                if(response?.data?.result === true) {
                    refetch()
                }
            }
        }catch{alert('Server Error')}
    }
    return(
        <>
        <tr className="top">
            <th>저장된 이미지<span className="star"></span></th>
            <td>
                <div className="flexBox" style={{display : 'flex', flexWrap : 'wrap', gap : '10px'}}>
                    {/* 저장된 이미지 박스 */}
                    {photo?.map((photo : any, index:number) => (
                    <div key={index}>
                        <div className="imgUploadBox imgUploadBox_after">
                            <img src={photo?.url} alt="thumbnail img"/>
                            <button 
                                className="closeBtn"
                                onClick={()=>DeletePhoto(photo?.id)}
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