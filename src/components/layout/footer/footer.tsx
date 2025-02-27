'use client'
// GLOBAL CUSTOM COMPONENTS
import NextLink from "components/reuseable/links/NextLink";
import SocialLinks from "components/reuseable/SocialLinks";
// CUSTOM DATA
import footerNav, { helps } from "data/footer";
import { useRouter } from "next/navigation";
export default function Footer () {
    const router = useRouter()
    function handlePage (url : string) {
        router.push(url)
    }
    return(
        <>
        <footer className="bg-dark text-inverse">
            <div className="container py-13 py-md-15">
                <div className="row gy-6 gy-lg-0">
                <div className="col-lg-4">
                    <div className="widget">
                    {/* <img className="mb-4" src="/img/logo-light.png" srcSet="/img/logo-light@2x.png 2x" alt="" /> */}

                    {/* <p className="mb-4">
                        © 2022 Sandbox. <br className="d-none d-lg-block" />
                        All rights reserved.
                    </p> */}

                    {/* <SocialLinks className="nav social social-white" /> */}
                    </div>
                </div>

                <div className="col-md-4 col-lg-2">
                    <div className="widget">
                    <h4 className="widget-title mb-3 text-white">둘러보기</h4>
                    <ul className="list-unstyled mb-0">
                        <li onClick={()=>handlePage('/about')} style={{cursor : 'pointer'}}>
                            소개
                        </li>
                        <li style={{cursor : 'pointer'}} onClick={()=>handlePage('/news')}>
                            공지사항
                        </li>
                        <li style={{cursor : 'pointer'}} onClick={()=>handlePage('/photo')}>
                            사진첩
                        </li>
                        {/* {helps.map(({ title, url }) => (
                        <li key={title}>
                            <NextLink title={title} href={url} />
                        </li>
                        ))} */}
                    </ul>
                    </div>
                </div>

                <div className="col-md-4 col-lg-2">
                    <div className="widget">
                    <h4 className="widget-title text-white mb-3">봉사 활동</h4>
                    <ul className="list-unstyled  mb-0">
                        <li style={{cursor : 'pointer'}} onClick={()=>handlePage('/service')}>
                            봉사 신청
                        </li>
                        <li style={{cursor : 'pointer'}} onClick={()=>handlePage('/my-service')}>
                            봉사 조회
                        </li>
                        {/* {footerNav.map(({ title, url }) => (
                        <li key={title}>
                            <NextLink title={title} href={url} />
                        </li>
                        ))} */}
                    </ul>
                    </div>
                </div>

                <div className="col-md-4 col-lg-2">
                    <div className="widget">
                    <h4 className="widget-title mb-3 text-white">연락처</h4>
                    <address>gunhee0906@gmail.com</address>
                    +82 10-9942-9161
                    </div>
                </div>

                
                </div>
            </div>
            </footer>
        </>
    )
}