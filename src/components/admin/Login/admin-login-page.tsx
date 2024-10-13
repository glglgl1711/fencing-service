'use client'
import Summernote from "components/admin/Editor/summernote"
import { useEffect, useState } from "react"
interface DataType {
    id : string, password : string
}
export default function AdminLoginForm () {
    const [data, setData] = useState<DataType>({
        id : '', password : ''
    })
    function handleChange (e:React.ChangeEvent<HTMLInputElement>) {
        const {name , value} = e.target;
        setData((prev) => ({...prev , [name] : value}))
    }
    function handleEnter (e:React.KeyboardEvent) {
        if(e.key==='Enter') Login()
    }
    async function Login () {
        try {

        }catch{alert('서버 오류 / 관리자 확인 요망')}
    }
    return(
        <>
        <div className="admin_loginBox">
            <h2>관리자 페이지</h2>
            <div>
                    <div className="inputList">
                        <label htmlFor="">
                            <img src="/img/dotsAdmin/form_id.png" alt="login"/>
                        </label>
                        <input 
                            type="text" 
                            onChange={handleChange} 
                            name="id" 
                            id="" 
                            onKeyDown={handleEnter}
                            placeholder="아이디"
                        />
                    </div>
                    <div className="inputList">
                        <label htmlFor="">
                            <img src="/img/dotsAdmin/form_pw.png" alt="password"/>
                        </label>
                        <input 
                            type="password" 
                            onChange={handleChange} 
                            name="password" 
                            id="" 
                            onKeyDown={handleEnter}
                            placeholder="비밀번호"
                        />
                    </div>

                    <button 
                        className="admin_loginBtn"
                        onClick={Login}
                    >로그인</button>
                </div>
        </div>
        </>
    )
}