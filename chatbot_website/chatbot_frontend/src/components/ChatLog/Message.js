import React from 'react';
import PropTypes from 'prop-types';
import { Content } from '../Container';

import { chatMessage } from './style.scss';

const Message = ({ local, message, source }) => (
  <Content
    align={source === 'bot' ? 'left' : 'right'}
    className={chatMessage}
    inline
  >
    {source === 'bot' ? local : message}
  </Content>
);

Message.propTypes = {
  local: PropTypes.string,
  message: PropTypes.string,
  source: PropTypes.string
};

export default Message;
