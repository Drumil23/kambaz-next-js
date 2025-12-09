"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import { Button, FormControl } from "react-bootstrap";
import * as client from "../client";

type ProfileType = {
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
};

export default function Profile() {
 const [profile, setProfile] = useState<ProfileType | null>(null);
 const dispatch = useDispatch();
 const router = useRouter();
 const { currentUser } = useSelector((state: RootState) => state.accountReducer);

 useEffect(() => {
   if (!currentUser) {
     router.push("/Account/Signin");
     return;
   }
   setProfile(currentUser as ProfileType);
 }, [currentUser, router]);

 const signout = async () => {
   try {
     await client.signout();
   } catch {
     // ignore
   }
   dispatch(setCurrentUser(null));
   try { sessionStorage.removeItem("kambaz.currentUser"); } catch {}
   router.push("/Account/Signin");
 };

 const updateProfile = async () => {
   if (!profile) return;
   try {
     const updated = await client.updateUser(profile);
     dispatch(setCurrentUser(updated));
     try { sessionStorage.setItem("kambaz.currentUser", JSON.stringify(updated)); } catch {}
  } catch (err: unknown) {
    const getErrorMessage = (e: unknown) => {
      if (typeof e === "object" && e !== null) {
        const obj = e as Record<string, unknown>;
        const response = obj.response as Record<string, unknown> | undefined;
        const data = response?.data as Record<string, unknown> | undefined;
        if (data && typeof data.message === "string") return data.message;
        if (typeof obj.message === "string") return obj.message;
      }
      if (e instanceof Error) return e.message;
      return String(e);
    };

    alert(getErrorMessage(err) || "Update failed");
  }
 };
 return (
   <div className="wd-profile-screen">
     <h3>Profile</h3>
     {profile && (
       <div>
         <FormControl id="wd-username" className="mb-2" placeholder="Username"
           value={profile.username || ""}
           onChange={(e) => setProfile({ ...profile, username: e.target.value }) } />
         <FormControl id="wd-password" className="mb-2" placeholder="Password" type="password"
           value={profile.password || ""}
           onChange={(e) => setProfile({ ...profile, password: e.target.value }) } />
         <FormControl id="wd-firstname" className="mb-2" placeholder="First Name"
           value={profile.firstName || ""}
           onChange={(e) => setProfile({ ...profile, firstName: e.target.value }) } />
         <FormControl id="wd-lastname" className="mb-2" placeholder="Last Name"
           value={profile.lastName || ""}
           onChange={(e) => setProfile({ ...profile, lastName: e.target.value }) } />
         <FormControl id="wd-dob" className="mb-2" type="date" placeholder="Date of Birth"
           value={profile.dob || ""}
           onChange={(e) => setProfile({ ...profile, dob: e.target.value })} />
         <FormControl id="wd-email" className="mb-2" placeholder="Email"
           value={profile.email || ""}
           onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
         <select className="form-control mb-2" id="wd-role" 
           value={profile.role || "USER"}
           onChange={(e) => setProfile({ ...profile, role: e.target.value })} >
           <option value="USER">User</option>
           <option value="ADMIN">Admin</option>
           <option value="FACULTY">Faculty</option>
           <option value="STUDENT">Student</option>
         </select>
          <Button onClick={updateProfile} className="btn btn-primary w-100 mb-2" id="wd-update-btn"> Update </Button>
          <Button onClick={signout} className="wd-signout-btn btn btn-danger w-100" id="wd-signout-btn"> Sign out </Button>
       </div>
     )}
   </div>
);}
