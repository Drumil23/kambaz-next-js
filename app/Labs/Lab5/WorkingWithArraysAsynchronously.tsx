"use client";
import React, { useEffect, useState } from "react";
import * as client from "./client";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { FaTrash, FaPlusCircle, FaPencilAlt } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

type Todo = {
    id: number | string;
    title: string;
    completed?: boolean;
    editing?: boolean;
};

export default function WorkingWithArraysAsynchronously() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchTodos = async () => {
        const todos = await client.fetchTodos();
        setTodos(todos || []);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    // Legacy create (GET) that returns full list
    const createNewTodo = async () => {
        const updated = await client.createNewTodo();
        setTodos(updated || []);
    };

    // New POST create that returns only the new todo
    const postNewTodo = async () => {
        const newTodo = await client.postNewTodo({ title: "New Posted Todo", completed: false });
        setTodos((prev) => [...prev, newTodo]);
    };

    // Legacy remove using GET that returns full list
    const removeTodo = async (todo: Todo) => {
        const updated = await client.removeTodo(todo);
        setTodos(updated || []);
    };

    // New DELETE using axios.delete; optimistic UI update
    const deleteTodo = async (todo: Todo) => {
        try {
            await client.deleteTodo(todo);
            setTodos((prev) => prev.filter((t) => t.id !== todo.id));
        } catch (err: unknown) {
            const errObj = err as { response?: { data?: { message?: string } } };
            const msg = errObj.response?.data?.message || "Unable to delete todo";
            setErrorMessage(msg);
        }
    };

    const editTodo = (todo: Todo) => {
        setTodos((prev) => prev.map((t) => (t.id === todo.id ? { ...t, editing: true } : t)));
    };

    const updateTodo = async (todo: Todo) => {
        try {
            await client.updateTodo(todo);
            setTodos((prev) => prev.map((t) => (t.id === todo.id ? { ...todo, editing: false } : t)));
        } catch (err: unknown) {
            const errObj = err as { response?: { data?: { message?: string } } };
            const msg = errObj.response?.data?.message || "Unable to update todo";
            setErrorMessage(msg);
        }
    };

    return (
        <div id="wd-asynchronous-arrays">
            <h3>Working with Arrays Asynchronously</h3>
            <h4>
                Todos
                <FaPlusCircle onClick={createNewTodo} className="text-success float-end fs-3" id="wd-create-todo" />
                <FaPlusCircle onClick={postNewTodo} className="text-primary float-end fs-3 me-3" id="wd-post-todo" />
            </h4>

            {errorMessage && (<div id="wd-todo-error-message" className="alert alert-danger mb-2 mt-2">{errorMessage}</div>)}

            <ListGroup>
                {todos.map((todo) => (
                    <ListGroupItem key={String(todo.id)}>
                        <div className="d-flex w-100 justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    className="form-check-input me-3"
                                    checked={!!todo.completed}
                                    onChange={(e) => updateTodo({ ...todo, completed: e.target.checked })}
                                />

                                {!todo.editing ? (
                                    <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                                        {todo.title}
                                    </span>
                                ) : (
                                    <FormControl
                                        className="ms-2"
                                        value={todo.title}
                                        autoFocus
                                        onChange={(e) => setTodos((prev) => prev.map((t) => t.id === todo.id ? { ...t, title: e.target.value } : t))}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                updateTodo({ ...todo, editing: false });
                                            }
                                        }}
                                    />
                                )}
                            </div>

                            <div className="d-flex align-items-center">
                                <FaPencilAlt onClick={() => editTodo(todo)} className="text-primary ms-3 fs-4" id="wd-edit-todo" />
                                <TiDelete onClick={() => deleteTodo(todo)} className="text-danger ms-3 fs-4" id="wd-delete-todo" />
                                <FaTrash onClick={() => removeTodo(todo)} className="text-danger ms-3 fs-4" id="wd-remove-todo" />
                            </div>
                        </div>
                    </ListGroupItem>
                ))}
            </ListGroup>
            <hr />
        </div>
    );
}
