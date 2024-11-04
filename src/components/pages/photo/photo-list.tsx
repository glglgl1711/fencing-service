'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
interface DataType {
    id : number , title : string , thumnail : string , date : string , count : number
}
interface Props {
    data : DataType[]
}
export default function PhotoListItem ({
    data
} : Props) {

    const router = useRouter()

    return (
        <>
        {data?.map((list:DataType , index : number) => (
            <div 
                onClick={()=>router.push(`/photo/${list?.id}`)} 
                style={{cursor : 'pointer'}} 
                key={index} 
                className={`project item col-md-6 col-xl-4 workshop`}
            >
                <figure className="lift rounded mb-6 img-container" style={{width : '360px' , height : '250px' , overflow : 'hidden'}}>
                    <img src={list?.thumnail} className="fixed-size-img" style={{width : '100%' , height : '100%', objectFit : 'cover' , objectPosition : 'center'}}/>
                </figure>
                <div className="project-details d-flex justify-content-center flex-column">
                    <div className="post-header">
                        <div className={`post-category text-line mb-3 text-purple`}>{list?.date}</div>
                        <h2 className="post-title h3">{list?.title}</h2>
                    </div>
                </div>
            </div>
        ))}
        </>
    )
}