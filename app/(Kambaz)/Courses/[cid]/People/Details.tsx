import { useEffect, useState } from "react";
import { FaPencil, FaCheck, FaCircle } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { Button, Form } from "react-bootstrap";
import * as client from "../../../Account/client";

export default function PeopleDetails({ uid, onClose }: { uid: string | null; onClose: () => void; }) {
  type User = {
    _id?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    loginId?: string;
    section?: string;
    email?: string;
    totalActivity?: number;
  };

  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  
  useEffect(() => {
    const fetchUser = async () => {
      if (!uid) return;
      const fetched = await client.findUserById(uid);
      setUser(fetched ?? null);
      if (fetched) {
        setName(`${fetched.firstName || ''} ${fetched.lastName || ''}`);
        setEmail(fetched.email || '');
        setRole(fetched.role || '');
      }
    };
    if (uid) fetchUser();
  }, [uid]);

  const handleSave = async () => {
    if (!user) return;
    const [firstName, ...lastNameParts] = name.split(' ');
    const lastName = lastNameParts.join(' ');
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      email,
      role,
    };
    try {
      await client.updateUser(updatedUser);
      setUser(updatedUser);
      setEditing(false);
    } catch (err) {
      console.error('Failed to update user:', err);
      alert('Failed to update user');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  const handleDelete = async () => {
    if (!uid) return;
    if (!confirm(`Delete ${user?.firstName ?? ''} ${user?.lastName ?? ''}?`)) return;
    try {
      await client.deleteUser(uid);
      onClose();
    } catch (err) {
      console.error('Failed to delete user:', err);
      alert('Failed to delete user');
    }
  };

  if (!uid) return null;
  
  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={onClose} className="btn position-fixed end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" />
      </button>
      <div className="text-center mt-2">
        <FaCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />
      
      <div className="d-flex justify-content-between align-items-start mb-3">
        {!editing && (
          <div 
            className="text-danger fs-4 wd-name" 
            style={{ cursor: 'pointer' }}
            onClick={() => setEditing(true)}
          >
            {user?.firstName ?? ''} {user?.lastName ?? ''}
          </div>
        )}
        {editing && (
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="form-control wd-edit-name"
            autoFocus
          />
        )}
        <div>
          {!editing && (
            <FaPencil 
              onClick={() => setEditing(true)} 
              className="text-primary me-2 wd-edit"
              style={{ cursor: 'pointer' }}
            />
          )}
          {editing && (
            <FaCheck 
              onClick={handleSave} 
              className="text-success me-2 wd-save"
              style={{ cursor: 'pointer' }}
            />
          )}
        </div>
      </div>

      {editing ? (
        <>
          <b>Email:</b>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            className="mb-2 wd-edit-email"
            placeholder="Enter email"
          />
          <b>Role:</b>
          <Form.Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mb-2 wd-edit-role"
          >
            <option value="STUDENT">Student</option>
            <option value="TA">TA</option>
            <option value="FACULTY">Faculty</option>
            <option value="ADMIN">Admin</option>
          </Form.Select>
        </>
      ) : (
        <>
          <b>Email:</b> <span className="wd-email">{user?.email ?? ''}</span> <br />
          <b>Roles:</b> <span className="wd-roles">{user?.role ?? ''}</span> <br />
        </>
      )}
      
      <b>Login ID:</b> <span className="wd-login-id">{user?.loginId ?? ''}</span> <br />
      <b>Section:</b> <span className="wd-section">{user?.section ?? ''}</span> <br />
      <b>Total Activity:</b> <span className="wd-total-activity">{user?.totalActivity ?? ''}</span>
      
      <hr />
      <div className="d-flex gap-2 mt-3">
        <Button variant="danger" className="w-50 wd-delete" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="secondary" className="w-50 wd-cancel" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
