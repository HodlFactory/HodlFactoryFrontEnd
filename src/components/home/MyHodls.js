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

  useEffect(() => {
    if (allClassicHodls) {
      composeArray(allClassicHodls, {
        type: "regular",
        contract: "ClassicHodlFactory",
      }).then((res) => setClassicHodls(res));
    }
  }, [allClassicHodls]);

  useEffect(() => {
    if (allCharityHodls) {
      composeArray(allCharityHodls, {
        type: "charity",
        contract: "CharityHodlFactory",
      }).then((res) => setCharityHodls(res));
    }
  }, [allCharityHodls]);

  useEffect(() => {
    if (allPonziHodls) {
      composeArray(allPonziHodls, {
        type: "ponzi",
        contract: "PonziHodlFactory",
      }).then((res) => setPonziHodls(res));
    }
  }, [allPonziHodls]);

  useEffect(() => {
    const allHodls = classicHodls.concat(charityHodls, ponziHodls);
    setHodls(allHodls);
  }, [classicHodls, charityHodls, ponziHodls]);

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

  const composeArray = async (all, options) => {
    if (all.length > 0) {
      try {
        const categorized = await categorize(all, options);
        return categorized;
      } catch (e) {
        return "error";
      }
    }

    return [];
  };

  const addDateToHodl = (date, hodl) => {
    const newArray = hodls.slice();
    const hodlIndex = hodls.findIndex(
      (x) => x.id === hodl.id && x.type === hodl.type
    );
    if (hodlIndex > -1) {
      newArray[hodlIndex].date = date;
      newArray.sort(compare_date);
      setHodls(newArray);
    }
  };

  const compare_date = (a, b) => {
    if (a.date < b.date) {
      return -1;
    } else if (a.date > b.date) {
      return 1;
    } else {
      return 0;
    }
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
                  <HodlCard
                    key={`${hodl.type}-${hodl.id}`}
                    hodlId={hodl.id}
                    hodlType={hodl.type}
                    hodlContract={hodl.contract}
                    addDateToHodl={addDateToHodl}
                  />
                );
              })
            : null}
        </Row>
      </Container>
    </>
  );
};

export default MyHodls;
