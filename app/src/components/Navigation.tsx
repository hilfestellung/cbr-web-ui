import React from "react";

import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
// import NavDropdown from "react-bootstrap/NavDropdown";

function Navigation() {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        <img
          src="/images/logo/cbr-logo-small.png"
          alt="Case Based Reasoning Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/*
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
           */}
          {/*
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
          */}
        </Nav>
        {/*
         */}
        <Form inline>
          {isAuthenticated ? (
            <>
              <Button
                variant="outline-secondary"
                onClick={() =>
                  logout({ returnTo: window.location.origin + "/logout" })
                }
              >
                Abmelden
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={() => loginWithRedirect()}>
              Anmelden
            </Button>
          )}
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
