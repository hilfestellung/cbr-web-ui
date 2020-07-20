import React from "react";

import Container from "react-bootstrap/Container";
import Footer from "./Footer";

export interface SimplePageOptions {
  children: React.ReactNode | React.ReactNode[];
  footer?: boolean;
}
function SimplePage({ children, footer = true }: SimplePageOptions) {
  return (
    <>
      <Container className="mt-4 mb-4">{children}</Container>
      {footer && <Footer />}
    </>
  );
}

export default SimplePage;
