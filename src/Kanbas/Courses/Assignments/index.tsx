import { BsGripVertical } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import AssignmentsButtons from "./AssignmentsButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentControls from "./AssignmentsControls";

export default function Assignments() {
  return (
    <div id="wd-assignments" className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center flex-grow-1">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <FiSearch />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search..."
              aria-label="Search"
            />
          </div>
        </div>
        <div className="d-flex ms-3">
          <button className="btn btn-secondary me-2 d-flex align-items-center">
            <FaPlus className="me-1" /> Group
          </button>
          <button className="btn btn-danger d-flex align-items-center">
            <FaPlus className="me-1" /> Assignment
          </button>
        </div>
      </div>

      <ul id="wd-container" className="list-group rounded-0">
        <li className="wd-assignment list-group-item p-0 mb-5">
          <div
            id="wd-assignments-title"
            className="d-flex justify-content-between align-items-center bg-secondary text-white p-3"
          >
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-4" />
              <p className="m-0 fw-bold text-dark">ASSIGNMENTS</p>
            </div>
            <AssignmentsButtons />
          </div>

          <ul className="wd-assignment-list list-group rounded-0">
            <li className="wd-assignment-list-item list-group-item p-3 d-flex justify-content-between align-items-start border-0 border-start border-5 border-success">
              <div className="d-flex">
                <AssignmentControls />
                <div className="ms-3">
                  <a
                    href="#/Kanbas/Courses/1234/Assignments/A1"
                    className="wd-assignment-link text-decoration-none fs-5 fw-bold text-dark"
                  >
                    A1 - ENV + HTML
                  </a>
                  <p className="m-0 text-muted">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <strong>Not available until</strong> May 6 at 12:00 AM
                    <br />
                    <strong>Due</strong> May 13 at 11:59 PM | 100 pts
                  </p>
                </div>
              </div>
              <LessonControlButtons />
            </li>

            <li className="wd-assignment-list-item list-group-item p-3 d-flex justify-content-between align-items-start border-0 border-start border-5 border-success">
              <div className="d-flex">
                <AssignmentControls />
                <div className="ms-3">
                  <a
                    href="#/Kanbas/Courses/1234/Assignments/A2"
                    className="wd-assignment-link text-decoration-none fs-5 fw-bold text-dark"
                  >
                    A2 - CSS + BOOTSTRAP
                  </a>
                  <p className="m-0 text-muted">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <strong>Not available until</strong> May 13 at 12:00 AM
                    <br />
                    <strong>Due</strong> May 20 at 11:59 PM | 100 pts
                  </p>
                </div>
              </div>
              <LessonControlButtons />
            </li>

            <li className="wd-assignment-list-item list-group-item p-3 d-flex justify-content-between align-items-start border-0 border-start border-5 border-success">
              <div className="d-flex">
                <AssignmentControls />
                <div className="ms-3">
                  <a
                    href="#/Kanbas/Courses/1234/Assignments/A3"
                    className="wd-assignment-link text-decoration-none fs-5 fw-bold text-dark"
                  >
                    A3 - JAVASCRIPT + REACT
                  </a>
                  <p className="m-0 text-muted">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <strong>Not available until</strong> May 20 at 12:00 AM
                    <br />
                    <strong>Due</strong> May 27 at 11:59 PM | 100 pts
                  </p>
                </div>
              </div>
              <LessonControlButtons />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
