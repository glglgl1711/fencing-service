'use client'
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceBtnGroup from './ServiceButtonGroup';
interface Props {
    serviceId : string
    onRequestClose?: ()=>void;
}
export default function ServiceUserList({
    serviceId, onRequestClose
} : Props) {

    const [data , setData] = useState<UserServiceListType[]>([])
    const [keyword , setKeyword] = useState<string>('')
    const [arr , setArr] = useState<number[]>([])

    // Select 박스 상태 변경
    async function handleChangeStatus (e : React.ChangeEvent<HTMLSelectElement> , user : number) {
        const {options , selectedIndex,  value} = e.target;
        const confirmMsg = `${options[selectedIndex].innerHTML} 상태로 변경하시겠습니까?`;
        const confirm = window.confirm(confirmMsg)
        if(confirm){
            try {
                const response = await axios.post(`/api/service/edit-user-service-status` , {
                    service : serviceId , user : user , status : value
                })
                if(response?.data?.result === true) { alert('성공적으로 변경되었습니다.'); userServiceList()}
                else {alert(response?.data?.msg)}
            }catch { alert('Server Error') }
        }else { return; }
    }
    function handleKeyword (e : React.KeyboardEvent<HTMLInputElement>) {
        if(e.key === 'Enter') {
            userServiceList()
        }
    }

    // 리스트 내 유저 삭제
    async function handleDeleteUser (userValue : number) {
        const comfirm = window.confirm('해당 유저를 삭제하시겠습니까?');
        if(comfirm){
            try{
                const response = await axios.post(`/api/service/delete-service-user` , {
                    service : serviceId , user : userValue
                })
                if(response?.data?.result === true) {
                    alert('성공적으로 삭제되었습니다.'); userServiceList()
                }else{ alert(response?.data?.msg) }
            }catch { alert('Server Error') }
        }
    }

    // 유저리스트 호출
    async function userServiceList () {
        if(serviceId){
            const response = await axios.get(`/api/service/getUser-service-list?service=${serviceId}&keyword=${keyword}`)
            if(response?.data?.result === true) {
                const userList = response?.data?.list;
                const userIds : number[] = userList?.map((user : UserServiceListType) => user.user)
                setArr(userIds);
                setData(userList);
            }else{
                alert(response?.data?.msg); return;
            }
        }
    }

    useEffect(()=>{userServiceList()} , [serviceId])
    return (
        <>
        <Modal 
            isOpen={true}
            style={customStyles}
            onRequestClose={onRequestClose}
        >
            <div className="modal-wrapper">
                <div className="modal-header">
                    <h2><span style={{ color: "black" }}>{'신청자 리스트'}</span></h2>
                    <button className="modal-close-button" onClick={onRequestClose} style={closeButtonStyle}>X</button>
                </div>
                <div className="search-bar-area2">
                    <input 
                        type="text" 
                        maxLength={50}
                        placeholder="이름을 검색해 엔터를 눌러 주세요."
                        style={searchInputStyle} // 검색 바 스타일
                        onChange={(e)=>setKeyword(e.target.value)}
                        onKeyDown={(e)=>handleKeyword(e)}
                    />
                </div>
                <ServiceBtnGroup
                    arr={arr}
                    serviceId={serviceId}
                    refetch={userServiceList}
                />
                <div className="table-container" style={tableContainerStyle}>
                    <table style={tableStyle}>
                        <thead style={theadStyle}>
                            <tr>
                                <th style={{textAlign : 'center'}}>NO.</th>
                                <th style={{textAlign : 'center'}}>이름</th>
                                <th style={{textAlign : 'center'}}>연락처</th>
                                <th style={{textAlign : 'center'}}>참여여부</th>
                                <th style={{textAlign : 'center'}}>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((list:UserServiceListType, index:number) => {
                                return(
                                <tr key={index} style={trStyle}>
                                    <td style={tdStyle}>1</td>
                                    <td style={tdStyle}>{list?.name}</td>
                                    <td style={tdStyle}>{list?.phone}</td>
                                    <td style={tdStyle}>
                                        <select onChange={(e)=>handleChangeStatus(e, list?.user)} value={list?.status} style={selectStyle}>
                                            <option value={'N'}>참여(전)</option>
                                            <option value={'Y'}>참여(완)</option>
                                            <option value={'F'}>불참</option>
                                        </select>
                                    </td>
                                    <td style={tdStyle}>
                                        <button 
                                        style={deleteButtonStyle}
                                        onClick={()=>handleDeleteUser(list?.user)}
                                        >삭제</button>
                                    </td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </Modal>
        </>
    )
}

const customStyles : any = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '80vh',
        height: '85vh', // 모달 높이
        transform: 'translate(-50%, -50%)',
        padding: '20px 30px',
        borderRadius: '10px',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        overflow: 'hidden', // 모달 스크롤 방지
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // 배경 어둡게 처리
        zIndex: 1000, // 모달이 가장 위에 오도록 설정
    }
};

// Close 버튼 스타일
const closeButtonStyle : any = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#333'
};

// 검색 인풋 스타일
const searchInputStyle : any = {
    width: '100%',
    padding: '10px 15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '20px',
    fontSize: '16px'
};
// 테이블 컨테이너 스타일
const tableContainerStyle : any = {
    maxHeight: '65vh',
    overflowY: 'auto',
    marginTop: '20px'
};

// 테이블 스타일
const tableStyle : any = {
    width: '100%',
    borderCollapse: 'collapse', // 셀 경계선을 합침
    borderSpacing: '0', // 셀 간의 간격을 0으로 설정
    marginTop: '10px',
    textAlign: 'center'
};

// 테이블 헤더 스타일
const theadStyle : any = {
    height : '45px',
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
    borderBottom: '2px solid #ddd' // 헤더 아래 경계선
};

// 테이블 데이터 셀 스타일
const tdStyle : any = {
    border: 'none', // 셀 경계선을 완전히 제거
    padding: '12px 15px',
    textAlign: 'center' 
};

// 테이블 행 스타일
const trStyle : any = {
    borderBottom: '1px solid #ddd', // 각 행 사이에 얇은 경계선 추가 (필요할 경우)
};

// 삭제 버튼 스타일
const deleteButtonStyle  :any = {
    backgroundColor: '#ff4d4f',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer'
};

// Select 박스 스타일
const selectStyle : any = {
    width: '65%',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
    textAlign: 'center' 
};