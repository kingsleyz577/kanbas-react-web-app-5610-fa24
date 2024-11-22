import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoute from "./Account/ProtectedRoute";
import ProtectedRouteCourse from "./Courses/ProtectedRouteCourse";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/Client";
import { setEnrollments } from "./reducer";

interface DBCourse {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department?: string;
  credits?: number;
  description: string;
  author?: string;
}

interface CourseFormData {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  description: string;
}

export default function Kanbas() {
  const [courses, setCourses] = useState<DBCourse[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const fetchCourses = async () => {
    try {
      if (currentUser) {
        const courses = currentUser.role === "FACULTY" 
          ? await userClient.findMyCourses()
          : await courseClient.fetchAllCourses();
        setCourses(courses);

        if (currentUser.role === "STUDENT") {
          const savedEnrollments = localStorage.getItem("enrollments");
          if (savedEnrollments) {
            dispatch(setEnrollments(JSON.parse(savedEnrollments)));
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    fetchCourses();
  }, [currentUser, dispatch]);

  const initialCourse: CourseFormData = {
    _id: "0",
    name: "",
    number: "",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "",
  };
  
  const [course, setCourse] = useState<CourseFormData>(initialCourse);

  const addNewCourse = async () => {
    if (!course.name || !course.number || !course.startDate || !course.endDate) {
      alert("Please fill in all required fields");
      return;
    }
    try {
      const newCourse = await userClient.createCourse(course);
      setCourses(prev => [...prev, newCourse]);
      setCourse(initialCourse);
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to create course");
    }
  };

  const deleteCourse = async (courseId: string) => {
    try {
      await courseClient.deleteCourse(courseId);
      setCourses(prev => prev.filter(course => course._id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course");
    }
  };

  const updateCourse = async () => {
    if (!course.name || !course.number || !course.startDate || !course.endDate) {
      alert("Please fill in all required fields");
      return;
    }
    try {
      const updatedCourse = await courseClient.updateCourse(course);
      setCourses(prev =>
        prev.map(c => c._id === course._id ? {
          ...c,
          name: course.name,
          number: course.number,
          startDate: course.startDate,
          endDate: course.endDate,
          description: course.description,
        } : c)
      );
      setCourse(initialCourse);
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update course");
    }
  };

  return (
    <div id="wd-kanbas">
      <KanbasNavigation />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="/Kanbas/Dashboard" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute>
                <Dashboard
                  courses={courses}
                  course={course}
                  setCourse={setCourse}
                  addNewCourse={addNewCourse}
                  deleteCourse={deleteCourse}
                  updateCourse={updateCourse}
                  initialCourse={initialCourse}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Courses/:cid/*"
            element={
              <ProtectedRouteCourse>
                <Courses courses={courses} />
              </ProtectedRouteCourse>
            }
          />
          <Route path="/Calendar" element={<h1>Calendar</h1>} />
          <Route path="/Inbox" element={<h1>Inbox</h1>} />
        </Routes>
      </div>
    </div>
  );
}