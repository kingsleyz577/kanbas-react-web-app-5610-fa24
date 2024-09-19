import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (4)</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" width={300} height={200} alt="React JS" />
          <div>
            <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/1234/Home"> CS1000 React JS </Link>
            <p className="wd-dashboard-course-title">Full Stack Software Developer</p>
          </div>
        </div>
        <div className="wd-dashboard-course">
          <img src="/images/introtojava.jpg" width={200} height={200} alt="Intro to Java" />
          <div>
            <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/1235/Home"> CS2000 Intro to Java </Link>
            <p className="wd-dashboard-course-title">Beginner Java Programming</p>
          </div>
        </div>
        <div className="wd-dashboard-course">
          <img src="/images/webdevelopment.jpg" width={200} height={200} alt="Web Development" />
          <div>
            <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/1236/Home"> CS3000 Web Development </Link>
            <p className="wd-dashboard-course-title">Learn modern web technologies</p>
          </div>
        </div>
        <div className="wd-dashboard-course">
          <img src="/images/Database.png" width={200} height={200} alt="Database" />
          <div>
            <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/1237/Home"> CS4000 Database </Link>
            <p className="wd-dashboard-course-title">Fundamentals of Database Systems</p>
          </div>
        </div>
      </div>
    </div>
  );
}
