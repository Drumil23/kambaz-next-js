import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { Button } from "react-bootstrap";
import * as client from "../../../Account/client";

export default function PeopleDetails({ uid, onClose }: { uid: string | null; onClose: () => void; }) {
  type User = {
    id?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    loginId?: string;
    section?: string;
    totalActivity?: number;
  };

  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      if (!uid) return;
      const fetched = await client.findUserById(uid);
      setUser(fetched ?? null);
    };
    if (uid) fetchUser();
  }, [uid]);

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
        <IoCloseSharp className="fs-1" /> </button>
      <div className="text-center mt-2"> <FaUserCircle className="text-secondary me-2 fs-1" /> </div><hr />
      <div className="text-danger fs-4 wd-name"> {user?.firstName ?? ''} {user?.lastName ?? ''} </div>
      <b>Roles:</b>           <span className="wd-roles">         {user?.role ?? ''}         </span> <br />
      <b>Login ID:</b>        <span className="wd-login-id">      {user?.loginId ?? ''}      </span> <br />
      <b>Section:</b>         <span className="wd-section">       {user?.section ?? ''}      </span> <br />
      <b>Total Activity:</b>  <span className="wd-total-activity">{user?.totalActivity ?? ''}</span>
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
