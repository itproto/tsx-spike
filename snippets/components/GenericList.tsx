// Generic List renderer
// gen-list
import * as React from "react";

export interface I$_1_ListProps<T> {
  items: T[];
  itemRenderer: (item: T) => JSX.Element;
}

export class $_1_List<T> extends React.Component<I$_1_ListProps<T>, {}> {
  render() {
    const { items, itemRenderer } = this.props;

    return <div>{items.map(itemRenderer)}</div>;
  }
}
