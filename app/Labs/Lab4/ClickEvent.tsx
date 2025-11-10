"use client"
const hello = () => {
  alert("Hello World!");
};
const lifeIs = (good: string) => {
  alert(`Life is ${good}`);
};
export default function ClickEvent() {
  return (
    <div id="wd-click-event">
      <h2>Click Event</h2>
      <button
        type="button"
        className="btn btn-primary me-2"
        onClick={hello}
        id="wd-hello-world-click"
        aria-label="Say hello"
      >
        Hello World!
      </button>

      <button
        type="button"
        className="btn btn-success me-2"
        onClick={() => lifeIs("Good!")}
        id="wd-life-is-good-click"
        aria-label="Say life is good"
      >
        Life is Good!
      </button>

      <button
        type="button"
        className="btn btn-info"
        onClick={() => {
          hello();
          lifeIs("Great!");
        }}
        id="wd-life-is-great-click"
        aria-label="Say life is great"
      >
        Life is Great!
      </button>
      <hr/>
    </div>
);}

