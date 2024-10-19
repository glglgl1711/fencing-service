'use client'

import axios from "axios";
import { Fragment, useEffect, useState } from "react"

interface Props {
    auth : AuthType
}
export default function ModifyForm ({auth} : Props) {
    // const {users} = auth;
    const [data, setData] = useState<RegistDataType>({
        name : '', phone : auth?.users?.phone, 
        addr : auth?.users?.address.split(',')[0] ? auth?.users?.address?.split(',')[0] : '', 
        addrDetail : auth?.users?.address?.split(',')[1] ? auth?.users?.address?.split(',')[1] : '', 
        birth : auth?.users?.birth, email : auth?.users?.email , gender  : ''
    })

    function handleChange (e:React.ChangeEvent<HTMLInputElement>) {
        const {name , value} = e.target;
        setData((prev) => ({...prev, [name] : value}))
    }

    async function Edit () {
        const response = await axios.post(`/api/user/edit` , {
            key : auth?.users?.token , phone : data?.phone,
            addr : `${data?.addr},${data?.addrDetail}`, birth : data?.birth,
            email : data?.email
        })
        if(response?.data?.result === true) {
            window.location.reload()
        }else{
            alert('error')
        }
    }

    function handleSearchAddress() {
        if (window.daum && window.daum.Postcode) {
          new window.daum.Postcode({
            oncomplete: function (data : any) {
              setData((prevData) => ({ ...prevData, addr: data?.address }));
            },
          }).open();
        }
      }
      
      useEffect(() => {
        if (!window.daum) {
          const script = document.createElement("script");
          script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
          script.onload = () => {
            console.log("Daum Postcode script loaded");
          };
          document.body.appendChild(script);
        }
      }, []);
    return(
        <>
        <div
            role="dialog"
            tabIndex={-1}
            aria-modal="true"
            id="modal-modify"
            className="modal fade"
            style={{ display: "none" }}
        >
            <div className="modal-dialog modal-dialog-centered modal-sm">
                <div className="modal-content text-center">
                    <div className="modal-body">
                        <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        />
                            <h2 className="mb-3 text-start">내 정보 수정</h2>
                            <p className="lead mb-6 text-start">회원정보를 수정할 수 있습니다.</p> 
                            <div className="form-floating mb-4">
                            <input
                                id="name"
                                name=""
                                defaultValue={auth?.users?.name}
                                type="text"
                                placeholder="Name"
                                className="form-control"
                                style={{backgroundColor : '#ede9e9'}}
                                disabled
                            />
                            <label htmlFor="name">이름 (이름은 수정할 수 없습니다.)</label>
                            </div>

                            <div className="form-floating mb-4">
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                value={data?.phone}
                                placeholder="휴대전화"
                                onChange={handleChange}
                                className="form-control"
                            />
                            <label htmlFor="phone">휴대전화 *</label>
                            </div>

                            <div className="form-floating mb-4">
                            <input
                                type="text"
                                id="birth"
                                name="birth"
                                value={data?.birth}
                                placeholder="생년월일"
                                onChange={handleChange}
                                className="form-control"
                            />
                            <label htmlFor="birth">생년월일 *</label>
                            </div>

                            <div className="form-floating mb-4">
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={data?.email}
                                placeholder="이메일"
                                onChange={handleChange}
                                className="form-control"
                            />
                            <label htmlFor="email">이메일</label>
                            </div>

                            <div className="form-floating mb-4" onClick={handleSearchAddress}>
                            <input
                                type="text"
                                id="addr"
                                value={data?.addr}
                                placeholder="해당 영역 눌러 주소를 검색하세요."
                                onChange={handleChange}
                                className="form-control"
                                readOnly
                            />
                            <label htmlFor="addr">주소 (해당 영역을 클릭 후 주소를 검색하세요.)</label>
                            </div>

                            <div className="form-floating mb-4">
                            <input
                                type="text"
                                id="addrDetail"
                                name="addrDetail"
                                value={data?.addrDetail}
                                placeholder="상세 주소"
                                onChange={handleChange}
                                className="form-control"
                            />
                            <label htmlFor="loginEmail">상세 주소</label>
                            </div>

                            <button 
                            type="button" 
                            className="btn btn-primary rounded-pill btn-login w-100 mb-2"
                            onClick={()=>Edit()}
                            >
                            수정하기
                        </button>
                    </div>
                </div>
            </div>

        </div>

        </>
    )
}