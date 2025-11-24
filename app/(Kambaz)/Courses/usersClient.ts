import axios from "axios";
import { HTTP_SERVER } from "../../lib/config";

const USERS_API = `${HTTP_SERVER}/api/users`;

export type Role = "Student" | "Faculty" | "Dean" | string;

export interface User {
  _id: string;
  firstName?: string;
  lastName?: string;
  loginId?: string;
  section?: string;
  role?: Role;
  lastActivity?: string;
  totalActivity?: string;
  [key: string]: unknown;
}

export const fetchUsersForCourse = async (courseId: string): Promise<User[]> => {
  const { data } = await axios.get<User[]>(USERS_API, { params: { course: courseId } });
  return data;
};

export const fetchAllUsers = async (): Promise<User[]> => {
  const { data } = await axios.get<User[]>(USERS_API);
  return data;
};

export const createUser = async (user: Partial<User>, roleHeader?: Role): Promise<User> => {
  const headers: Record<string, string> = {};
  if (roleHeader) headers["x-role"] = roleHeader;
  const { data } = await axios.post<User>(USERS_API, user, { headers });
  return data;
};

export const updateUser = async (user: User, roleHeader?: Role): Promise<User> => {
  const headers: Record<string, string> = {};
  if (roleHeader) headers["x-role"] = roleHeader;
  const { data } = await axios.put<User>(`${USERS_API}/${user._id}`, user, { headers });
  return data;
};

export const deleteUser = async (id: string, roleHeader?: Role): Promise<User> => {
  const headers: Record<string, string> = {};
  if (roleHeader) headers["x-role"] = roleHeader;
  const { data } = await axios.delete<User>(`${USERS_API}/${id}`, { headers });
  return data;
};
