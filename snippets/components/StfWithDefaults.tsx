// StateFull with default
// stf-defaults
import * as React from "react";

export interface I$_1_$Props {
  label: string;
  $_2_?: number;
}

interface IDefaultProps {
  $_2_: number;
}

interface State {
  count: number;
}

export const $_1_$: React.ComponentClass<
  I$_1_$Props
> = class extends React.Component<I$_1_$Props & IDefaultProps> {
  // to make defaultProps strictly typed we need to explicitly declare their type
  // @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11640
  static defaultProps: IDefaultProps = {
    $_2_: 0
  };

  state: State = {
    count: this.props.$_2_
  };

  componentWillReceiveProps({ $_2_ }: I$_1_$Props) {
    if ($_2_ != null && $_2_ !== this.props.$_2_) {
      this.setState({ count: $_2_ });
    }
  }

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    const { handleIncrement } = this;
    const { label } = this.props;
    const { count } = this.state;

    return (
      <div>
        $_0_
        <button type="button" onClick={handleIncrement}>
          {"Increment"}
        </button>
      </div>
    );
  }
};
