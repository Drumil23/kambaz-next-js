import Link from "next/link";
import Image from "next/image";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from "react-bootstrap";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">

      <Row xs={1} md={5} className="g-4">
        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
            <Link href="/Courses/1234/Home"
              className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/react.jpg" width="100%" height={160} />
              <CardBody>
                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS 1234 React JS</CardTitle>
                <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                  Full Stack software developer</CardText>
                <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>
        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
            <Link href="/Courses/1121/Home"
              className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/py.png" width="100%" height={160} />
              <CardBody>
                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS 5252 Neural Networks and Deep Learning</CardTitle>
                <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                  Deep Learning Engineer</CardText>
                <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>
        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
            <Link href="/Courses/1121/Home"
              className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/starship.jpg" width="100%" height={160} />
              <CardBody>
                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS 3232 Cloud Computing</CardTitle>
                <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                  Cloud Computing Engineer</CardText>
                <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>
        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
            <Link href="/Courses/5678/Home"
              className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/nodejs.png" width="100%" height={160} />
              <CardBody>
                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS 5678 Node JS</CardTitle>
                <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                  Backend developer</CardText>
                <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>
        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
            <Link href="/Courses/9101/Home"
              className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/co-op.jpg" width="100%" height={160} />
              <CardBody>
                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS 9101 Co-op Course</CardTitle>
                <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                  Data Scientist</CardText>
                <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>
        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
            <Link href="/Courses/9101/Home"
              className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/co-op.jpg" width="100%" height={160} />
              <CardBody>
                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS 9292 Python </CardTitle>
                <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                  Data Scientist</CardText>
                <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>
        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
            <Link href="/Courses/9101/Home"
              className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/py.png" width="100%" height={160} />
              <CardBody>
                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS 6262 ML </CardTitle>
                <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                  ML Engineer</CardText>
                <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>
        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
            <Link href="/Courses/3333/Home"
              className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/tesla-bot.png" width="100%" height={160} />
              <CardBody>
                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS 3333 DL </CardTitle>
                <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                  DL Engineer</CardText>
                <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

