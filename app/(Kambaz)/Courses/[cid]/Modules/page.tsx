"use client"
import { useState } from "react";
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
  // wrapper handlers (avoid name collisions with imported action creators)
  const handleAddModule = () => {
    dispatch(addModule({ name: moduleName, course: cid as string }));
    setModuleName("");
  };
  const handleDeleteModule = (moduleId: string) => {
    dispatch(deleteModule(moduleId));
  };
  const handleEditModule = (moduleId: string) => {
    dispatch(editModule(moduleId));
  };
  const handleUpdateModule = (module: UIModule) => {
    // Strip UI-only `editing` flag at runtime by asserting to Module when dispatching
    dispatch(updateModule(module as unknown as Module));
  };

  const onUpdateModule = async (module: UIModule) => {
    await client.updateModule(cid as string, module as unknown as client.Module);
    const newModules = modules.map((m: UIModule) =>
      m._id === module._id ? module : m
    );
    dispatch(setModules(newModules as Module[]));
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

