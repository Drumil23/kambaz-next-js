"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { Form, Row, Col, Button, Card } from "react-bootstrap";
import { updateAssignment, deleteAssignment } from "../../../Assignments/reducer";
import type { Assignment } from "../../../../Database/types";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const cidStr = Array.isArray(cid) ? cid[0] : cid;
  const aidStr = Array.isArray(aid) ? aid[0] : aid;
  const router = useRouter();
  const dispatch = useDispatch();

  const assignment = useSelector((state: RootState) =>
    state.assignmentsReducer?.assignments?.find((a: Assignment) => a._id === aidStr)
  ) as Assignment | undefined;

  const [form, setForm] = useState<Partial<Assignment>>({});

  useEffect(() => {
    if (assignment) setForm(assignment);
  }, [assignment]);

  if (!assignment) {
    return <div className="p-4">Assignment not found</div>;
  }

  const save = () => {
    const updated = { ...(assignment as Assignment), ...(form as Partial<Assignment>) } as Assignment;
    dispatch(updateAssignment(updated));
    router.push(`/Courses/${cidStr}/Assignments`);
  };

  const cancel = () => router.push(`/Courses/${cidStr}/Assignments`);

  const remove = () => {
    if (!confirm("Are you sure you want to delete this assignment?")) return;
    dispatch(deleteAssignment(aidStr));
    router.push(`/Courses/${cidStr}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="container p-4">
      <Card className="shadow-sm">
        <Card.Body>
          <h3 className="mb-4">Edit Assignment</h3>
          <Form>
            <Row className="mb-3">
              <Col md={8}>
                <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
                <Form.Control id="wd-name" value={form.title ?? ""} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </Col>
              <Col md={4} className="d-flex align-items-end">
                <div className="ms-auto">
                  <Button variant="primary" className="me-2" onClick={save} id="wd-save-assignment">Save</Button>
                  <Button variant="secondary" className="me-2" onClick={cancel} id="wd-cancel-assignment">Cancel</Button>
                  <Button variant="danger" onClick={remove} id="wd-delete-assignment">Delete</Button>
                </div>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label htmlFor="wd-description">Description</Form.Label>
                <Form.Control as="textarea" id="wd-description" rows={4} value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={3}>
                <Form.Label htmlFor="wd-points">Points</Form.Label>
                <Form.Control id="wd-points" type="number" value={form.points ?? 0} onChange={(e) => setForm({ ...form, points: Number((e.target as HTMLInputElement).value) })} />
              </Col>
              <Col md={3}>
                <Form.Label htmlFor="wd-due-date">Due Date</Form.Label>
                <Form.Control id="wd-due-date" type="date" value={form.dueDate ?? ""} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
              </Col>
              <Col md={3}>
                <Form.Label htmlFor="wd-available-from">Available From</Form.Label>
                <Form.Control id="wd-available-from" type="date" value={form.availableFrom ?? ""} onChange={(e) => setForm({ ...form, availableFrom: e.target.value })} />
              </Col>
              <Col md={3}>
                <Form.Label htmlFor="wd-available-until">Available Until</Form.Label>
                <Form.Control
                  id="wd-available-until"
                  type="date"
                  value={form.availableUntil ?? ""}
                  onChange={(e) => setForm({ ...form, availableUntil: e.target.value })}
                />
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
