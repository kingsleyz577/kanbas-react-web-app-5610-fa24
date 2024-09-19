export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label><br />
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
  
        <textarea id="wd-description" cols={30} rows={10}>
          The assignment is available online. Submit a link to the landing page of your web application running on Netlify...
        </textarea>
        <br />
  
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} />
            </td>
          </tr>
  
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group">
                <option value="Quiz">Quiz</option>
                <option value="Assignment">Assignment</option>
                <option value="Exam">Exam</option>
              </select>
            </td>
          </tr>
  
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade As</label>
            </td>
            <td>
              <select id="wd-display-grade-as">
                <option value="Percentage">Percentage</option>
                <option value="Numeric">Numeric</option>
              </select>
            </td>
          </tr>
  
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type">
                <option value="Online">Online</option>
                <option value="In person">In person</option>
              </select>
            </td>
          </tr>
  
          <tr>
            <td align="right" valign="top">
              <label>Online Entry Options</label>
            </td>
            <td>
              <input type="checkbox" id="wd-text-entry" />
              <label htmlFor="wd-text-entry">Text Entry</label><br />
  
              <input type="checkbox" id="wd-website-url" />
              <label htmlFor="wd-website-url">Website URL</label><br />
  
              <input type="checkbox" id="wd-media-recordings" />
              <label htmlFor="wd-media-recordings">Media Recordings</label><br />
  
              <input type="checkbox" id="wd-student-annotation" />
              <label htmlFor="wd-student-annotation">Student Annotation</label><br />
  
              <input type="checkbox" id="wd-file-upload" />
              <label htmlFor="wd-file-upload">File Uploads</label>
            </td>
          </tr>
        </table>
  
        <label htmlFor="wd-assign-to">Assign to</label><br />
        <input id="wd-assign-to" value="Everyone" /><br /><br />
  
        <label htmlFor="wd-due-date">Due</label><br />
        <input type="date" id="wd-due-date" value="2024-05-13" /><br /><br />
  
        <label htmlFor="wd-available-from">Available from</label>
        <input type="date" id="wd-available-from" value="2024-05-06" />
  
        <label htmlFor="wd-available-until">Until</label>
        <input type="date" id="wd-available-until" value="2024-05-20" /><br /><br />
  
        <hr />
  
        <button>Save</button>
        <button>Cancel</button>
      </div>
    );
  }
  