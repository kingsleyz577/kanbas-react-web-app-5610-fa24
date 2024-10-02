import { Link } from "react-router-dom";

const courses = [
  {
    id: 1234,
    title: "CS1000 React JS",
    description: "Full Stack Software Developer",
    image: "/images/reactjs.jpg",
    alt: "A person coding in React JS"
  },
  {
    id: 1235,
    title: "CS2000 Intro to Java",
    description: "Beginner Java Programming",
    image: "/images/introtojava.jpg",
    alt: "A Java programming setup"
  },
  {
    id: 1236,
    title: "CS3000 Web Development",
    description: "Learn modern web technologies",
    image: "/images/webdevelopment.jpg",
    alt: "Web development concepts"
  },
  {
    id: 1237,
    title: "CS4000 Database",
    description: "Fundamentals of Database Systems",
    image: "/images/Database.png",
    alt: "Database architecture"
  },
  {
    id: 1238,
    title: "CS5000 Data Science",
    description: "Introduction to Data Analysis and Visualization",
    image: "/images/datascience.jpg",
    alt: "Data science analysis"
  },
  {
    id: 1239,
    title: "CS6000 Machine Learning",
    description: "Building Intelligent Systems",
    image: "/images/machinelearning.jpg",
    alt: "Machine learning algorithms"
  },
  {
    id: 1240,
    title: "CS7000 Cybersecurity",
    description: "Protecting Information Systems",
    image: "/images/cybersecurity.jpg",
    alt: "Cybersecurity measures"
  }
];

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {courses.map(course => (
          <div className="wd-dashboard-course" key={course.id}>
            <img src={course.image} width={200} height={200} alt={course.alt} />
            <div>
              <Link className="wd-dashboard-course-link" to={`/Kanbas/Courses/${course.id}/Home`}>{course.title}</Link>
              <p className="wd-dashboard-course-title">{course.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
