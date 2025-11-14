"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../Database";
import { FormControl, Button } from "react-bootstrap";

type Credentials = { username: string; password: string };
type User = { loginId?: string; password?: string; [key: string]: unknown };

export default function Signin() {
 const [credentials, setCredentials] = useState<Credentials>({ username: "", password: "" });
 const [error, setError] = useState<string | null>(null);
 const dispatch = useDispatch();
 const router = useRouter();
 const [signedIn, setSignedIn] = useState(false);
 const signin = () => {
  setError(null);
  const user = (db.users as User[]).find(
    (u) => u.loginId === credentials.username && u.password === credentials.password
  );
  if (!user) {
    setError("Invalid credentials. If you don't have an account, please sign up.");
    return;
  }
  console.log("Signin: matched user", user);
  dispatch(setCurrentUser(user));
  try {
    sessionStorage.setItem("kambaz.currentUser", JSON.stringify(user));
  } catch {
    /* ignore */
  }
  // redirect to dashboard and show all courses by default after sign in
  setSignedIn(true);
  try {
    router.push("/Dashboard?showAll=1");
    console.log("Signin: router.push called");
  } catch (e) {
    console.error("Signin: router.push error", e);
  }
 };
  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
            <FormControl value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="mb-2" placeholder="username" id="wd-username" />
              <FormControl value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="mb-2" placeholder="password" type="password" id="wd-password" />
            {error && <div className="alert alert-danger mt-2" role="alert" id="wd-signin-error">{error}</div>}
      <Button onClick={signin} id="wd-signin-btn" className="w-100" > Sign in </Button>
      {signedIn && (
        <div className="alert alert-success mt-2" id="wd-signin-success">
          Signed in — redirecting to Dashboard. <Link href="/Dashboard">Open Dashboard</Link>
        </div>
      )}
      <Link id="wd-signup-link" href="/Account/Signup"> Sign up </Link>
    </div>
);}
