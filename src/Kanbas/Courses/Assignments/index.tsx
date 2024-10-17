import { BsGripVertical, BsPencilSquare } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import AssignmentsButtons from "./AssignmentsButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;
  return (
    <div id="wd-assignments" className="m-5">
      <div id="wd-search-assignment-box" className="row">
        <div className="col-8">
          <span>
            <FiSearch />
          </span>
          <input
            id="wd-search-assignment"
            placeholder="Search..."
            className="form-control"
            type="text"
            style={{ width: "500px" }}
          />
        </div>
        <div className="col-4">
          <button
            id="wd-add-assignment"
            className="btn btn-lg btn-danger me-1 float-end"
          >
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Assignment
          </button>
          <button
            id="wd-add-assignment-group"
            className="btn btn-lg btn-secondary me-1 float-end"
          >
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Group
          </button>
        </div>
      </div>
      <br />
      <br />
      <ul className="list-group rounded-0">
        <li className="list-group-item p-0 fs-5 border-gray">
          <div className="wd-assignments-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              ASSIGNMENTS
            </div>
            <AssignmentsButtons />
          </div>
        </li>
        <ul id="wd-assignment-list" className="list-group rounded-0">
          {assignments
            .filter((assignment) => assignment.course === cid)
            .map((assignment) => (
              <li
                key={assignment._id}
                className="wd-assignment-list-item list-group-item p-3 ps-1 fs-5"
              >
                <div className="row align-items-center">
                  <div className="col-1">
                    <BsGripVertical className="me-2 fs-3" />
                    <BsPencilSquare className="text-success" />
                  </div>
                  <div className="col-10">
                    <a
                      className="wd-assignment-link text-decoration-none text-dark"
                      href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                    >
                      {assignment.title}
                    </a>
                    <br />
                    <span className="fs-6 text-wrap">
                      <span className="text-danger">Multiple Modules</span>
                      <span className="custom-gray1">
                        {" "}| <strong>Not available until</strong> {" "}
                        {assignment.availableDate}  | <strong>Due</strong> {" "}
                        {assignment.dueDate}  | {assignment.points} pts
                      </span>
                    </span>
                  </div>
                  <div className="col-1">
                    <LessonControlButtons />
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </ul>
    </div>
  );
}
