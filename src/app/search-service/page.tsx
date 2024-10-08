import Header from "components/layout/header/Header";
import { Fragment } from "react";

import ServiceListItem from "components/fencing-service/service/service-list-item";
import ContactForm from "components/common/ContactForm";
export default function SearchService () {

    return(
        <>
        <Header />
        <main className="content-wrapper">
            <section className="wrapper bg-light">
                <div className="container pt-10 pt-md-14">
                    <div className="row">
                        <div className="col-md-8 col-lg-7 col-xl-6 col-xxl-5">
                        <h1 className="display-1 mb-3">봉사 할동조회</h1>
                        <p className="lead fs-lg pe-lg-10 pe-xxl-1">
                            이름과 전화번호를 입력하시면  <br/>
                            과거의 봉사활동을 확인하실 수 있습니다.
                        </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="wrapper bg-light">
                <div className="container pt-10 pt-md-12">
                    <div className="row">
                        <div className="col-lg-100">
                            <p className="lead text-center mb-10" style={{fontWeight : 'bold'}}>
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
                            </form>

                            <table className="table table-bordered" style={{marginTop : '20px'}}>
                                <thead>
                                    <tr>
                                    <th scope="col" style={{ width: "10%" }}>No.</th>
                                    <th scope="col" style={{ width: "55%" }}>봉 사 활 동 명</th>
                                    <th scope="col" style={{ width: "20%" }}>일 자</th>
                                    <th scope="col" style={{ width: "15%" }}>상 태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{cursor : 'pointer'}}>
                                        <td>1</td>
                                        <td>인천 광역시 남동구의 봉사 정보를 같이 확인해보아요.</td>
                                        <td>2024.09.06</td>
                                        <td>미완료</td>
                                    </tr>
                                    <tr style={{cursor : 'pointer'}}>
                                        <td>2</td>
                                        <td>인천 광역시 남동구의 봉사 정보를 같이 확인해보아요.</td>
                                        <td>2024.09.06</td>
                                        <td>완료</td>
                                    </tr>
                                    <tr style={{cursor : 'pointer'}}>
                                        <td>3</td>
                                        <td>인천 광역시 남동구의 봉사 정보를 같이 확인해보아요.</td>
                                        <td>2024.09.06</td>
                                        <td>완료</td>
                                    </tr>
                                    <tr style={{cursor : 'pointer'}}>
                                        <td>4</td>
                                        <td>인천 광역시 남동구의 봉사 정보를 같이 확인해보아요.</td>
                                        <td>2024.09.06</td>
                                        <td>미완료</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </section>
        </main>
        </>
    )
}