"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as client from "../client";
import { FormControl, Button } from "react-bootstrap";

type Credentials = { username: string; password: string };
// type User = { loginId?: string; password?: string; [key: string]: unknown };

export default function Signin() {
 const [credentials, setCredentials] = useState<Credentials>({ username: "", password: "" });
 const [error, setError] = useState<string | null>(null);
 const dispatch = useDispatch();
 const router = useRouter();
 const [signedIn, setSignedIn] = useState(false);
 const signin = async () => {
  setError(null);
  try {
    const user = await client.signin(credentials);
    if (!user) {
      setError("Invalid credentials. If you don't have an account, please sign up.");
      return;
    }
    dispatch(setCurrentUser(user));
    try {
      sessionStorage.setItem("kambaz.currentUser", JSON.stringify(user));
    } catch {}
    setSignedIn(true);
    router.push("/Dashboard?showAll=1");
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

    setError(getErrorMessage(err) || "Sign in failed");
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
