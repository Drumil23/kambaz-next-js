import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modules } from "../../../Database";
import { v4 as uuidv4 } from "uuid";
import type { Module } from "../../../Database/types";

interface ModulesState {
  modules: Module[];
}

const initialState: ModulesState = {
  modules: modules as Module[],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (state, action: PayloadAction<Partial<Module>>) => {
      const payload = action.payload;
      const newModule: Module = {
        _id: uuidv4(),
        name: payload.name ?? "",
        description: payload.description ?? "",
        course: payload.course ?? "",
        lessons: payload.lessons ?? [],
      };
      state.modules = [...state.modules, newModule];
    },
    deleteModule: (state, action: PayloadAction<string>) => {
      const moduleId = action.payload;
      state.modules = state.modules.filter((m) => m._id !== moduleId);
    },
    updateModule: (state, action: PayloadAction<Module>) => {
      const updated = action.payload;
      state.modules = state.modules.map((m) => (m._id === updated._id ? updated : m));
    },
    editModule: (state, action: PayloadAction<string>) => {
      const moduleId = action.payload;
      state.modules = state.modules.map((m) => (m._id === moduleId ? { ...m, editing: true } as Module : m));
    },
    setModules: (state, action: PayloadAction<Module[]>) => {
      state.modules = action.payload;
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule, setModules } = modulesSlice.actions;
export default modulesSlice.reducer;

