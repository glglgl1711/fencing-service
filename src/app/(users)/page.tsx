import { Fragment } from "react";
import { Hero15 } from "components/blocks/hero";
import MainPageSection from "components/pages/main/main";
export default function Home() {
  return (
    <>
    <Fragment>
      
      <main className="content-wrapper">
        <Hero15 />

        <div className="row mt-10 bm-10">
          <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2 mx-auto text-center">
            <h2 className="fs-15 text-uppercase text-muted mb-3">최신소식</h2>
            <h3 className="display-4 mb-10 px-xl-10 px-xxl-15">ooo 봉사단체 최신 소식과 활동을 확인해 보세요.</h3>
          </div>
        </div>

        <MainPageSection/>
        
      </main>

    </Fragment>
    
    </>
  );
}
