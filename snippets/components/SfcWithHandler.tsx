/*1.Stateless Components - SFC ---------------------- */
// Stateless Component with handler
// sfc-handler
import * as React from "react";

export interface I$_1_Props {
  label: string;
  count: number;
  onIncrement: () => any;
}

export const $_1_: React.SFC<I$_1_Props> = ({ label, count, onIncrement }) => {
  const handleIncrement = () => {
    onIncrement();
  };

  return (
    <div>
      {label}: {count} <button type="button" onClick={handleIncrement} />
    </div>
  );
};
