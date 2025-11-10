import React from "react";
import { Button, ListGroupItem, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store";

type Todo = { id: string; title: string };

type Props = {
  todo?: Todo;
  setTodo?: (todo: Todo) => void;
  addTodo?: (todo: Todo) => void;
  updateTodo?: (todo: Todo) => void;
};

export default function TodoForm(props: Props) {
  // prefer redux-backed todo; props are accepted for backwards-compatibility
  const reduxTodo = useSelector((state: RootState) => state.todos.todo);
  const dispatch = useDispatch();

  const current = reduxTodo ?? props.todo;

  return (
    <ListGroupItem>
      <Button
        onClick={() => dispatch(addTodo(current))}
        id="wd-add-todo-click"
        variant="success"
        className="me-2"
      >
        Add
      </Button>
      <Button
        onClick={() => dispatch(updateTodo(current))}
        id="wd-update-todo-click"
        variant="warning"
        className="me-2"
      >
        Update
      </Button>
      <FormControl
        value={current?.title ?? ""}
        onChange={(e) => dispatch(setTodo({ ...(current ?? { id: "-1", title: "" }), title: e.target.value }))}
        placeholder="Enter todo title"
      />
    </ListGroupItem>
  );
}

