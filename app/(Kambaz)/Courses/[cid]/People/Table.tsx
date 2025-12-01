"use client";
import { Table, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { createUser, updateUser, deleteUser } from "../../usersClient";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import PeopleDetails from "./Details";
import Link from "next/link";

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

export default function PeopleTable({ 
    users = [], 
    fetchUsers 
}: { 
    users?: User[]; 
    fetchUsers: () => void; 
}) {
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const privileged = currentUser && (currentUser.role === "Faculty" || currentUser.role === "Dean");
    const [showDetails, setShowDetails] = useState(false);
    const [showUserId, setShowUserId] = useState<string | null>(null);

    const onAdd = async () => {
        const firstName = prompt('First name');
        if (!firstName) return;
        const lastName = prompt('Last name') || '';
        const loginId = prompt('Login ID') || '';
        const section = prompt('Section') || '';
        const role = prompt('Role (Student|Faculty|Dean)') || 'Student';
        const newUser: Partial<User> = { 
            firstName, 
            lastName, 
            loginId, 
            section, 
            role, 
            lastActivity: new Date().toISOString().slice(0,10), 
            totalActivity: '0h' 
        };
        try {
            await createUser(newUser, currentUser?.role);
            fetchUsers();
        } catch (err: unknown) {
            console.error('Create user failed', err);
            alert('Failed to create user');
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
            await updateUser(updated, currentUser?.role);
            fetchUsers();
        } catch (err: unknown) {
            console.error('Update failed', err);
            alert('Failed to update user');
        }
    };

    const onDelete = async (user: User) => {
        if (!confirm(`Delete ${user.firstName} ${user.lastName}?`)) return;
        try {
            await deleteUser(user._id, currentUser?.role);
            fetchUsers();
        } catch (err: unknown) {
            console.error('Delete failed', err);
            alert('Failed to delete user');
        }
    };
    
    return (
        <div id="wd-people-table">
            {showDetails && (
                <PeopleDetails
                    uid={showUserId}
                    onClose={() => {
                        setShowDetails(false);
                        fetchUsers();
                    }}
                />
            )}
            <div className="d-flex justify-content-between align-items-center mb-2">
                {privileged && <Button onClick={onAdd} variant="success">Add user</Button>}
            </div>
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
                                <span 
                                    className="text-decoration-none"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        setShowDetails(true);
                                        setShowUserId(user._id);
                                    }}
                                >
                                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                                    <span className="wd-first-name">{user.firstName}</span>
                                    {" "}
                                    <span className="wd-last-name">{user.lastName}</span>
                                </span>
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
        </div>
    );
}
