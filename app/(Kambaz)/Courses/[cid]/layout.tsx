"use client";
import { ReactNode, useState, useEffect } from "react";
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
  const [courseName, setCourseName] = useState(`Course ${cidStr}`);

  useEffect(() => {
    const course = courses.find((c: Course) => c._id === cidStr);
    if (course) {
      setCourseName(course.name);
    }
  }, [courses, cidStr]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {courseName} </h2> <hr />
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
