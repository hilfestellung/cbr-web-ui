import React from "react";

function Icon({ children, className, size, style }: any) {
  const iconSize = size != null ? size : 24;
  return (
    <div
      className={className}
      style={{
        fontSize: `${iconSize}px`,
        lineHeight: `0px`,
        width: `${iconSize}px`,
        height: `${iconSize}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default Icon;
