import { useState } from "react";
export default function Counter() {
  //let count = 7;
  const [count, setCount] = useState(7);
  console.log(count);
  return (
    <div>
      <h2>Counter: {count}</h2>
      <button
        type="button"
        className="btn btn-success me-2"
        onClick={() => setCount(count + 1)}
        id="wd-counter-up-click"
        aria-label="Increment"
      >
        Up
      </button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => setCount(count - 1)}
        id="wd-counter-down-click"
        aria-label="Decrement"
      >
        Down
      </button>
      <hr />
    </div>
  );
}