import React from 'react';
import { PropTypes, Children } from '../propTypes';
import { complexClassNameBuilder } from '../utils/layout';

function Icon({ name, solid, brands, size, style }) {
  return (
    <i
      className={complexClassNameBuilder({
        fas: solid,
        fav: brands,
        [`fa-${name}`]: true,
      })}
      style={{
        display: 'contents',
        fontSize: `${size}px`,
        lineHeight: `0px`,
        width: `${size}px`,
        height: `${size}px`,
        ...style,
      }}
    ></i>
  );
}
Icon.defaultProps = {
  solid: true,
  brands: false,
  size: 24,
  children: null,
  className: undefined,
  style: undefined,
};
Icon.propTypes = {
  name: PropTypes.string,
  solid: PropTypes.bool,
  brands: PropTypes.bool,
  size: PropTypes.number,
  children: Children,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Icon;
