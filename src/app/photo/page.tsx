'use client'

import { Fragment } from "react";
import Navbar from "components/blocks/navbar/navbar-1";
import NextLink from "components/reuseable/links/NextLink";
import Link from "next/link";
import Image from "next/image";
import { Footer8 } from "components/blocks/footer";
import { filterItems, projectList } from "./data";
import Header from "components/layout/header/Header";

export default function Photo () {
    return(
    <Fragment>
        
        <Header/>
        
        <main className="content-wrapper">
        <section className="wrapper bg-light">
            <div className="container pt-10 pt-md-14">
            <div className="row">
                <div className="col-md-8 col-lg-7 col-xl-6 col-xxl-5">
                <h1 className="display-1 mb-3">사진첩</h1>
                <p className="lead fs-lg pe-lg-15 pe-xxl-12">
                    함께 나눈 따뜻한 마음과 나눔의 기쁨 <br/>
                    더 나은 내일을 향해 한 걸음씩 내딛는<br/> 우리의 이야기
                </p>
                </div>
            </div>
            </div>
        </section>

        <section className="wrapper bg-light">
            <div className="container py-14 py-md-16">
                <div className="grid grid-view projects-masonry">
                    <div className="row gx-md-8 gy-10 gy-md-13 isotope">
                        <div style={{cursor : 'pointer'}} key={1} className={`project item col-md-6 col-xl-4 workshop`}>
                            <figure className="lift rounded mb-6">
                                <Image
                                    alt={''}
                                    src={'/img/photos/cs17.jpg'}
                                    width={1300}
                                    height={1300}
                                    className="w-100 h-auto"
                                />
                            </figure>
                            <div className="project-details d-flex justify-content-center flex-column">
                                <div className="post-header">
                                    <div className={`post-category text-line mb-3 text-purple`}>2024-09-06</div>
                                    <h2 className="post-title h3">사진 모음 - 1</h2>
                                </div>
                            </div>
                        </div>
                        <div key={1} className={`project item col-md-6 col-xl-4 workshop`}>
                            <figure className="lift rounded mb-6">
                                <Image
                                    alt={''}
                                    src={'/img/photos/cs17.jpg'}
                                    width={1300}
                                    height={1300}
                                    className="w-100 h-auto"
                                />
                            </figure>
                            <div className="project-details d-flex justify-content-center flex-column">
                                <div className="post-header">
                                    <div className={`post-category text-line mb-3 text-purple`}>2024-09-06</div>
                                    <h2 className="post-title h3">사진 모음 - 1</h2>
                                </div>
                            </div>
                        </div>
                        <div key={1} className={`project item col-md-6 col-xl-4 workshop`}>
                            <figure className="lift rounded mb-6">
                                <Image
                                    alt={''}
                                    src={'/img/photos/cs17.jpg'}
                                    width={1300}
                                    height={1300}
                                    className="w-100 h-auto"
                                />
                            </figure>
                            <div className="project-details d-flex justify-content-center flex-column">
                                <div className="post-header">
                                    <div className={`post-category text-line mb-3 text-purple`}>2024-09-06</div>
                                    <h2 className="post-title h3">사진 모음 - 1</h2>
                                </div>
                            </div>
                        </div><div key={1} className={`project item col-md-6 col-xl-4 workshop`}>
                            <figure className="lift rounded mb-6">
                                <Image
                                    alt={''}
                                    src={'/img/photos/cs17.jpg'}
                                    width={1300}
                                    height={1300}
                                    className="w-100 h-auto"
                                />
                            </figure>
                            <div className="project-details d-flex justify-content-center flex-column">
                                <div className="post-header">
                                    <div className={`post-category text-line mb-3 text-purple`}>2024-09-06</div>
                                    <h2 className="post-title h3">사진 모음 - 1</h2>
                                </div>
                            </div>
                        </div>
                        <div key={1} className={`project item col-md-6 col-xl-4 workshop`}>
                            <figure className="lift rounded mb-6">
                                <Image
                                    alt={''}
                                    src={'/img/photos/cs17.jpg'}
                                    width={1300}
                                    height={1300}
                                    className="w-100 h-auto"
                                />
                            </figure>
                            <div className="project-details d-flex justify-content-center flex-column">
                                <div className="post-header">
                                    <div className={`post-category text-line mb-3 text-purple`}>2024-09-06</div>
                                    <h2 className="post-title h3">사진 모음 - 1</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </main>

    </Fragment>
    )
}