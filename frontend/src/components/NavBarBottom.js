import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

export default function NavBarBottom() {
  return (
    <Navbar bg="transparent" style={{ zIndex: 8 }} className="py-0 my-0">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="py-0 mb-0">
          <Nav.Link
            className="py-0"
            as={NavLink}
            style={{ color: "rgba(120,120,120,1)" }}
            to="/terms"
            activeClassName="active"
          >
            Terms
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            style={{ color: "rgba(120,120,120,1)" }}
            className="py-0"
            to="/cookies"
            activeClassName="active"
          >
            Cookies
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
