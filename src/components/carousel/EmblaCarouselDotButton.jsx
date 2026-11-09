import React from "react";

export const DotButton = ({ children, ...restProps }) => (
  <button type="button" {...restProps}>
    {children}
  </button>
);
