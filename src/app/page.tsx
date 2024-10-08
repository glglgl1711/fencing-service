import { Fragment } from "react";
import { Hero15 } from "components/blocks/hero";
import Header from "components/layout/header/Header";
export default function Home() {
  return (
    <>
    <Fragment>
      
      {/* ========== header ========== */}
      <header className="wrapper bg-soft-primary">
        <Header
          info
          search
          stickyBox={true}
          logoAlt="logo-light"
          navClassName="navbar navbar-expand-lg center-nav transparent position-absolute navbar-dark caret-none"
        />
      </header>

      {/* ========== main content ========== */}
      <main className="content-wrapper">
        {/* ========== hero sections ========== */}
        <Hero15 />

      </main>

      {/* ========== footer section ========== */}
    </Fragment>
    </>
  );
}
