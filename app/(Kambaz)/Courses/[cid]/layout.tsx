"use client";
import { ReactNode, use } from "react";
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";
import type { Course } from "../../Database/types";
import { FaAlignJustify } from "react-icons/fa6";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
 const cidStr = Array.isArray(cid) ? cid[0] : cid;
 const { courses } = useSelector((state: RootState) => state.coursesReducer);
 const course = courses.find((c: Course) => c._id === cidStr);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course ? course.name : `Course ${cid}`} </h2> <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          {children}
        </div>
      </div>
    </div>
  );
}
