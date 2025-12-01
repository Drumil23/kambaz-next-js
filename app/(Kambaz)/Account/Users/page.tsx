"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FormControl } from "react-bootstrap";
import PeopleTable from "../../Courses/[cid]/People/Table";
import * as client from "../client";

export default function Users() {
  const [users, setUsers] = useState<Awaited<ReturnType<typeof client.findAllUsers>>>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [mounted, setMounted] = useState(false);
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

  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const users = await client.findUsersByPartialName(name);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };
  
  useEffect(() => {
    setMounted(true);
    fetchUsers();
  }, [uid]);

  if (!mounted) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h3>Users</h3>
      <div className="mb-3">
        <FormControl 
          onChange={(e) => filterUsersByName(e.target.value)} 
          placeholder="Search people"
          className="float-start w-25 me-2 wd-filter-by-name" 
        />
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
        <div className="clearfix"></div>
      </div>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
