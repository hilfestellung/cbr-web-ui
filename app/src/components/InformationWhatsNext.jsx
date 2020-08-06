import React from 'react';

import SimplePage from './layout/SimplePage';
import { PropTypes, Children } from '../propTypes';
import Icon from './Icon';

function InformationWhatsNext({ icon, title, children }) {
  return (
    <SimplePage>
      <div className="full-usable-height">
        {title && <div>{title}</div>}
        <div className="d-flex" style={{ height: '66%' }}>
          <div
            className="d-flex flex-column justify-content-center align-items-center mr-5"
            style={{ fontSize: '500px', marginTop: '-31px', color: '#e0e0e0' }}
          >
            {icon}
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            {children}
          </div>
        </div>
        <div className="d-flex" style={{ height: '34%' }}></div>
      </div>
    </SimplePage>
  );
}
InformationWhatsNext.defaultProps = {
  icon: <Icon name="question-circle" />,
  title: undefined,
};
InformationWhatsNext.propTypes = {
  icon: PropTypes.element,
  title: PropTypes.element,
  children: Children,
};

export default InformationWhatsNext;
