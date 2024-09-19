export default function CourseStatus() {
  return (
      <div id="wd-course-status">
          <h2>Course Status</h2>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
              <button style={{ marginRight: '5px' }}>Unpublish</button>
              <button>Publish</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <button style={{ margin: '5px 0' }}>Import Existing Content</button>
              <button style={{ margin: '5px 0' }}>Import From Commons</button>
              <button style={{ margin: '5px 0' }}>Choose Home Page</button>
              <button style={{ margin: '5px 0' }}>View Course Stream</button>
              <button style={{ margin: '5px 0' }}>New Announcement</button>
              <button style={{ margin: '5px 0' }}>New Analytics</button>
              <button style={{ margin: '5px 0' }}>View Course Notifications</button>
          </div>
      </div>
  );
}
