'use client'
import { useRouter } from "next/navigation";
import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

// ==========================================================
interface DropdownToggleLinkProps
  extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  title: string;
}
// ==========================================================

export default function DropdownToggleLink({ title, className, ...others }: DropdownToggleLinkProps) {
  function click (e : React.MouseEvent) {
    e.preventDefault()
  }
  return (
    <a 
      href="#" 
      onClick={(e)=>click(e)}
      // data-bs-toggle="dropdown" 
      className={className || "dropdown-item dropdown-toggle"} 
      {...others}
    >
      {title}
    </a>
  );
}
