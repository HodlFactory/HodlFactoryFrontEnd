import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const MainMenu = (props) => {
  return (
    <Navbar collapseOnSelect expand="md">
      <Navbar.Brand href="/">HODL FACTORY</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <NavLink to="/" className="nav-link text-uppercase">
            HOME
          </NavLink>
          <NavLink to="/about" className="nav-link text-uppercase">
            ABOUT US
          </NavLink>
          <NavLink to="/how" className="nav-link text-uppercase">
            HOW IT WORKS
          </NavLink>
          <NavLink to="/contact" className="nav-link text-uppercase">
            CONTACT
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainMenu;
