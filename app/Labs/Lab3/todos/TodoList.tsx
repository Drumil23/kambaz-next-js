import TodoItem, { Todo } from "./TodoItem";
import todosData from "./todos.json";
import { ListGroup } from 'react-bootstrap';

const todos = todosData as Todo[];

export default function TodoList() {
    return (
        <>
            <ListGroup>
                {todos.map((todo, index) => {
                    return (<TodoItem key={index} todo={todo} />);
                })}
            </ListGroup><hr />
        </>
    );
}
