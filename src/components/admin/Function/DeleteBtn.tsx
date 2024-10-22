'use client'

import axios from "axios"

interface Props {
    category : string
    id : number
    refetch : Function
}
export default function DeleteBtn ({
    category , id , refetch
} : Props) {
    async function ListDelete () {
        const confirm = window.confirm('정말 삭제하시겠습니까?');
        if(confirm){
            try {
                const response = await axios.post(`/api/${category}/delete` , {id : id})
                if(response?.data?.result === true) { refetch(); }
                else {alert(response?.data?.msg)}
            }catch {alert('Server Error')}
        }else{ return; }
    }
    return (
        <>
         <button
            style={deleteButtonStyle}
            onClick={()=>ListDelete()}
        >
            삭제
        </button>
        </>
    )
}

// 삭제 버튼 스타일
const deleteButtonStyle  :any = {
    backgroundColor: '#ff4d4f',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer'
};