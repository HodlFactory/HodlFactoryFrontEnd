import React from "react";

import { Container, Row, Col, Card, Image } from "react-bootstrap";

const Contact = (props) => (
  <>
    <Container>
      <Row className="justify-content-center section-padding">
        <p className="display-4 text-primary big-title">Contact</p>
      </Row>
      <Row className="justify-content-center section-padding">
        <a
          href="mailto:contact@hodlfactory.com"
          className="display-4 text-primary big-title"
        >
          contact@<span className="text-underlined">hodlfactory.com</span>
        </a>
      </Row>
    </Container>
  </>
);

export default Contact;
