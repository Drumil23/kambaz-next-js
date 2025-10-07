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
                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</CardTitle>
                <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                  Full Stack software developer</CardText>
                <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>
        <Col className="wd-dashboard-course" style={{ width: "300px" }}> 
          <Card>
            <Link href="/Courses/1234/Home"
              className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/react.jpg" width="100%" height={160} />
              <CardBody>
                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</CardTitle>
                <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                  Full Stack software developer</CardText>
                <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>
        <Col className="wd-dashboard-course" style={{ width: "300px" }}> 
          <Card>
            <Link href="/Courses/1234/Home"
              className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/react.jpg" width="100%" height={160} />
              <CardBody>
                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</CardTitle>
                <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                  Full Stack software developer</CardText>
                <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>
        <Col className="wd-dashboard-course" style={{ width: "300px" }}> 
          <Card>
            <Link href="/Courses/1234/Home"
              className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/react.jpg" width="100%" height={160} />
              <CardBody>
                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</CardTitle>
                <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                  Full Stack software developer</CardText>
                <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>
        <Col className="wd-dashboard-course" style={{ width: "300px" }}> 
          <Card>
            <Link href="/Courses/1234/Home"
              className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/react.jpg" width="100%" height={160} />
              <CardBody>
                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</CardTitle>
                <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                  Full Stack software developer</CardText>
                <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
          </Card>
        </Col>
        <Col className="wd-dashboard-course" style={{ width: "300px" }}> ... Another course ... </Col>
      </Row>

      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/react.jpg" alt="React JS" width={200} height={150} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />
        <div className="wd-dashboard-course">
          <Link href="/Courses/5678" className="wd-dashboard-course-link">
            <Image src="/images/nodejs.png" alt="Node JS" width={200} height={200} />
            <div>
              <h5> CS5678 Node JS </h5>
              <p className="wd-dashboard-course-title">
                Backend Developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />
        <div className="wd-dashboard-course">
          <Link href="/Courses/9101" className="wd-dashboard-course-link">
            <Image src="/images/co-op.jpg" alt="Co-op" width={200} height={150} />
            <div>
              <h5> CS9101 Co-op Course </h5>
              <p className="wd-dashboard-course-title">
                Data Scientist
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />
        <div className="wd-dashboard-course">
          <Link href="/Courses/1121" className="wd-dashboard-course-link">
            <Image src="/images/py.png" alt="Python" width={200} height={190} />
            <div>
              <h5> CS9292 Python </h5>
              <p className="wd-dashboard-course-title">
                Data Scientist
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />
        <div className="wd-dashboard-course">
          <Link href="/Courses/1121" className="wd-dashboard-course-link">
            <Image src="/images/py.png" alt="Python" width={200} height={190} />
            <div>
              <h5> CS6262 Machine Learning </h5>
              <p className="wd-dashboard-course-title">
                Machine Learning Engineer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />
        <div className="wd-dashboard-course">
          <Link href="/Courses/1121" className="wd-dashboard-course-link">
            <Image src="/images/py.png" alt="Python" width={200} height={190} />
            <div>
              <h5> CS3232 Cloud Computing </h5>
              <p className="wd-dashboard-course-title">
                Cloud Computing Engineer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />
        <div className="wd-dashboard-course">
          <Link href="/Courses/1121" className="wd-dashboard-course-link">
            <Image src="/images/py.png" alt="Python" width={200} height={190} />
            <div>
              <h5> CS5252 Neural Networks and Deep Learning </h5>
              <p className="wd-dashboard-course-title">
                Deep Learning Engineer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br />
      </div>
    </div>
  );
}

