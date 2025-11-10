import { useSelector } from "react-redux";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import styles from "./ArrayStateVariable.module.css";
import { RootState } from "./store";

type Todo = { id: string; title: string };

export default function ArrayStateVariable() {
  const todos = useSelector((state: RootState) => state.todos.todos as Todo[]);

  return (
    <div id="wd-array-state-variables" className={styles.container}>
      <h2 className={styles.title}>Array State Variable</h2>

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