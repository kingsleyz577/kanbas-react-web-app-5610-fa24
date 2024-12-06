import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enroll, unenroll, enrollmentsOnSwitch, setEnrollments } from "./reducer";
import * as userClient from "./Account/client";
import * as coursesClient from "./Courses/Client";

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
  img?: string;
  enrolled?: boolean;
}

interface CourseFormData {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface DashboardProps {
  courses: DBCourse[]; 
  course: CourseFormData;
  setCourse: React.Dispatch<React.SetStateAction<CourseFormData>>;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
  initialCourse: CourseFormData;
}

export default function Dashboard({
  courses: initialCourses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  initialCourse,
}: DashboardProps) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments, enrollmentsOn } = useSelector((state: any) => state.enrollmentsReducer);
  const dispatch = useDispatch();

  // State for courses displayed on the dashboard
  const [courses, setCourses] = useState<DBCourse[]>(initialCourses || []);
  // State to toggle between "All Courses" and "My Courses" (enrolled courses)
  const [enrolling, setEnrolling] = useState<boolean>(false);

  // Load persisted enrollments states from local storage (if needed)
  useEffect(() => {
    const savedEnrollments = localStorage.getItem("enrollments");
    const savedEnrollmentsOn = localStorage.getItem("enrollmentsOn");

    if (savedEnrollments) {
      dispatch(setEnrollments(JSON.parse(savedEnrollments)));
    }
    if (savedEnrollmentsOn === "true") {
      dispatch(enrollmentsOnSwitch());
    }
  }, [dispatch]);

  // Persist enrollment states to local storage
  useEffect(() => {
    localStorage.setItem("enrollments", JSON.stringify(enrollments));
    localStorage.setItem("enrollmentsOn", JSON.stringify(enrollmentsOn));
  }, [enrollments, enrollmentsOn]);

  // Fetch only courses the current user is enrolled in
  const findCoursesForUser = async () => {
    try {
      if (currentUser && currentUser._id) {
        const userCourses = await userClient.findCoursesForUser(currentUser._id);
        setCourses(userCourses);
      }
    } catch (error) {
      console.error("Error fetching user courses:", error);
    }
  };

  // Fetch all courses and mark which ones the user is enrolled in
  const fetchAllCoursesWithEnrollment = async () => {
    try {
      const allCourses = await coursesClient.fetchAllCourses();
      const userCourses = currentUser && currentUser._id 
        ? await userClient.findCoursesForUser(currentUser._id) 
        : [];

      const mergedCourses = allCourses.map((c: DBCourse) => {
        if (userCourses.find((uc: DBCourse) => uc._id === c._id)) {
          return { ...c, enrolled: true };
        } else {
          return c;
        }
      });
      setCourses(mergedCourses);
    } catch (error) {
      console.error("Error fetching all courses:", error);
    }
  };

  useEffect(() => {
    // If enrolling is true, show all courses to allow enrollment
    // If enrolling is false, show just the user's enrolled courses
    if (currentUser && currentUser._id) {
      if (enrolling) {
        fetchAllCoursesWithEnrollment();
      } else {
        findCoursesForUser();
      }
    }
  }, [currentUser, enrolling]);

  // Update enroll/unenroll actions
  const updateEnrollment = async (courseId: string, shouldEnroll: boolean) => {
    try {
      if (shouldEnroll) {
        await userClient.enrollIntoCourse(currentUser._id, courseId);
        dispatch(enroll({ user: currentUser._id, course: courseId }));
      } else {
        await userClient.unenrollFromCourse(currentUser._id, courseId);
        dispatch(unenroll({ user: currentUser._id, course: courseId }));
      }
      setCourses(
        courses.map((c) => c._id === courseId ? { ...c, enrolled: shouldEnroll } : c)
      );
    } catch (error) {
      console.error("Error updating enrollment:", error);
      alert(`Failed to ${shouldEnroll ? "enroll" : "unenroll"} in course`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (course._id === "0") {
      addNewCourse();
    } else {
      updateCourse();
    }
  };

  const handleEdit = (courseToEdit: DBCourse) => {
    setCourse({
      _id: courseToEdit._id,
      name: courseToEdit.name,
      number: courseToEdit.number,
      startDate: courseToEdit.startDate,
      endDate: courseToEdit.endDate,
      description: courseToEdit.description,
    });
  };

  const handleCancel = () => {
    setCourse(initialCourse);
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />

      {currentUser.role === "STUDENT" && (
        <div>
          <button
            onClick={() => setEnrolling(!enrolling)}
            className="float-end btn btn-primary"
          >
            {enrolling ? "My Courses" : "All Courses"}
          </button>
        </div>
      )}

      {currentUser.role === "FACULTY" && (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center mb-2">
              <h5 className="col mb-0 d-flex align-items-center">
                {course._id === "0" ? "New Course" : "Edit Course"}
                <button
                  type="submit"
                  className="btn btn-primary me-2 ms-auto"
                  id="wd-course-action-button"
                >
                  {course._id === "0" ? "Add" : "Update"}
                </button>
                {course._id !== "0" && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                )}
              </h5>
            </div>

            <input
              value={course.name}
              placeholder="Course Name"
              className="form-control mb-2"
              onChange={(e) => setCourse({ ...course, name: e.target.value })}
              required
            />
            <input
              id="new-course-number"
              value={course.number}
              placeholder="Course Number"
              className="form-control mb-2"
              onChange={(e) => setCourse({ ...course, number: e.target.value })}
              required
            />
            <textarea
              value={course.description}
              placeholder="Course Description"
              className="form-control mb-2"
              onChange={(e) => setCourse({ ...course, description: e.target.value })}
              required
            />
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="new-course-start" className="form-label">
                  Start Date
                </label>
                <input
                  id="new-course-start"
                  value={course.startDate}
                  type="date"
                  className="form-control mb-2"
                  onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="new-course-end" className="form-label">
                  End Date
                </label>
                <input
                  id="new-course-end"
                  value={course.endDate}
                  type="date"
                  className="form-control"
                  onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
                  required
                />
              </div>
            </div>
          </form>
          <hr />
        </div>
      )}

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses" className="mt-4 mb-4">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((c) => c && (
            <div
              className="wd-dashboard-course col d-flex align-items-stretch"
              style={{ width: "300px" }}
              key={c._id}
            >
              <div className="card rounded-3 overflow-hidden shadow-sm w-100">
                <Link
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                  to={
                    // If enrolling is false and course is enrolled, can go to Course Home,
                    // If enrolling is true (viewing all courses), and user is not enrolled, disable direct access.
                    (!enrolling || c.enrolled)
                      ? `/Kanbas/Courses/${c._id}/Home`
                      : "/Kanbas/Dashboard"
                  }
                >
                  <img
                    src={`/images/${c._id}.jpg`}
                    onError={(e) => {
                      e.currentTarget.src = "/images/reactjs.jpg";
                    }}
                    width="100%"
                    height={160}
                    alt={c.name}
                  />
                  <div className="card-body">
                    <div className="wd-dashboard-course-title-number fw-bold">
                      {c.number}.{c.startDate}
                    </div>
                    <h5 className="wd-dashboard-course-title card-title">
                      {c.name}
                    </h5>
                    <p
                      className="wd-dashboard-course-title card-text overflow-y-hidden"
                      style={{ maxHeight: 100 }}
                    >
                      {c.description}
                    </p>
                    {!enrolling && (
                      <Link
                        className="wd-dashboard-course-button"
                        to={`/Kanbas/Courses/${c._id}/Home`}
                      >
                        <button className="btn btn-primary">Go</button>
                      </Link>
                    )}

                    {currentUser.role === "FACULTY" && (
                      <span>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(c._id);
                          }}
                          className="btn btn-danger float-end"
                          id={`wd-delete-course-click-${c._id}`}
                        >
                          Delete
                        </button>
                        <button
                          id={`wd-edit-course-click-${c._id}`}
                          onClick={(event) => {
                            event.preventDefault();
                            handleEdit(c);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </span>
                    )}

                    {currentUser.role === "STUDENT" && enrolling && (
                      <button
                        className={`btn ${c.enrolled ? "btn-danger" : "btn-success"} float-end`}
                        onClick={(event) => {
                          event.preventDefault();
                          updateEnrollment(c._id, !c.enrolled);
                        }}
                      >
                        {c.enrolled ? "Unenroll" : "Enroll"}
                      </button>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
