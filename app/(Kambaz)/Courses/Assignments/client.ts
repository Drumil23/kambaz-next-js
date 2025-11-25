import axios, { type AxiosError } from "axios";
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

  const primaryUrl = `${ASSIGNMENTS_API}`;
  console.debug('createAssignment -> POST', primaryUrl, 'payload=', a, 'headers=', headers);

  try {
    const { data } = await axios.post<Assignment>(primaryUrl, a, { headers });
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const axiosErr = err as AxiosError;
      const status = axiosErr.response?.status;
      const respData = axiosErr.response?.data;
      console.warn('createAssignment primary failed', { status, respData });
      if (status === 404) {
        // Retry with relative path in case HTTP_SERVER points to wrong host
        const alt = '/api/assignments';
        try {
          console.debug('createAssignment -> retrying POST', alt);
          const { data } = await axios.post<Assignment>(alt, a, { headers });
          return data;
        } catch (err2: unknown) {
          const m = axios.isAxiosError(err2) ? `status=${err2.response?.status} body=${JSON.stringify(err2.response?.data)}` : String(err2);
          throw new Error(`Primary POST 404 and retry failed: ${m}`);
        }
      }
      let serverMsg: string | undefined = undefined;
      if (respData && typeof respData === 'object') {
        const rv = respData as Record<string, unknown>;
        if ('error' in rv) serverMsg = typeof rv.error === 'string' ? rv.error : String(rv.error);
      }
      const msg = serverMsg || axiosErr.message || `Request failed with status ${status}`;
      throw new Error(String(msg));
    }
    throw err;
  }
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

export const assignmentsApi = {
  fetchAssignments,
  fetchAssignment,
  createAssignment,
  updateAssignment,
  deleteAssignmentApi,
};