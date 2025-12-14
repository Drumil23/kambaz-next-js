"use client"
import { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "next/navigation";
import { addModule, editModule, updateModule, setModules, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import * as client from "./client";

import type { Module } from "../../../Database/types";
// UI extends the database Module with optional editing flag
type Lesson = { _id: string; name: string; description?: string };
type UIModule = Module & { editing?: boolean; lessons?: Lesson[] };

export default function Modules() {
  const { cid } = useParams();
  // use modules from Redux store as source-of-truth
  const modules = useSelector((state: RootState) => state.modulesReducer.modules) as UIModule[];
  const [moduleName, setModuleName] = useState("");
  const dispatch = useDispatch();
  
  // Fetch modules from database on mount
  useEffect(() => {
    const loadModules = async () => {
      try {
        const data = await client.findModulesForCourse(cid as string);
        dispatch(setModules(data));
      } catch (error) {
        console.error("Failed to load modules:", error);
      }
    };
    loadModules();
  }, [cid, dispatch]);
  
  // wrapper handlers (avoid name collisions with imported action creators)
  const handleAddModule = async () => {
    try {
      const newModule = await client.createModuleForCourse(cid as string, {
        name: moduleName,
        description: "",
        course: cid as string,
        lessons: [],
      });
      dispatch(addModule(newModule));
      setModuleName("");
    } catch (error) {
      console.error("Failed to add module:", error);
      alert("Failed to add module. Please try again.");
    }
  };
  const handleDeleteModule = async (moduleId: string) => {
    try {
      await client.deleteModule(moduleId);
      dispatch(deleteModule(moduleId));
    } catch (error) {
      console.error("Failed to delete module:", error);
      alert("Failed to delete module. Please try again.");
    }
  };
  const handleEditModule = (moduleId: string) => {
    dispatch(editModule(moduleId));
  };
  const handleUpdateModule = async (module: UIModule) => {
    try {
      await client.updateModule(cid as string, module as unknown as client.Module);
      // Strip UI-only `editing` flag at runtime by asserting to Module when dispatching
      dispatch(updateModule(module as unknown as Module));
    } catch (error) {
      console.error("Failed to update module:", error);
      alert("Failed to update module. Please try again.");
    }
  };


  return (
    <div>
  <ModulesControls moduleName={moduleName} setModuleName={setModuleName} addModule={handleAddModule} isHeader />
      <br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
          {modules
          .filter((module) => module.course === cid)
          .map((module: UIModule) => (
            <ListGroupItem key={module._id ?? module.name} className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
                {module.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    defaultValue={module.name}
                    onChange={(e) => handleUpdateModule({ ...module, name: (e.target as HTMLInputElement).value })}
                    onKeyDown={(e) => {
                      if ((e as React.KeyboardEvent<HTMLInputElement>).key === "Enter") {
                        handleUpdateModule({ ...module, editing: false });
                      }
                    }}
                  />
                )}
                <ModuleControlButtons moduleId={module._id} deleteModule={handleDeleteModule} editModule={handleEditModule} />
              </div>
              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: Lesson) => (
                    <ListGroupItem key={lesson._id ?? lesson.name} className="wd-lesson p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                    </ListGroupItem>
                  ))}
                </ListGroup>)}
            </ListGroupItem>))}
      </ListGroup>
    </div>
  );
}

