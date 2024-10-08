'use client'

import NextLink from "components/reuseable/links/NextLink"
import Link from "next/link"
import { ReactElement } from "react";
interface BlogCard2Props {
    link: string;
    title: string;
    category: string;
    description: string;
    cardTop: ReactElement;
}
export default function ServiceListItem ({ cardTop, title, category, description, link }: BlogCard2Props) {

    return(
        <>
        <article className="post">
            <div className="card">
                {}
                <div className="card-body">
                <div className="post-header">
                    <div className="post-category text-line" style={{fontSize : '18px', color : 'red'}}>
                    <NextLink title={'[모집 중]'} href="#" className="hover" />
                    </div>

                    <h2 className="post-title mt-1 mb-0">
                    <NextLink title={'인천 ㅇㅇ 복지관 자원봉사자를 구합니다.'} className="link-dark" href={''} />
                    </h2>
                </div>

                {/* <div className="post-content">
                    <p>{'ㅁㅇㄴㄹㅎㅁㄴㅇㅎ'}</p>
                </div> */}
                </div>

                <div className="card-footer">
                <ul className="post-meta d-flex mb-0">
                    <li className="post-date">
                    <i className="uil uil-calendar-alt" />
                    <span>모집기간 : 2024.06.23 ~ 2024.09.01</span>
                    </li>

                    <li className="post-author">
                    <Link href="#">
                        <i className="uil uil-user" />
                        <span>등록 기관 : 인천 광역시</span>
                    </Link>
                    </li>

                    <li className="post-author">
                    <Link href="#">
                        <i className="uil uil-user" />
                        <span>모집 기관 : 울타리 자원봉사단체</span>
                    </Link>
                    </li>

                </ul>

                <div className="d-flex justify-content-between align-items-center">
                    <ul className="post-meta d-flex mb-0">
                    <li className="post-date">
                        <i className="uil uil-calendar-alt" />
                        <span>봉사기간 : 2024.09.06 ~ 2024.09.06 <strong>( 총 00시간 )</strong></span>
                    </li>
                    </ul>

                    <Link href="#" className="btn btn-expand btn-primary rounded-pill me-5 mb-3 mb-lg-0">
                    <i className="uil uil-arrow-right" />
                    <span>신청하러가기</span>
                    </Link>
                </div>

                </div>
            </div>
            </article>
        </>
    )
}