import React from "react";
import { Button, ListGroupItem } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

type Todo = { id: string; title: string };

export default function TodoItem({ todo }: { todo: Todo }) {
    const dispatch = useDispatch();

    return (
        <ListGroupItem
            key={todo.id}
            className="d-flex justify-content-between align-items-center"
        >
            <div>{todo.title}</div>

            <div>
                <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => dispatch(setTodo(todo))}
                    id="wd-set-todo-click"
                >
                    Edit
                </Button>

                <Button
                    variant="danger"
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    id="wd-delete-todo-click"
                >
                    Delete
                </Button>
            </div>
        </ListGroupItem>
    );
}

