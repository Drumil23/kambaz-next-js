"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FormControl } from "react-bootstrap";
import PeopleTable from "../../Courses/[cid]/People/Table";
import * as client from "../client";

export default function Users() {
  const [users, setUsers] = useState<Awaited<ReturnType<typeof client.findAllUsers>>>([]);
  const [role, setRole] = useState("");
  const { uid } = useParams();
  
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
  
  useEffect(() => {
    fetchUsers();
  }, [uid]);
  
  return (
    <div>
      <h3>Users</h3>
      <select 
        value={role} 
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role"
      >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
