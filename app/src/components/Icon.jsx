import React from 'react';
import { PropTypes } from '../propTypes';

function Icon({ size, children, className, style }) {
  return (
    <div
      className={className}
      style={{
        fontSize: `${size}px`,
        lineHeight: `0px`,
        width: `${size}px`,
        height: `${size}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
Icon.defaultProps = {
  size: 24,
};
Icon.propTypes = {
  size: PropTypes.number,
};

export default Icon;
