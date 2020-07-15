import React from "react";

import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";

function SimplePage({ children }: any) {
  return (
    <>
      <Container className="mt-4 mb-4">{children}</Container>
      <div className="footer p-5">
        <Container className="pb-5">
          <div>
            <span className="mr-5">&copy; Christian Dein</span>
            <Link to="/impressum">Impressum</Link>
            <Link to="/privacy-statement">Datenschutz</Link>
          </div>
        </Container>
      </div>
    </>
  );
}

export default SimplePage;
