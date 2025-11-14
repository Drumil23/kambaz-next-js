"use client"
import { useState } from "react";
import { useSearchParams } from "next/navigation";
// Link intentionally not used here because navigation is guarded
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { RootState } from "../store";
// db import removed (we now use enrollments from Redux)
import { enroll, unenroll } from "../Courses/enrollments/reducer";
import type { Course } from "../Database/types";
// import Image from "next/image";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from "react-bootstrap";
export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const dispatch = useDispatch();
  type DashboardCourse = Course & { image?: string; description?: string; number?: string };
  const [course, setCourse] = useState<DashboardCourse>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "husky.png",
    description: "New Description",
  });
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const enrollments = useSelector((state: RootState) => state.enrollmentsReducer.enrollments);
  const searchParams = useSearchParams();
  const initialShowAll = !!(searchParams && (searchParams.get("showAll") === "1" || searchParams.get("showAll") === "true"));
  const [showAll, setShowAll] = useState(initialShowAll);

  // Debug info: show current user and enrollment count for troubleshooting
  const myEnrollmentCount = currentUser
    ? enrollments.filter((e) => e.user === currentUser._id).length
    : 0;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      {currentUser && (
        <div className="alert alert-secondary small" id="wd-debug-info">
          <strong>Debug:</strong> currentUser: {currentUser._id} ({currentUser.role}) • Enrollments: {myEnrollmentCount}
        </div>
      )}
      <hr />

      <h5>New Course</h5>
      <div className="mb-3">
        <div className="d-flex align-items-start">
          <input
            className="form-control flex-grow-1 me-3"
            value={course.name}
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            aria-label="Course name"
            id="wd-new-course-name"
          />

          <div className="d-flex flex-column">
            <button
              className="btn btn-primary mb-2"
              id="wd-add-new-course-click"
              onClick={() => dispatch(addNewCourse(course))}
            >
              Add
            </button>
            <button className="btn btn-warning" id="wd-update-course-click" onClick={() => dispatch(updateCourse(course))}>
              Update
            </button>
          </div>
        </div>

        <textarea
          className="form-control mt-3"
          rows={4}
          value={course.description}
          onChange={(e) => setCourse({ ...course, description: e.target.value })}
          aria-label="Course description"
          id="wd-new-course-description"
        />
      </div>
      <hr />
      

      {/* Enrolled courses for the current user */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        {currentUser ? (
          <h2 id="wd-dashboard-enrolled">My Courses</h2>
        ) : (
          <h2 id="wd-dashboard-enrolled">Courses</h2>
        )}
        <div>
          <Button variant="primary" className="me-2" onClick={() => setShowAll(!showAll)} id="wd-enrollments-toggle">
            Enrollments
          </Button>
        </div>
      </div>
      {currentUser && (
        <>
          <Row xs={1} md={5} className="g-4 mb-3">
            {courses
              .filter((course) =>
                enrollments.some(
                  (enrollment) =>
                    enrollment.user === currentUser._id &&
                    enrollment.course === course._id
                )
              )
              .map((courseItem) => (
                <Col key={courseItem._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                  <Card>
                    <div className="wd-dashboard-course-link text-decoration-none text-dark">
                      <CardImg src={`/images/${'image' in courseItem ? courseItem.image : 'starship.jpg'}`} variant="top" width="100%" height={190} />
                      <CardBody className="card-body">
                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">{courseItem.name}</CardTitle>
                        <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>{courseItem.description}</CardText>
                        <Button variant="primary" onClick={() => {
                          const isEnrolled = enrollments.some(e => e.user === currentUser._id && e.course === courseItem._id);
                          const isPrivileged = currentUser?.role === "Faculty" || currentUser?.role === "Dean";
                          const canOpen = isPrivileged || isEnrolled;
                          if (canOpen) window.location.href = `/Courses/${courseItem._id}/Home`;
                          else alert('You must be enrolled in the course to open it.');
                        }}> Go </Button>
                      </CardBody>
                    </div>
                  </Card>
                </Col>
              ))}
          </Row>
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses
            .filter((courseItem) => showAll ? true : (currentUser ? enrollments.some(e => e.user === currentUser._id && e.course === courseItem._id) : false))
            .map((courseItem) => {
              const isEnrolled = currentUser ? enrollments.some(e => e.user === currentUser._id && e.course === courseItem._id) : false;
              return (
                <Col key={courseItem._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                  <Card>
                    <div className="wd-dashboard-course-link text-decoration-none text-dark">
                      <CardImg src={`/images/${'image' in courseItem ? courseItem.image : 'starship.jpg'}`} variant="top" width="100%" height={190} />
                      <CardBody className="card-body">
                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">{courseItem.name}</CardTitle>
                        <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>{courseItem.description}</CardText>
                        <Button variant="primary" onClick={() => {
                          if (!currentUser) { alert('Please sign in to open a course.'); return; }
                          const isEnrolled = enrollments.some(e => e.user === currentUser._id && e.course === courseItem._id);
                          const isPrivileged = currentUser?.role === "Faculty" || currentUser?.role === "Dean";
                          const allowed = isPrivileged || isEnrolled;
                          if (allowed) window.location.href = `/Courses/${courseItem._id}/Home`;
                          else alert('You must be enrolled in the course to open it.');
                        }}> Go </Button>
                        {/* Enrollment buttons */}
                        {currentUser && (
                          isEnrolled ? (
                            <Button variant="danger" className="float-end ms-2" onClick={(ev) => { ev.preventDefault(); dispatch(unenroll({ user: currentUser._id!, course: courseItem._id })); }}>
                              Unenroll
                            </Button>
                          ) : (
                            <Button variant="success" className="float-end ms-2" onClick={(ev) => { ev.preventDefault(); dispatch(enroll({ user: currentUser._id!, course: courseItem._id })); }}>
                              Enroll
                            </Button>
                          )
                        )}
                        <Button onClick={(event) => {
                          event.preventDefault();
                          dispatch(deleteCourse(courseItem._id));
                        }} className="btn btn-danger float-end"
                          id="wd-delete-course-click">
                          Delete
                        </Button>
                        <Button id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(courseItem);
                          }}
                          className="btn btn-warning me-2 float-end" >
                          Edit
                        </Button>
                      </CardBody>
                    </div>
                  </Card>
                </Col>
              );
            })}

        </Row>
      </div>
    </div>
  );
}

