import Link from "next/link";
import FormControl from "react-bootstrap/esm/FormControl";
import { useState } from "react";
import * as client from "../client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { useRouter } from "next/navigation";

export default function Signup() {
    const [user, setUser] = useState<any>({ username: "", password: "" });
    const dispatch = useDispatch();
    const router = useRouter();

    const signup = async () => {
        try {
            const currentUser = await client.signup(user);
            dispatch(setCurrentUser(currentUser));
            try { sessionStorage.setItem("kambaz.currentUser", JSON.stringify(currentUser)); } catch {}
            router.push("/Account/Profile");
        } catch (err: any) {
            alert(err?.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div id="wd-signup-screen">
            <h1>Sign up</h1>
            <FormControl value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="username" className="wd-username mb-2" /><br />
            <FormControl value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password" type="password" className="wd-password mb-2" /><br />
            <button id="wd-signup-btn" onClick={signup} className="btn btn-primary w-100 mb-2"> Sign up </button><br />
            <Link href="/Account/Signin"> Sign in </Link>
        </div>
    );
}
