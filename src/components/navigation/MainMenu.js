import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const MainMenu = (props) => {
  return (
    <Navbar collapseOnSelect expand="md">
      <Navbar.Brand href="/">
        <img
          src="/img/hodl-factory-logo.png"
          height="45"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <NavLink
            to="/"
            exact
            className="nav-link text-uppercase font-weight-bold"
          >
            HOME
          </NavLink>
          <NavLink
            to="/how"
            className="nav-link text-uppercase font-weight-bold"
          >
            HOW IT WORKS
          </NavLink>
          <NavLink
            to="/team"
            className="nav-link text-uppercase font-weight-bold"
          >
            TEAM
          </NavLink>
          <NavLink
            to="/contact"
            className="nav-link text-uppercase font-weight-bold"
          >
            CONTACT
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainMenu;
