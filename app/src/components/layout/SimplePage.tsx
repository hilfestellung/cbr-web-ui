import React from "react";

import Container from "react-bootstrap/Container";
import Footer from "./Footer";

function SimplePage({ children }: any) {
  return (
    <>
      <Container className="mt-4 mb-4">{children}</Container>
      <Footer />
    </>
  );
}

export default SimplePage;
