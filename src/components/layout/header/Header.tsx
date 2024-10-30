"use client";

import { Fragment, ReactElement, useEffect, useRef, useState } from "react";
// -------- CUSTOM HOOKS -------- //
import useSticky from "hooks/useSticky";
import useNestedDropdown from "hooks/useNestedDropdown";
// -------- CUSTOM COMPONENTS -------- //
import NextLink from "components/reuseable/links/NextLink";
import SocialLinks from "components/reuseable/SocialLinks";
// LOCAL CUSTOM COMPONENTS

import Info from "components/blocks/navbar/components/Info";
import BlogNavItem from "components/blocks/navbar/components/blog-nav-item";
import HeaderRight from "components/blocks/navbar/components/header-right";
import Signin from "components/blocks/navbar/components/signin";
import Signup from "components/blocks/navbar/components/signup";
import MiniCart from "components/blocks/navbar/components/mini-cart";
import HeaderItem from "./Header-item";
import LogoutForms from "components/elements/forms/LogoutForm";
import ModifyForm from "components/elements/forms/ModifyForm";
import FancyHeader from "components/blocks/navbar/components/fancy-header";

// ===================================================================
interface NavbarProps {
  auth : AuthType
  info?: boolean;
  cart?: boolean;
  fancy?: boolean;
  logoAlt?: string;
  search?: boolean;
  social?: boolean;
  language?: boolean;
  stickyBox?: boolean;
  navClassName?: string;
  button?: ReactElement;
  navOtherClass?: string;
}
// ===================================================================

export default function NavbarOne({
  auth,
  fancy,
  button,
  logoAlt,
  cart = false,
  info = false,
  social = false,
  search = false,
  language = false,
  stickyBox = true,
  navOtherClass = "navbar-other w-100 d-flex ms-auto",
  navClassName = "navbar navbar-expand-lg center-nav transparent navbar-light"
}: NavbarProps) {
  useNestedDropdown();
  const sticky = useSticky(350);
  const navbarRef = useRef<HTMLElement | null>(null);
  const [isOpen , setOpen] = useState<boolean>(false)
  const [modify , setModify] = useState<boolean>(false)
  // dynamically render the logo
  const logo = sticky ? "logo-dark" : logoAlt ?? "logo-dark";
  const [isMobile , setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // dynamically added navbar className
  const fixedClassName = "navbar navbar-expand-lg center-nav transparent navbar-light navbar-clone fixed";
  
  const headerContent = (
    <Fragment>
      <div className="navbar-brand w-100">
        <NextLink href="/" title={<img alt="logo" src={`/img/${logo}.png`} srcSet={`/img/${logo}@2x.png 2x`} />} />
      </div>

      <div id="offcanvas-nav" data-bs-scroll="true" className="navbar-collapse offcanvas offcanvas-nav offcanvas-start">
        <div className="offcanvas-header d-lg-none">
          <h3 className="text-white fs-30 mb-0">Sandbox</h3>
          {/* <button type="button" aria-label="Close" data-bs-dismiss="offcanvas" className="btn-close btn-close-white" /> */}
        </div>

        <div className="offcanvas-body ms-lg-auto d-flex flex-column h-100">
          <ul className="navbar-nav">

            <HeaderItem title={'공지사항'} url={'/news'}/>

            <HeaderItem title={'사진첩'} url={'/photo'}/>

            <HeaderItem title={'봉사신청'} url={'/service'}/>

            <HeaderItem title={'봉사조회'} url={'/my-service'}/>

          </ul>
        </div>
      </div>

       <HeaderRight
        cart={cart}
        info={info}
        button={
          <>
            {auth?.result ? (
              <>
                <li className="nav-item dropdown language-select text-uppercase">
                  <a
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    className="nav-link dropdown-item dropdown-toggle"
                  >
                    {auth?.users?.name}님
                  </a>

                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <button
                        className="dropdown-item"
                        onClick={() => setModify(!modify)}
                        data-bs-toggle="modal"
                        data-bs-target="#modal-modify"
                      >
                        내정보보기
                      </button>
                    </li>
                    <li className="nav-item">
                      <LogoutForms />
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <li
                className="nav-item"
                onClick={() => setOpen(true)}
                style={{ display: isMobile || !auth?.result ? "block" : "none" }}
              >
                <div className="d-flex align-items-center gap-3">
                  <a
                    className="nav-link"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-signin"
                  >
                    로그인
                  </a>
                </div>
              </li>
            )}
          </>
        }
        search={search}
        social={social}
        language={language}
        navOtherClass={navOtherClass}
      />
    </Fragment>
  );

  return (
    <Fragment>
      {stickyBox ? <div style={{ paddingTop: sticky ? navbarRef.current?.clientHeight : 0 }} /> : null}

      <nav ref={navbarRef} className={sticky ? fixedClassName : navClassName}>

        <div className="container flex-lg-row flex-nowrap align-items-center">{headerContent}</div>
        
      </nav>

      <Signin />

      <Signup />
      
      <ModifyForm auth={auth}/>

    </Fragment>
  );
}
