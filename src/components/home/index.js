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
        <Row className="justify-content-center section-padding">
          <p className="display-4 text-primary big-title">
            <span className="font-weight-bold">HODL</span> and watch it{" "}
            <span className="text-underlined">gain interest</span>!
          </p>
          <p className="small">
            No Dai required to use - test Dai is minted for you automatically
          </p>
        </Row>
        <Row className="justify-content-center">
          <Col md={3} className="d-flex align-items-stretch">
            <HodlCardStatic
              hodlType="regular"
              hodlContract="ClassicHodlFactory"
            />
          </Col>
          <Col md={3} className="d-flex align-items-stretch">
            <HodlCardStatic
              hodlType="charity"
              hodlContract="CharityHodlFactory"
            />
          </Col>
          <Col md={3} className="d-flex align-items-stretch">
            <HodlCardStatic hodlType="ponzi" hodlContract="PonziHodlFactory" />
          </Col>
        </Row>
        <Row>{drizzleInit && <MyHodls />}</Row>
      </Container>
    </>
  );
};

export default Home;
