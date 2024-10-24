import axios from "axios";
import SearchMyService from "components/pages/service/search-my-service";
import { cookies } from "next/headers";

export default async function SearchService () {
    let userId = 0;
    let data = [];
    const cookie = cookies()
    const cookieValue : CookieType = cookie.get('f_ssid') || {name : '', value : ''};
    const userConfirm = await axios.get(`http://localhost:3000/api/user/users?token=${cookieValue?.value}`)
    if(userConfirm?.data?.result === true) {
        userId = userConfirm?.data?.users?.u_idx;
        const response = await axios.get(`http://localhost:3000/api/service/get-my-service?user=${userId || 0}`)
        if(response?.data?.result === true){
            data = response?.data?.list || [];
        }
    }
    return(
        <>
        {/* <Header /> */}
        <main className="content-wrapper">
            <section className="wrapper bg-light">
                <div className="container pt-10 pt-md-14">
                    <div className="row">
                        <div className="col-md-8 col-lg-7 col-xl-6 col-xxl-5">
                        <h1 className="display-1 mb-3">봉사 할동조회</h1>
                        <p className="lead fs-lg pe-lg-10 pe-xxl-1">
                            봉사활동 내역을 확인하세요!
                        </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="wrapper bg-light">
                <div className="container pt-10 pt-md-12">
                    <div className="row">
                        <div className="col-lg-100">
                            {/* <p className="lead text-center mb-10" style={{fontWeight : 'bold'}}>
                                이름과 휴대폰 번호를 정확하게 입력해주세요
                            </p>
                            <form className="contact-form needs-validation" method="post">
                                <div className="messages"></div>
                                <div className="row gx-4">
                                    <div className="col-md-6">
                                        <div className="form-floating mb-4">
                                            <input required type="text" name="name" id="form_name" placeholder="Jane" className="form-control" />
                                            <label htmlFor="form_name">성함 *</label>
                                            <div className="valid-feedback"> Looks good! </div>
                                            <div className="invalid-feedback"> Please enter your first name. </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-floating mb-4">
                                            <input required type="text" name="surname" placeholder="Doe" id="form_lastname" className="form-control" />
                                            <label htmlFor="form_lastname">휴대전화 *</label>
                                            <div className="valid-feedback"> Looks good! </div>
                                            <div className="invalid-feedback"> Please enter your last name. </div>
                                        </div>
                                    </div>


                                    <div className="col-12 text-center" style={{marginTop : '20px'}}>
                                        <input type="submit" value="내역 조회하기" className="btn btn-primary rounded-pill btn-send mb-3" />
                                    </div>
                                </div>
                            </form> */}

                            <SearchMyService
                                data={data}
                            />
                        </div>
                    </div>
                </div>
                </section>
        </main>
        </>
    )
}