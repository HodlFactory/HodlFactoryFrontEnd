import React, { useState, useEffect } from "react";

import { drizzleReactHooks } from "@drizzle/react-plugin";

import { Container, Row, Col } from "react-bootstrap";
import HodlCard from "./HodlCard";

const { useDrizzle } = drizzleReactHooks;

const MyHodls = () => {
  const { useCacheCall } = useDrizzle();
  const [hodls, setHodls] = useState([]);
  const [classicHodls, setClassicHodls] = useState([]);
  const [charityHodls, setCharityHodls] = useState([]);
  const [ponziHodls, setPonziHodls] = useState([]);

  const allClassicHodls = useCacheCall("ClassicHodlFactory", "getHodlsOwned");
  const allCharityHodls = useCacheCall("CharityHodlFactory", "getHodlsOwned");
  const allPonziHodls = useCacheCall("PonziHodlFactory", "getHodlsOwned");
  const deletedClassicHodls = useCacheCall(
    "ClassicHodlFactory",
    "getHodlsDeleted"
  );
  const deletedCharityHodls = useCacheCall(
    "CharityHodlFactory",
    "getHodlsDeleted"
  );
  const deletedPonziHodls = useCacheCall("PonziHodlFactory", "getHodlsDeleted");

  useEffect(() => {
    if (allClassicHodls && deletedClassicHodls) {
      composeArray(allClassicHodls, deletedClassicHodls, {
        type: "regular",
        contract: "ClassicHodlFactory",
      }).then((res) => setClassicHodls(res));
    }
  }, [allClassicHodls, deletedClassicHodls]);

  useEffect(() => {
    if (allCharityHodls && deletedCharityHodls) {
      composeArray(allCharityHodls, deletedCharityHodls, {
        type: "charity",
        contract: "CharityHodlFactory",
      }).then((res) => setCharityHodls(res));
    }
  }, [allCharityHodls, deletedCharityHodls]);

  useEffect(() => {
    if (allPonziHodls && deletedPonziHodls) {
      composeArray(allPonziHodls, deletedPonziHodls, {
        type: "ponzi",
        contract: "PonziHodlFactory",
      }).then((res) => setPonziHodls(res));
    }
  }, [allPonziHodls, deletedPonziHodls]);

  useEffect(() => {
    const allHodls = classicHodls.concat(charityHodls, ponziHodls);
    setHodls(allHodls);
  }, [classicHodls, charityHodls, ponziHodls]);

  const filterDeleted = (all, deleted) => {
    return new Promise((resolve, reject) => {
      const filter = all.filter(function (item) {
        return !deleted.includes(item);
      });
      resolve(filter);
    });
  };

  const functionWithPromise = (item) => {
    return Promise.resolve(item);
  };

  const anAsyncFunction = async (item) => {
    return functionWithPromise(item);
  };

  const categorize = async (array, options) => {
    return Promise.all(
      array.map((item) => {
        return anAsyncFunction({
          id: item,
          type: options.type,
          contract: options.contract,
        });
      })
    );
  };

  const composeArray = async (all, deleted, options) => {
    let filtered = all;

    if (deleted.length > 0) {
      filtered = await filterDeleted(all, deleted);
    }

    if (all.length > 0) {
      try {
        const categorized = await categorize(filtered, options);
        return categorized;
      } catch (e) {
        return "error";
      }
    }

    return [];
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
          {hodls.length > 0
            ? hodls.map((hodl) => {
                return (
                  <Col
                    key={`${hodl.type}-${hodl.id}`}
                    md={3}
                    className="d-flex align-items-stretch"
                  >
                    <HodlCard
                      hodlId={hodl.id}
                      hodlType={hodl.type}
                      hodlContract={hodl.contract}
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
