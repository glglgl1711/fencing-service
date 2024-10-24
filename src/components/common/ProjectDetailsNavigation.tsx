'use client'
import { useRouter } from "next/navigation";
import ShareButton from "./ShareButton";
interface Props {
  next?:number
  prev?:number
}
export default function ProjectDetailsNavigation({
  next , prev
} : Props) {
  const router = useRouter()
  return (
    <section className="wrapper bg-light">
      <div className="container py-10">
        <div className="row gx-md-6 gy-3 gy-md-0">
          <div className="col-md-8 align-self-center text-center text-md-start navigation">
            {prev &&
            <button className="btn btn-soft-ash rounded-pill btn-icon btn-icon-start mb-0 me-1"
              onClick={()=>router.push(`/news/${prev}`)}
            >
              <i className="uil uil-arrow-left" /> Prev Post
            </button>
            }

            {next &&
            <button className="btn btn-soft-ash rounded-pill btn-icon btn-icon-end mb-0"
              onClick={()=>router.push(`/news/${next}`)}
            >
              Next Post <i className="uil uil-arrow-right" />
            </button>
            }
          </div>

          <aside className="col-md-4 sidebar text-center text-md-end">
            <ShareButton />
          </aside>
        </div>
      </div>
    </section>
  );
}
