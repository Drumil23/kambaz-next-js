"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchUsersForCourse } from "../../../usersClient";
import PeopleTable from "../Table";

interface User {
    _id: string;
    firstName?: string;
    lastName?: string;
    loginId?: string;
    section?: string;
    role?: string;
    lastActivity?: string;
    totalActivity?: string;
}

export default function PeoplePage() {
    const { cid } = useParams();
    const courseId = Array.isArray(cid) ? cid[0] : cid;
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        if (!courseId) return;
        setLoading(true);
        try {
            const data = await fetchUsersForCourse(courseId);
            setUsers(data as User[]);
        } catch (err: unknown) {
            console.error('Failed to fetch users', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [courseId]);
    
    return (
        <div>
            <h3>People in {courseId}</h3>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <PeopleTable users={users} fetchUsers={fetchUsers} />
            )}
        </div>
    );
}

