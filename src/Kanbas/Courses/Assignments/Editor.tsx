import { RxCross2 } from "react-icons/rx";
import { useParams } from "react-router";
import * as db from "../../Database";
import { Link } from "react-router-dom";

export default function Editor() {
  const { cid, aid } = useParams();
  const assignments = db.assignments;
  const this_assignment = assignments.find(
    (assignment) => assignment._id === aid
  );

  return (
    <div id="wd-assignments-editor" className="form-group p-4">
      <div className="w-100 mb-4">
        <h3 className="mb-3">Assignment Name</h3>
        <input
          type="text"
          id="wd-assignment-name"
          value={this_assignment?.title || ""}
          className="form-control mb-4"
          readOnly
        />
        <div
          id="wd-description"
          className="form-control w-100"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {this_assignment?.description}
        </div>
      </div>

      <div className="mt-4 container-fluid">
        <div className="row mb-3 align-items-center">
          <div className="col-md-2">
            <label htmlFor="wd-points" className="form-label">
              Points
            </label>
          </div>
          <div className="col-md-10">
            <input
              id="wd-points"
              className="form-control"
              value={this_assignment?.points || 0}
              type="number"
              min="0"
              readOnly
            />
          </div>
        </div>

        {/* Assignment Group */}
        <div className="row mb-3 align-items-center">
          <div className="col-md-2">
            <label htmlFor="wd-group" className="form-label">
              Assignment Group
            </label>
          </div>
          <div className="col-md-10">
            <select id="wd-group" className="form-select">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </select>
          </div>
        </div>

        {/* Display Grade As */}
        <div className="row mb-3 align-items-center">
          <div className="col-md-2">
            <label htmlFor="wd-display-grade-as" className="form-label">
              Display Grade as
            </label>
          </div>
          <div className="col-md-10">
            <select id="wd-display-grade-as" className="form-select">
              <option value="Percentage">Percentage</option>
            </select>
          </div>
        </div>

        {/* Submission Type */}
        <div className="row mb-3 align-items-start">
          <div className="col-md-2">
            <label htmlFor="wd-submission-type" className="form-label">
              Submission Type
            </label>
          </div>
          <div className="col-md-10">
            <select id="wd-submission-type" className="form-select mb-3">
              <option value="Online">Online</option>
            </select>

            <div className="border rounded p-3">
              <p className="form-label fs-5 fw-bold mb-3">
                Online Entry Options
              </p>

              {/* Online Entry Options */}
              {["Text Entry", "Website URL", "Media Recordings", "Student Annotation", "File Uploads"].map(
                (option, index) => (
                  <div className="form-check mb-2" key={index}>
                    <input
                      type="checkbox"
                      name="check-entry-options"
                      id={`wd-option-${index}`}
                      className="form-check-input"
                    />
                    <label
                      htmlFor={`wd-option-${index}`}
                      className="form-check-label"
                    >
                      {option}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Assign Section */}
        <div className="row mb-3 align-items-start">
          <div className="col-md-2">
            <label htmlFor="wd-assign-to" className="form-label">
              Assign
            </label>
          </div>
          <div className="col-md-10">
            <div className="border rounded p-3 mb-3">
              <label htmlFor="wd-assign-to" className="form-label fw-bold">
                Assign to
              </label>
              <input
                id="wd-assign-to"
                value="Everyone"
                className="form-control"
                readOnly
              />

              <label htmlFor="wd-due-date" className="form-label mt-3 fw-bold">
                Due
              </label>
              <input
                type="date"
                id="wd-due-date"
                defaultValue={this_assignment?.dueDate || ""}
                className="form-control mb-3"
              />

              <div className="row g-3">
                <div className="col-md-6">
                  <label
                    htmlFor="wd-available-from"
                    className="form-label fw-bold"
                  >
                    Available from
                  </label>
                  <input
                    type="date"
                    id="wd-available-from"
                    defaultValue={this_assignment?.availableDate || ""}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label
                    htmlFor="wd-available-until"
                    className="form-label fw-bold"
                  >
                    Until
                  </label>
                  <input
                    type="date"
                    id="wd-available-until"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div className="d-flex justify-content-end gap-2">
        <Link
          to={`/Kanbas/Courses/${cid}/Assignments`}
          className="btn btn-lg btn-secondary"
        >
          Cancel
        </Link>
        <Link
          to={`/Kanbas/Courses/${cid}/Assignments`}
          className="btn btn-lg btn-danger"
        >
          Save
        </Link>
      </div>
    </div>
  );
}
