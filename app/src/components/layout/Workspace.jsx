import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Children } from '../../propTypes';

function Workspace({ left, right, content, toolbar }) {
  let contentWidth = 7;
  if (!left) {
    contentWidth += 3;
  }
  if (!right) {
    contentWidth += 2;
  }
  return (
    <Row className="workspace">
      {left && (
        <Col xs={3} className="left">
          {left}
        </Col>
      )}
      {content && (
        <Col xs={contentWidth} className="content">
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
Workspace.defaultProps = {
  left: null,
  right: null,
  content: null,
  toolbar: null,
};
Workspace.propTypes = {
  left: Children,
  right: Children,
  content: Children,
  toolbar: Children,
};

export default Workspace;
