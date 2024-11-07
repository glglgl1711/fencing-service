import AccordionList from "components/common/AccordionList";

export default function About () {

    return(
        <>
        <main className="content-wrapper">
            <section className="wrapper image-wrapper bg-image bg-overlay bg-overlay-400 text-white" style={{height : '340px'}}>
                <div className="container pt-10 pt-md-14">
                    <div className="row">
                        <div className="col-md-8 col-lg-7 col-xl-6 col-xxl-5">
                        <h1 className="display-1 mb-3 text-white">소개</h1>
                        <p className="lead fs-lg pe-lg-10 pe-xxl-1">
                            000 봉사단체를 소개합니다.
                        </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="wrapper bg-light angled upper-start">
                <div className="container py-14 py-md-16">
                    <div className="row gx-lg-8 gx-xl-8 gy-10 mb-14 mb-md-16 align-items-center">
                        <div className="col-lg-7">
                            <figure>
                            <img className="w-auto" src="/img/illustrations/i3.png" srcSet="/img/illustrations/i3@2x.png 2x" alt="" />
                            </figure>
                        </div>

                        <div className="col-lg-5">
                            <h2 className="fs-15 text-uppercase text-line text-primary mb-3">How It Works?</h2>
                            <h3 className="display-5 mb-7 pe-xxl-5">Everything you need on creating a business process.</h3>

                        </div>
                    </div>

                    <div className="row gx-lg-8 gx-xl-12 gy-10 align-items-center">
                        <div className="col-lg-7 order-lg-2">
                            <figure>
                            <img className="w-auto" src="/img/illustrations/i2.png" srcSet="/img/illustrations/i2@2x.png 2x" alt="" />
                            </figure>
                        </div>

                        <div className="col-lg-5">
                            <h3 className="display-4 mb-7 mt-lg-10">Few reasons why our valued customers choose us.</h3>
                            <AccordionList />
                        </div>
                    </div>
                </div>
            </section>

        </main>
        </>
    )
}