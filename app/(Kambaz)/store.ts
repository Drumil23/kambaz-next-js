import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/[cid]/Modules/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import enrollmentsReducer from "./Courses/enrollments/reducer";
import accountReducer from "./Account/reducer";

const store = configureStore({
 reducer: { coursesReducer, modulesReducer, assignmentsReducer, enrollmentsReducer, accountReducer, },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;