import NextLink from "components/reuseable/links/NextLink";

// =======================================================
interface ProjectDetailsContentProps {
  title: string;
  titleClass?: string;
  contentRowClass?: string;
}
// =======================================================

export default function ProjectDetailsContent({
  title,
  contentRowClass = "row gx-0",
  titleClass = "display-6 mb-4"
}: ProjectDetailsContentProps) {
  return (
    <div className="row">
      <div className="col-lg-10 offset-lg-1">
        <h2 className={titleClass}>{title}</h2>
        <span className="date">{'2024-09-06'}</span>
        <div className={contentRowClass}>
          
        </div>
      </div>
    </div>
  );
}
