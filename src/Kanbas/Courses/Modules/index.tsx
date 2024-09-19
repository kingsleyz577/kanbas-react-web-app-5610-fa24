export default function Modules() {
  return (
    <div>
      <div>
        <button type="button">Collapse All</button>
        <button type="button">View Progress</button>
        <label>
          Publish All:
          <select>
            <option value="all">All Modules</option>
            <option value="week1">Week 1 Only</option>
            <option value="week2">Week 2 Only</option>
            <option value="week3">Week 3 Only</option>
            <option value="week4">Week 4 Only</option>
          </select>
        </label>
      </div>
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">
            Week 1
          </div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">Learn what is Web Development</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">
            Week 2
          </div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Understanding HTML structure</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">
            Week 3
          </div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to JavaScript programming</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">
            Week 4
          </div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Working with the Document Object Model</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

  