import { Fragment } from "react";
import { Hero15 } from "components/blocks/hero";
import MainPageSection from "components/pages/main/main";
export default function Home() {
  return (
    <>
    <Fragment>
      
      <main className="content-wrapper">
        <Hero15 />

        <MainPageSection/>
        
      </main>

    </Fragment>
    
    </>
  );
}
