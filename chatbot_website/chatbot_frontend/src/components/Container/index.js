import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { container, content } from './style.scss';

export const Content = ({ children }) => (
  <div className={content}>
    {children}
  </div>
);

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
