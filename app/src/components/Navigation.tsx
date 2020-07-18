import React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import Spinner from "react-bootstrap/Spinner";

function Navigation() {
  const {
    isAuthenticated,
    isLoading,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const { t } = useTranslation();
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
           */}
          {isAuthenticated && (
            <>
              <Nav.Link as={Link} to="/search">
                {t("Search")}
              </Nav.Link>
            </>
          )}
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
          {isLoading ? (
            <Spinner animation="border" />
          ) : isAuthenticated ? (
            <>
              <Navbar.Text className="mr-3">
                {t("Signed in as")}{" "}
                <span className="text-info">{user.name}</span>
              </Navbar.Text>
              <Button
                variant="outline-secondary"
                onClick={() =>
                  logout({ returnTo: window.location.origin + "/logout" })
                }
              >
                {t("Logout")}
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={() => loginWithRedirect()}>
              {t("Login")}
            </Button>
          )}
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
