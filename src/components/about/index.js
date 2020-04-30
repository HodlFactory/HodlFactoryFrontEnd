import React from "react";

import { Container, Row, Col, Card, Image } from "react-bootstrap";

const About = (props) => (
  <>
    <Container>
      <Row className="justify-content-center section-padding">
        <p className="display-4 text-primary big-title">
          Meet the <span className="text-underlined">team</span>
        </p>
      </Row>
      <Row>
        <Col md={3}>
          <Card border="primary" className="h-100">
            <Card.Body>
              <Card.Text className="d-flex flex-column align-items-center justify-content-center text-center">
                <Image src="/team/andrew.jpg" roundedCircle className="mb-2" />
                <div className="details">
                  <p className="font-weight-bold mb-1">Andrew Stanger</p>
                  <p className="mb-0 small">BackEnd Dev</p>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card border="primary" className="h-100">
            <Card.Body>
              <Card.Text className="d-flex flex-column align-items-center justify-content-center text-center">
                <Image src="/team/aniket.jpg" roundedCircle className="mb-2" />
                <div className="details">
                  <p className="font-weight-bold mb-1">Aniket Tapre</p>
                  <p className="mb-0 small">UI/UX Designer</p>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card border="primary" className="h-100">
            <Card.Body>
              <Card.Text className="d-flex flex-column align-items-center justify-content-center text-center">
                <Image src="/team/marcela.jpg" roundedCircle className="mb-2" />
                <div className="details">
                  <p className="font-weight-bold mb-1">Marcela Almeida</p>
                  <p className="mb-0 small">FrontEnd Dev</p>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card border="primary" className="h-100">
            <Card.Body>
              <Card.Text className="d-flex flex-column align-items-center justify-content-center text-center">
                <Image src="/team/vlad.jpg" roundedCircle className="mb-2" />
                <div className="details">
                  <p className="font-weight-bold mb-1">Vlad Micliuc</p>
                  <p className="mb-0 small">Lead FrontEnd Dev</p>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </>
);

export default About;
