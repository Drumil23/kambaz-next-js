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

// Load persisted state from sessionStorage after store is created
const loadAndRestoreState = () => {
  try {
    if (typeof window === "undefined") return;
    const serialized = sessionStorage.getItem("kambaz.reduxState");
    if (!serialized) return;
    const state = JSON.parse(serialized);
    // Manually restore each slice
    if (state.coursesReducer) store.dispatch({ type: "courses/setCourses", payload: state.coursesReducer.courses });
    if (state.accountReducer) store.dispatch({ type: "account/setCurrentUser", payload: state.accountReducer.currentUser });
  } catch {
    // ignore
  }
};

// Save state to sessionStorage
const saveState = () => {
  try {
    if (typeof window === "undefined") return;
    const serialized = JSON.stringify(store.getState());
    sessionStorage.setItem("kambaz.reduxState", serialized);
  } catch {
    // ignore
  }
};

// Subscribe to store changes and persist to sessionStorage
store.subscribe(() => {
  saveState();
});

// Load state on initialization (client-side only)
if (typeof window !== "undefined") {
  loadAndRestoreState();
}

export default store;