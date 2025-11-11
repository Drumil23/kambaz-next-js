import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
import { v4 as uuidv4 } from "uuid";
import type { Assignment } from "../../Database/types";

interface AssignmentsState {
	assignments: Assignment[];
}

const initialState: AssignmentsState = {
	assignments: assignments as Assignment[],
};

const assignmentsSlice = createSlice({
	name: "assignments",
	initialState,
	reducers: {
		addAssignment: (state, action: PayloadAction<Partial<Assignment>>) => {
			const payload = action.payload;
					const newAssignment: Assignment = {
						_id: payload._id ?? uuidv4(),
						title: payload.title ?? "New Assignment",
						course: payload.course ?? "",
						description: payload.description ?? "",
						points: payload.points ?? 0,
						dueDate: payload.dueDate ?? "",
						availableFrom: payload.availableFrom ?? "",
						type: payload.type ?? "Assignment",
						status: payload.status ?? "DRAFT",
					};
			state.assignments = [...state.assignments, newAssignment];
		},
		deleteAssignment: (state, action: PayloadAction<string>) => {
			const assignmentId = action.payload;
			state.assignments = state.assignments.filter((a) => a._id !== assignmentId);
		},
		updateAssignment: (state, action: PayloadAction<Assignment>) => {
			const updated = action.payload;
			state.assignments = state.assignments.map((a) => (a._id === updated._id ? updated : a));
		},
	},
});

export const { addAssignment, deleteAssignment, updateAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
