import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unenroll, enroll, enrollmentsOnSwitch, setEnrollments } from "./reducer";
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
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  initialCourse,
}: DashboardProps) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments, enrollmentsOn } = useSelector(
    (state: any) => state.enrollmentsReducer
  );
  const dispatch = useDispatch();

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
  
  useEffect(() => {
    localStorage.setItem("enrollments", JSON.stringify(enrollments));
    localStorage.setItem("enrollmentsOn", JSON.stringify(enrollmentsOn));
  }, [enrollments, enrollmentsOn]);

  const handleEnroll = async (e: React.MouseEvent, courseId: string) => {
    e.preventDefault();
    try {
      const status = await coursesClient.enrollInCourse(courseId, currentUser._id);
      if (status === 204) {
        dispatch(enroll({
          user: currentUser._id,
          course: courseId,
        }));
      }
    } catch (error) {
      console.error("Error enrolling:", error);
      alert("Failed to enroll in course");
    }
  };

  const handleUnenroll = async (e: React.MouseEvent, courseId: string) => {
    e.preventDefault();
    try {
      const status = await coursesClient.unenrollFromCourse(courseId, currentUser._id);
      if (status === 204) {
        dispatch(unenroll({
          user: currentUser._id,
          course: courseId,
        }));
      }
    } catch (error) {
      console.error("Error unenrolling:", error);
      alert("Failed to unenroll from course");
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
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={() => dispatch(enrollmentsOnSwitch())}
          >
            Enrollments
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
          {courses.map((course) => (
            <div
              className="wd-dashboard-course col"
              style={{ width: "300px" }}
              key={course._id}
            >
              <div className="card rounded-3 overflow-hidden shadow-sm">
                <Link
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                  to={`/Kanbas/Courses/${course._id}/Home`}
                >
                  <img
                    src={`/images/${course._id}.jpg`}
                    onError={(e) => {
                      e.currentTarget.src = "/images/reactjs.jpg";
                    }}
                    width="100%"
                    height={160}
                    alt={course.name}
                  />
                  <div className="card-body">
                    <div className="wd-dashboard-course-title-number text-decoration-none fw-bold">
                      {course.number}.{course.startDate}
                    </div>
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name}
                    </h5>
                    <p
                      className="wd-dashboard-course-title card-text overflow-y-hidden"
                      style={{ maxHeight: 100 }}
                    >
                      {course.description}
                    </p>
                    <Link
                      className="wd-dashboard-course-button"
                      to={`/Kanbas/Courses/${course._id}/Home`}
                    >
                      <button className="btn btn-primary">Go</button>
                    </Link>
                    {currentUser.role === "FACULTY" && (
                      <span>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }}
                          className="btn btn-danger float-end"
                          id={`wd-delete-course-click-${course._id}`}
                        >
                          Delete
                        </button>
                        <button
                          id={`wd-edit-course-click-${course._id}`}
                          onClick={(event) => {
                            event.preventDefault();
                            handleEdit(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </span>
                    )}
                    {currentUser.role === "STUDENT" && enrollmentsOn && (
                        <span>
                          {enrollments.some(
                            (enrollment: { user: any; course: any }) =>
                              enrollment.user === currentUser._id &&
                              enrollment.course === course._id
                          ) && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                dispatch(
                                  unenroll({
                                    user: currentUser._id,
                                    course: course._id,
                                  })
                                );
                              }}
                              className="btn btn-danger float-end"
                              id={`unenroll-button-${course._id}`}
                            >
                              Unenroll
                            </button>
                          )}
                          {!enrollments.some(
                            (enrollment: { user: any; course: any }) =>
                              enrollment.user === currentUser._id &&
                              enrollment.course === course._id
                          ) && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                dispatch(
                                  enroll({
                                    user: currentUser._id,
                                    course: course._id,
                                  })
                                );
                              }}
                              className="btn btn-success float-end"
                              id={`enroll-button-${course._id}`}
                            >
                              Enroll
                            </button>
                          )}
                        </span>
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