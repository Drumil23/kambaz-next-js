"use client";
import { Table, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchUsersForCourse, createUser, updateUser, deleteUser } from "../../../usersClient";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

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

export default function PeopleTable() {
    const { cid } = useParams();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);

    const privileged = currentUser && (currentUser.role === "Faculty" || currentUser.role === "Dean");

    const load = async () => {
        if (!cid) return;
        setLoading(true);
        try {
            const data = await fetchUsersForCourse(cid);
            setUsers(data);
        } catch (e) {
            console.error('Failed to fetch users', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, [cid]);

    const onAdd = async () => {
        const firstName = prompt('First name');
        if (!firstName) return;
        const lastName = prompt('Last name') || '';
        const loginId = prompt('Login ID') || '';
        const section = prompt('Section') || '';
        const role = prompt('Role (Student|Faculty|Dean)') || 'Student';
        const newUser: any = { firstName, lastName, loginId, section, role, lastActivity: new Date().toISOString().slice(0,10), totalActivity: '0h' };
        try {
            const created = await createUser(newUser, currentUser?.role);
            // Optionally enroll the created user in this course by calling enrollments route (not implemented here)
            setUsers(prev => [...prev, created]);
        } catch (e:any) {
            alert(e?.response?.data?.error || 'Failed to create user');
        }
    };

    const onEdit = async (user: User) => {
        const firstName = prompt('First name', user.firstName || '');
        if (firstName === null) return;
        const lastName = prompt('Last name', user.lastName || '') || '';
        const loginId = prompt('Login ID', user.loginId || '') || '';
        const section = prompt('Section', user.section || '') || '';
        const role = prompt('Role (Student|Faculty|Dean)', user.role || 'Student') || 'Student';
        const updated = { ...user, firstName, lastName, loginId, section, role };
        try {
            const saved = await updateUser(updated, currentUser?.role);
            setUsers(prev => prev.map(u => u._id === saved._id ? saved : u));
        } catch (e:any) {
            alert(e?.response?.data?.error || 'Failed to update user');
        }
    };

    const onDelete = async (user: User) => {
        if (!confirm(`Delete ${user.firstName} ${user.lastName}?`)) return;
        try {
            await deleteUser(user._id, currentUser?.role);
            setUsers(prev => prev.filter(u => u._id !== user._id));
        } catch (e:any) {
            alert(e?.response?.data?.error || 'Failed to delete user');
        }
    };

    return (
        <div id="wd-people-table">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h3>People in {cid}</h3>
                {privileged && <Button onClick={onAdd} variant="success">Add user</Button>}
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : (
            <Table striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Login ID</th>
                        <th>Section</th>
                        <th>Role</th>
                        <th>Last Activity</th>
                        <th>Total Activity</th>
                        {privileged && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: User) => (
                        <tr key={user._id}>
                            <td className="wd-full-name text-nowrap">
                                <FaUserCircle className="me-2 fs-1 text-secondary" />
                                <span className="wd-first-name">{user.firstName}</span>
                                {" "}
                                <span className="wd-last-name">{user.lastName}</span>
                            </td>
                            <td className="wd-login-id">{user.loginId}</td>
                            <td className="wd-section">{user.section}</td>
                            <td className="wd-role">{user.role}</td>
                            <td className="wd-last-activity">{user.lastActivity}</td>
                            <td className="wd-total-activity">{user.totalActivity}</td>
                            {privileged && (
                            <td>
                                <Button size="sm" variant="warning" className="me-2" onClick={() => onEdit(user)}>Edit</Button>
                                <Button size="sm" variant="danger" onClick={() => onDelete(user)}>Delete</Button>
                            </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
            )}
        </div>
    );
}

