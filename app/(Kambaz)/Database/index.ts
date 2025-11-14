import courses from "./courses.json";
import modules from "./modules.json";
import assignments from "./assignments.json";
import enrollments from "./enrollments.json";
import { PassThrough } from "stream";

export { courses, modules, assignments, enrollments }

export const users = [
  {
    _id: "123",
    firstName: "Drumil",
    lastName: "Kotecha",
    loginId: "kotech.d",
    password: "pass@123",
    section: "Section A",
    role: "Dean",
    lastActivity: "2025-10-19",
    totalActivity: "10h 30m"
  },
  {
    _id: "234",
    firstName: "Jose",
    lastName: "Ann",
    loginId: "janesmith",
    section: "Section A",
    role: "Faculty",
    lastActivity: "2025-10-18",
    totalActivity: "8h 45m"
  },
  {
    _id: "123",
    firstName: "Ankita",
    lastName: "Johnson",
    loginId: "ankitad",
    section: "Section B",
    role: "Student",
    lastActivity: "2025-10-20",
    totalActivity: "12h 15m"
  },
  {
    _id: "234",
    firstName: "Isha",
    lastName: "Williams",
    loginId: "ishaw",
    section: "Section B",
    role: "Student",
    lastActivity: "2025-10-19",
    totalActivity: "9h 20m"
  }
];