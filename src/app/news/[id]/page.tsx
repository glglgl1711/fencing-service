'use client'
import Image from "next/image";
import { Fragment } from "react";
// GLOBAL CUSTOM HOOKS
import useLightBox from "hooks/useLightBox";
// GLOBAL CUSTOM COMPONENTS
import { Footer8 } from "components/blocks/footer";
import Navbar from "components/blocks/navbar/navbar-1";
import NextLink from "components/reuseable/links/NextLink";
import ProjectDetailsContent from "components/common/ProjectDetailsContent";
import ProjectDetailsNavigation from "components/common/ProjectDetailsNavigation";
import Header from "components/layout/header/Header";

export default function PhotoView () {

    return(
        <>
        <Fragment>
        <Header />
        <main className="content-wrapper">

            <section className="wrapper bg-light wrapper-border">
            <div className="container py-14 py-md-16">
                {/* ========== details section ========== */}

                <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                        <h2 className={'display-4 mb-4'}>{'인천 남동구 ㅇㅇ 주민회 자원봉사 '}</h2>

                        <div className={'row gx-0 mb-12'}>
                            <div className="col-md-9 text-justify">
                                <p>
                                Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris
                                condimentum nibh, ut fermentum massa justo sit amet risus. Integer posuere erat a ante venenatis. Etiam
                                porta sem malesuada magna mollis euismod. Aenean lacinia bibendum.
                                </p>
                                <p>
                                D
                                onec id elit non mi porta gravida at eget metus. Cras mattis consectetur purus sit amet fermentum.
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Aenean eu leo
                                quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis.
                                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                                onec id elit non mi porta gravida at eget metus. Cras mattis consectetur purus sit amet fermentum.
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Aenean eu leo
                                quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis.
                                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                                onec id elit non mi porta gravida at eget metus. Cras mattis consectetur purus sit amet fermentum.
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Aenean eu leo
                                quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis.
                                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                                onec id elit non mi porta gravida at eget metus. Cras mattis consectetur purus sit amet fermentum.
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Aenean eu leo
                                quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis.
                                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                                onec id elit non mi porta gravida at eget metus. Cras mattis consectetur purus sit amet fermentum.
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Aenean eu leo
                                quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis.
                                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                                </p>
                            </div>

                            <div className="col-md-2 ms-auto">
                                <ul className="list-unstyled">
                                <li>
                                    <h5 className="mb-1">작성날짜</h5>
                                    <p>2024.09.06</p>
                                </li>

                                <li>
                                    <h5 className="mb-1">작성자</h5>
                                    <p>관리자</p>
                                </li>
                                </ul>

                                {/* <NextLink title="See Project" href="#" className="more hover" /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>

            {/* ========== navigation section ========== */}
            < ProjectDetailsNavigation/>
        </main>

        </Fragment>
        </>
    )
}