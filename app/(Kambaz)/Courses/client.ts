import axios from "axios";
import { HTTP_SERVER } from "../../lib/config";

const COURSES_API = `${HTTP_SERVER}/api/courses`;

export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};

export interface Course {
  _id: string;
  title?: string;
  description?: string;
  published?: boolean;
  price?: number;
  [key: string]: unknown;
}

export const updateCourse = async (course: Course) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};
