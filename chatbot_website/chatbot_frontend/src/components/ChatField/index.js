import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Content } from '../Container';

import { chatField } from './style.scss';

export default class ChatField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }
  onChange({ target: { value } }) {
    this.setState({ value });
  }
  render() {
    const { value } = this.state;
    return (
      <Content>
        <input className={chatField} onChange={this.onChange.bind(this)} value={value} />
      </Content>
    );
  }
}
