import { useSelector, useDispatch } from "react-redux";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import styles from "./ArrayStateVariable.module.css";
import { RootState } from "./store";
import { addTodo, deleteTodo } from "./ReduxExamples/todos/todosReducer";

type Todo = { id: string; title: string };

export default function ArrayStateVariable() {
  const todos = useSelector((state: RootState) => state.todos.todos as Todo[]);
  const dispatch = useDispatch();

  const addElement = () => {
    const newTodo = {
      id: new Date().getTime().toString(),
      title: `Todo ${todos.length + 1}`,
    };
    dispatch(addTodo(newTodo));
  };

  const deleteElement = (id: string) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div id="wd-array-state-variables" className={styles.container}>
      <h2 className={styles.title}>Array State Variable</h2>

      <button onClick={addElement} className="btn btn-success mb-2 me-2" id="wd-add-element-click">
        Add Element
      </button>
      <button onClick={() => deleteElement(todos[0]?.id)} className="btn btn-danger mb-2" id="wd-delete-element-click">
        Delete Element
      </button>

      <ListGroup className={styles.arrayList}>
        {todos.map((todo: Todo) => (
          <ListGroupItem key={todo.id} className={styles.arrayItem}>
            <span className={styles.itemNumber}>{todo.title}</span>
          </ListGroupItem>
        ))}
      </ListGroup>

      <hr />
    </div>
  );
}