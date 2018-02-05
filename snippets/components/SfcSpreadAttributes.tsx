/* SFC Spread Attributes---------------------- */
// Stateless Component with ...spread attributes
// sfc-spread
import * as React from "react";

export interface I$_1_Props {
  className?: string;
  style?: React.CSSProperties;
}

export const $_1_: React.SFC<I$_1_Props> = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};
