"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Form, Button, Row, Col } from "react-bootstrap";
import type { Assignment } from "../../../../Database/types";
import * as assignmentsClient from "../../../Assignments/client";
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

export default function NewAssignment() {
  const { cid } = useParams();
  const router = useRouter();
  const [assignment, setAssignment] = useState<Partial<Assignment>>({
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableFrom: "",
    course: (cid as string) ?? "",
    status: "DRAFT",
    type: "Assignment",
  });

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const save = () => {
    console.log("Saving assignment:", assignment);
    (async () => {
      try {
        await assignmentsClient.createAssignment({ ...assignment }, currentUser?.role);
        alert('Assignment created');
        router.push(`/Courses/${cid}/Assignments`);
      } catch (err: unknown) {
        console.error('Create failed', err);
        alert('Failed to create assignment (see console)');
      }
    })();
  };
  const cancel = () => router.push(`/Courses/${cid}/Assignments`);

  return (
    <div id="wd-assignments-editor" className="p-4">
      <h3>New Assignment</h3>
      <Form>
        <div className="mb-3">
          <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
          <Form.Control id="wd-name" value={assignment.title} onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />
        </div>

        <div className="mb-3">
          <Form.Label htmlFor="wd-description">Description</Form.Label>
          <Form.Control as="textarea" id="wd-description" rows={3} value={assignment.description} onChange={(e) => setAssignment({ ...assignment, description: e.target.value })} />
        </div>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Label htmlFor="wd-points">Points</Form.Label>
            <Form.Control id="wd-points" type="number" value={assignment.points} onChange={(e) => setAssignment({ ...assignment, points: Number((e.target as HTMLInputElement).value) })} />
          </Col>

          <Col md={4}>
            <Form.Label htmlFor="wd-due-date">Due Date</Form.Label>
            <Form.Control id="wd-due-date" type="date" value={assignment.dueDate} onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })} />
          </Col>

          <Col md={4}>
            <Form.Label htmlFor="wd-available-from">Available From</Form.Label>
            <Form.Control id="wd-available-from" type="date" value={assignment.availableFrom} onChange={(e) => setAssignment({ ...assignment, availableFrom: e.target.value })} />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12} className="d-flex align-items-end gap-2">
            <Button variant="primary" id="wd-save-assignment" onClick={save}>Save</Button>
            <Button variant="secondary" id="wd-cancel-assignment" onClick={cancel}>Cancel</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
