import React from "react";

import { Container, Row, Col, Card } from "react-bootstrap";

const How = (props) => (
  <>
    <Container>
      <Row className="justify-content-center section-padding">
        <p className="display-4 text-primary big-title">
          How it <span className="text-underlined">works</span>
        </p>
      </Row>
      <Row>
        <Col md={4}>
          <Card border="primary" className="h-100">
            <Card.Body>
              <Card.Title>Regular HODL</Card.Title>
              <Card.Text>
                Costs 100 Dai. You keep the interest. You can withdraw the
                interest whenever you want. But you have to wait a year before
                you can get back your 100 Dai, which you do by destroying the
                HODL.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card border="primary" className="h-100">
            <Card.Body>
              <Card.Title>Charity HODL</Card.Title>
              <Card.Text>
                Costs 100 Dai. Interest goes to one of the foundations we
                support of your choice. You, or the charity, can withdraw the
                interest whenever you or they want. But you have to wait a year
                before you can get back your 100 Dai, which you do by destroying
                the HODL.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card border="primary" className="h-100">
            <Card.Body>
              <Card.Title>Ponzi HODL</Card.Title>
              <Card.Text>
                Costs 100 Dai. It's a no-loss ponzi! The interest goes to the
                people that bought HODLs before you. You get a share of the
                interest of people who buy HODLs after you. You can withdraw
                your interest whenever you like. There is no time limit to
                destroying your HODL to get the 100 Dai back, but if you do you
                will lose your position in the 'ponzi pyramid'.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </>
);

export default How;
