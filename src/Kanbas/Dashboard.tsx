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
  addNewCourse: () => Promise<void>;
  deleteCourse: (courseId: string) => Promise<void>;
  updateCourse: () => Promise<void>;
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

  const [courses, setCourses] = useState<DBCourse[]>(initialCourses || []);
  const [enrolling, setEnrolling] = useState<boolean>(false);

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

  const fetchAllCoursesWithEnrollment = async () => {
    try {
      const allCourses = await coursesClient.fetchAllCourses();
      let mergedCourses = allCourses;

      // Only students need to merge enrollment info
      if (currentUser && currentUser.role === "STUDENT" && currentUser._id) {
        const userCourses = await userClient.findCoursesForUser(currentUser._id);
        mergedCourses = allCourses.map((c: DBCourse) => {
          if (userCourses.find((uc: DBCourse) => uc._id === c._id)) {
            return { ...c, enrolled: true };
          } else {
            return c;
          }
        });
      }

      setCourses(mergedCourses);
    } catch (error) {
      console.error("Error fetching all courses:", error);
    }
  };

  // Re-fetch courses whenever user changes or enrolling state changes for STUDENT.
  // For FACULTY/ADMIN, always show all courses.
  useEffect(() => {
    if (!currentUser || !currentUser._id) return;

    if (currentUser.role === "FACULTY" || currentUser.role === "ADMIN") {
      // Faculty/Admin always see all courses
      fetchAllCoursesWithEnrollment();
    } else if (currentUser.role === "STUDENT") {
      // Students can toggle between their courses and all courses
      if (enrolling) {
        fetchAllCoursesWithEnrollment();
      } else {
        findCoursesForUser();
      }
    }
  }, [currentUser, enrolling]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (course._id === "0") {
      await addNewCourse();
    } else {
      await updateCourse();
    }
    // After adding or updating a course, re-fetch the course list
    if (currentUser.role === "FACULTY" || currentUser.role === "ADMIN") {
      await fetchAllCoursesWithEnrollment();
    } else if (currentUser.role === "STUDENT") {
      enrolling ? await fetchAllCoursesWithEnrollment() : await findCoursesForUser();
    }

    // Reset the form to initial state after add/update
    setCourse(initialCourse);
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

  const handleDelete = async (courseId: string) => {
    await deleteCourse(courseId);
    // Re-fetch courses after deletion
    if (currentUser.role === "FACULTY" || currentUser.role === "ADMIN") {
      await fetchAllCoursesWithEnrollment();
    } else if (currentUser.role === "STUDENT") {
      enrolling ? await fetchAllCoursesWithEnrollment() : await findCoursesForUser();
    }
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> 
      <hr />

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

      {(currentUser.role === "FACULTY" || currentUser.role === "ADMIN") && (
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
              <div className="card rounded-3 overflow-hidden shadow-sm w-100 p-2 d-flex flex-column justify-content-between">
                <img
                  src={`/images/${c._id}.jpg`}
                  onError={(e) => {
                    e.currentTarget.src = "/images/reactjs.jpg";
                  }}
                  width="100%"
                  height={160}
                  alt={c.name}
                />
                <div className="card-body d-flex flex-column">
                  <div className="wd-dashboard-course-title-number fw-bold mb-2">
                    {c.number}.{c.startDate}
                  </div>
                  <h5 className="wd-dashboard-course-title card-title mb-2">
                    {c.name}
                  </h5>
                  <p
                    className="wd-dashboard-course-title card-text overflow-y-hidden mb-2"
                    style={{ maxHeight: 100 }}
                  >
                    {c.description}
                  </p>

                  <div className="mt-auto d-flex justify-content-end align-items-center gap-2">
                    {((currentUser.role === "STUDENT" && !enrolling) ||
                      currentUser.role === "FACULTY" ||
                      currentUser.role === "ADMIN") && (
                      <Link
                        className="wd-dashboard-course-button"
                        to={`/Kanbas/Courses/${c._id}/Home`}
                      >
                        <button className="btn btn-primary">
                          Go
                        </button>
                      </Link>
                    )}

                    {(currentUser.role === "FACULTY" || currentUser.role === "ADMIN") && (
                      <>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            handleEdit(c);
                          }}
                          className="btn btn-warning"
                          id={`wd-edit-course-click-${c._id}`}
                        >
                          Edit
                        </button>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            handleDelete(c._id);
                          }}
                          className="btn btn-danger"
                          id={`wd-delete-course-click-${c._id}`}
                        >
                          Delete
                        </button>
                      </>
                    )}

                    {currentUser.role === "STUDENT" && enrolling && (
                      <button
                        className={`btn ${c.enrolled ? "btn-danger" : "btn-success"}`}
                        onClick={(event) => {
                          event.preventDefault();
                          updateEnrollment(c._id, !c.enrolled);
                        }}
                      >
                        {c.enrolled ? "Unenroll" : "Enroll"}
                      </button>
                    )}
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
