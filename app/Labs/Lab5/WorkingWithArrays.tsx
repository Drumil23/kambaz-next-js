"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import { HTTP_SERVER } from '../../lib/config';

type Todo = {
    id: string;
    title: string;
    description: string;
    due: string;
    completed: boolean;
};

export default function WorkingWithArrays() {
    const API = `${HTTP_SERVER}/lab5/todos`;
    const [todo, setTodo] = useState<Todo>({
        id: "1",
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });

    return (
        <div id="wd-working-with-arrays">
            <h3>Working with Arrays</h3>
            <h4>Retrieving Arrays</h4>
            <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
                Get Todos
            </a>
            <hr />
            <h4>Retrieving an Item from an Array by ID</h4>
            <a id="wd-retrieve-todo-by-id" className="btn btn-primary float-end" href={`${API}/${todo.id}`}>
                Get Todo by ID
            </a>

            <FormControl id="wd-todo-id" value={todo.id} className="w-50"
                onChange={(e) => setTodo({ ...todo, id: (e.target as HTMLInputElement).value })} />
            <hr />

            <h3>Filtering Array Items</h3>
            <a id="wd-retrieve-completed-todos" className="btn btn-primary"
                href={`${API}?completed=true`}>
                Get Completed Todos
            </a><hr />

            <h3>Creating new Items in an Array</h3>
            <a id="wd-retrieve-completed-todos" className="btn btn-primary"
                href={`${API}/create`}>
                Create Todo
            </a><hr />

            <h3>Removing from an Array</h3>
            <a id="wd-remove-todo" className="btn btn-primary float-end" href={`${API}/${todo.id}/delete`}>
                Remove Todo with ID = {todo.id} </a>
            <FormControl value={todo.id} className="w-50" onChange={(e) => setTodo({ ...todo, id: (e.target as HTMLInputElement).value })} /><hr />

            <h3>Updating an Item in an Array</h3>

            <div className="row">
                <div className="col-md-6">
                    <FormControl value={todo.id} className="form-control form-control-lg rounded-3 mb-3" onChange={(e) => setTodo({ ...todo, id: (e.target as HTMLInputElement).value })} />

                    <FormControl value={todo.title} className="form-control form-control-lg rounded-3 mb-3" onChange={(e) => setTodo({ ...todo, title: (e.target as HTMLInputElement).value })} />

                    <FormControl value={todo.description} className="form-control form-control-lg rounded-3 mb-3" onChange={(e) => setTodo({ ...todo, description: (e.target as HTMLInputElement).value })} />

                    <div className="d-flex align-items-center">
                        <div className="form-check">
                            <input id="wd-todo-completed" className="form-check-input" type="checkbox" checked={todo.completed || false}
                                onChange={(e) => setTodo({ ...todo, completed: (e.target as HTMLInputElement).checked })} />
                            <label htmlFor="wd-todo-completed" className="form-check-label ms-2">Completed</label>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
                    <a id="wd-update-todo-title" href={`${API}/${todo.id}/title/${encodeURIComponent(todo.title)}`} className="btn btn-primary btn-lg rounded-pill w-75 mb-3 text-wrap text-center">
                        Update Todo Title
                    </a>

                    <a id="wd-update-todo-description" href={`${API}/${todo.id}/description/${encodeURIComponent(todo.description || '')}`} className="btn btn-outline-primary btn-lg rounded-pill w-75 mb-3 text-wrap text-center">
                        Update Todo Description
                    </a>

                    <a id="wd-update-todo-completed" className="btn btn-outline-secondary btn-lg rounded-pill w-50 text-center" href={`${API}/${todo.id}/completed/${todo.completed ? 'true' : 'false'}`}>
                        Update Completed
                    </a>
                </div>
            </div>

            <hr />

        </div>
    );
}