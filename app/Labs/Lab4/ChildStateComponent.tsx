import React from "react";

export default function ChildStateComponent({
  counter,
  setCounter,
}: {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div id="wd-child-state">
      <h3>Counter {counter}</h3>
      <button
        type="button"
        className="btn btn-sm btn-success me-2"
        onClick={() => setCounter((c) => c + 1)}
        id="wd-increment-child-state-click"
        aria-label="Increment counter"
      >
        +
      </button>
      <button
        type="button"
        className="btn btn-sm btn-danger"
        onClick={() => setCounter((c) => c - 1)}
        id="wd-decrement-child-state-click"
        aria-label="Decrement counter"
      >
        -
      </button>
    </div>
  );
}