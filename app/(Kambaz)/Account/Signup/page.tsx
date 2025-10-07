import Link from "next/link";
import FormControl from "react-bootstrap/esm/FormControl";
export default function Signup() {
    return (
        <div id="wd-signup-screen">
            <h1>Sign up</h1>
            <FormControl placeholder="username" className="wd-username" /><br />
            <FormControl placeholder="password" type="password" className="wd-password" /><br />
            <FormControl placeholder="verify password" type="password" className="wd-password-verify" /><br />
            <Link id="wd-signup-btn"
        href="/Account/Profile"
        className="btn btn-primary w-100 mb-2">
        Sign up </Link><br />
            <Link href="Profile" > Sign up </Link><br />
            <Link href="Signin" > Sign in </Link>
        </div>
    );
}
