import axios from "axios";
import { HTTP_SERVER } from "../../../lib/config";
import type { Assignment } from "../../Database/types";

const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;

export const fetchAssignments = async (courseId?: string): Promise<Assignment[]> => {
  const params: Record<string, string> = {};
  if (courseId) params.course = courseId;
  const { data } = await axios.get<Assignment[]>(ASSIGNMENTS_API, { params });
  return data;
};

export const fetchAssignment = async (id: string): Promise<Assignment> => {
  const { data } = await axios.get<Assignment>(`${ASSIGNMENTS_API}/${id}`);
  return data;
};

export const createAssignment = async (a: Partial<Assignment>, roleHeader?: string): Promise<Assignment> => {
  const headers: Record<string, string> = {};
  if (roleHeader) headers["x-role"] = roleHeader;
  const { data } = await axios.post<Assignment>(ASSIGNMENTS_API, a, { headers });
  return data;
};

export const updateAssignment = async (a: Assignment, roleHeader?: string): Promise<Assignment> => {
  const headers: Record<string, string> = {};
  if (roleHeader) headers["x-role"] = roleHeader;
  const { data } = await axios.put<Assignment>(`${ASSIGNMENTS_API}/${a._id}`, a, { headers });
  return data;
};

export const deleteAssignmentApi = async (id: string, roleHeader?: string): Promise<Assignment> => {
  const headers: Record<string, string> = {};
  if (roleHeader) headers["x-role"] = roleHeader;
  const { data } = await axios.delete<Assignment>(`${ASSIGNMENTS_API}/${id}`, { headers });
  return data;
};

export default {
  fetchAssignments,
  fetchAssignment,
  createAssignment,
  updateAssignment,
  deleteAssignmentApi,
};