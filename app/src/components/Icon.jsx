import React from 'react';
import { PropTypes, Children } from '../propTypes';

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
  children: null,
  className: undefined,
  style: undefined,
};
Icon.propTypes = {
  size: PropTypes.number,
  children: Children,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Icon;
