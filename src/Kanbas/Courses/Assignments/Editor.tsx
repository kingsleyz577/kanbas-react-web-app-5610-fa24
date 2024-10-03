import { RxCross2 } from "react-icons/rx";

export default function Editor() {
  return (
    <div id="wd-assignments-editor" className="form-group p-4">
      <div className="w-100 mb-4">
        <h3 className="mb-3">Assignment Name</h3>
        <input
          type="text"
          id="wd-assignment-name"
          defaultValue="A1 - ENV + HTML"
          className="form-control mb-4"
        />
        <div
          id="wd-description"
          className="form-control w-100"
          style={{ whiteSpace: "pre-wrap" }}
        >
          <p></p>
          <p>The assignment is{" "}
          <span style={{ color: "red" }}>available online</span></p>

          <p>Submit a link to the landing page of your Web application running on Netlify.</p>

          <p>The landing page should include the following:</p>
          <ul>
            <li>Your full name and section</li>
            <li>Links to each of the lab assignments</li>
            <li>Link to the Kanbas application</li>
            <li>Links to all relevant source code repositories</li>
          </ul>

          <p>
            The Kanbas application should include a link to navigate back to the landing page.
          </p>
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
              defaultValue={100}
              type="number"
              min="0"
            />
          </div>
        </div>

        <div className="row mb-3 align-items-center">
          <div className="col-md-2">
            <label htmlFor="wd-group" className="form-label">
              Assignment Group
            </label>
          </div>
          <div className="col-md-10">
            <select
              id="wd-group"
              className="form-select"
              defaultValue="ASSIGNMENTS"
            >
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="OPTION 1">OPTION 1</option>
              <option value="OPTION 2">OPTION 2</option>
              <option value="OPTION 3">OPTION 3</option>
            </select>
          </div>
        </div>

        <div className="row mb-3 align-items-center">
          <div className="col-md-2">
            <label htmlFor="wd-display-grade-as" className="form-label">
              Display Grade as
            </label>
          </div>
          <div className="col-md-10">
            <select
              id="wd-display-grade-as"
              className="form-select"
              defaultValue="Percentage"
            >
              <option value="Percentage">Percentage</option>
              <option value="OPTION 1">OPTION 1</option>
              <option value="OPTION 2">OPTION 2</option>
              <option value="OPTION 3">OPTION 3</option>
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
            <select
              id="wd-submission-type"
              className="form-select mb-3"
              defaultValue="Online"
            >
              <option value="Online">Online</option>
              <option value="OPTION 1">OPTION 1</option>
              <option value="OPTION 2">OPTION 2</option>
              <option value="OPTION 3">OPTION 3</option>
            </select>

            <div className="border rounded p-3">
              <p className="form-label fs-5 fw-bold mb-3">
                Online Entry Options
              </p>

              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  name="check-entry-options"
                  id="wd-text-entry"
                  className="form-check-input"
                />
                <label htmlFor="wd-text-entry" className="form-check-label">
                  Text Entry
                </label>
              </div>

              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  name="check-entry-options"
                  id="wd-website-url"
                  className="form-check-input"
                />
                <label htmlFor="wd-website-url" className="form-check-label">
                  Website URL
                </label>
              </div>

              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  name="check-entry-options"
                  id="wd-media-recordings"
                  className="form-check-input"
                />
                <label
                  htmlFor="wd-media-recordings"
                  className="form-check-label"
                >
                  Media Recordings
                </label>
              </div>

              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  name="check-entry-options"
                  id="wd-student-annotation"
                  className="form-check-input"
                />
                <label
                  htmlFor="wd-student-annotation"
                  className="form-check-label"
                >
                  Student Annotation
                </label>
              </div>

              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  name="check-entry-options"
                  id="wd-file-upload"
                  className="form-check-input"
                />
                <label
                  htmlFor="wd-file-upload"
                  className="form-check-label"
                >
                  File Uploads
                </label>
              </div>
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
              <div className="custom-input d-flex justify-content-between align-items-center bg-light p-2 rounded">
                <span>Everyone</span>
                <RxCross2 className="fs-6 text-dark cursor-pointer" />
              </div>

              <label
                htmlFor="wd-due-date"
                className="form-label mt-3 fw-bold"
              >
                Due
              </label>
              <input
                type="datetime-local"
                id="wd-due-date"
                defaultValue="2024-09-15T17:30"
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
                    type="datetime-local"
                    id="wd-available-from"
                    defaultValue="2024-09-01T17:30"
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
                    type="datetime-local"
                    id="wd-available-until"
                    defaultValue="2024-09-19T17:30"
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
        <button type="button" className="btn btn-lg btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-lg btn-danger">
          Save
        </button>
      </div>
    </div>
  );
}
