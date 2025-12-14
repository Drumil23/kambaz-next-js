import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Enrollment } from "../../Database/types";

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
    },
    enroll: (state, action: PayloadAction<{ user: string; course: string }>) => {
      const { user, course } = action.payload;
      const exists = state.enrollments.some((e) => e.user === user && e.course === course);
      if (!exists) state.enrollments.push({ _id: `${user}-${course}`, user, course } as Enrollment);
    },
    unenroll: (state, action: PayloadAction<{ user: string; course: string }>) => {
      const { user, course } = action.payload;
      state.enrollments = state.enrollments.filter((e) => !(e.user === user && e.course === course));
    },
  },
});

export const { setEnrollments, enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
