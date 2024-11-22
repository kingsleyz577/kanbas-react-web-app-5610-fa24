import { BsGripVertical } from "react-icons/bs";
import { MdOutlineAssignment } from "react-icons/md";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentGroupControlButtons from "./AssignmentGroupControlButtons";
import { Navigate, Route, Routes, useParams } from "react-router";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./client";
import { deleteAssignment, setAssignments } from "./reducer";
import * as coursesClient from "./client";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const [currentAssignmentId, setId] = useState("");
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const fetchAssignments = async () => {
    try {
      const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
      dispatch(setAssignments(assignments));
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const handleDeleteAssignment = async (assignmentId: string) => {
    try {
      await client.deleteAssignment(assignmentId);
      dispatch(deleteAssignment(assignmentId));
    } catch (error) {
      console.error("Error deleting assignment:", error);
      alert("Failed to delete assignment");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div id="wd-assignments" className="me-2">
      <div className="row align-items-center mb-4">
        <AssignmentsControls />
      </div>
      <ul className="list-group rounded-0 d-block">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS
            <AssignmentGroupControlButtons />
          </div>
          <ul id="wd-assignment-list" className="list-group rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <li key={assignment._id} className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" />
                    <MdOutlineAssignment className="me-3 fs-5 text-success" />
                    <div className="d-flex flex-column">
                      {currentUser.role === "FACULTY" ? (
                        <a
                          className="wd-assignment-link wd-title"
                          href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                        >
                          {assignment.title}
                        </a>
                      ) : (
                        <span className="wd-title">{assignment.title}</span>
                      )}
                      <div className="wd-assignment-list-details">
                        {assignment.modules && (
                          <span className="text-danger">
                            {assignment.modules} &nbsp;&nbsp;| &nbsp;&nbsp;
                          </span>
                        )}
                        {assignment.available_date && (
                          <span>
                            <b>Not available until </b>
                            {formatDate(assignment.available_date)}
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                          </span>
                        )}
                        {assignment.due_date && (
                          <span>
                            <b>Due </b>
                            {formatDate(assignment.due_date)}
                            &nbsp;&nbsp;| &nbsp;&nbsp;
                          </span>
                        )}
                        {assignment.points && (
                          <span>{assignment.points} pts</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <AssignmentControlButtons
                      assignmentId={assignment._id}
                      currentAssignmentId={currentAssignmentId}
                      setId={setId}
                      deleteAssignment={handleDeleteAssignment}
                    />
                  </div>
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}