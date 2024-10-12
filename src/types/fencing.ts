// 회원 유지 데이터 타입
interface AuthType {
    result : boolean,
    users : {
      u_idx : number, name : string, phone : string,
      address : string, birth : string, email : string, token : string
    }
}

// 회원 가입 , 내정보수정 데이터 타입
interface RegistDataType {
    name : string
    phone : string
    addr : string
    addrDetail : string
    birth : string
    email : string,
  }