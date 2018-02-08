// StateFull
// stf
import * as React from "react";

export interface I$_1_Props {
  label: string;
}

type IState = {
  count: number;
};

export class $_1_ extends React.Component<I$_1_Props, IState> {
  state: IState = {
    count: 0
  };

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    /* const { handleIncrement } = this;
    const { label } = this.props;
    const { count } = this.state;
    */

    return <div>$_0_</div>;
  }
}
