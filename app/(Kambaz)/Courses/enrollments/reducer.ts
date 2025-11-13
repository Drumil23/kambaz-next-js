import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enrollments as seedEnrollments } from "../../Database";
import type { Enrollment } from "../../Database/types";

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: seedEnrollments as Enrollment[],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, action: PayloadAction<{ user: string; course: string }>) => {
      const { user, course } = action.payload;
      // avoid duplicates
      const exists = state.enrollments.some((e) => e.user === user && e.course === course);
      if (!exists) state.enrollments.push({ _id: `${user}-${course}`, user, course } as Enrollment);
    },
    unenroll: (state, action: PayloadAction<{ user: string; course: string }>) => {
      const { user, course } = action.payload;
      state.enrollments = state.enrollments.filter((e) => !(e.user === user && e.course === course));
    },
  },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
