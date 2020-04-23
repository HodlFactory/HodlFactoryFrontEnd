import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import HodlCardStatic from "./HodlCardStatic";
import MyHodls from "./MyHodls";

const Home = () => {
  const drizzleInit = useSelector((state) => state.global.drizzleInit);

  return (
    <>
      <Container>
        <Row>
          <Col md={4} className="d-flex align-items-stretch">
            <HodlCardStatic
              hodlType="regular"
              hodlContract="ClassicHodlFactory"
            />
          </Col>
        </Row>
        <Row>{drizzleInit && <MyHodls />}</Row>
      </Container>
    </>
  );
};

export default Home;
