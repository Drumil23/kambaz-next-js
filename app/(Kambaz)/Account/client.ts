import axios from "axios";
import { HTTP_SERVER } from "../../lib/config";

// Create axios instance with credentials enabled (no baseURL to avoid double concatenation)
const axiosWithCredentials = axios.create({
  withCredentials: true,
});

const USERS_API = `${HTTP_SERVER}/api/users`;

export type Credentials = { username: string; password: string };

export type User = {
  _id?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
};

export type Course = {
  _id: string;
  name: string;
  number?: string;
  startDate?: string;
  endDate?: string;
  department?: string;
  credits?: number;
  description?: string;
  [key: string]: unknown;
};

export const signin = async (credentials: Credentials): Promise<User | null> => {
  const response = await axiosWithCredentials.post<User | null>(`${USERS_API}/signin`, credentials);
  return response.data;
};

export const signup = async (user: User): Promise<User> => {
  const response = await axiosWithCredentials.post<User>(`${USERS_API}/signup`, user);
  return response.data;
};

export const profile = async (): Promise<User | null> => {
  const response = await axiosWithCredentials.post<User | null>(`${USERS_API}/profile`);
  return response.data;
};

export const signout = async (): Promise<void> => {
  await axiosWithCredentials.post(`${USERS_API}/signout`);
};

export const updateUser = async (user: User): Promise<User> => {
  const response = await axiosWithCredentials.put<User>(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const findMyCourses = async (): Promise<Course[]> => {
  const response = await axiosWithCredentials.get<Course[]>(`${USERS_API}/current/courses`);
  return response.data;
};

export const createCourse = async (course: Omit<Course, "_id">): Promise<Course> => {
  const response = await axiosWithCredentials.post<Course>(`${USERS_API}/current/courses`, course);
  return response.data;
};
