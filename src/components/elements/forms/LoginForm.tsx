"use client";

import { FormEvent, Fragment, useEffect, useState } from "react";
import NextLink from "components/reuseable/links/NextLink";
import { signIn, signOut, useSession } from 'next-auth/react';
import axios from "axios";
import Signup from "components/blocks/navbar/components/signup";
import RegisterForm from "./RegisterForm";
import Cookies from 'js-cookie'
import Swal from "sweetalert2";
import Image from "next/image";

export default function LoginForm() {
  const {data : session, status} : any = useSession()
  const [popup, setPopup] = useState<Window | null>(null);
  const [isRegist, setIsRegist] = useState<boolean>(false)

  async function handleLogin() {
    // 팝업 창 열기
    const loginPopup = window.open("/api/auth/signin/kakao", "kakaoLogin", "width=600,height=600");
    setPopup(loginPopup); // 팝업 상태 저장
  }

  // 팝업 창에서 인증이 완료된 후 처리
  async function getData () {
    if (session?.user) {
      const response = await axios.get(`/api/user/getUserCheck?key=${session?.user?.sub}&token=${session?.user?.refresh_token}`);
      if (response?.data?.result === true) {
        window.location.reload();
        // 쿠키에 토큰 값 저장 (쿠키에 저장된 토큰 값으로 회원 유지 구현 예정)
        Cookies.set('f_ssid', response?.data?.token, {expires : 7 , path : '/'});
      } else {
        // 회원이 조회되지 않았다면 회원가입 진행 유도
        Swal.fire({
          text : '회원가입을 진행하시겠습니까?',
          icon : 'question',
          confirmButtonText : '회원가입',
          cancelButtonText : '다음에',
          showCancelButton : true , 
        }).then(async (result) => {
          if(result.isConfirmed) {
            setIsRegist(true)
          }else{
            return;
          }
        })
        // const confirm = window.confirm('회원가입을 진행하시겠습니까?')
        // if(confirm) {setIsRegist(true)}
        // else { return; }
      }
    }
  }

   // 팝업 창에서 로그인 후 세션이 업데이트되면 팝업을 닫는 로직
   useEffect(() => {
    if (popup && session?.user) {
      popup.close(); // 로그인 성공 시 팝업 닫기
      setPopup(null); // 팝업 상태 초기화
      getData()
    }
  }, [popup, session]);
  
  return (
    <Fragment>
      {isRegist ? 
      <Fragment>
        <RegisterForm
          sessionId={session?.user?.sub}
          token={session?.user?.refresh_token}
        />
      </Fragment>
      :
      <Fragment>
      <h2 className="mb-3 text-center fs-20">로그인 / 회원가입</h2>
      <p className="lead mb-6 text-center fs-14">카카오 계정으로 간편하게 로그인 하세요.</p>
        <button 
          onClick={handleLogin}
          style={{background : `url('/img/kakao_login.png')` , 
          width : '300px', borderRadius : '10px', border : '0px',
          height : '45px'}}
        >
        </button>
        
      </Fragment>
      }
    </Fragment>
    
  );
}
