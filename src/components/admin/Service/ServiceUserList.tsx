'use client'
import Modal from 'react-modal';
import { useState } from 'react';
import axios from 'axios';
interface Props {
    serviceId : string
    onRequestClose?: ()=>void;
}
export default function ServiceUserList({
    serviceId, onRequestClose
} : Props) {

    async function userServiceList () {
        if(serviceId){
            const response = await axios.get(`/api/service/getUserServiceList?id=${serviceId}`)
        }
    }
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
                        placeholder="이름을 검색해 주세요."
                        style={searchInputStyle} // 검색 바 스타일
                    />
                </div>
                <div className="button-group" style={buttonGroupStyle}>
                    <button style={deleteAllButtonStyle}>일괄삭제</button>
                    <button style={setAllPendingButtonStyle}>일괄 참여(전)</button>
                    <button style={setAllCompleteButtonStyle}>일괄 참여(완)</button>
                </div>
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
                            <tr style={trStyle}>
                                <td style={tdStyle}>1</td>
                                <td style={tdStyle}>고건희</td>
                                <td style={tdStyle}>010-9942-9161</td>
                                <td style={tdStyle}>
                                    <select style={selectStyle}>
                                        <option>참여(전)</option>
                                        <option>참여(완)</option>
                                        <option>불참</option>
                                    </select>
                                </td>
                                <td style={tdStyle}>
                                    <button style={deleteButtonStyle}>삭제</button>
                                </td>
                            </tr>
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