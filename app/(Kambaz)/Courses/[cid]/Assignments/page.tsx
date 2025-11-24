"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Form, Button, Card, Badge, InputGroup, Modal } from "react-bootstrap";
import { FaPlus, FaSearch, FaRegFileAlt, FaTrash } from "react-icons/fa";
import { BsThreeDotsVertical, BsGripVertical } from "react-icons/bs";
import type { Assignment } from "../../../Database/types";
import GreenCheckmark from "../Modules/GreenCheckmark";
import * as assignmentsClient from "../../Assignments/client";

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
};

export default function Assignments() {
    const { cid } = useParams();
    const [searchTerm, setSearchTerm] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
    const [assignments, setAssignments] = useState<Assignment[]>([]);

    useEffect(() => {
        const cidStr = Array.isArray(cid) ? cid[0] : cid;
        (async () => {
            try {
                const data = await assignmentsClient.fetchAssignments(cidStr as string);
                setAssignments(data);
            } catch (err: unknown) {
                console.error('Failed to load assignments', err);
            }
        })();
    }, [cid]);

    const courseAssignments = assignments
        .filter((assignment) => assignment.course === cid)
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()) as Assignment[];

    const filteredAssignments = courseAssignments.filter((assignment) => assignment.title.toLowerCase().includes(searchTerm.toLowerCase()));

    // small helper component: button that navigates to new assignment editor
    function AddAssignmentButton({ cid }: { cid: string | undefined }) {
        const router = useRouter();
        return (
            <button type="button" id="wd-add-assignment" className="btn btn-danger d-flex align-items-center" onClick={() => router.push(`/Courses/${cid}/Assignments/new`)}>
                <FaPlus className="me-2" />
                Assignment
            </button>
        );
    }

    return (
        <div id="wd-assignments" className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <InputGroup className="w-50">
                    <InputGroup.Text>
                        <FaSearch className="text-secondary" />
                    </InputGroup.Text>
                    <Form.Control
                        placeholder="Search for Assignments"
                        id="wd-search-assignment"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>
                    <div className="d-flex gap-2">
                    <Button
                        variant="outline-secondary"
                        id="wd-add-assignment-group"
                        className="d-flex align-items-center"
                    >
                        <FaPlus className="me-2" />
                        Group
                    </Button>
                    <div className="d-flex gap-2">
                        {/* use router push for reliable client navigation */}
                        <AddAssignmentButton cid={Array.isArray(cid) ? cid[0] : cid} />
                    </div>
                </div>
            </div>

            <Card className="shadow-sm">
                <Card.Header className="d-flex justify-content-between align-items-center bg-light py-3">
                    <div className="d-flex align-items-center">
                        <BsGripVertical className="me-2" />
                        <h5 className="mb-0" id="wd-assignments-title">ASSIGNMENTS</h5>
                        <Badge bg="primary" className="ms-3">40% of Total</Badge>
                    </div>
                    <div className="d-flex align-items-center">
                        <Button variant="light" size="sm" className="me-2">
                            <FaPlus />
                        </Button>
                        <Button variant="link" className="text-dark p-0">
                            <BsThreeDotsVertical size={20} />
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body className="p-0">
                    {filteredAssignments.map((assignment) => (
                        <div key={assignment._id} className="border-bottom p-3 assignment-item">
                            <div className="d-flex align-items-start">
                                <div className="me-3 text-secondary"><BsGripVertical size={18} /></div>
                                <div className="me-3 text-success"><FaRegFileAlt size={20} /></div>
                                <div className="flex-grow-1">
                                    <Link href={`/Courses/${cid}/Assignments/${assignment._id}`} className="text-decoration-none">
                                        <h6 className="mb-1 text-primary">{assignment.title}</h6>
                                        <div className="text-danger small">
                                            {assignment.type} | Due {formatDate(assignment.dueDate)} | {assignment.points} pts
                                        </div>
                                    </Link>
                                </div>
                                <div className="d-flex align-items-center ms-3">
                                    {assignment.status === "PUBLISHED" && <GreenCheckmark />}
                                    <Button variant="link" className="text-dark p-0 ms-2"><BsThreeDotsVertical /></Button>
                                    <Button variant="link" className="text-danger p-0 ms-2" title="Delete assignment" onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setSelectedDeleteId(assignment._id);
                                        setShowDeleteModal(true);
                                    }}>
                                        <FaTrash />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </Card.Body>
            </Card>
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Assignment</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to remove this assignment?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={async () => {
                        if (selectedDeleteId) {
                            try {
                                await assignmentsClient.deleteAssignmentApi(selectedDeleteId, 'Faculty');
                                setAssignments((prev) => prev.filter((a) => a._id !== selectedDeleteId));
                            } catch (err: unknown) {
                                console.error('Delete failed', err);
                            }
                        }
                        setShowDeleteModal(false);
                        setSelectedDeleteId(null);
                    }}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
