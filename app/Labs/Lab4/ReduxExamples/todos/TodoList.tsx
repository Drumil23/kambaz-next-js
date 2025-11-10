import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const todos = useSelector((state: RootState) => state.todos.todos);

  return (
    <div>
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />

        {todos.map((t) => (
          <TodoItem key={t.id} todo={t} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}

