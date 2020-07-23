import React from 'react';

import Container from 'react-bootstrap/Container';
import Footer from './Footer';
import { PropTypes, Children } from '../../propTypes';

function SimplePage({ children, footer }) {
  return (
    <>
      <Container className="mt-4 mb-4">{children}</Container>
      {footer && <Footer />}
    </>
  );
}
SimplePage.defaultProps = {
  footer: true,
};
SimplePage.propTypes = {
  children: Children,
  footer: PropTypes.bool,
};

export default SimplePage;
