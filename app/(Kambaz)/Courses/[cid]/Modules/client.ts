import axios from "axios";
import { HTTP_SERVER } from "../../../../lib/config";

const MODULES_API = `${HTTP_SERVER}/api/modules`;
const COURSES_API = `${HTTP_SERVER}/api/courses`;

export type Lesson = {
  _id: string;
  name: string;
  description?: string;
  module?: string;
};

export type Module = {
  _id: string;
  name: string;
  description?: string;
  course: string;
  lessons?: Lesson[];
  [key: string]: unknown;
};

export const findModulesForCourse = async (courseId: string): Promise<Module[]> => {
  const response = await axios.get<Module[]>(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const createModuleForCourse = async (courseId: string, module: Omit<Module, "_id">): Promise<Module> => {
  const response = await axios.post<Module>(`${COURSES_API}/${courseId}/modules`, module);
  return response.data;
};

export const deleteModule = async (moduleId: string): Promise<{ status: string }> => {
  const response = await axios.delete<{ status: string }>(`${MODULES_API}/${moduleId}`);
  return response.data;
};

export const updateModule = async (module: Module): Promise<Module> => {
  const { data } = await axios.put<Module>(`${MODULES_API}/${module._id}`, module);
  return data;
};
