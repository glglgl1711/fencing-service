import { Fragment } from "react";
import axios from "axios";
import PhotoListItem from "components/pages/photo/photo-list";
interface SearchParamsType {
    searchParams : {
        page : number , keyword : string
    }
}
export default async function Photo ({searchParams : {page, keyword}} : SearchParamsType) {

    const response = await axios.get(`${process.env.HOST_URL}/api/photo/getPhotos?page=${page || 1}&size=6&keyword=${keyword || ''}&column=gallery_date&order=desc`)
    
    const data = 
    response?.data?.result === true ? response?.data?.photos : [];

    const totalCount = 
    response?.data?.result === true ? response?.data?.totalCount : 0;

    return(
    <Fragment>
        
        {/* <Header/> */}
        
        <main className="content-wrapper">
        <section className="wrapper image-wrapper bg-image bg-overlay bg-overlay-400 text-white" style={{height : '340px'}}>
            <div className="container pt-10 pt-md-14">
            <div className="row">
                <div className="col-md-8 col-lg-7 col-xl-6 col-xxl-5">
                    <h1 className="display-1 mb-3 text-white">사진첩</h1>
                    <p className="lead fs-lg pe-lg-15 pe-xxl-12">
                        함께 나눈 따뜻한 마음과 나눔의 기쁨 <br/>
                    </p>
                </div>
            </div>
            </div>
        </section>

        <section className="wrapper bg-light angled upper-start">
            <div className="container py-14 py-md-14">
                <div className="grid grid-view projects-masonry">
                    <div className="row gx-md-8 gy-10 gy-md-13 isotope">

                        <PhotoListItem
                            data={data}
                        />

                    </div>
                </div>
            </div>
        </section>
        </main>

    </Fragment>
    )
}``