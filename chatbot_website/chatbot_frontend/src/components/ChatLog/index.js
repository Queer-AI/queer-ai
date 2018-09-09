
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Message from './Message';

import * as selectors from 'src/redux';

import { messagesWrap } from './style.scss';

class ChatLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasOverflow: false
    };
  }
  componentDidUpdate(prevProps) {
    this.scrollToBottom();
    if (prevProps.messages !== this.props.messages) {
      this.checkOverflow();
    }
  }
  checkOverflow() {
    const wrap = this.wrapEl;
    if (!wrap) {
      return;
    }
    const overflow = wrap.scrollHeight - wrap.clientHeight;
    this.setState({
      hasOverflow: overflow > 0
    });

  }
  scrollToBottom() {
    const wrap = this.wrapEl;
    if (!wrap) {
      return;
    }
    const overflow = wrap.scrollHeight - wrap.clientHeight;
    wrap.scrollTop = overflow;
  }
  render() {
    const { messages } = this.props;
    const { hasOverflow } = this.state;
    return (
      <div
        className={`${messagesWrap} ${hasOverflow ? 'has-overflow' : ''}`}
        ref={(el) => this.wrapEl = el}
        >
        {messages.map((item, i) => (
          <Message {...item} key={item.uuid} />
        ))}
      </div>
    );
  }
}

const mapState = (state) => ({
  messages: selectors.getMessages(state)
});

export default connect(mapState)(ChatLog);
