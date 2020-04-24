import React, { useEffect } from "react";

import { drizzleReactHooks } from "@drizzle/react-plugin";

import { Container, Row, Col } from "react-bootstrap";
import HodlCard from "./HodlCard";

const { useDrizzle } = drizzleReactHooks;

const MyHodls = () => {
  const { useCacheCall } = useDrizzle();

  const classicHodls = useCacheCall("ClassicHodlFactory", "getHodlsOwned");

  return (
    <>
      <Container>
        <Row className="section-title justify-content-center align-items-center section-padding">
          <hr />
          <p>My HODL's</p>
          <hr />
        </Row>
        <Row>
          {classicHodls && classicHodls.length > 0
            ? classicHodls.map((hodlId) => {
                return (
                  <Col
                    key={hodlId}
                    md={3}
                    className="d-flex align-items-stretch"
                  >
                    <HodlCard
                      hodlId={hodlId}
                      hodlType="regular"
                      hodlContract={"ClassicHodlFactory"}
                    />
                  </Col>
                );
              })
            : null}
        </Row>
      </Container>
    </>
  );
};

export default MyHodls;
