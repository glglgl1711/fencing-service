'use client'

import axios from "axios";

interface Props {
    arr : number[]
    serviceId : string
    refetch : Function
}
export default function ServiceBtnGroup ({
    arr , serviceId , refetch
} : Props) {

    async function handleChageGroups (statusValue : string) {
        const confirmText = statusValue === 'Y' ? '일괄 참여 (완)' : '일괄 참여 (전)';
        const confirmMsg = `${confirmText} 상태로 변경하시겠습니까?`;
        const confirm = window.confirm(confirmMsg);
        if(confirm) {
            try {
                const response = await axios.post(`/api/service/edit-groups-service-status` , {
                    service : serviceId , users : arr , status : statusValue
                })
                if(response?.data?.result === true) {
                    refetch(); alert(response?.data?.msg)
                } 
            }catch { alert('Server Error') }
        }else{

        }
    }

    async function handleDeleteGroups () {
        const confirm = window.confirm('정말 일괄 삭제하시겠습니까?');
        if(confirm) {
            const response = await axios.post(`/api/service/delete-groups-service` , {
                service : serviceId , users : arr
            })
            if(response?.data?.result === true) {
                alert('성공적으로 일괄 삭제되었습니다.'); refetch()
            }
        }
    }

    return(
        <>
        <div className="button-group" style={buttonGroupStyle}>
            <button style={deleteAllButtonStyle} onClick={handleDeleteGroups}>일괄삭제</button>
            <button style={setAllPendingButtonStyle} onClick={()=>handleChageGroups('N')}>일괄 참여(전)</button>
            <button style={setAllCompleteButtonStyle} onClick={()=>handleChageGroups('Y')}>일괄 참여(완)</button>
        </div>
        </>
    )
}

// 버튼 그룹 스타일
const buttonGroupStyle : any = {
    display: 'flex',
    justifyContent: 'flex-end', // 버튼들을 오른쪽 끝으로 정렬
    marginBottom: '20px',
};

// 각 버튼 스타일
const deleteAllButtonStyle : any = {
    backgroundColor: '#ff4d4f', // 빨간색
    color: '#fff', // 하얀색 글자
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginLeft: '10px', // 버튼 간격
};

const setAllPendingButtonStyle : any = {
    backgroundColor: '#ccc', // 회색
    color: '#000', // 검은색 글자
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginLeft: '10px', // 버튼 간격
};

const setAllCompleteButtonStyle : any = {
    backgroundColor: '#007bff', // 파란색
    color: '#fff', // 하얀색 글자
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginLeft: '10px', // 버튼 간격
};
