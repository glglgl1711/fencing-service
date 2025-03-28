import { Fragment } from "react";
import { Footer8 } from "components/blocks/footer";
import Header from "components/layout/header/Header";
import { simpleDarkMarkup } from "markups/elements/tables";
import NewsListItem from "components/pages/news/new-list";
import axios from "axios";
import { Metadata } from "next";
interface SearchParamsType {
    searchParams : {
        page : number , keyword : string
    }
}
export const metadata: Metadata = {
    title: "울타리 봉사단체 - 공지사항",
    description: "울타리 봉사단체 - 공지사항",
  };
export default async function News ({searchParams : {page , keyword}} :SearchParamsType) {
    const response = await axios.get(`${process.env.HOST_URL}/api/news/getNews?page=${page || 1}&size=10&keyword=${keyword || ''}&column=news_date&order=desc`)
    const data = response?.data?.result === true ? response?.data?.news : [];
    const totalCount = response?.data?.result === true ? response?.data?.totalCount : 0;
    return(
        <>
        {/* <Header /> */}
        <main className="content-wrapper">
            <section className="wrapper image-wrapper bg-image bg-overlay bg-overlay-400 text-white" style={{height : '340px'}}>
                <div className="container pt-10 pt-md-14">
                    <div className="row">
                        <div className="col-md-8 col-lg-7 col-xl-6 col-xxl-5">
                        <h1 className="display-1 mb-3 text-white">공지사항</h1>
                        <p className="lead fs-lg pe-lg-10 pe-xxl-1">
                            우리 봉사단체의 중요한 소식과 <br/> 활동 안내를 확인하세요.  <br/>
                        </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="wrapper bg-light angled upper-end">
                <div className="container py-14 py-md-10">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col" style={{ width: "10%" }}>No.</th>
                            <th scope="col" style={{ width: "60%" }}>제 목</th>
                            <th scope="col" style={{ width: "15%" }}>일 자</th>
                            <th scope="col" style={{ width: "15%" }}>조회</th>
                            </tr>
                        </thead>
                        <tbody>
                            <NewsListItem
                                data={data}
                                page={page || 1}
                                keyword={keyword || ''}
                                totalCount={totalCount}
                            />
                        </tbody>
                    </table>
                </div>
            </section>

        </main>
        </>
    )
}