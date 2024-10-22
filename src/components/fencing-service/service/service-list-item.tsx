'use client'

import NextLink from "components/reuseable/links/NextLink"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { ReactElement } from "react";
interface BlogCard2Props {
    link: string;
    list : ServiceListDataType
    title: string;
    category: string;
    description: string;
    cardTop: ReactElement;
}
export default function ServiceListItem ({ cardTop, title, category, description, link , list }: BlogCard2Props) {
    const router = useRouter()
    function handlePage (e:React.MouseEvent , id : number) {
        e.preventDefault()
        router.push(`/service/${id}`)
    }
    return(
        <>
        <article className="post">
            <div className="card">
                <div className="card-body">
                <div className="post-header">
                    <div className="post-category text-line" style={{fontSize : '18px', color : 'red'}}>
                    <NextLink title={list?.status === 'Y' ? '[모집 중]' : '[마감]'} href="#" className="hover" />
                    {list?.isApply === 'Y' &&
                    <div>
                        <i className="fas fa-heart" style={{color: 'pink', marginLeft: '8px'}} /> {/* 파란색 가득찬 별 */}
                    </div>
                    }
                    </div>

                    <h2 className="post-title mt-1 mb-0" onClick={(e)=>handlePage(e , list?.id)}>
                    <NextLink title={list?.title} className="link-dark" href={''} />
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
                        <span>모집기간 : {list?.applyDate}</span>
                        </li>

                        <li className="post-author">
                        <Link href="#">
                            <i className="uil uil-user" />
                            <span>등록 기관 : {list?.registrar}</span>
                        </Link>
                        </li>

                        <li className="post-author">
                        <Link href="#">
                            <i className="uil uil-user" />
                            <span>모집 기관 : {list?.agency}</span>
                        </Link>
                        </li>

                    </ul>

                <div className="d-flex justify-content-between align-items-center">
                    <ul className="post-meta d-flex mb-0">
                    <li className="post-date">
                        <i className="uil uil-calendar-alt" />
                        <span>봉사기간 : {list?.serviceDate} <strong>( 총 {list?.duration}시간 )</strong></span>
                    </li>
                    </ul>

                    <Link onClick={(e)=>handlePage(e , list?.id)} style={{top : '10px'}} href="#" className="btn btn-expand btn-primary rounded-pill me-5 mb-3 mb-lg-0">
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