import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { courses } from "../Database";
import { v4 as uuidv4 } from "uuid";
import type { Course } from "../Database/types";

interface CoursesState {
  courses: Course[];
}

const initialState: CoursesState = {
  courses: courses as Course[],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addNewCourse: (state, action: PayloadAction<Partial<Course>>) => {
      const course = action.payload;
      const newCourse: Course = {
        _id: uuidv4(),
        name: course.name ?? "",
        number: course.number ?? "",
        startDate: course.startDate ?? "",
        endDate: course.endDate ?? "",
      };
      state.courses = [...state.courses, newCourse];
    },
    deleteCourse: (state, action: PayloadAction<string>) => {
      const courseId = action.payload;
      state.courses = state.courses.filter((c) => c._id !== courseId);
    },
    updateCourse: (state, action: PayloadAction<Course>) => {
      const updated = action.payload;
      state.courses = state.courses.map((c) => (c._id === updated._id ? updated : c));
    },
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
  },
});
export const { addNewCourse, deleteCourse, updateCourse } = coursesSlice.actions;
export default coursesSlice.reducer;