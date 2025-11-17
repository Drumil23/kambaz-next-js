"use client";
import { redirect } from "next/dist/client/components/navigation";
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
 const { currentUser } = useSelector((state: RootState) => state.accountReducer);

 useEffect(() => {
   if (!currentUser) return redirect("/Account/Signin");
   setProfile(currentUser as ProfileType);
 }, [currentUser]);

 const signout = async () => {
   try {
     await client.signout();
   } catch {
     // ignore
   }
   dispatch(setCurrentUser(null));
   try { sessionStorage.removeItem("kambaz.currentUser"); } catch {}
   redirect("/Account/Signin");
 };

 const updateProfile = async () => {
   if (!profile) return;
   try {
     const updated = await client.updateUser(profile);
     dispatch(setCurrentUser(updated));
     try { sessionStorage.setItem("kambaz.currentUser", JSON.stringify(updated)); } catch {}
   } catch (err: any) {
     alert(err?.response?.data?.message || "Update failed");
   }
 };
 return (
   <div className="wd-profile-screen">
     <h3>Profile</h3>
     {profile && (
       <div>
         <FormControl id="wd-username" className="mb-2"
           defaultValue={profile.username}
           onChange={(e) => setProfile({ ...profile, username: e.target.value }) } />
         <FormControl id="wd-password" className="mb-2"
           defaultValue={profile.password}
           onChange={(e) => setProfile({ ...profile, password: e.target.value }) } />
         <FormControl id="wd-firstname" className="mb-2"
           defaultValue={profile.firstName}
           onChange={(e) => setProfile({ ...profile, firstName: e.target.value }) } />
         <FormControl id="wd-lastname" className="mb-2"
           defaultValue={profile.lastName}
           onChange={(e) => setProfile({ ...profile, lastName: e.target.value }) } />
         <FormControl id="wd-dob" className="mb-2" type="date"
           defaultValue={profile.dob}
           onChange={(e) => setProfile({ ...profile, dob: e.target.value })} />
         <FormControl id="wd-email" className="mb-2"
           defaultValue={profile.email}
           onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
         <select className="form-control mb-2" id="wd-role" 
           onChange={(e) => setProfile({ ...profile, role: e.target.value })} >
           <option value="USER">User</option>
           <option value="ADMIN">Admin</option>
           <option value="FACULTY">Faculty</option>{" "}
           <option value="STUDENT">Student</option>
         </select>
          <Button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </Button>
          <Button onClick={signout} className="wd-signout-btn btn btn-danger w-100"> Sign out </Button>
       </div>
     )}
   </div>
);}
