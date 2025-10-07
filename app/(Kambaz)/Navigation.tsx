import { IoCalendarOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { GrDocumentTest } from "react-icons/gr";
import { SlNotebook } from "react-icons/sl";
import { BsInboxes } from "react-icons/bs";
import { GoMortarBoard } from "react-icons/go";



import Link from "next/link";
export default function KambazNavigation() {
  return (
    <ListGroup className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2" style={{ width: 120 }}
      id="wd-kambaz-navigation">
      <ListGroupItem className="bg-black border-0 text-center" as="a"
        target="_blank" href="https://www.northeastern.edu/" id="wd-neu-link">
        <img src="/images/husky.png" width="75px" alt="Northeastern University" />
      </ListGroupItem><br />
      <ListGroupItem className="border-0 bg-black text-center">
        <Link href="/Account" id="wd-account-link" className="text-white text-decoration-none">
          <FaRegCircleUser className="fs-1 text-white" />
          <br />
          Account
        </Link>
      </ListGroupItem><br />
      <ListGroupItem className="border-0 bg-white text-center">
        <Link href="/Dashboard" id="wd-dashboard-link" className="text-danger text-decoration-none">
          <GoMortarBoard className="fs-1 text-danger" />
          <br />
          Dashboard
        </Link>
      </ListGroupItem><br />
      <ListGroupItem className="border-0 bg-black text-center">
        <Link href="/Dashboard" id="wd-courses-link" className="text-white text-decoration-none">
          <SlNotebook className="fs-1 text-white" />
          <br />
          Courses
        </Link>
      </ListGroupItem><br />
      <ListGroupItem className="border-0 bg-black text-center">
        <Link href="/Calendar" id="wd-calendar-link" className="text-white text-decoration-none">
          <IoCalendarOutline className="fs-1 text-white" />
          <br />
          Calendar
        </Link>
      </ListGroupItem><br />
      <ListGroupItem className="border-0 bg-black text-center">
        <Link href="/Inbox" id="wd-inbox-link" className="text-white text-decoration-none">
          <BsInboxes className="fs-1 text-white" />
          <br />
          Inbox
        </Link>
      </ListGroupItem><br />
      <ListGroupItem className="border-0 bg-black text-center">
        <Link href="/Labs" id="wd-labs-link" className="text-white text-decoration-none">
          <GrDocumentTest className="fs-1 text-white" />
          <br />
          Labs
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}
