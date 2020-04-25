import React, { useState, useEffect } from "react";

import { drizzleReactHooks } from "@drizzle/react-plugin";

import { Container, Row, Col } from "react-bootstrap";
import HodlCard from "./HodlCard";

const { useDrizzle } = drizzleReactHooks;

const MyHodls = () => {
  const { useCacheCall } = useDrizzle();
  const [classicHodls, setClassicHodls] = useState([]);
  const [charityHodls, setCharityHodls] = useState([]);
  const [ponziHodls, setPonziHodls] = useState([]);

  const allClassicHodls = useCacheCall("ClassicHodlFactory", "getHodlsOwned");
  const allCharityHodls = useCacheCall("CharityHodlFactory", "getHodlsOwned");
  const allPonziHodls = useCacheCall("PonziHodlFactory", "getHodlsOwned");
  const deletedClassicHodls = [];
  //useCacheCall("ClassicHodlFactory", "getHodlsDeleted");
  const deletedCharityHodls = [];
  const deletedPonziHodls = [];

  useEffect(() => {
    if (allClassicHodls && deletedClassicHodls) {
      setClassicHodls(filterDeleted(allClassicHodls, deletedClassicHodls));
    }
    if (allCharityHodls && deletedCharityHodls) {
      setCharityHodls(filterDeleted(allCharityHodls, deletedCharityHodls));
    }
    if (allPonziHodls && deletedPonziHodls) {
      setPonziHodls([]);
      //setPonziHodls(filterDeleted(allClassicHodls, deletedPonziHodls));
    }
  }, [allClassicHodls, allPonziHodls, deletedClassicHodls, deletedPonziHodls]);

  const filterDeleted = (all, deleted) => {
    return all.filter(function (item) {
      return !deleted.includes(item);
    });
  };

  return (
    <>
      <Container>
        <Row className="section-title justify-content-center align-items-center section-padding">
          <hr />
          <p>My HODL's</p>
          <hr />
        </Row>
        <Row>
          {classicHodls.length > 0
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
          {charityHodls.length > 0
            ? charityHodls.map((hodlId) => {
                return (
                  <Col
                    key={hodlId}
                    md={3}
                    className="d-flex align-items-stretch"
                  >
                    <HodlCard
                      hodlId={hodlId}
                      hodlType="charity"
                      hodlContract={"CharityHodlFactory"}
                    />
                  </Col>
                );
              })
            : null}
          {ponziHodls.length > 0
            ? ponziHodls.map((hodlId) => {
                return (
                  <Col
                    key={hodlId}
                    md={3}
                    className="d-flex align-items-stretch"
                  >
                    <HodlCard
                      hodlId={hodlId}
                      hodlType="ponzi"
                      hodlContract={"PonziHodlFactory"}
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
