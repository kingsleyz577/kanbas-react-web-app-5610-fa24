import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PeopleTable from "../Courses/People/Table";
import * as client from "./client";
import { FaPlus } from "react-icons/fa";

export default function Users() {
    const { uid } = useParams();
    const [users, setUsers] = useState<any[]>([]);
    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    const filterUsersByName = async (name: string) => {
        setName(name);
        if (name) {
            const users = await client.findUsersByPartialName(name);
            setUsers(users);
        } else {
            fetchUsers();
        }
    };
    const filterUsersByRole = async (role: string) => {
        setRole(role);
        if (role) {
            const users = await client.findUsersByRole(role);
            setUsers(users);
        } else {
            fetchUsers();
        }
    };
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };
    useEffect(() => {fetchUsers();}, [uid]);
    const createUser = async () => {
        const user = await client.createUser({
          firstName: "newfirstname",
          lastName: `User${users.length + 1}`,
          username: `newusername${Date.now()}`,
          password: "password000",
          email: `email${users.length + 1}@neu.edu`,
          section: "S101",
          role: "STUDENT",
        });
        setUsers([...users, user]);
      };    
      return (
        <div className="card p-4 border-0 shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="m-0">Users</h3>
            <button 
              onClick={createUser}
              className="btn btn-danger d-flex align-items-center gap-2"
            >
              <FaPlus />
              <span>Users</span>
            </button>
          </div>
    
          <div className="d-flex flex-wrap gap-3 mb-4">
            <input
              type="text"
              onChange={(e) => filterUsersByName(e.target.value)}
              placeholder="Search people"
              className="form-control"
              style={{ maxWidth: '200px', flex: '1 1 200px' }}
            />
            
            <select
              value={role}
              onChange={(e) => filterUsersByRole(e.target.value)}
              className="form-select"
              style={{ maxWidth: '200px', flex: '1 1 200px' }}
            >
              <option value="">All Roles</option>
              <option value="STUDENT">Students</option>
              <option value="TA">Assistants</option>
              <option value="FACULTY">Faculty</option>
              <option value="ADMIN">Administrators</option>
            </select>
          </div>
    
          <PeopleTable users={users} />
        </div>
      );
}