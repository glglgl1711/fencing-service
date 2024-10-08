'use client'

import DropdownToggleLink from "components/reuseable/links/DropdownToggleLink"
import { useRouter } from "next/navigation"
interface Props {
    title : string,
    url : string
}
export default function HeaderItem ({title , url} : Props) {
    const router = useRouter()
    return(
        <>
        <li 
            className="nav-item dropdown"
            onClick={()=>router.push(url)}
        >
            <DropdownToggleLink title={title} className="nav-link dropdown-toggle" />

            {/* <ul className="dropdown-menu">
                {blogsNavigation.map(({ id, url, title, children }) => {
                if (!url && children) {
                    return (
                    <li className="dropdown dropdown-submenu dropend" key={id}>
                        <DropdownToggleLink title="Blog Posts" />
                        <ul className="dropdown-menu">{renderLinks(children)}</ul>
                    </li>
                    );
                }
                return <ListItemLink key={id} href={url} title={title} linkClassName="dropdown-item" />;
                })}
            </ul> */}
        </li>
        </>
    )
}