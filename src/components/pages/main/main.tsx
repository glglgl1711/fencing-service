'use client'

import { useState, useEffect } from 'react';
import Link from "next/link";

export default function MainPageSection() {
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
            <div className="card" style={{ flex: '1', marginRight: isMobile ? '0' : '10px', marginBottom: isMobile ? '10px' : '0' }}>
                <div className="card-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <ul className="nav nav-tabs nav-tabs-basic">
                            <li className="nav-item">
                                <a className="nav-link active" data-bs-toggle="tab" href="#tab3-1">
                                    공지사항
                                </a>
                            </li>
                        </ul>
                        <Link href="#" style={{ color: 'gray', textDecoration: 'none', transition: 'border-bottom 0.3s' }}>
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
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>2024.09.06</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>2024.09.06</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td colSpan={2}>Larry the Bird</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card" style={{ flex: '1', marginLeft: isMobile ? '0' : '10px' }}>
                <div className="card-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <ul className="nav nav-tabs nav-tabs-basic">
                            <li className="nav-item">
                                <a className="nav-link active" data-bs-toggle="tab" href="#tab3-2">
                                    활동
                                </a>
                            </li>
                        </ul>
                        <Link href="#" style={{ color: 'gray', textDecoration: 'none', transition: 'border-bottom 0.3s' }}>
                            <span style={{ position: 'relative', padding: '0 5px', cursor: 'pointer' }} className="more">
                                더보기
                                <span style={{ position: 'absolute', left: '0', right: '0', bottom: '-2px', height: '2px', backgroundColor: 'gray', transform: 'scaleX(0)', transition: 'transform 0.3s' }} />
                            </span>
                        </Link>
                    </div>

                    <div className="tab-content mt-0 mt-md-5">
                        <div className="tab-pane fade show active" id="tab3-2">
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                                {[...Array(2)].map((_, index) => (
                                    <div className="item" key={index}>
                                        <figure className="overlay overlay-3 overlay-gradient-2 hover-scale rounded">
                                            <Link href="#">
                                                <img
                                                    src={`/img/photos/p${index + 1}.jpg`}
                                                    srcSet={`/img/photos/p${index + 1}@2x.jpg 2x`}
                                                    alt={`Photo ${index + 1}`}
                                                    style={{ width: '100%', borderRadius: '5px' }}
                                                />
                                                <span className="bg" />
                                            </Link>
                                            <figcaption>
                                                <h5 className="from-left mb-1">Some Title {index + 1}</h5>
                                                <p className="from-left mb-0">Some Description {index + 1}</p>
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