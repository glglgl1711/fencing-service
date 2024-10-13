"use client";
declare global {
  interface Window {
    daum: {
      Postcode: any;
    };
  }
}
import { FormEvent, Fragment, useEffect, useState } from "react";
import NextLink from "components/reuseable/links/NextLink";
import axios from "axios";
interface Props {
  sessionId : string
  token : string
}

export default function RegisterForm({
  sessionId, token
} : Props) {
  
  const [data, setData] = useState<RegistDataType>({
    name : '', phone : '', addr : '', addrDetail : '', birth : '', email : '', gender : ''
  })

  function handleChange (e:React.ChangeEvent<HTMLInputElement>) {
    const {name , value} = e.target;
    setData((prev) => ({...prev, [name] : value}))
  }

  async function Join () {
    if(!sessionId) {alert('카카오 로그인을 다시 해주시기 바랍니다.'); return;}
    if(!data?.name) {alert('이름을 입력해 주시기 바랍니다.'); return;}
    if(!data?.phone) {alert('휴대전화를 입력해 주시기 바랍니다.'); return;}
    if(!data?.birth) {alert('생년월일을 입력해 주시기 바랍니다.'); return;}
    const response = await axios.post(`/api/user/regist` , {
      key : sessionId,
      name : data?.name,
      phone : data?.phone,
      addr : `${data?.addr},${data?.addrDetail}`,
      birth : data?.birth,
      email : data?.email,
      token : token,
      gender : ''
    })
    if(response?.data?.result === true) {
      alert('회원가입이 완료되었습니다!'); window.location.reload()
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

  return (
    <Fragment>
      <h2 className="mb-3 text-start">환영합니다.</h2>
      <p className="lead mb-6 text-start">회원가입을 진행해 주세요.</p> 
        <div className="form-floating mb-4">
          <input
            id="name"
            name="name"
            type="text"
            value={data?.name}
            placeholder="Name"
            className="form-control"
            onChange={handleChange}
          />
          <label htmlFor="name">이름 *</label>
        </div>

        <div className="form-floating mb-4">
          <input
            type="text"
            name="phone"
            id="phone"
            value={data?.phone}
            placeholder="휴대전화"
            className="form-control"
            onChange={handleChange}
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
            className="form-control"
            onChange={handleChange}
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
            className="form-control"
            onChange={handleChange}
          />
          <label htmlFor="email">이메일</label>
        </div>

        <div className="form-floating mb-4" onClick={handleSearchAddress}>
          <input
            type="text"
            id="addr"
            value={data?.addr}
            placeholder="해당 영역 눌러 주소를 검색하세요."
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
            className="form-control"
            onChange={handleChange}
          />
          <label htmlFor="loginEmail">상세 주소</label>
        </div>

        <button 
          type="button" 
          className="btn btn-primary rounded-pill btn-login w-100 mb-2"
          onClick={Join}
        >
          회원가입
        </button>
    </Fragment>
  );
}
