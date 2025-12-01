import Link from "next/link";
export default function Signin() {
 return (
   <div id="wd-signin-screen">
     <h3>Sign in</h3>
     <input defaultValue="drumil" placeholder="username" className="wd-username" /> <br />
     <input defaultValue="password" type="password" placeholder="password" className="wd-password" /> <br />
     <Link href="/Dashboard" id="wd-signin-btn"> Sign in </Link> <br />
     <Link href="/Signup" id="wd-signup-link"> Sign up </Link>
   </div>
);}
