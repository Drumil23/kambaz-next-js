"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";

export default function CourseNavigation() {
  const pathname = usePathname();
  const params = useParams();
  const { cid } = params;
  
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const href = link === "People" ? `/Courses/${cid}/People/Table` : `/Courses/${cid}/${link}`;
        const isActive = pathname.includes(link);
        return (
          <Link
            key={link}
            href={href}
            id={`wd-course-${link.toLowerCase()}-link`}
            className={`list-group-item border-0 ${
              isActive ? "active" : "text-danger"
            }`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
