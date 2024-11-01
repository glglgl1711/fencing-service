import { Fragment } from "react";
import Header from "components/layout/header/Header";
import axios from "axios";
import ApplyBtn from "components/fencing-service/service/apply-btn";
import { cookies } from "next/headers";
import ServiceContainer from "components/pages/service/serviceContainer";
interface CookieType {
name : string, value : string
}
export default async function ServiceView ({params: {id}} : ParamsIdType) {
    let data = null;
    const cookie = cookies()
    const cookieValue : CookieType = cookie.get('f_ssid') || {name : '', value : ''};
    const userConfirm = await axios.get(`${process.env.HOST_URL}/api/user/users?token=${cookieValue?.value}`)
    if(userConfirm?.data?.result === true) {
        const userId = userConfirm?.data?.users?.u_idx;
        const response = await axios.get(`${process.env.HOST_URL}/api/service/detail-user-service?user=${userId}&id=${id}`)
        data = response?.data?.result === true ? response?.data?.service : null;
    }
    return(
        <>
        <Fragment>
        <ServiceContainer data={data}/>
        <main className="content-wrapper">
            <section
            className="wrapper image-wrapper bg-image bg-overlay bg-overlay-400 text-white"
            style={{ backgroundImage: "url(/img/photos/bg3.jpg)" }}
            >
            <div className="container pt-17 pb-20 pt-md-19 pb-md-21 text-center">
                <div className="row">
                <div className="col-lg-8 mx-auto">
                    <h1 className="display-1 mb-3 text-white">{data?.title}</h1>
                    <h3 className="text-red">{data?.status === 'Y' ? '모집 중' : '마감'}</h3>
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

                                <h3 
                                    className="mb-1" 
                                    style={{
                                        textAlign : 'center', position : "relative", top : '35px', color : 'gray'
                                    }}
                                >
                                    상 세 정 보
                                </h3>

                                <div className="row gx-0">
                                    <div className="col-lg-6">
                                        <div className="p-10 p-md-11 p-lg-14">
                                            <div className="d-flex flex-row">
                                                <div className="align-self-start justify-content-start">
                                                    <h5 className="mb-1">모집기간</h5>
                                                    <address>
                                                    {data?.applyDate1} ~ {data?.applyDate2}
                                                    </address>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row">
                                                <div>
                                                    <h5 className="mb-1">등록기관</h5>
                                                    <p>
                                                    {data?.registrar}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row">
                                                <div>
                                                    <h5 className="mb-1">봉사장소</h5>
                                                    <p>
                                                    {data?.location}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row">
                                                <div>
                                                    <h5 className="mb-1">모집인원</h5>
                                                    <p>
                                                    {data?.recruitmentPeople} 명
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
                                                    {data?.serviceDate1} ~ {data?.serviceDate2}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row">
                                                <div>
                                                    <h5 className="mb-1">모집기관</h5>
                                                    <p>
                                                    {data?.agency}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row">
                                                <div>
                                                    <h5 className="mb-1">봉사시간</h5>
                                                    <p>
                                                    {data?.serviceTime1} ~ {data?.serviceTime2} (총 00시간)
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row">
                                                <div>
                                                    <h5 className="mb-1">신청인원</h5>
                                                    <p>
                                                    {data?.appliPeople} 명
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ApplyBtn
                                    isApply={data?.isApply}
                                    service={data?.id}
                                    status={data?.status}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row mb-21">
                        <div className="col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
                            <h2 className="display-4 mb-3 text-center">간단 설명</h2>
                            <p className="lead text-center mb-10" dangerouslySetInnerHTML={{
                                __html : data?.contents || ''
                            }}>
                            
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
                                            {data?.location}<br className="d-none d-md-block" />
                                            {/* 구월아시아드 2단지 207동 903호 */}
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
                                            {data?.managerName}<br />
                                            {data?.managerPhone}
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
                                                    {data?.managerEmail}
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