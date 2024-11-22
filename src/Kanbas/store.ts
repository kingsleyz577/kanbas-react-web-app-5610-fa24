import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import enrollmentsReducer from "./reducer";

const preloadedState = {
  accountReducer: {
    currentUser: JSON.parse(localStorage.getItem("currentUser") || "null")
  }
};

const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentsReducer,
  },
  preloadedState
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("currentUser", JSON.stringify(state.accountReducer.currentUser));
});

export default store;