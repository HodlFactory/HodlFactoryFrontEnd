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
        <Row>
          <Col md={4} className="d-flex align-items-stretch">
            {classicHodls && classicHodls.length > 0
              ? classicHodls.map((hodlId) => {
                  return (
                    <HodlCard
                      key={hodlId}
                      hodlId={hodlId}
                      hodlType="regular"
                      hodlContract={"ClassicHodlFactory"}
                    />
                  );
                })
              : null}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyHodls;
