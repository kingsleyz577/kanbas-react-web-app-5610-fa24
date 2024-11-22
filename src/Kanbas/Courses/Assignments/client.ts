import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENT_API = `${REMOTE_SERVER}/api/assignments`;
const COURSES_API =  `${REMOTE_SERVER}/api/courses`;

export const findAssignmentsForCourse = async (courseId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
    return response.data;
  };
  
  export const createAssignment = async (assignment: any) => {
    const response = await axios.post(ASSIGNMENT_API, assignment);
    return response.data;
  };
  
  export const deleteAssignment = async (assignmentId: string) => {
    const response = await axios.delete(`${ASSIGNMENT_API}/${assignmentId}`);
    return response.data;
  };
  
  export const updateAssignment = async (assignmentId: string, assignment: any) => {
    const response = await axios.put(`${ASSIGNMENT_API}/${assignmentId}`, assignment);
    return response.data;
  };