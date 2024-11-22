import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "./Database";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface EnrollmentState {
  enrollments: Enrollment[];
  enrollmentsOn: boolean;
}

const initialState: EnrollmentState = {
  enrollments: JSON.parse(localStorage.getItem("enrollments") || JSON.stringify(enrollments)),
  enrollmentsOn: false,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
      localStorage.setItem("enrollments", JSON.stringify(action.payload));
    },
    enroll: (state, { payload }) => {
      const newEnrollment = {
        _id: new Date().getTime().toString(),
        user: payload.user,
        course: payload.course,
      };
      state.enrollments = [...state.enrollments, newEnrollment];
      localStorage.setItem("enrollments", JSON.stringify(state.enrollments));
    },
    unenroll: (state, { payload }) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === payload.user && e.course === payload.course)
      );
      localStorage.setItem("enrollments", JSON.stringify(state.enrollments));
    },
    enrollmentsOnSwitch: (state) => {
      state.enrollmentsOn = !state.enrollmentsOn;
      localStorage.setItem("enrollmentsOn", JSON.stringify(state.enrollmentsOn));
    },
  },
});

export const { setEnrollments, enroll, unenroll, enrollmentsOnSwitch } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;