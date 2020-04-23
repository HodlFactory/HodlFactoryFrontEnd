import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { Router, Route } from "react-router-dom";
import { history, store } from "./store";
import { updateDrizzleInit } from "./store/actions/global";

import { Container, Col, Row } from "react-bootstrap";
import ScrollToTop from "./components/navigation/ScrollToTop";
import MainMenu from "./components/navigation/MainMenu";
import DrizzleWarning from "./drizzle/DrizzleWarning";

import Home from "./components/home";
import About from "./components/about";
import How from "./components/how";
import Contact from "./components/contact";

const { useDrizzleState } = drizzleReactHooks;

const Pages = () => {
  const drizzleStatus = useDrizzleState((state) => state.drizzleStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (drizzleStatus && drizzleStatus.initialized && window.web3) {
      window.web3.version.getNetwork((error, networkId) => {
        const status = networkId === "42";
        dispatch(updateDrizzleInit(status));
      });
    } else {
      dispatch(updateDrizzleInit(false));
    }
  }, [drizzleStatus.initialized]);

  return (
    <Router history={history} store={store}>
      <ScrollToTop />
      <Container fluid className="px-0">
        <Row noGutters>
          <Col>
            <MainMenu />
            <DrizzleWarning />
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/how" exact component={How} />
            <Route path="/contact" exact component={Contact} />
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

export default Pages;
