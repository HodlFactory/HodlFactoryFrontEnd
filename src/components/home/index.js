import React from "react";
import { useSelector } from "react-redux";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";

import { Container, Row, Col, Card, Button } from "react-bootstrap";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractData } = newContextComponents;

const Home = () => {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState((state) => state);
  const drizzleInit = useSelector((state) => state.global.drizzleInit);

  const convertToEth = (value) => {
    return drizzle.web3.utils.fromWei(String(value), "ether");
  };

  return (
    <Container>
      <Row>
        <Col md={4} className="d-flex align-items-stretch">
          <Card className="d-block">
            <p className="text-uppercase">Regular HODL</p>
            <p>
              {drizzleInit && (
                <>
                  <ContractData
                    contract="ClassicHodlFactory"
                    method="oneHundredDai"
                    drizzle={drizzle}
                    drizzleState={state}
                    render={convertToEth}
                  />{" "}
                  DAI
                </>
              )}
            </p>
            <p>CURRENT APY:</p>
            <p>%</p>
            <p>TITLE</p>
            <p>'s HODL</p>
            <p></p>
            <Button variant="primary" disabled={!drizzleInit}>
              CREATE
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
