import React from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/esm/Container";

import { getLocalItem } from "../../utils/storage";
import globals from "../../globals";

const { version } = globals;

function Footer() {
  return (
    <div className="footer p-5 text-white bg-secondary">
      <Container className="pb-5">
        <div className="pb-3">
          <span className="mr-5">&copy; Christian Dein</span>
          <Link to="/impressum">Impressum</Link>
          <Link to="/privacy-statement">Datenschutz</Link>
          <a
            href="https://github.com/hilfestellung/cbr-web-ui"
            className="ml-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
        <div className="text-center">
          Client ID: {getLocalItem("client_id")} - Version: v{version}
        </div>
      </Container>
    </div>
  );
}

export default Footer;
