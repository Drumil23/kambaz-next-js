"use client"
import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { RootState } from "../store";
import * as db from "../Database";
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
  const { enrollments } = db;



  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
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
      {currentUser && (
        <>
          <h2 id="wd-dashboard-enrolled">My Courses</h2>
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
                    <Link href={`/Courses/${courseItem._id}/Home`} className="wd-dashboard-course-link text-decoration-none text-dark">
                      <CardImg src={`/images/${'image' in courseItem ? courseItem.image : 'starship.jpg'}`} variant="top" width="100%" height={190} />
                      <CardBody className="card-body">
                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">{courseItem.name}</CardTitle>
                        <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>{courseItem.description}</CardText>
                        <Button variant="primary"> Go </Button>
                      </CardBody>
                    </Link>
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
          {courses.map((courseItem) => (
            <Col key={courseItem._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link href={`/Courses/${courseItem._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <CardImg src={`/images/${'image' in courseItem ? courseItem.image : 'starship.jpg'}`} variant="top" width="100%" height={190} />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {courseItem.name} </CardTitle>
                    <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {courseItem.description} </CardText>
                    <Button variant="primary"> Go </Button>
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
                </Link>
              </Card>
            </Col>
          ))}

        </Row>
      </div>
    </div>
  );
}

