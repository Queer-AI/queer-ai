import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { container } from './style.scss';

export { Content } from './Content';

export default class Container extends Component {
  static propTypes = {
    children: PropTypes.node
  };
  render() {
    const { children } = this.props;
    return (
      <div className={container}>
        {children}
      </div>
    );
  }
}
