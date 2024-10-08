import { Fragment } from "react";
import Header from "components/layout/header/Header";

export default function ServiceView () {

    return(
        <>
        <Fragment>

        <Header/>

        <main className="content-wrapper">
            <section
            className="wrapper image-wrapper bg-image bg-overlay bg-overlay-400 text-white"
            style={{ backgroundImage: "url(/img/photos/bg3.jpg)" }}
            >
            <div className="container pt-17 pb-20 pt-md-19 pb-md-21 text-center">
                <div className="row">
                <div className="col-lg-8 mx-auto">
                    <h1 className="display-1 mb-3 text-white">인천 ㅇㅇ 복지관 자원봉사자를 구합니다.</h1>
                    <h3 className="text-red">모집 중</h3>
                </div>
                </div>
            </div>
            </section>

            <div className="wrapper bg-light angled upper-end">
                <div className="container pb-11">
                    {/* 모집 개요 테이블 */}
                    <div className="row mb-14 mb-md-16">
                        <div className="col-xl-10 mx-auto mt-n19">
                            <div className="card">
                                <div className="row gx-0">
                                    <div className="col-lg-6">
                                        <div className="p-10 p-md-11 p-lg-14">
                                            <div className="d-flex flex-row">
                                                <div className="align-self-start justify-content-start">
                                                    <h5 className="mb-1">모집기간</h5>
                                                    <address>
                                                    2024.09.16 ~ 2024.09.20
                                                    </address>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row">
                                                <div>
                                                    <h5 className="mb-1">등록기관</h5>
                                                    <p>
                                                    인천광역시청
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row">
                                                <div>
                                                    <h5 className="mb-1">봉사장소</h5>
                                                    <p>
                                                    인천광역시 남동구 ㅇㅇ 복지회관
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row">
                                                <div>
                                                    <h5 className="mb-1">모집인원</h5>
                                                    <p>
                                                    00 명
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="p-10 p-md-11 p-lg-14">
                                            <div className="d-flex flex-row">
                                                <div>
                                                    <h5 className="mb-1">봉사기간</h5>
                                                    <p>
                                                    2024.09.27 ~ 2024.10.02
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row">
                                                <div>
                                                    <h5 className="mb-1">모집기관</h5>
                                                    <p>
                                                    울타리 자원봉사단체
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row">
                                                <div>
                                                    <h5 className="mb-1">봉사시간</h5>
                                                    <p>
                                                    09:00 ~ 17:00 (총 8시간)
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row">
                                                <div>
                                                    <h5 className="mb-1">신청인원</h5>
                                                    <p>
                                                    00 명
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-21">
                        <div className="col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
                            <h2 className="display-4 mb-3 text-center">간단 설명</h2>
                            <p className="lead text-center mb-10">
                            가서 봉사하시면 됩니다.
                            </p>

                        </div>
                    </div>

                    {/* 현장 위치 및 담당자 인적정보 */}
                    <div className="row mb-14 mb-md-16" >
                        <div className="col-xl-10 mx-auto mt-n19">
                            <div className="card">
                                <div className="row gx-0">
                                    <div className="col-lg-6 align-self-stretch">
                                        <div className="map map-full rounded-top rounded-lg-start">
                                            <iframe
                                            allowFullScreen
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25387.23478654725!2d-122.06115399490332!3d37.309248660190086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb4571bd377ab%3A0x394d3fe1a3e178b4!2sCupertino%2C%20CA%2C%20USA!5e0!3m2!1sen!2str!4v1645437305701!5m2!1sen!2str"
                                            style={{ width: "100%", height: "100%", border: 0 }}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                    <div className="p-10 p-md-11 p-lg-14">
                                        <div className="d-flex flex-row">
                                        <div>
                                            <div className="icon text-primary fs-28 me-4 mt-n1">
                                            <i className="uil uil-location-pin-alt" />
                                            </div>
                                        </div>
                                        <div className="align-self-start justify-content-start">
                                            <h5 className="mb-1">주 소</h5>
                                            <address>
                                            인천광역시 남동구 선수촌공원로 96, <br className="d-none d-md-block" />
                                            구월아시아드 2단지 207동 903호
                                            </address>
                                        </div>
                                        </div>

                                        <div className="d-flex flex-row">
                                        <div>
                                            <div className="icon text-primary fs-28 me-4 mt-n1">
                                            <i className="uil uil-phone-volume" />
                                            </div>
                                        </div>
                                        <div>
                                            <h5 className="mb-1">담 당 자</h5>
                                            <p>
                                            고건희<br />
                                            010 9942 9161
                                            </p>
                                        </div>
                                        </div>

                                        <div className="d-flex flex-row">
                                        <div>
                                            <div className="icon text-primary fs-28 me-4 mt-n1">
                                                <i className="uil uil-envelope" />
                                            </div>
                                        </div>
                                        <div>
                                            <h5 className="mb-1">이 메 일</h5>
                                            <p className="mb-0">
                                                <a href="mailto:help@sandbox.com" className="link-body">
                                                    gunhee0906@naver.com
                                                </a>
                                            </p>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        </Fragment>
        </>
    )
}