'use client'

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CalculateIndexNumber from 'components/calculateIndex';
interface Props {data : 
    {
        result : boolean
        news : []
        gallery : []
    }
}
export default function MainPageSection({
    data
} : Props) {
    const router = useRouter()
    const { news , gallery } = data;
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const wrapperStyle : any = {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: isMobile ? 'column' : 'row',
        gap: '10px',
    };

    return (
        <section id="snippet-1" className="wrapper" style={wrapperStyle}>
            <div className="card mb-10" style={{ flex: '1', marginRight: isMobile ? '0' : '10px', marginBottom: isMobile ? '10px' : '0' }}>
                <div className="card-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <ul className="nav nav-tabs nav-tabs-basic">
                            <li className="nav-item">
                                <a className="nav-link active" data-bs-toggle="tab" href="#tab3-1">
                                    공지사항
                                </a>
                            </li>
                        </ul>
                        <Link href="#" onClick={
                            (e) => {e.preventDefault(); router.push('/news')}
                        } style={{ color: 'gray', textDecoration: 'none', transition: 'border-bottom 0.3s' }}>
                            <span style={{ position: 'relative', padding: '0 5px', cursor: 'pointer' }} className="more">
                                더보기
                                <span style={{ position: 'absolute', left: '0', right: '0', bottom: '-2px', height: '2px', backgroundColor: 'gray', transform: 'scaleX(0)', transition: 'transform 0.3s' }} />
                            </span>
                        </Link>
                    </div>

                    <div className="tab-content mt-0 mt-md-5">
                        <div className="tab-pane fade show active" id="tab3-1">
                            <table className={`table Hoverable`}>
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ width: '5%' }}>No.</th>
                                        <th scope="col">제 목</th>
                                        <th scope="col" style={{ width: '15%' }}>일 자</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {news?.map((list: {id : number , title : string , date : string , count : number} , index:number) => {
                                        return(
                                        <tr>
                                            <th scope="row" key={index}>
                                                {CalculateIndexNumber(1 , 4, 3, index)}
                                            </th>
                                            <td>{list?.title}</td>
                                            <td>{list?.date}</td>
                                        </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-10" style={{ flex: '1', marginLeft: isMobile ? '0' : '10px' }}>
                <div className="card-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <ul className="nav nav-tabs nav-tabs-basic">
                            <li className="nav-item">
                                <a className="nav-link active" data-bs-toggle="tab" href="#tab3-2">
                                    활동
                                </a>
                            </li>
                        </ul>
                        <Link href="#" style={{ color: 'gray', textDecoration: 'none', transition: 'border-bottom 0.3s' }} onClick={
                            (e) => {e.preventDefault(); router.push('/photo')}
                        }>
                            <span style={{ position: 'relative', padding: '0 5px', cursor: 'pointer' }} className="more">
                                더보기
                                <span style={{ position: 'absolute', left: '0', right: '0', bottom: '-2px', height: '2px', backgroundColor: 'gray', transform: 'scaleX(0)', transition: 'transform 0.3s' }} />
                            </span>
                        </Link>
                    </div>

                    <div className="tab-content mt-0 mt-md-5">
                        <div className="tab-pane fade show active" id="tab3-2">
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                                {gallery?.map((list:{id : number , title : string , thumnail : string , date : string} , index:number) => (
                                    <div className="item" key={index}>
                                        <figure className="overlay overlay-3 overlay-gradient-2 hover-scale rounded">
                                            <Link href="#">
                                                <Image
                                                    src={list?.thumnail}
                                                    width={360}
                                                    height={250}
                                                    alt='image'
                                                />
                                                {/* <img
                                                    src={list?.thumnail}
                                                    srcSet={list?.thumnail}
                                                    alt={`Photo ${index + 1}`}
                                                    style={{ width: '100%', borderRadius: '5px' }}
                                                /> */}
                                                <span className="bg" />
                                            </Link>
                                            <figcaption>
                                                <h5 className="from-left mb-1">{list?.title}</h5>
                                                <p className="from-left mb-0">{list?.date}</p>
                                            </figcaption>
                                        </figure>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}