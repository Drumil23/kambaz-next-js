"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import { HTTP_SERVER } from '../../lib/config';


export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
    type Assignment = { id: number; title: string; description?: string; due?: string; completed?: boolean; score?: number };
    type Module = { id: string; name: string; description: string; course: string };
    const [moduleObj, setModuleObj] = useState<Module | null>(null);
    const [newModuleName, setNewModuleName] = useState('');
    const [newModuleDescription, setNewModuleDescription] = useState('');
    const [newScore, setNewScore] = useState<number | ''>(assignment.score || 0);
    const [newCompleted, setNewCompleted] = useState<boolean>(assignment.completed || false);

    const fetchAssignment = async () => {
        try {
            const res = await fetch(`${HTTP_SERVER}/lab5/assignment`);
            const data = await res.json();
            setAssignment(data);
            setNewScore(data.score || 0);
            setNewCompleted(Boolean(data.completed));
        } catch (err) {
            console.error(err);
        }
    };

    const fetchModule = async () => {
        try {
            const res = await fetch(`${HTTP_SERVER}/lab5/module`);
            const data = await res.json();
            setModuleObj(data);
            setNewModuleName(data.name || '');
            setNewModuleDescription(data.description || '');
        } catch (err) {
            console.error(err);
        }
    };

    const fetchModuleName = async () => {
        try {
            const res = await fetch(`${HTTP_SERVER}/lab5/module/name`);
            const data = await res.json();
            // data is name string
            alert(`Module name: ${data}`);
        } catch (err) {
            console.error(err);
        }
    };

    const updateModuleNameFetch = async (name: string) => {
        try {
            const res = await fetch(`${HTTP_SERVER}/lab5/module/name/${encodeURIComponent(name)}`);
            const data = await res.json();
            setModuleObj(data);
        } catch (err) {
            console.error(err);
        }
    };

    const updateModuleDescriptionFetch = async (desc: string) => {
        try {
            const res = await fetch(`${HTTP_SERVER}/lab5/module/description/${encodeURIComponent(desc)}`);
            const data = await res.json();
            setModuleObj(data);
        } catch (err) {
            console.error(err);
        }
    };

    const updateAssignmentScoreFetch = async (score: number) => {
        try {
            const res = await fetch(`${ASSIGNMENT_API_URL}/score/${score}`);
            const data = await res.json();
            setAssignment(data);
        } catch (err) {
            console.error(err);
        }
    };

    const updateAssignmentCompletedFetch = async (completed: boolean) => {
        try {
            const res = await fetch(`${ASSIGNMENT_API_URL}/completed/${completed}`);
            const data = await res.json();
            setAssignment(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>
            <h4>Modifying Properties</h4>
            <a id="wd-update-assignment-title"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/title/${encodeURIComponent(assignment.title)}`}>
                Update Title </a>
            <FormControl className="w-75" id="wd-assignment-title"
                value={assignment.title} onChange={(e) =>
                    setAssignment({ ...assignment, title: (e.target as HTMLInputElement).value })} />
            <hr />

            <h4>Retrieving Objects</h4>
            <button id="wd-retrieve-assignments" className="btn btn-primary" onClick={fetchAssignment}>
                Get Assignment
            </button>
            <hr />

            {assignment && (
                <div>
                    <h5 id="wd-assignment-title">{assignment.title}</h5>
                    <pre id="wd-assignment-json">{JSON.stringify(assignment, null, 2)}</pre>
                </div>
            )}

            {/* Module: fetch and update */}
            <h4>Module</h4>
            <div className="mb-2">
                <a id="wd-get-module" className="btn btn-outline-primary me-2" href={`${HTTP_SERVER}/lab5/module`}>Get Module</a>
                <button id="wd-get-module-fetch" className="btn btn-primary me-2" onClick={fetchModule}>Fetch Module</button>
                <a id="wd-get-module-name" className="btn btn-outline-secondary me-2" href={`${HTTP_SERVER}/lab5/module/name`}>Get Module Name</a>
                <button id="wd-get-module-name-fetch" className="btn btn-secondary" onClick={fetchModuleName}>Fetch Module Name</button>
            </div>
            {moduleObj && (
                <div>
                    <h5 id="wd-module-name">{moduleObj.name}</h5>
                    <pre id="wd-module-json">{JSON.stringify(moduleObj, null, 2)}</pre>
                </div>
            )}
            <div className="mb-3">
                <label className="form-label">Edit Module Name</label>
                <input id="wd-new-module-name" className="form-control mb-2" value={newModuleName}
                    onChange={(e) => setNewModuleName((e.target as HTMLInputElement).value)} />
                <a id="wd-update-module-name" className="btn btn-outline-success me-2"
                    href={`${HTTP_SERVER}/lab5/module/name/${encodeURIComponent(newModuleName)}`}>Update Module Name (link)</a>
                <button id="wd-update-module-name-fetch" className="btn btn-success" onClick={async () => await updateModuleNameFetch(newModuleName)}>Update Module Name (fetch)</button>
            </div>
            <div className="mb-3">
                <label className="form-label">Edit Module Description</label>
                <input id="wd-new-module-desc" className="form-control mb-2" value={newModuleDescription}
                    onChange={(e) => setNewModuleDescription((e.target as HTMLInputElement).value)} />
                <a id="wd-update-module-desc" className="btn btn-outline-success me-2"
                    href={`${HTTP_SERVER}/lab5/module/description/${encodeURIComponent(newModuleDescription)}`}>Update Module Description (link)</a>
                <button id="wd-update-module-desc-fetch" className="btn btn-success" onClick={async () => await updateModuleDescriptionFetch(newModuleDescription)}>Update Module Description (fetch)</button>
            </div>

            {/* Assignment: score and completed editing */}
            <h4>Assignment Properties</h4>
            <div className="mb-3">
                <label className="form-label">Score</label>
                <input id="wd-assignment-score" type="number" className="form-control w-25 mb-2" value={newScore as number}
                    onChange={(e) => setNewScore(Number(e.target.value))} />
                <a id="wd-update-assignment-score" className="btn btn-outline-primary me-2"
                    href={`${ASSIGNMENT_API_URL}/score/${newScore}`}>Update Score (link)</a>
                <button id="wd-update-assignment-score-fetch" className="btn btn-primary" onClick={async () => { if (newScore !== '') await updateAssignmentScoreFetch(Number(newScore)); }}>Update Score (fetch)</button>
            </div>
            <div className="mb-3">
                <label className="form-check-label me-2">Completed</label>
                <input id="wd-assignment-completed" type="checkbox" className="form-check-input me-2" checked={newCompleted}
                    onChange={(e) => setNewCompleted((e.target as HTMLInputElement).checked)} />
                <a id="wd-update-assignment-completed" className="btn btn-outline-primary me-2"
                    href={`${ASSIGNMENT_API_URL}/completed/${newCompleted}`}>Update Completed (link)</a>
                <button id="wd-update-assignment-completed-fetch" className="btn btn-primary" onClick={async () => await updateAssignmentCompletedFetch(newCompleted)}>Update Completed (fetch)</button>
            </div>

        </div>
    );
}
