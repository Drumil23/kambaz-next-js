"use client";
import Link from "next/link";
import { useState } from "react";
import { Form, Button, Card, Badge, InputGroup } from "react-bootstrap";
import { FaPlus, FaSearch, FaRegCalendarAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Assignments() {
    const [searchTerm, setSearchTerm] = useState("");
    const [assignments] = useState([
        {
            id: 1,
            title: "A1 - ENV + HTML",
            availableFrom: "Oct 16, 2025 12:00am",
            dueDate: "Oct 23, 2025 11:59pm",
            points: 100,
            modules: "Multiple Modules",
            status: "upcoming"
        },
        {
            id: 2,
            title: "A2 - CSS + Bootstrap",
            availableFrom: "Oct 23, 2025 12:00am",
            dueDate: "Oct 30, 2025 11:59pm",
            points: 100,
            modules: "Multiple Modules",
            status: "not-available"
        },
        {
            id: 3,
            title: "A3 - JavaScript + React",
            availableFrom: "Oct 30, 2025 12:00am",
            dueDate: "Nov 6, 2025 11:59pm",
            points: 100,
            modules: "Multiple Modules",
            status: "not-available"
        }
    ]);

    const filteredAssignments = assignments.filter(assignment =>
        assignment.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'upcoming':
                return <Badge bg="warning" className="ms-2">Upcoming</Badge>;
            case 'not-available':
                return <Badge bg="secondary" className="ms-2">Not Available</Badge>;
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
                            key={assignment.id}
                            href={`/Courses/1234/Assignments/${assignment.id}`}
                            className="text-decoration-none"
                        >
                            <div className="border-bottom p-3 assignment-item">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h6 className="mb-2 text-primary">
                                            {assignment.title}
                                            {getStatusBadge(assignment.status)}
                                        </h6>
                                        <div className="text-secondary small">
                                            <span className="me-3">
                                                <FaRegCalendarAlt className="me-1" />
                                                Available: {assignment.availableFrom}
                                            </span>
                                            <span className="me-3">
                                                <strong>Due:</strong> {assignment.dueDate}
                                            </span>
                                            <Badge bg="info">{assignment.points} pts</Badge>
                                        </div>
                                    </div>
                                    <Badge bg="light" text="dark">
                                        {assignment.modules}
                                    </Badge>
                                </div>
                            </div>
                        </Link>
                    ))}
                </Card.Body>
            </Card>
        </div>
    );
}
