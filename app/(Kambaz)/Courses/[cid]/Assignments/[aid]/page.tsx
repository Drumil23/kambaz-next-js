import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <Form>
        <div className="mb-3">
          <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
          <Form.Control id="wd-name" defaultValue="A1 - ENV + HTML" />
        </div>

        <div className="mb-3">
          <Form.Control as="textarea" id="wd-description" rows={3}>
            The assignment is available online Submit a link to the landing page of
          </Form.Control>
        </div>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label htmlFor="wd-points">Points</Form.Label>
            <Form.Control id="wd-points" defaultValue={100} />
          </Col>

          <Col md={6}>
            <Form.Label htmlFor="wd-due-date">Due Date</Form.Label>
            <Form.Control id="wd-due-date" type="date" defaultValue="2025-10-20" />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label htmlFor="wd-assignment-type">Type</Form.Label>
            <Form.Select id="wd-assignment-type">
              <option value="homework">Homework</option>
              <option value="quiz">Quiz</option>
              <option value="project">Project</option>
              <option value="exam">Exam</option>
            </Form.Select>
          </Col>

          <Col md={6}>
            <Form.Label htmlFor="wd-display-grade-as">Display Grade As</Form.Label>
            <Form.Select id="wd-display-grade-as">
              <option value="points">Points</option>
              <option value="percentage">Percentage</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label htmlFor="wd-submission-type">Submission Type</Form.Label>
            <Form.Select id="wd-submission-type">
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </Form.Select>
          </Col>

          <Col md={6}>
            <Form.Label htmlFor="wd-assign-to">Assign To</Form.Label>
            <Form.Select id="wd-assign-to">
              <option value="everyone">Everyone</option>
              <option value="group1">Group 1</option>
              <option value="group2">Group 2</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label htmlFor="wd-available-from">Available From</Form.Label>
            <Form.Control id="wd-available-from" type="date" defaultValue="2025-10-06" />
          </Col>

          <Col md={6}>
            <Form.Label htmlFor="wd-available-until">Until</Form.Label>
            <Form.Control id="wd-available-until" type="date" defaultValue="2025-12-15" />
          </Col>
        </Row>

        <div className="d-flex gap-2">
          <Button variant="secondary" id="wd-save-assignment">Save</Button>
          <Button variant="secondary" id="wd-cancel-assignment">Cancel</Button>
          <Button variant="danger" id="wd-delete-assignment">Delete</Button>
        </div>
      </Form>
    </div>
  );
}
