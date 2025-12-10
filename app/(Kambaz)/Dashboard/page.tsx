"use client"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse, setCourses } from "../Courses/reducer";
import { RootState } from "../store";
import { enroll, unenroll, setEnrollments } from "../Courses/enrollments/reducer";
import type { Course } from "../Database/types";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from "react-bootstrap";
import * as coursesClient from "../Courses/client";
import * as accountClient from "../Account/client";
import axios from "axios";
import { HTTP_SERVER } from "../../lib/config";

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
  const [showAll, setShowAll] = useState(false);
  
  // Fetch courses and enrollments on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all courses
        const fetchedCourses = await coursesClient.fetchAllCourses();
        dispatch(setCourses(fetchedCourses));
        
        // Fetch enrollments
        const { data: fetchedEnrollments } = await axios.get(`${HTTP_SERVER}/api/enrollments`);
        dispatch(setEnrollments(fetchedEnrollments));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [dispatch]);
  
  // read query param on the client to avoid SSR/CSR bailout warning for useSearchParams
  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      const val = sp.get("showAll");
      if (val === "1" || val === "true") setShowAll(true);
    } catch {
      // ignore
    }
  }, []);

  const myEnrollmentCount = currentUser
    ? enrollments.filter((e) => e.user === currentUser._id).length
    : 0;

  const handleAddCourse = async () => {
    try {
      const newCourse = await coursesClient.createCourse(course as Partial<coursesClient.Course>);
      dispatch(addNewCourse(newCourse));
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to create course");
    }
  };

  const handleUpdateCourse = async () => {
    try {
      const updated = await coursesClient.updateCourse(course as coursesClient.Course);
      dispatch(updateCourse(updated));
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update course");
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await coursesClient.deleteCourse(courseId);
      dispatch(deleteCourse(courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course");
    }
  };

  const handleEnroll = async (courseId: string) => {
    if (!currentUser?._id) return;
    try {
      await coursesClient.enrollIntoCourse(currentUser._id, courseId);
      dispatch(enroll({ user: currentUser._id, course: courseId }));
    } catch (error) {
      console.error("Error enrolling:", error);
      alert("Failed to enroll in course");
    }
  };

  const handleUnenroll = async (courseId: string) => {
    if (!currentUser?._id) return;
    try {
      await coursesClient.unenrollFromCourse(currentUser._id, courseId);
      dispatch(unenroll({ user: currentUser._id, course: courseId }));
    } catch (error) {
      console.error("Error unenrolling:", error);
      alert("Failed to unenroll from course");
    }
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      {currentUser && (
        <div className="alert alert-secondary small" id="wd-debug-info">
          <strong>Debug:</strong> currentUser: {currentUser._id} ({currentUser.role}) • Enrollments: {myEnrollmentCount}
        </div>
      )}
      <hr />

      {currentUser && (currentUser.role === "Faculty" || currentUser.role === "Dean") && (
        <>
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
                  onClick={handleAddCourse}
                >
                  Add
                </button>
                <button className="btn btn-warning" id="wd-update-course-click" onClick={handleUpdateCourse}>
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
        </>
      )}
      

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
                          const isPrivileged = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
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
                        <div className="d-flex flex-wrap gap-2">
                          <Button variant="primary" onClick={() => {
                            if (!currentUser) { alert('Please sign in to open a course.'); return; }
                            const isEnrolled = enrollments.some(e => e.user === currentUser._id && e.course === courseItem._id);
                            const isPrivileged = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
                            const allowed = isPrivileged || isEnrolled;
                            if (allowed) window.location.href = `/Courses/${courseItem._id}/Home`;
                            else alert('You must be enrolled in the course to open it.');
                          }}> Go </Button>
                          
                          {currentUser && (currentUser.role === "FACULTY" || currentUser.role === "ADMIN") && (
                            <>
                              <Button onClick={(event) => {
                                event.preventDefault();
                                handleDeleteCourse(courseItem._id);
                              }} className="btn btn-danger"
                                id="wd-delete-course-click">
                                Delete
                              </Button>
                              
                              <Button id="wd-edit-course-click"
                                onClick={(event) => {
                                  event.preventDefault();
                                  setCourse(courseItem);
                                }}
                                className="btn btn-warning" >
                                Edit
                              </Button>
                            </>
                          )}
                          
                          {currentUser && (
                            isEnrolled ? (
                              <Button variant="danger" onClick={(ev) => { ev.preventDefault(); handleUnenroll(courseItem._id); }}>
                                Unenroll
                              </Button>
                            ) : (
                              <Button variant="success" onClick={(ev) => { ev.preventDefault(); handleEnroll(courseItem._id); }}>
                                Enroll
                              </Button>
                            )
                          )}
                        </div>
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

