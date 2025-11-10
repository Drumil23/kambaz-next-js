import React from "react";
import { Button, ListGroupItem, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store";

// `id` can be optional for the edit buffer stored in the slice
type Todo = { id?: string; title: string };

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

  // ensure we always work with a concrete todo object for handlers
  // redux slice stores a partial `todo` (may only have title), so coerce to full Todo
  const working: Todo = {
    id: (current && (current as Todo).id) ?? "-1",
    title: (current && (current as Todo).title) ?? "",
  };
  const title = working.title ?? "";
  const empty = title.trim() === "";

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next: Todo = { ...working, title: e.target.value };
    if (props.setTodo) props.setTodo(next);
    else dispatch(setTodo(next));
  };

  const onAdd = () => {
    if (empty) return;
    if (props.addTodo) props.addTodo(working);
    else dispatch(addTodo(working));
  };

  const onUpdate = () => {
    if (empty) return;
    if (props.updateTodo) props.updateTodo(working);
    else dispatch(updateTodo(working));
  };

  return (
    <ListGroupItem>
      <div className="d-flex align-items-center">
        <FormControl
          value={title}
          onChange={onChange}
          placeholder="Enter todo title"
          className="flex-grow-1 me-3"
          aria-label="Todo title"
        />

        <div className="d-flex">
          <Button
            type="button"
            onClick={onAdd}
            id="wd-add-todo-click"
            variant="success"
            className="me-2"
            disabled={empty}
          >
            Add
          </Button>
          <Button
            type="button"
            onClick={onUpdate}
            id="wd-update-todo-click"
            variant="warning"
            disabled={empty}
          >
            Update
          </Button>
        </div>
      </div>
    </ListGroupItem>
  );
}

