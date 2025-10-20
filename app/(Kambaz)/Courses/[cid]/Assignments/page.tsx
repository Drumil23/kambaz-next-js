"use client";
import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Form, Button, Card, Badge, InputGroup } from "react-bootstrap";
import { FaPlus, FaSearch, FaRegCalendarAlt } from "react-icons/fa";
import { BsThreeDotsVertical, BsGripVertical } from "react-icons/bs";
import type { Assignment } from "../../../Database/types";
import { assignments } from "../../../Database";
import GreenCheckmark from "../Modules/GreenCheckmark";

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

    const courseAssignments = assignments
        .filter((assignment) => assignment.course === cid)
        .sort((a, b) =>
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        ) as Assignment[];

    const filteredAssignments = courseAssignments
        .filter((assignment) =>
            assignment.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "PUBLISHED":
                return <Badge bg="success" className="ms-2">Published</Badge>;
            case "DRAFT":
                return <Badge bg="secondary" className="ms-2">Draft</Badge>;
            default:
                return null;
        }
    };

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
                    <Button
                        variant="danger"
                        id="wd-add-assignment"
                        className="d-flex align-items-center"
                    >
                        <FaPlus className="me-2" />
                        Assignment
                    </Button>
                </div>
            </div>

            <Card className="shadow-sm">
                <Card.Header className="d-flex justify-content-between align-items-center bg-light py-3">
                    <h5 className="mb-0" id="wd-assignments-title">
                        ASSIGNMENTS
                        <Badge bg="primary" className="ms-2">40% of Total</Badge>
                    </h5>
                    <Button variant="link" className="text-dark p-0">
                        <BsThreeDotsVertical size={20} />
                    </Button>
                </Card.Header>
                <Card.Body className="p-0">
                    {filteredAssignments.map((assignment) => (
                        <Link
                            key={assignment._id}
                            href={`/Courses/${cid}/Assignments/${assignment._id}`}
                            className="text-decoration-none"
                        >
                            <div className="border-bottom p-3 assignment-item">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div className="d-flex align-items-start">
                                        <div className="me-3 text-secondary">
                                            <BsGripVertical size={20} />
                                        </div>
                                        <div>
                                            <h6 className="mb-2 text-primary">
                                                {assignment.title}
                                                {getStatusBadge(assignment.status)}
                                            </h6>
                                            <div className="text-secondary small">
                                                <span className="me-3">
                                                    <FaRegCalendarAlt className="me-1" />
                                                    Available: {formatDate(assignment.availableFrom)}
                                                </span>
                                                <span className="me-3">
                                                    <strong>Due:</strong> {formatDate(assignment.dueDate)}
                                                </span>
                                                <Badge bg="info">{assignment.points} pts</Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <Badge bg="light" text="dark" className="me-3">
                                            {assignment.type}
                                        </Badge>
                                        {assignment.status === "PUBLISHED" && <GreenCheckmark />}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </Card.Body>
            </Card>
        </div>
    );
}
