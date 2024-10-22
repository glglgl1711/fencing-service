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
    gender : string
}

// 관리자 필터 타입
interface ListFilterType {
  idx : number
  title : string
  column : string
}

// 관리자 리스트 SearchParams 타입
interface SearchParamsType {
  searchParams : {
    page : number 
    size : number
    keyword : string
    column : string
    order : string
  }
}

// 관리자 봉사신청 리스트 타입
interface ServiceListDataType {
  id : number
  title : string
  agency : string
  registrar : string
  date : string
  status : string
  applyDate : string
  serviceDate : string
  serviceTime : string
  duration : string
}

// Params : ID 타입
interface ParamsIdType {
  params : {
    id : string
  }
}