import React, { useState, useEffect } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Workspace({ left, right, content, toolbar }: any) {
  return (
    <Row className="workspace">
      {left && (
        <Col xs={3} className="left">
          {left}
        </Col>
      )}
      {content && (
        <Col xs={7} className="content">
          {content}
        </Col>
      )}
      {right && (
        <Col xs={2} className="right">
          {right}
        </Col>
      )}
    </Row>
  );
}

export default Workspace;
