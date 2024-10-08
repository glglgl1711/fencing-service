"use client";

import { Fragment, ReactElement, useRef, useState } from "react";
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
import Search from "components/blocks/navbar/components/search";
import HeaderItem from "./Header-item";
import { signIn } from "next-auth/react";

// ===================================================================
interface NavbarProps {
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
  // dynamically render the logo
  const logo = sticky ? "logo-dark" : logoAlt ?? "logo-dark";

  // dynamically added navbar className
  const fixedClassName = "navbar navbar-expand-lg center-nav transparent navbar-light navbar-clone fixed";

  // all main header contents
  const headerContent = (
    <Fragment>
      <div className="navbar-brand w-100">
        <NextLink href="/" title={<img alt="logo" src={`/img/${logo}.png`} srcSet={`/img/${logo}@2x.png 2x`} />} />
      </div>

      <div id="offcanvas-nav" data-bs-scroll="true" className="navbar-collapse offcanvas offcanvas-nav offcanvas-start">
        <div className="offcanvas-header d-lg-none">
          <h3 className="text-white fs-30 mb-0">Sandbox</h3>
          <button type="button" aria-label="Close" data-bs-dismiss="offcanvas" className="btn-close btn-close-white" />
        </div>

        <div className="offcanvas-body ms-lg-auto d-flex flex-column h-100">
          <ul className="navbar-nav">
          {/* <button onClick={()=>signIn('kakao')}></button> */}
            <HeaderItem title={'공지사항'} url={'/news'}/>

            <HeaderItem title={'사진첩'} url={'/photo'}/>

            <HeaderItem title={'봉사신청'} url={'/service'}/>

            <HeaderItem title={'봉사조회'} url={'/search-service'}/>

          </ul>

          {/* ============= show contact info in the small device sidebar ============= */}

        </div>
      </div>

      {/* ============= right side header content ============= */}
      <HeaderRight
        cart={cart}
        info={info}
        button={
        <>
        <li className="nav-item d-none d-md-block" onClick={()=>setOpen(true)}>
          <div className="d-flex align-items-center gap-3">
            <a className="nav-link" data-bs-toggle="modal" data-bs-target="#modal-signin">
              로그인
            </a>
          </div>
        </li>

        {/* <li className="nav-item dropdown language-select text-uppercase">
          <a
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            data-bs-toggle="dropdown"
            className="nav-link dropdown-item dropdown-toggle">
            고건희님
          </a>

          <ul className="dropdown-menu">
              <li className="nav-item" key={'1'}>
                <button className="dropdown-item">
                  내정보보기
                </button>
              </li>
          </ul>
        </li> */}
        
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
        {fancy ? (
          // <FancyHeader>{headerContent}</FancyHeader>
          <>
          </>
        ) : (
          <div className="container flex-lg-row flex-nowrap align-items-center">{headerContent}</div>
        )}
      </nav>
      <Signin />

      <Signup />
      
      {/* ============= info sidebar ============= */}
      {info ? <Info /> : null}

      {/* ============= show search box ============= */}
      {/* {search ? <Search /> : null} */}

      {/* ============= cart sidebar ============= */}
      {cart ? <MiniCart /> : null}
    </Fragment>
  );
}
