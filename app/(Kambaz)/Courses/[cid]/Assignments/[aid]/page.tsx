export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" defaultValue={100} />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-due-date">Due Date</label>
          </td>
          <td>
            <input id="wd-due-date" type="date" />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assignment-type">Type</label>
          </td>
          <td>
            <select id="wd-assignment-type">
              <option value="homework">Homework</option>
              <option value="quiz">Quiz</option>
              <option value="project">Project</option>
              <option value="exam">Exam</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade As</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option value="points">Points</option>
              <option value="percentage">Percentage</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign To</label>
            <select id="wd-assign-to">
              <option value="everyone">Everyone</option>
              <option value="group1">Group 1</option>
              <option value="group2">Group 2</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-due-date">Due Date</label>
          </td>
          <td>
            <input id="wd-due-date" type="date" />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-available-from">Available From</label>
          </td>
          <td>
            <input id="wd-available-from" type="date" />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-available-until">Until</label>
          </td>
          <td>
            <input id="wd-available-until" type="date" />
          </td>
        </tr>
        <button id="wd-save-assignment">Save</button>
        <button id="wd-cancel-assignment">Cancel</button>
        <button id="wd-delete-assignment">Delete</button>
      </table>
    </div>
  );
}
