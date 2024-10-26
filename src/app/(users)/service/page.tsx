import ServiceListItem from "components/fencing-service/service/service-list-item";
import axios from "axios";
import { cookies } from "next/headers";

export default async function Service () {
    let data = [];
    let userId = 0;
    const cookie = cookies()
    const cookieValue : CookieType = cookie.get('f_ssid') || {name : '', value : ''};
    const userConfirm = await axios.get(`http://localhost:3000/api/user/users?token=${cookieValue?.value}`)
    if(userConfirm?.data?.result == true) {
        userId = userConfirm?.data?.users?.u_idx
    }
    const response = await axios.get(`http://localhost:3000/api/service/get-user-service?user=${userId || 0}&page=1&size=25&keyword=&column=s_date&order=DESC`)
    data = response?.data?.result === true ? response?.data?.service : [];
    return(
        <>
        {/* <Header /> */}
        <main className="content-wrapper">
            <section className="wrapper bg-light">
                <div className="container pt-10 pt-md-14">
                    <div className="row">
                        <div className="col-md-8 col-lg-7 col-xl-6 col-xxl-5">
                        <h1 className="display-1 mb-3">봉사 할동신청</h1>
                        <p className="lead fs-lg pe-lg-10 pe-xxl-1">
                            함께 나눔의 기쁨을 실천할 준비가 되셨나요?  <br/>
                            지금 바로 봉사활동에 신청하여 따뜻한 손길을 전해 주세요!
                        </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="wrapper bg-light">
                <div className="container pt-10 pt-md-12">
                    <div className="row">
                        <div className="col-lg-100">
                            <div className="blog classic-view">
                            {data?.map((list:ServiceListDataType , index:number) => (
                                <ServiceListItem
                                    key={index}
                                    list={list}
                                    link="#"
                                    category="TEAMWORK"
                                    title="Amet Dolor Bibendum Parturient Cursus"
                                    description="Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Nullam quis risus eget urna mollis ornare vel. Nulla vitae elit libero, a pharetra augue. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh. Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur."
                                    cardTop={
                                    <figure className="card-img-top overlay overlay-1 hover-scale">
                                        <figcaption>
                                        <h5 className="from-top mb-0">Read More</h5>
                                        </figcaption>
                                    </figure>
                                    }
                                />
                            ))}

                            </div>

                        </div>
                    </div>
                </div>
                </section>

        </main>
        </>
    )
}