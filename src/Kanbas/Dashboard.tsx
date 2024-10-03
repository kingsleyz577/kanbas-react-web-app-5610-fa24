import { Link } from "react-router-dom";

const courses = [
  {
    id: 1234,
    title: "CS1000 React JS",
    description: "Full Stack Software Developer",
    image: "/images/reactjs.jpg",
    alt: "React JS",
  },
  {
    id: 1235,
    title: "CS2000 Intro to Java",
    description: "Beginner Java Programming",
    image: "/images/introtojava.jpg",
    alt: "Java programming",
  },
  {
    id: 1236,
    title: "CS3000 Web Development",
    description: "Learn modern web technologies",
    image: "/images/webdevelopment.jpg",
    alt: "Web development",
  },
  {
    id: 1238,
    title: "CS5000 Data Science",
    description: "Data Analysis and Visualization",
    image: "/images/datascience.jpg",
    alt: "Data science",
  },
  {
    id: 1239,
    title: "CS6000 Machine Learning",
    description: "Building Intelligent Systems",
    image: "/images/machinelearning.jpg",
    alt: "Machine learning",
  },
  {
    id: 1240,
    title: "CS7000 Cybersecurity",
    description: "Protecting Information Systems",
    image: "/images/cybersecurity.jpg",
    alt: "Cybersecurity",
  },
  {
    id: 1241,
    title: "CS5800 Algorithm",
    description: "Learn And Apply Algorithm",
    image: "/images/algorithm.png",
    alt: "Algorithm",
  }
];

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div className="wd-dashboard-course col" key={course.id} style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark" to={`/Kanbas/Courses/${course.id}/Home`}>
                  <img src={course.image} width="100%" height={160} alt={course.alt} />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">{course.title}</h5>
                    <p className="wd-dashboard-course-description card-text">{course.description}</p>
                    <button className="btn btn-primary"> Go </button>
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
