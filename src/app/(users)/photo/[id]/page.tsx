import Image from "next/image";
import { Fragment } from "react";
import ProjectDetailsContent from "components/common/ProjectDetailsContent";
import ProjectDetailsNavigation from "components/common/ProjectDetailsNavigation";
import axios from "axios";
interface ParamsType {
    params : {id : string}
}
export default async function PhotoView ({params : {id}} : ParamsType) {
    const response = await axios.get(`${process.env.HOST_URL}/api/photo/detail?id=${id}`) 
    
    const data = 
    response?.data?.result === true ? response?.data : null;

    return(
        <>
        <Fragment>
        <main className="content-wrapper">

            <section className="wrapper bg-light wrapper-border">
            <div className="container py-14 py-md-16">
                {/* ========== details section ========== */}
                <ProjectDetailsContent
                    title={data?.title}
                    titleClass="display-4 mb-4"
                    contentRowClass="row gx-0 mb-12"
                />

                {/* ========== gallery section ========== */}

                <div className="row gy-6 mb-12">
                    {data?.photo?.map((list:any , index:number) => (
                        <div className={'col-md-12'} key={index}>
                            <figure className="hover-scale rounded cursor-dark">
                                <a href={list?.url} data-glightbox data-gallery="project-4">
                                <Image width={1290} height={10} src={list?.url} alt="demo" className="w-100 h-auto" />
                                </a>
                            </figure>
                        </div>
                    ))}
                </div>

                {/* <div className="row gy-6 mb-12">
                    {gallery1.map(({ width, height, id, url, className, fullUrl }) => (
                        <div className={className} key={id}>
                            <figure className="hover-scale rounded cursor-dark">
                                <a href={fullUrl} data-glightbox data-gallery="project-4">
                                <Image width={width} height={height} src={url} alt="demo" className="w-100 h-auto" />
                                </a>
                            </figure>
                        </div>
                    ))}
                </div> */}

                {/* <div className="row gy-6">
                    {gallery2.map(({ width, height, id, url, className, fullUrl }) => (
                        <div className={className} key={id}>
                        <figure className="hover-scale rounded cursor-dark">
                            <a href={fullUrl} data-glightbox data-gallery="project-4">
                            <Image width={width} height={height} src={url} alt="demo" className="w-100 h-auto" />
                            </a>
                        </figure>
                        </div>
                    ))}
                </div> */}
            </div>
            </section>

            {/* ========== navigation section ========== */}
            < ProjectDetailsNavigation/>
        </main>

        </Fragment>
        </>
    )
}