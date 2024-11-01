import { Fragment } from "react";
import ProjectDetailsNavigation from "components/common/ProjectDetailsNavigation";
import axios from "axios";

export default async function NewsView ( {params : {id}} : ParamsIdType ) {
    const response = await axios.get(`${process.env.HOST_URL}/api/news/detail?id=${id}`)
    
    const data = response?.data?.result === true ? response?.data?.news : null;
    const prev = response?.data?.result === true ? response?.data?.prev : 0;
    const next = response?.data?.result === true ? response?.data?.next : 0;
    return(
        <>
        <Fragment>
        
        <main className="content-wrapper">
            
            <section className="wrapper bg-light wrapper-border">
            <div className="container py-14 py-md-16">
                {/* ========== details section ========== */}

                <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                        <h2 className={'display-4 mb-4'}>{data?.title}</h2>

                        <div className={'row gx-0 mb-12 mt-15'}>
                            <div className="col-md-9 text-justify" 
                                dangerouslySetInnerHTML={{
                                    __html : data?.contents
                                }}
                            >
                                
                            </div>

                            <div className="col-md-2 ms-auto">
                                <ul className="list-unstyled">

                                <li>
                                    <h5 className="mb-1">작성날짜</h5>
                                    <p>{data?.date}</p>
                                </li>

                                {/* <li>
                                    <h5 className="mb-1">첨부파일</h5>
                                    <a>테스트 PDF_1.pdf</a>
                                </li> */}

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
            < ProjectDetailsNavigation 
                next={next}
                prev={prev}
            />
        </main>

        </Fragment>
        </>
    )
}