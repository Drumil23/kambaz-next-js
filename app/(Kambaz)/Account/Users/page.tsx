"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "../../Courses/[cid]/People/Table";
import * as client from "../client";

export default function Users() {
  const [users, setUsers] = useState<Awaited<ReturnType<typeof client.findAllUsers>>>([]);
  const { uid } = useParams();
  
  const fetchUsers = async () => {
    const fetched = await client.findAllUsers();
    setUsers(fetched);
  };
  
  useEffect(() => {
    fetchUsers();
  }, [uid]);
  
  return (
    <div>
      <h3>Users</h3>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
