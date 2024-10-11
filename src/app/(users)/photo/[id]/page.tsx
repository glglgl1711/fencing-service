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
import { gallery1, gallery2 } from "./data";
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
                <ProjectDetailsContent
                    title="인천 남동구 ㅇㅇ 주민회 자원봉사 _ 2024.09.06"
                    titleClass="display-4 mb-4"
                    contentRowClass="row gx-0 mb-12"
                />

                {/* ========== gallery section ========== */}

                <div className="row gy-6 mb-12">
                    {gallery1.map(({ width, height, id, url, className, fullUrl }) => (
                        <div className={className} key={id}>
                        <figure className="hover-scale rounded cursor-dark">
                            <a href={fullUrl} data-glightbox data-gallery="project-4">
                            <Image width={width} height={height} src={url} alt="demo" className="w-100 h-auto" />
                            </a>
                        </figure>
                        </div>
                    ))}
                </div>

                <div className="row gy-6">
                    {gallery2.map(({ width, height, id, url, className, fullUrl }) => (
                        <div className={className} key={id}>
                        <figure className="hover-scale rounded cursor-dark">
                            <a href={fullUrl} data-glightbox data-gallery="project-4">
                            <Image width={width} height={height} src={url} alt="demo" className="w-100 h-auto" />
                            </a>
                        </figure>
                        </div>
                    ))}
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