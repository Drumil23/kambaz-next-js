import Link from "next/link";
import FormControl from "react-bootstrap/esm/FormControl";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <FormControl defaultValue="Drumil" placeholder="username" className="wd-username" /><br />
      <FormControl defaultValue="plsGiveFullMarks" placeholder="password" type="password" className="wd-password" /><br />
      <FormControl defaultValue="Drumil" placeholder="First Name" id="wd-firstname" /><br />
      <FormControl defaultValue="Kotecha" placeholder="Last Name" id="wd-lastname" /><br />
      <FormControl defaultValue="2003-06-04" type="date" id="wd-dob" /><br />
      <FormControl defaultValue="d@northeastern.edu" type="email" id="wd-email" /><br />
      <FormControl as="select" defaultValue="FACULTY" id="wd-role">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </FormControl><br />
      <Link id="wd-update-btn"
        href="/Account/Profile"
        className="btn btn-danger w-100 mb-2">
        Signout
      </Link><br />
      <Link href="Signin" > Sign out </Link>
    </div>
);}
