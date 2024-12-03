"use client";

import Carousel from "components/reuseable/Carousel";
// GLOBAL CUSTOM HOOKS
import useLightBox from "hooks/useLightBox";
// GLOBAL CUSTOM COMPONENTS
import NextLink from "components/reuseable/links/NextLink";
import { useRouter } from "next/navigation";

export default function Hero15() {

  const router = useRouter()
  // use video popup
  useLightBox();

  function handlePage (e : any, url : string)  {
    e.preventDefault()
    router.push(url)
  }
  return (
    <div className="wrapper bg-dark">
      <div className="swiper-container swiper-hero dots-over">
        <Carousel slidesPerView={1} autoplay={{ delay: 7000, disableOnInteraction: false }}>
          <div
            className="swiper-slide bg-overlay bg-overlay-400 bg-dark bg-image"
            style={{ backgroundImage: 'url("/img/photos/about5.jpg")' }}>
            <div className="container h-100">
              <div className="row h-100">
                <div className="col-md-10 offset-md-1 col-lg-7 offset-lg-0 col-xl-6 col-xxl-5 text-center text-lg-start justify-content-center align-self-center align-items-start">
                  <h2 className="display-1 fs-56 mb-4 text-white animate__animated animate__slideInDown animate__delay-1s">
                    공지사항
                  </h2>

                  <p className="lead fs-23 lh-sm mb-7 text-white animate__animated animate__slideInRight animate__delay-2s">
                    우리 봉사단체의 중요한 소식과 활동 안내를 확인하세요.
                  </p>

                  <div className="animate__animated animate__slideInUp animate__delay-3s">
                    <NextLink title="Read More" onClick={(e)=>handlePage(e , '/news')} href="#" className="btn btn-lg btn-outline-white rounded-pill" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div
            className="swiper-slide bg-overlay bg-overlay-400 bg-dark bg-image"
            style={{ backgroundImage: 'url("/img/photos/bg8.jpg")' }}>
            <div className="container h-100">
              <div className="row h-100">
                <div className="col-md-11 col-lg-8 col-xl-7 col-xxl-6 mx-auto text-center justify-content-center align-self-center">
                  <h2 className="display-1 fs-56 mb-4 text-white animate__animated animate__slideInDown animate__delay-1s">
                    We are trusted by over a million customers.
                  </h2>

                  <p className="lead fs-23 lh-sm mb-7 text-white animate__animated animate__slideInRight animate__delay-2s">
                    Here a few reasons why our customers choose us.
                  </p>

                  <div className="animate__animated animate__slideInUp animate__delay-3s">
                    <a
                      data-glightbox
                      href="/media/movie.mp4"
                      className="btn btn-circle btn-white btn-play ripple mx-auto mb-5">
                      <i className="icn-caret-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <div
            className="swiper-slide bg-overlay bg-overlay-400 bg-dark bg-image"
            style={{ backgroundImage: 'url("/img/photos/bg11.jpg")' }}>
            <div className="container h-100">
              <div className="row h-100">
                <div className="col-md-10 offset-md-1 col-lg-7 offset-lg-5 col-xl-6 offset-xl-6 col-xxl-5 offset-xxl-6 text-center text-lg-start justify-content-center align-self-center align-items-start">
                  <h2 className="display-1 fs-56 mb-4 text-white animate__animated animate__slideInDown animate__delay-1s">
                    봉사활동 사진첩
                  </h2>

                  <p className="lead fs-23 lh-sm mb-7 text-white animate__animated animate__slideInRight animate__delay-2s">
                    함께 나눈 따뜻한 마음과 나눔의 기쁨을 살펴보세요.
                  </p>

                  <div className="animate__animated animate__slideInUp animate__delay-3s">
                    <NextLink title="Contact Us" onClick={(e)=>handlePage(e , '/photo')} href="#" className="btn btn-lg btn-outline-white rounded-pill" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
}
