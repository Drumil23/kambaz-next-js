export default function Modules() {
  return (
    <div>
      {/* Implement Collapse All button, View Progress button, etc. */}
      <button id="wd-collapse-all">Collapse All</button>
      <button id="wd-view-progress">View Progress</button>
      <button id="wd-module-settings">+ Module</button>
      <select id="wd-select-publish" defaultValue="Publish All">
        <option value="Publish 1">Publish 1</option>
        <option value="Publish 2">Publish 2</option>
        <option value="Publish 3">Publish 3</option>
        <option value="Publish 4">Publish 4</option>
        <option value="Publish 5">Publish All</option>
      </select>
      <h2>Modules</h2>
      <hr />
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">Learn what is Web Development</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Understand the basics of HTML</li>
                <li className="wd-content-item">Learn about CSS styling</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 3</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Understand the basics of JavaScript</li>
                <li className="wd-content-item">Learn about DOM manipulation</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

