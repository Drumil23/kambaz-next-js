import { ListGroupItem } from 'react-bootstrap';
export interface Todo {
  done: boolean;
  title: string;
  status: 'COMPLETED' | 'PENDING' | 'IN_PROGRESS' | 'DEFERRED' | 'CANCELED';
}
const TodoItem = ({ todo = {
  done: true, title: 'Buy milk',
  status: 'COMPLETED' as const
} }: { todo?: Todo }) => {
  return (
    <ListGroupItem>
      <input type="checkbox" className="me-2"
        defaultChecked={todo.done} />
      {todo.title} ({todo.status})
    </ListGroupItem>
  );
}
export default TodoItem;