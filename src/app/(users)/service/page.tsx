import Header from "components/layout/header/Header";
import Image from "next/image";
import { Fragment } from "react";
import Carousel from "components/reuseable/Carousel";
import VideoPlyr from "components/reuseable/VideoPlyr";
import Pagination from "components/reuseable/Pagination";
import NextLink from "components/reuseable/links/NextLink";
import { BlogCard2, BlogCard3 } from "components/reuseable/blog-cards";
import { blogs } from "./data";
import blogOneImage from '../../../public/img/photos/b1.jpg';
import blogTwoImage from "../../../../public/img/photos/b2.jpg";
import blogThreeImage from "../../../../public/img/photos/b3.jpg";
import ServiceListItem from "components/fencing-service/service/service-list-item";
export default function Service () {

    return(
        <>
        <Header />
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
                            <ServiceListItem
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
                            <ServiceListItem
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
                            <ServiceListItem
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
                            </div>

                        </div>
                    </div>
                </div>
                </section>

        </main>
        </>
    )
}