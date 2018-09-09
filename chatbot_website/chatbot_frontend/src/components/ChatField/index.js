import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Content } from '../Container';

import * as actions from 'src/redux/messages/actions';

import { chatField, submitButton, wrap } from './style.scss';

class ChatField extends Component {
  static propTypes = {
    send: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }
  componentDidMount() {
    this.inputEl.focus();
  }
  onChange({ target: { value } }) {
    this.setState({ value });
  }
  onSubmit(evt) {
    evt.preventDefault();
    const { value } = this.state;
    this.props.send(value);
    this.setState({ value: '' });
  }
  render() {
    const { value } = this.state;
    return (
      <Content className={wrap}>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input
            className={chatField}
            onChange={this.onChange.bind(this)}
            placeholder='Type something...'
            ref={(el) => this.inputEl = el}
            value={value}
          />
          <input className={submitButton} type='submit' value='Send' />
        </form>
      </Content>
    );
  }
}

const mapDispatch = (dispatch) => ({
  send: (message) => dispatch(actions.send(message))
});

export default connect(null, mapDispatch)(ChatField);
