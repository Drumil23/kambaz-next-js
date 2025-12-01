"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FormControl, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import PeopleTable from "../../Courses/[cid]/People/Table";
import * as client from "../client";
import { FaPlus } from "react-icons/fa";

export default function Users() {
  const [users, setUsers] = useState<Awaited<ReturnType<typeof client.findAllUsers>>>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const { uid } = useParams();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const privileged = currentUser && (currentUser.role === "FACULTY" || currentUser.role === "ADMIN" || currentUser.role === "Faculty" || currentUser.role === "Dean");
  
  const fetchUsers = async () => {
    const fetched = await client.findAllUsers();
    setUsers(fetched);
  };

  const filterUsersByRole = async (selectedRole: string) => {
    setRole(selectedRole);
    if (selectedRole) {
      const filteredUsers = await client.findUsersByRole(selectedRole);
      setUsers(filteredUsers);
    } else {
      const allUsers = await client.findAllUsers();
      setUsers(allUsers);
    }
  };

  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const users = await client.findUsersByPartialName(name);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  const onAdd = async () => {
    const username = prompt('Username');
    if (!username) return;
    const password = prompt('Password') || 'password123';
    const firstName = prompt('First name') || '';
    const lastName = prompt('Last name') || '';
    const loginId = prompt('Login ID') || username;
    const section = prompt('Section') || 'S101';
    const role = prompt('Role (STUDENT|TA|FACULTY|ADMIN)') || 'STUDENT';
    const newUser = { 
      username,
      password,
      firstName, 
      lastName, 
      loginId, 
      section, 
      role, 
      lastActivity: new Date().toISOString().slice(0,10), 
      totalActivity: '0h 00m' 
    };
    try {
      await client.signup(newUser);
      fetchUsers();
    } catch (err: unknown) {
      console.error('Create user failed', err);
      alert('Failed to create user');
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, user]);
  };

  
  return (
    <div>
      <button onClick={createUser} className="float-end btn btn-danger wd-add-people">
        <FaPlus className="me-2" />
        Users
      </button>
      <h3>Users</h3>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <div className="d-flex gap-2">
          <FormControl 
            onChange={(e) => filterUsersByName(e.target.value)} 
            placeholder="Search people"
            style={{ width: '250px' }}
            className="wd-filter-by-name" 
          />
          <select 
            value={role} 
            onChange={(e) => filterUsersByRole(e.target.value)}
            className="form-select wd-select-role"
            style={{ width: '200px' }}
          >
            <option value="">All Roles</option>
            <option value="STUDENT">Students</option>
            <option value="TA">Assistants</option>
            <option value="FACULTY">Faculty</option>
            <option value="ADMIN">Administrators</option>
          </select>
        </div>
        {privileged && <Button onClick={onAdd} variant="success">Add user</Button>}
      </div>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
