import React, { Component } from 'react';

export default RawComponent => {
  return class TabControlComponent extends Component {
    static isTabControl = true;

    render() {
      return (<RawComponent {...this.props} />);
    }
  };
}
