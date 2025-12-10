"use client"
import { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "next/navigation";
import { addModule, editModule, updateModule, deleteModule, setModules }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import * as modulesClient from "./client";

import type { Module } from "../../../Database/types";
// UI extends the database Module with optional editing flag
type Lesson = { _id: string; name: string; description?: string };
type UIModule = Module & { editing?: boolean; lessons?: Lesson[] };

export default function Modules() {
  const { cid } = useParams();
  // use modules from Redux store as source-of-truth
  const modules = useSelector((state: RootState) => state.modulesReducer.modules) as UIModule[];
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [moduleName, setModuleName] = useState("");
  const dispatch = useDispatch();
  const isFacultyOrDean = currentUser?.role === "Faculty" || currentUser?.role === "Dean";
  
  // Fetch modules on mount
  useEffect(() => {
    const fetchModules = async () => {
      if (cid) {
        try {
          const fetchedModules = await modulesClient.findModulesForCourse(cid as string);
          dispatch(setModules(fetchedModules as unknown as Module[]));
        } catch (error) {
          console.error("Error fetching modules:", error);
        }
      }
    };
    fetchModules();
  }, [cid, dispatch]);
  
  // wrapper handlers (avoid name collisions with imported action creators)
  const handleAddModule = async () => {
    try {
      const newModule = await modulesClient.createModuleForCourse(cid as string, { name: moduleName, course: cid as string });
      dispatch(addModule(newModule as unknown as Partial<Module>));
      setModuleName("");
    } catch (error) {
      console.error("Error creating module:", error);
      alert("Failed to create module");
    }
  };
  const handleDeleteModule = async (moduleId: string) => {
    try {
      await modulesClient.deleteModule(cid as string, moduleId);
      dispatch(deleteModule(moduleId));
    } catch (error) {
      console.error("Error deleting module:", error);
      alert("Failed to delete module");
    }
  };
  const handleEditModule = (moduleId: string) => {
    dispatch(editModule(moduleId));
  };
  const handleUpdateModule = async (module: UIModule) => {
    // Strip UI-only `editing` flag at runtime by asserting to Module when dispatching
    try {
      if (module.editing === false) {
        await modulesClient.updateModule(cid as string, module as unknown as modulesClient.Module);
      }
      dispatch(updateModule(module as unknown as Module));
    } catch (error) {
      console.error("Error updating module:", error);
    }
  };


  return (
    <div>
      {isFacultyOrDean && (
        <ModulesControls moduleName={moduleName} setModuleName={setModuleName} addModule={handleAddModule} isHeader />
      )}
      <br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
          {modules
          .filter((module) => module.course === cid)
          .map((module: UIModule) => (
            <ListGroupItem key={module._id ?? module.name} className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
                {module.editing && isFacultyOrDean && (
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
                {isFacultyOrDean && (
                  <ModuleControlButtons moduleId={module._id} deleteModule={handleDeleteModule} editModule={handleEditModule} />
                )}
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

