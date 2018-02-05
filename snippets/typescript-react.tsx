import * as React from "react";

interface IFooProps {
  label: string;
  onIncrement: () => any;
}

export const Foo: React.SFC<IFooProps> = ({ label, onIncrement }) => (
  <div>Test</div>
);
